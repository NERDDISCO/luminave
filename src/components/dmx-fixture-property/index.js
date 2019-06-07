import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/directives/repeat.js'
import { rgbToHex } from '../../directives/rgb-to-hex.js'
import { defaultValue } from '../../directives/default-value.js'
import { selected } from '../../directives/selected.js'


/*
 * Property of a DMX fixture
 */
class DmxFixtureProperty extends LitElement {

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      channels: { type: Number },
      property: { type: Object },
      value: { type: String }
    }
  }

  handleColorChange(e) {
    // Convert hex color to RGB
    const value = e.target.value.match(/[A-Za-z0-9]{2}/g).map(v => parseInt(v, 16))

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        name: this.name
      }
    }))
  }

  handleInputChange(e) {
    let { value } = e.target

    if (isNaN(value)) {
      // String
    } else {
      value = parseInt(value, 10)
    }

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        name: this.name
      }
    }))
  }

  handleSelectChange(e) {
    const [selectedOption] = e.target.selectedOptions
    const { value } = selectedOption

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        name: this.name
      }
    }))
  }

  render() {
    const { channels, property, name, value } = this

    return html`
    <div>

      <label title="${channels}">${name}</label>:

      ${
        property.isRgb
        ? html`<input type="color" .value="${rgbToHex(value)}" @change="${e => this.handleColorChange(e)}">`
        : ''
      }

      ${
        property.isRange
        ? html`<input type="number" .value="${defaultValue(value, 0)}" min="0" max="255" @change="${e => this.handleInputChange(e)}">`
        : ''
      }

      ${
        property.isMapped
        ? html`
          <select @change="${e => this.handleSelectChange(e)}">
            ${repeat(property.mapping, mapping => html`
              <option value="${mapping}" ?selected="${selected(value, mapping)}">${mapping}</option>
            `)}
          </select>
        `
        : ''
      }

      ${
        property.isMultiRange
        ? html`
          <input type="text" .value="${defaultValue(value, '')}" @change="${e => this.handleInputChange(e)}">
          <ul>
            ${repeat(property.mapping, mapping => html`
              <li>${mapping}</li>
            `)}
          </ul>
        `
        : ''
      }

      ${
        property.isHiRes
        ? html`
          <input type="number" .value="${defaultValue(value, 0)}" @change="${e => this.handleInputChange(e)}" min="${property.min}" max="${property.max}" step="0.1">
          <span>From ${property.min} to ${property.max}</span>
        `
        : ''
      }

    </div>
    `
  }
}

customElements.define('dmx-fixture-property', DmxFixtureProperty)
