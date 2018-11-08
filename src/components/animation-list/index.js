import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { store } from '../../reduxStore.js'
import '../animation-list-item/index.js'
import { getAnimation } from '../../selectors/index.js'
import { shared } from '../../styles/shared.js'
import '../search/search-field.js'

/*
 * A list of animations
 */
class AnimationList extends LitElement {
  static get properties() {
    return {
      animations: { type: Array },
      animationManager: { type: Array }
    }
  }

  handleAnimationSubmit(e) {
    // Get data out of the form
    const data = new FormData(e.target)
    const animationId = data.get('animationId')

    this.dispatchEvent(new CustomEvent('add-animation', {
      detail: {
        event: e,
        animationId
      }
    }))
  }

  handleRemoveAnimation(e) {
    const { animationId } = e.target

    this.dispatchEvent(new CustomEvent('remove-animation', {
      detail: {
        event: e,
        animationId
      }
    }))
  }

  getAnimation(animationId) {
    return this.animationManager.filter(animation => animation.id === animationId)[0]
  }

  render() {
    if (this.animations === undefined) {
      this.animations = []
    }

    const { animationManager, animations } = this

    return html`
      ${shared}

      <form @submit="${e => this.handleAnimationSubmit(e)}">
        <select name="animationId" required>
          <option value=""></option>
          ${repeat(animationManager, animation => html`
            <option value="${animation.id}">${animation.name}</option>
          `)}
        </select>

        <button type="submit">Add animation</button>
      </form>

      <search-field></search-field>

      <div class="items">
    
        ${repeat(animations, animationId => html`
          <animation-list-item class="item" .animation="${getAnimation(store.getState(), { animationId })}"></animation-list-item>
          <button @click="${e => this.handleRemoveAnimation(e)}" .animationId="${animationId}">x</button>
        `)}

      </div>
    `
  }

}

customElements.define('animation-list', AnimationList)
