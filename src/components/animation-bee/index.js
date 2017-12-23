import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addKeyframe } from '../../actions/index.js'
import '../keyframe-grid/index.js'

/*
 * Handle a list of scenes
 */
class AnimationBee extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      name: String,
      duration: Number,
      index: Number,
      keyframes: Object,
      animations: Array,
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  handleKeyframeSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    let step = {}
    const keyframe = {}

    // Keyframe on step does not exist
    if (this.keyframes[this.step] === undefined) {
      step = { [this.property]: this.value }
    } else {
      step = Object.assign(this.keyframes[this.step], { [this.property]: this.value })
    }

    keyframe[this.step] = step

    this.dispatch(addKeyframe(this.index, keyframe))
  }

  handleStep(e) {
    this.step = e.target.value
  }

  handleProperty(e) {
    this.property = e.target.value
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
          <input name="property" type="text" on-change="handleProperty" required></input>

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
