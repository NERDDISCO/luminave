import { LitElement, html } from 'lit-element'

/*
 * A animation list item
 */
class AnimationListItem extends LitElement {
  static get properties() {
    return { animation: Object }
  }

  render() {
    const { animation } = this

    return html`
      <div>
        ${animation.name}
      </div>
    `
  }

}

customElements.define('animation-list-item', AnimationListItem)
