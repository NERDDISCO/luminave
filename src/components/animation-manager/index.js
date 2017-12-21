import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { addAnimation, runAnimation, removeAnimation } from '../../actions/index.js'

/*
 * Handle a list of animations
 */
class AnimationManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      animations: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  addAnimation() {
    const id = uuid()
    this.dispatch(addAnimation({
      id,
      keyframes: {
        '0': {
          color: [255, 0, 0],
          dimmer: 255
        },
        '1': {
          color: [0, 255, 0],
          dimmer: 200
        }
      },
      fixtures: [],
      duration: 5,
      name: `demo animation ${id}`,
      isRunning: false
    }))
  }

  runAnimation(e) {
    const { dataset } = e.target
    this.dispatch(runAnimation(parseInt(dataset.index, 10)))
  }

  removeAnimation(e) {
    const { dataset } = e.target
    this.dispatch(removeAnimation(parseInt(dataset.index, 10)))
  }

  static get template() {
    return `
      <button on-click="addAnimation">Add animation</button>

      <template is="dom-repeat" items="{{animations}}" as="animation">
        <div>
          Name: [[animation.name]] <br>
          Duration: [[animation.duration]] <br>

          <button on-click="runAnimation" data-index$="[[index]]">Run</button>
          <button on-click="removeAnimation" data-index$="[[index]]">Remove</button>

          Keyframes: [[animation.keyframes]]

          <!-- @TODO: <keyframes-grid> -->
        </div>
      </template>
    `
  }
}

customElements.define('animation-manager', AnimationManager)
