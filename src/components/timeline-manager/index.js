import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { playTimeline, resetTimeline, sendUniverseToUsb, sendUniverseToFivetwelve, setTimelineProgress, setChannels, setAllFixtureProperties, resetUniverseAndFixtures } from '../../actions/index.js'
import { batch, clearBatch, fixtureBatch, clearFixtureBatch } from '/src/utils/index.js'
import '../timeline-scene/index.js'

/*
 * Handle the elements in a timeline
 *
 * @TODO: Live mode: true: Added scenes are removed when they are over | false: Scenes stay forever
 * @TODO: Add the same scene behind if the same scene is already in the timeline
 */
class TimelineManager extends ReduxMixin(PolymerElement) {
  constructor() {
    super()

    // Max length of a scene
    this.measures = 20

    this.timeoutId = undefined
  }

  static get properties() {
    return {
      bpm: {
        type: Number,
        statePath: 'bpm'
      },
      timelineManager: {
        type: Object,
        statePath: 'timelineManager'
      },
      sceneManager: {
        type: Array,
        statePath: 'sceneManager'
      },
      isPlaying: {
        type: Boolean,
        statePath: 'timelineManager.playing',
        observer: 'observePlaying'
      },
      playLabel: {
        type: String,
        computed: 'computePlayLabel(isPlaying)'
      }
    }
  }

  getScene(sceneId) {
    return this.sceneManager.filter(scene => scene.id === sceneId)[0]
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

  observePlaying() {
    if (this.isPlaying) {
      console.log('playing')
      // @TODO: move into state
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
      // @TODO: move into state
      this.duration = ~~(60 / this.bpm * 1000 * this.measures)

      // const {time, duration, paused} = this.state
      const now = new Date()
      const loopEnd = now - this.time > this.duration

      const timeCounter = (now - this.time) / this.duration

      if (loopEnd) {
        this.time = now
      }

      this.progress = timeCounter * this.measures

      // @TODO: Is this a problem?
      // Everything is waiting for the progress to change:
      // * dmx-fixture to update the properties of a fixture
      // * timeline-animation to use the progress to calculate interpolated properties of an animation
      this.dispatch(setTimelineProgress(this.progress))

      // Set the values of all fixtures which triggers setting the value of the specific channels of each fixture
      // These properties are used in dmx-fixture to update the properties of the fixture instance
      // dmx-fixture gets triggered when setTimelineProgress is dispatched
      this.dispatch(setAllFixtureProperties({...fixtureBatch}))

      // Is this really needed? Shouldn't we just reset the batch all the time instead of the properties?
      // Also: This is removing the properties from the fixtureBatch, but is not resetting the properties on the fixture itself
      // clearFixtureBatch()

      // Update the channels of universe 0 with the batch of values collected for the fixtures
      this.dispatch(setChannels(0, [...batch]))

      // Reset the batch so that if a scene is done the values for the attachted fixtures are also reset
      clearBatch()

      // Send the universe to the UsbDmxManager
      this.dispatch(sendUniverseToUsb(now))

      // Send the universe to the FivetwelveManager
      this.dispatch(sendUniverseToFivetwelve(now))

      this.timeoutId = setTimeout(() => {
        // Get the next frame
        requestAnimationFrame(this.loop.bind(this))
      }, 1000 / 30)

    }
  }

  static get template() {
    return `
      <style>
        .grid {
          display: flex;
          flex-direction: row;
        }

        .item {
          margin: 0 .25em;
        }
      </style>

      <h2>Timeline</h2>

      <button on-click="handleReset">Reset</button>
      <button on-click="handlePlay">[[playLabel]]</button>
      [[normalizeProgress(progress)]]


      <br>

      <div class="grid">
        <template is="dom-repeat" items="[[timelineManager.scenes]]" as="sceneId">
          <div class="item">
            <timeline-scene scene$="[[getScene(sceneId)]]"></timeline-scene>
          </div>
        </template>
      </div>
    `
  }
}

customElements.define('timeline-manager', TimelineManager)
