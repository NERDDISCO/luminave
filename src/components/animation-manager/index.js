import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import uuidv1 from 'uuid/v1.js'
import { addAnimation } from '../../actions/index.js'
import { getAnimationsSorted } from '../../selectors/index.js'
import '../animation-bee/index.js'

/*
 * Handle a list of animations
 */
class AnimationManager extends connect(store)(LitElement) {
  static get properties() {
    return { animations: { type: Array } }
  }

  _stateChanged(state) {
    this.animations = getAnimationsSorted(state)
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const duration = parseInt(data.get('duration'), 10)
    const name = data.get('name')
    const amount = parseInt(data.get('amount'), 10)
    const startId = parseInt(data.get('startId'), 10) || 1

    // Amount was not specified, so we just add one fixture
    if (isNaN(amount)) {
      store.dispatch(addAnimation({
        id: uuidv1(),
        keyframes: {},
        duration,
        name
      }))

    // Add multiple animations specified by amount
    } else {

      // Add multiple animations
      for (let i = 0; i < amount; i++) {
        const animationIndex = startId + i

        // @TODO: Allow default keyframes than only modvColor
        const keyframes = {
          0: { modvColor: animationIndex },
          1: { modvColor: animationIndex }
        }

        let newName = ''

        if (amount > 1) {
          newName = `${name}${animationIndex}`
        } else {
          newName = `${name}`
        }

        store.dispatch(addAnimation({
          id: uuidv1(),
          keyframes,
          duration,
          name: newName
        }))
      }
    }

  }

  render() {
    const { animations } = this

    return html`
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

      <form @submit="${e => this.handleSubmit(e)}">
        <label for="name">Name</label>
        <input name="name" type="text" required />

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" require />

        <label for="amount">Amount</label>
        <input name="amount" type="number" min="1" max="512" />

        <label for="startId">ID to start</label>
        <input name="startId" type="number" min="1" />

        <button type="submit">Add</button>
      </form>

      <br>

      <div class="container">

        ${repeat(animations, animation => html`

          <div class="item">
            <animation-bee
              id="${animation.id}"
              name="${animation.name}"
              duration="${animation.duration}"
              .keyframes="${animation.keyframes}">
            </animation-bee>
          </div>

        `)}

      </div>
    `
  }
}

customElements.define('animation-manager', AnimationManager)
