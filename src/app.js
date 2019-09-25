import { LitElement, html } from 'lit-element'

import './components/luminave-menu/index.js'
import './components/luminave-dashboard/index.js'
// import './components/ui-spacer/index.js'

import { theme } from './styles/theme.js'

class Luminave extends LitElement {
  render() {
    return html`
      ${theme}

      <luminave-menu></luminave-menu>

      <ui-spacer height="5em"></ui-spacer>

      <luminave-dashboard></luminave-dashboard>
    `
  }
}

customElements.define('lumi-nave', Luminave)
