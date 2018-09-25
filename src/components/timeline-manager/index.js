import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { playTimeline, resetTimeline, setChannels, resetUniverseAndFixtures } from '../../actions/index.js'
import { batch, clearBatch, fixtureBatch, modvData } from '/src/utils/index.js'
import '../timeline-scene/index.js'
import { getTimelineScenes, getAnimations, getTimeline, getFixtures, getModv } from '../../selectors/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'

import '/node_modules/@polymer/paper-button/paper-button.js'
import { buttons } from '../../styles/buttons.js'

/*
 * Handle the elements in a timeline
 */
class TimelineManager extends connect(store)(LitElement) {
  constructor() {
    super()

    // Max length of a scene
    this.measures = 20

    this.timeoutId = undefined

    this.progress = 0

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
      bpm: { type: Number },
      progress: { type: Number },
      timelineScenes: { type: Array },
      animationManager: { type: Array },
      isPlaying: { type: Boolean },
      allFixtures: { type: Array },
      timelineFixtures: { type: Object },
      modvConnected: { type: Boolean }
    }
  }

  // Start / stop the playback loop whenever isPlaying is changed
  set playing(value) {
    // Only update the value if it's actually different
    if (this.isPlaying !== value) {
      this.isPlaying = value
      this.observePlaying()
    }
  }

  // Compute the timelineFixtures whenever the fixtures on the state are changing
  set fixtures(value) {
    if (!Object.is(this.allFixtures, value)) {
      this.allFixtures = value

      // List of fixtures
      this.timelineFixtures = this.computeFixtures(value)
    }
  }

  _stateChanged(state) {
    this._page = state.app.page
    this.bpm = state.bpm
    this.modvConnected = getModv(state).connected
    this.timelineScenes = getTimelineScenes(state)
    this.animationManager = getAnimations(state)
    this.fixtures = getFixtures(state)

    // @TODO: What is the performance difference when checking if the value has changed here
    // vs changed in the setter?
    this.playing = getTimeline(state).playing
  }

  handlePlay() {
    store.dispatch(playTimeline(!this.isPlaying))
  }

  handleReset() {
    store.dispatch(resetTimeline())
    store.dispatch(resetUniverseAndFixtures(0))
  }

  // @TODO: Save the current progress into state
  // store.dispatch(setTimelineProgress(this.progress))
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
      store.dispatch(setChannels(0, [...batch]))

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

  render() {
    const { progress, isPlaying } = this

    // Label for the play-button
    const playLabel = isPlaying 
      ? 'Pause' 
      : 'Play'
    
    return html`
      ${buttons}

      <style>
        .grid {
          display: flex;
          flex-direction: row;

          min-height: 3em;
        }

        .timeline {
          background-color: var(--dark-primary-color);
          color: var(--text-primary-color);
          padding: var(--padding-basic);
        }

        .scenes {
          position: relative;
          margin-top: calc(var(--padding-basic) * 2);
          padding: calc(var(--padding-basic) * 3) var(--padding-basic) var(--padding-basic) var(--padding-basic);
          border: 3px solid var(--light-primary-color);
        }

        .scenes::before {
          content: 'Scenes';
          position: absolute;
          top: calc(var(--padding-basic) * -3);
          overflow: visible;
          background: var(--light-primary-color);
          color: var( --dark-primary-color);
          padding: var(--padding-basic);
        }

        .scenes .item:first-child {
          margin-left: 0;
          border-left: none;
        }

        .item {
          margin: 0 .1em;
          padding: var(--padding-basic);
          border-left: 3px solid var(--light-primary-color);
          color: var(--text-primary-color);
        }
      </style>

      <div class="timeline">

        <paper-button class="primary" @click="${() => this.handlePlay()}">${playLabel}</paper-button>
        ${progress}
        <paper-button @click="${() => this.handleReset()}">Reset</paper-button>

        <ui-spacer></ui-spacer>

        <div class="scenes">

          <div class="grid">

            ${repeat(this.timelineScenes, scene => html`
              <div class="item">
                <timeline-scene .scene=${scene} progress=${progress}></timeline-scene>
              </div>
            `)}

          </div>

        </div>

      </div>
    `
  }
}

customElements.define('timeline-manager', TimelineManager)
