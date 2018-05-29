import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addAnimation } from '../../actions/index.js'
import { getAnimationsSorted } from '../../selectors/index.js'
import '../animation-bee/index.js'

/*
 * Handle a list of animations
 */
class AnimationManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      animations: {
        type: Array,
        statePath: getAnimationsSorted
      }
    }
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

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

  static get template() {
    return `
    <style>
      .container {
        --width: 8;
        display: grid;
        grid-template-columns: repeat(var(--width), auto);
      }

      .item {
        border: 1px solid rgba(0, 0, 0, 0.25);
        margin: 0.15em;
        min-height: 1.5em;
        overflow: hidden;
      }

    </style>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add animation</button>
      </form>

      <br>

      <div class="container">

        <template is="dom-repeat" items="{{animations}}" as="animation">
          <div class="item">

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
