import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../timeline-animation/index.js'
import { getAnimation } from '../../selectors/index.js'

/*
 * Handle a scene in a timeline
 */
class TimelineScene extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scene: Object
      // @TODO: This might be resolved after https://github.com/tur-nr/polymer-redux/issues/126 is resolved
      // sceneAnimations: {
      //   type: Array,
      //   statePath(state) {
      //     console.log('asdfasdf')
      //
      //     return getAnimations(state).filter(animation => {
      //       return this.scene.animations.includes(animation.id)
      //     })
      //   }
      // }
    }
  }

  _getAnimation(animationId) {
    return getAnimation(this.getState(), { animationId })
  }

  static get template() {
    return `
      <div>
        <h3>[[scene.name]]</h3>
<!--
        <template is="dom-repeat" items="[[sceneAnimations]]" as="animation">

          <timeline-animation
            animation$="[[animation]]"
            fixture-ids$="[[scene.fixtures]]"
            duration="[[scene.duration]]"></timeline-animation>
        </template>
-->

        <template is="dom-repeat" items="[[scene.animations]]" as="animationId">

          <timeline-animation
            animation$="[[_getAnimation(animationId)]]"
            fixture-ids$="[[scene.fixtures]]"
            duration="[[scene.duration]]"></timeline-animation>
        </template>

      </div>
    `
  }
}

customElements.define('timeline-scene', TimelineScene)
