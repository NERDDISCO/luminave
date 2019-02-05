import { LitElement, html } from '@polymer/lit-element/lit-element.js'

/*
 * Show the status of something, for example USB or modV
 */
class LuminaveStatusIndicator extends LitElement {

  static get properties() {
    return { status: { type: Boolean } }
  }

  /*
   * Change the class based on the status
   */
  computeClass(status) {
    const statusClass = status 
      ? 'active'
      : 'inactive' 

    return statusClass
  }

  render() {
    const { status } = this

    return html`
        <style>
          .active {
            border-bottom: 3px solid var(--primary-background-color);
          }

          .inactive {
            border-bottom: 3px solid var(--default-warning-color);
          }
        </style>

        <div class="${this.computeClass(status)}">
          <slot></slot>
        </div>
    `
  }
}

customElements.define('luminave-status-indicator', LuminaveStatusIndicator)
