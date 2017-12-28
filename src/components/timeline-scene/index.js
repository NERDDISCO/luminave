import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../timeline-animation/index.js'

/*
 * Handle a scene in a timeline
 */
class TimelineScene extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scene: Object,
      timelineProgress: Number,
      progress: {
        type: Number,
        computed: 'computeProgress(timelineProgress)'
      },
      fixtureManager: {
        type: Array,
        statePath: 'fixtureManager'
      },
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  computeProgress(timelineProgress) {
    let progress = timelineProgress

    progress = timelineProgress / this.scene.duration

    if (progress > 1.0) {
      progress = 1
    }

    return progress
  }

  getAnimation(animationId) {
    return this.animationManager.filter(animation => animation.id === animationId)[0]
  }

  static get template() {
    return `
      <div>
        <h3>[[scene.name]] | [[scene.duration]]</h3>

        [[progress]]

        <template is="dom-repeat" items="[[scene.animations]]" as="animationId">
          <timeline-animation
            animation$="[[getAnimation(animationId)]]"
            fixture-ids$="[[scene.fixtures]]"
            progress$="[[progress]]"></timeline-animation>
        </template>
      </div>
    `
  }
}

customElements.define('timeline-scene', TimelineScene)
