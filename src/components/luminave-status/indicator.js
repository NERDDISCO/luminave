import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'

import '/node_modules/@polymer/paper-button/paper-button.js'

/*
 * Show the status of something, for example USB or modV
 */
class LuminaveStatusIndicator extends PolymerElement {

  static get properties() {
    return {
      status: {
        type: Boolean,
        value: false
      }
    }
  }

  /*
   * Change the class based on the status
   */
  computeClass(status) {
    let statusClass = ''

    if (status) {
      statusClass = 'active'
    } else {
      statusClass = 'inactive'
    }

    return statusClass
  }

  static get template() {
    return html`
        <style>
          .active {
            border-bottom: 3px solid var(--background-primary);
          }

          .inactive {
            border-bottom: 3px solid var(--background-warning);
          }
        </style>

        <div class$="{{computeClass(status)}}">
          <slot></slot>
        </div>
    `
  }
}

customElements.define('luminave-status-indicator', LuminaveStatusIndicator)
