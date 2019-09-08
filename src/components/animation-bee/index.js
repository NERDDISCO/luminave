import { LitElement, html } from 'lit-element'
import { store } from '../../reduxStore.js'
import { repeat } from 'lit-html/directives/repeat.js'
import { addKeyframe, removeAnimation, setAnimation } from '../../actions/index.js'
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
      id: { type: String },
      keyframes: { type: Object }
    }
  }

  removeAnimation(e) {
    const { animationId } = e.target
    store.dispatch(removeAnimation(animationId))
  }

  handleKeyframeSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const step = data.get('step')
    const property = data.get('property')
    const value = data.get('value')

    store.dispatch(addKeyframe(this.id, step, property, value))
  }

  handleAnimationSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const name = data.get('name')
    const duration = parseInt(data.get('duration'), 10)

    const { id } = this

    store.dispatch(setAnimation({
      id,
      name,
      duration
    }))
  }

  render() {
    const { id, properties, keyframes, name, duration } = this

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


        <form @submit="${e => this.handleAnimationSubmit(e)}">
          <input class="name" name="name" type="text" value="${name}" />
          <input class="name" name="duration" type="number" min="0" value="${duration}" />

          <button type="submit">Save</button>
        </form>

        <button @click="${e => this.removeAnimation(e)}" .animationId="${id}">Remove</button>

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
