import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { modvData } from '../../utils/index.js'
import './color-grid.js'
import { defaultValue } from '../../directives/default-value.js'


/*
 * Change the modV Mapping
 */
class ModvMapper extends connect(store)(LitElement) {
  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      colors: { type: Array },
      slots: { type: Array }
    }
  }

  _stateChanged(state) {

  }

  listenReceivedModvData() {
    this.colors = modvData.colors
  }

  render() {
    const { width, height, colors, slots } = this

    return html`
      <section>
        <modv-color-grid 
          width="${width}" 
          height="${height}"
          .colors="${defaultValue(colors, [])}"
          .slots="${slots}"
        ></modv-color-grid>
      </section>
    `
  }

}

customElements.define('modv-mapper', ModvMapper)
