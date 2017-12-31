import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { playTimeline, resetTimeline, sendUniverseToUsb } from '../../actions/index.js'
import '../timeline-scene/index.js'

/*
 * Handle the elements in a timeline
 *
 * @TODO: requestAnimationFrame
 * @TODO: Play / Pause timeline
 * @TODO: Live mode: true: Added scenes are removed when they are over | false: Scenes stay forever
 * @TODO: Clear timeline
 * @TODO: Add the same scene behind if the same scene is already in the timeline
 */
class TimelineManager extends ReduxMixin(PolymerElement) {
  constructor() {
    super()

    // Max length of a scene
    this.measures = 20
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
  }

  observePlaying() {
    if (this.isPlaying) {
      console.log('playing')
      // @TODO: move into state
      this.time = new Date()

      this.loop()
    } else {
      console.log('stopped')
    }
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

      setTimeout(() => {
        requestAnimationFrame(this.loop.bind(this))

        this.dispatch(sendUniverseToUsb(now))
      }, 1000 / 1)

    }
  }

  static get template() {
    return `
      <h2>Timeline</h2>

      <button on-click="handlePlay">[[playLabel]]</button>
      [[progress]]
      <button on-click="handleReset">Reset</button>

      <br>

      <template is="dom-repeat" items="[[timelineManager.scenes]]" as="sceneId">
        <timeline-scene scene$="[[getScene(sceneId)]]" timeline-progress="[[progress]]"></timeline-scene>
      </template>
    `
  }
}

customElements.define('timeline-manager', TimelineManager)
