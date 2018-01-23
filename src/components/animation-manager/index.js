import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addAnimation, runAnimation, removeAnimation } from '../../actions/index.js'
import '../animation-bee/index.js'

/*
 * Handle a list of animations
 *
 * @TODO: Use KeytimeDeluxe from './KeytimeDeluxe.js' to handle the keyframe interpolation
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

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    const id = uuidV1()

    this.dispatch(addAnimation({
      id,
      keyframes: {},
      duration: this.duration,
      name: this.name
    }))
  }

  handleName(e) {
    this.name = e.target.value
  }

  handleDuration(e) {
    this.duration = e.target.value
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
    <style>
      .grid {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        flex-wrap: wrap;
      }
      .animation {
        width: 30vw;
      }
    </style>

      <h2>Animations</h2>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add animation</button>
      </form>

      <div class="grid">

        <template is="dom-repeat" items="{{animations}}" as="animation">
          <div class="animation">
            <h3>[[animation.name]] (duration: [[animation.duration]])</h3>

            <button on-click="runAnimation" data-index$="[[index]]">Run</button>
            <button on-click="removeAnimation" data-index$="[[index]]">Remove</button>

            <animation-bee
              index$="[[index]]"
              name="[[animation.name]]"
              duration="[[animation.duration]]"
              keyframes="[[animation.keyframes]]""></animation-bee>

          </div>
        </template>

      </div>
    `
  }
}

customElements.define('animation-manager', AnimationManager)
