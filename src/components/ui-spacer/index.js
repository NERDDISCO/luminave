import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

/*
 * A spacer to be used to make some space between components
 *
 * @TODO: Fix the problem that setting the height has no effect
 */
class UiSpacer extends PolymerElement {

  static get properties() {
    return {
      height: {
        type: Number,
        value: '1em'
      }
    }
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeVars(height) {
    const vars = { '--height': height }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  static get template() {
    return `
      <style>
        div {
          width: 100%;
          height: var(--height);
        }
      </style>

      <div style="{{computeVars(height)}}"></div>
    `
  }
}

customElements.define('ui-spacer', UiSpacer)
