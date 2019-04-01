
import { LitElement, html, css } from 'lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
// import {  } from '../../actions/index.js'
// import {  } from '../../selectors/index.js'

/**
 * 
 */
class {{pascalCase name}} extends connect(store)(LitElement) {

  static get properties() {
    return {
    }
  }

  _stateChanged(state) {
  }

  static get styles() {
    return css`
    `
  }

  render() {
    return html`
    `
  }
}

customElements.define('{{kebabCase name}}', {{pascalCase name}})
