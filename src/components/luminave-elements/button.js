import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'

import '/node_modules/@polymer/paper-button/paper-button.js'

/*
 * A button
 */
class LuminaveButton extends PolymerElement {

  static get template() {
    return html`
        <style>
          :host(.primary) paper-button {
            background-color: var(--background-primary);
            color: var(--text-primary-color);
          }
        </style>

        <paper-button>
          <slot></slot>
        </paper-button>
    `
  }
}

customElements.define('luminave-button', LuminaveButton)
