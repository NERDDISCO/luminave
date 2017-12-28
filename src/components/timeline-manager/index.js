import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { playTimeline } from '../../actions/index.js'

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
  static get properties() {
    return {
      timelineManager: {
        type: Object,
        statePath: 'timelineManager'
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

  computePlayLabel(isPlaying) {
    return isPlaying ? 'Pause' : 'Play'
  }

  handlePlay() {
    this.dispatch(playTimeline(!this.isPlaying))
  }

  observePlaying() {
    if (this.isPlaying) {
      console.log('playing')
    } else {
      console.log('stopped')
    }
  }

  static get template() {
    return `
      <h2>Timeline</h2>

      <button on-click="handlePlay">[[playLabel]]</button>

      <br>

      <template is="dom-repeat" items="{{timelineManager.scenes}}" as="scene">
        [[scene]]
      </template>
    `
  }
}

customElements.define('timeline-manager', TimelineManager)
