import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import reduxMixin from '../../reduxStore.js'
import { playTimeline, resetTimeline, sendUniverseToUsb, sendUniverseToFivetwelve, setTimelineProgress, setChannels, setAllFixtureProperties, resetUniverseAndFixtures } from '../../actions/index.js'
import { batch, clearBatch, fixtureBatch, clearFixtureBatch, modvData } from '/src/utils/index.js'
import '../timeline-scene/index.js'
import { getTimelineScenes, getFixtures } from '../../selectors/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'

import '../luminave-elements/button.js'

/*
 * Handle the elements in a timeline
 */
class TimelineManager extends reduxMixin(PolymerElement) {
  constructor() {
    super()

    // Max length of a scene
    this.measures = 20

    this.timeoutId = undefined

    document.addEventListener('keypress', e => {
      const { code } = e
      // console.log(`Keypress code: ${code}`)

      // Start playback when active element is the body
      if (code === 'Space' && e.target === document.body) {
        e.preventDefault()
        this.handlePlay()
      }
    })
  }

  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      },
      timelineScenes: {
        type: Array,
        statePath: getTimelineScenes
      },
      isPlaying: {
        type: Boolean,
        statePath: 'timelineManager.playing',
        observer: 'observePlaying'
      },
      playLabel: {
        type: String,
        computed: 'computePlayLabel(isPlaying)'
      },

      allFixtures: {
        type: Array,
        statePath: getFixtures
      },

      timelineFixtures: {
        type: Object,
        computed: 'computeFixtures(allFixtures)'
      },

      modvConnected: {
        type: Boolean,
        statePath: 'modvManager.connected'
      }
    }
  }

  computePlayLabel(isPlaying) {
    return isPlaying ? 'Pause' : 'Play'
  }

  handlePlay() {
    this.dispatch(playTimeline(!this.isPlaying))
  }

  handleReset() {
    this.dispatch(resetTimeline())
    this.dispatch(resetUniverseAndFixtures(0))
  }

  // @TODO: Save the current progress into state
  // this.dispatch(setTimelineProgress(this.progress))
  observePlaying() {
    if (this.isPlaying) {
      console.log('playing')
      this.time = new Date()

      this.loop()
    } else {
      console.log('stopped')

      clearTimeout(this.timeoutId)
    }
  }

  normalizeProgress(progress) {
    return progress.toFixed(2)
  }

  loop() {
    if (this.isPlaying) {
      this.duration = ~~(60 / this.bpm * 1000 * this.measures)

      // const {time, duration, paused} = this.state
      const now = new Date()
      const loopEnd = now - this.time > this.duration

      const timeCounter = (now - this.time) / this.duration

      if (loopEnd) {
        this.time = now
      }

      this.progress = this.normalizeProgress(timeCounter * this.measures)

      for (const fixtureId in fixtureBatch) {
        const interpolatedProperties = fixtureBatch[fixtureId].properties
        const fixture = this.timelineFixtures[fixtureId]

          for (const propertyName in interpolatedProperties) {
            // @TODO: only set properties that the fixture understands
            fixture[propertyName] = interpolatedProperties[propertyName]
          }

          // Overwrite the color of every fixture when a connection to modV was established
          if (this.modvConnected && fixture.hasOwnProperty('color')) {

            // @TODO: When modvConnected, but no color value yet, we still set the color

            // Set a specific color from modV
            if (fixture.hasOwnProperty('modvColor')) {

              // @TODO: Fix precision error = No interpolation for values that don't change
              fixture.modvColor = Math.round(fixture.modvColor)

              const color = modvData.colors.slice((fixture.modvColor - 1) * 3, ((fixture.modvColor - 1) * 3) + 3)

              // Set the color
              // @TODO: This is still overwriting the color that was previously set on the device
              // which means it's totally useless
              fixture.color = color.length === 3
                ? color
                : fixture.color

            // Use average color from modV
            } else {
              fixture.color = modvData.average
            }
          }
      }

      // Update the channels of universe 0 with the batch of values collected for the fixtures
      this.dispatch(setChannels(0, [...batch]))

      // Reset the batch so that if a scene is done the values for the attachted fixtures are also reset
      clearBatch()

      // Send the universe to the UsbDmxManager
      window.dispatchEvent(new CustomEvent('send-universe-to-usb-dmx-controller', { detail: { now } }))

      // Send the universe to the FivetwelveManager
      window.dispatchEvent(new CustomEvent('send-universe-to-fivetwelve', { detail: { now } }))

      this.timeoutId = setTimeout(() => {
        // Get the next frame
        requestAnimationFrame(this.loop.bind(this))
      }, 1000 / 30)

    }
  }

  computeFixtures(allFixtures) {
    // Clear fixtures
    const fixtures = {}

    // Get the fixtures based on the fixtureId that is attachted to the scene
    allFixtures.forEach(fixture => {

      fixtures[fixture.id] =
        new Fixtures[fixture.type]({
          address: fixture.address,
          universe: fixture.universe
        })

    })

    return fixtures
  }

  static get template() {
    return html`
      <style>
        .grid {
          display: flex;
          flex-direction: row;

          min-height: 2em;
        }

        .timeline {
          background-color: var(--background-dark);
          color: var(--color-light);
          padding: var(--padding-basic);
        }

        .scenes {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--background-light);
        }

        .scenes::before {
          content: 'Scenes';
          position: absolute;
          top: calc(var(--padding-basic) * -3);
          overflow: visible;
          background: var(--background-light);
          color: var(--color-dark);
          padding: var(--padding-basic);
        }

        .scenes .item:first-child {
          margin-left: 0;
          border-left: none;
        }

        .item {
          margin: 0 .1em;
          padding: var(--padding-basic);
          border-left: 3px solid var(--background-light);
          color: var(--color-light);
        }
      </style>

      <div class="timeline">

        <luminave-button class="primary" on-click="handlePlay">[[playLabel]]</luminave-button>
        [[progress]]
        <luminave-button on-click="handleReset">Reset</luminave-button>

        <ui-spacer></ui-spacer>

        <div class="scenes">

          <div class="grid">
            <template is="dom-repeat" items="[[timelineScenes]]" as="scene">
              <div class="item">
                <timeline-scene scene$="[[scene]]" progress="[[progress]]"></timeline-scene>
              </div>
            </template>
          </div>

        </div>

      </div>
    `
  }
}

customElements.define('timeline-manager', TimelineManager)
