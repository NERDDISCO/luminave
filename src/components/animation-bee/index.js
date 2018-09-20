import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { store } from '../../reduxStore.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { addKeyframe, setAnimationName, removeAnimation } from '../../actions/index.js'
import { FIXTURE_PROPERTIES } from '../../constants/index.js'
import '../keyframe-grid/index.js'

/*
 * Handle a specific animation with multiple keyframes
 */
class AnimationBee extends LitElement {

  constructor() {
    super()

    this.properties = FIXTURE_PROPERTIES
    this.properties.sort()
  }

  static get properties() {
    return {
      name: { type: String },
      duration: { type: Number },
      index: { type: Number },
      keyframes: { type: Object }
    }
  }

  removeAnimation(e) {
    store.dispatch(removeAnimation(parseInt(this.index, 10)))
  }

  handleKeyframeSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const step = data.get('step')
    const property = data.get('property')
    const value = data.get('value')

    store.dispatch(addKeyframe(this.index, step, property, value))
  }

  handleNameChange(e) {
    const animationName = e.target.value
    store.dispatch(setAnimationName(this.index, animationName))
  }

  render() {
    const { index, properties, keyframes, name } = this

    return html`
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
        <input class="name" name="name" type="text" @change="${e => this.handleNameChange(e)}" value="${name}" />
        <button @click="${e => this.removeAnimation(e)}" data-index="${index}">Remove</button>

        <br><br>

        <form @submit="${e => this.handleKeyframeSubmit(e)}">
          <input name="step" type="number" min="0" max="1" step="any" required placeholder="Step"/>

          <select name="property" required>
            <option value="" disabled selected>Property</option>
            ${repeat(properties, property => html`
              <option value="${property}">${property}</option>
            `)}
          </select>

          <input name="value" type="text" required placeholder="Value"/>

          <button type="submit">Add keyframe</button>
        </form>

        <br>

        <keyframe-grid .keyframes="${keyframes}"></keyframe-grid>
      </div>
    `
  }
}

customElements.define('animation-bee', AnimationBee)
