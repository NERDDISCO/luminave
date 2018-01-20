import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addKeyframe } from '../../actions/index.js'
import { FIXTURE_PROPERTIES } from '../../constants/index.js'
import '../keyframe-grid/index.js'

/*
 * Handle a list of scenes
 */
class AnimationBee extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.properties = FIXTURE_PROPERTIES
    this.properties.sort()
  }

  static get properties() {
    return {
      name: String,
      duration: Number,
      index: Number,
      keyframes: Object,
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  handleKeyframeSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    this.dispatch(addKeyframe(this.index, this.step, this.property, this.value))
  }

  handleStep(e) {
    this.step = e.target.value
  }

  handleSelectedProperty(e) {
    this.property = e.target.selectedOptions[0].value
  }

  handleValue(e) {
    this.value = e.target.value
  }

  static get template() {
    return `
      <div>
        <h4>Keyframes</h4>

        <form on-submit="handleKeyframeSubmit">
          <label for="name">Step</label>
          <input name="name" type="text" on-change="handleStep" required></input>

          <label for="property">Property</label>
          <select name="property" on-change="handleSelectedProperty" required>
            <option value=""></option>
            <template is="dom-repeat" items="{{properties}}" as="property">
              <option value="[[property]]">[[property]]</option>
            </template>
          </select>

          <label for="value">Value</label>
          <input name="value" type="text" on-change="handleValue" required></input>

          <button type="submit">Add keyframe</button>
        </form>

        <keyframe-grid keyframes="{{keyframes}}"></keyframe-grid>
      </div>
    `
  }
}

customElements.define('animation-bee', AnimationBee)
