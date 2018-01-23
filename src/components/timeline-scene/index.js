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
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  ready() {
    super.ready()
  }

  getAnimation(animationId) {
    return this.animationManager.filter(animation => animation.id === animationId)[0]
  }

  static get template() {
    return `
      <div>
        <h3>[[scene.name]]</h3>

        <template is="dom-repeat" items="[[scene.animations]]" as="animationId">
          <timeline-animation
            animation$="[[getAnimation(animationId)]]"
            fixture-ids$="[[scene.fixtures]]"
            duration="[[scene.duration]]"></timeline-animation>
        </template>
      </div>
    `
  }
}

customElements.define('timeline-scene', TimelineScene)
