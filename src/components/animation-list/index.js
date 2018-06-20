import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../animation-list-item/index.js'

/*
 * A list of animations
 */
class AnimationList extends PolymerElement {
  static get properties() {
    return {
      animations: Array,
      animationManager: Array
    }
  }

  handleAnimationSubmit(e) {
    this.dispatchEvent(new CustomEvent('add-animation', {
      detail: {
        event: e,
        animationId: this.animationId
      }
    }))
  }

  handleSelectedAnimation(e) {
    this.animationId = e.target.selectedOptions[0].value
  }

  handleRemoveAnimation(e) {
    this.dispatchEvent(new CustomEvent('remove-animation', {
      detail: {
        event: e,
        animationIndex: e.target.animationIndex
      }
    }))
  }

  getAnimation(animationId) {
    return this.animationManager.filter(animation => animation.id === animationId)[0]
  }

  static get template() {
    return html`
      <style>
        .items {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 0 2em;
        }
      </style>

      <form on-submit="handleAnimationSubmit">
        <select name="type" on-change="handleSelectedAnimation" required>
          <option value=""></option>

          <template is="dom-repeat" items="{{animationManager}}" as="animation">
            <option value="[[animation.id]]">[[animation.name]]</option>
          </template>
        </select>

        <button type="submit">Add animation</button>
      </form>

      <div class="items">
      <template is="dom-repeat" items="{{animations}}" as="animationId">
        <animation-list-item class="item" animation="{{getAnimation(animationId)}}"></animation-list-item>
        <button on-click="handleRemoveAnimation" animation-index="[[index]]">x</button>
      </template>
      </div>
    `
  }

}

customElements.define('animation-list', AnimationList)
