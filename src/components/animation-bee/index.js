import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addKeyframe, setAnimationName, removeAnimation } from '../../actions/index.js'
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
      keyframes: Object
    }
  }

  removeAnimation(e) {
    this.dispatch(removeAnimation(parseInt(this.index, 10)))
  }

  handleKeyframeSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

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

  handleNameChange(e) {
    const animationName = e.target.value
    this.dispatch(setAnimationName(this.index, animationName))
  }

  static get template() {
    return `
      <style>
        .name {
          display: inline-block;
          width: 100%;
          margin: 0;
          padding: .35em .15em;
          border: 0;
          background: rgba(0, 0, 0, 1);
          color: #fff;
        }
      </style>

      <div>
        <input class="name" name="name" type="text" on-change="handleNameChange" value="[[name]]"></input>
        <button on-click="removeAnimation" data-index$="[[index]]">Remove</button>

        <br><br>

        <form on-submit="handleKeyframeSubmit">
          <input name="step" type="number" min="0" max="1" step="any" on-change="handleStep" required placeholder="Step"></input>

          <select name="property" on-change="handleSelectedProperty" required>
            <option value="" disabled selected>Property</option>
            <template is="dom-repeat" items="{{properties}}" as="property">
              <option value="[[property]]">[[property]]</option>
            </template>
          </select>

          <input name="value" type="text" on-change="handleValue" required placeholder="Value"></input>

          <button type="submit">Add keyframe</button>
        </form>

        <br>

        <keyframe-grid keyframes="{{keyframes}}"></keyframe-grid>
      </div>
    `
  }
}

customElements.define('animation-bee', AnimationBee)
