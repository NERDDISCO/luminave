import { LitElement, html } from '@polymer/lit-element/lit-element.js'

/*
 * A spacer to be used to make some space between components
 */
class UiSpacer extends LitElement {

  constructor() {
    super()

    this.height = '1em'
  }

  static get properties() {
    return { height: { type: String } }
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeVars(height) {
    const vars = { '--height': height }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  render() {
    const { height } = this
    
    return html`
      <style>
        div {
          width: 100%;
          height: var(--height);
        }
      </style>

      <div style="${this.computeVars(height)}"></div>
    `
  }
}

customElements.define('ui-spacer', UiSpacer)
