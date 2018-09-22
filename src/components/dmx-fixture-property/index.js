import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'


/*
 * Property of a DMX fixture
 */
class DmxFixtureProperty extends LitElement {

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      channels: { type: Number },
      property: { type: Object }
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
    const { channels, property, name } = this

    return html`
    <div>
      <label title="${channels}">${name}</label>:

      ${
        property.isRgb
        ? html`<input type="color" @change="${e => this.handleColorChange(e)}">`
        : ''
      }

      ${
        property.isRange
        ? html`<input type="number" value="0" min="0" max="255" @change="${e => this.handleInputChange(e)}">`
        : ''
      }

      ${
        property.isMapped
        ? html`
          <select @change="${e => this.handleSelectChange(e)}">
            ${repeat(property.mapping, mapping => html`
              <option value="${mapping}">${mapping}</option>
            `)}
          </select>
        `
        : ''
      }

      ${
        property.isMultiRange
        ? html`<input type="text" @change="${e => this.handleInputChange(e)}" title="${JSON.stringify(property.mapping)}">`
        : ''
      }

      ${
        property.isHiRes
        ? html`<input type="number" @change="${e => this.handleInputChange(e)}" title="${property.min} to ${property.max}" min="${property.min}" max="${property.max}">`
        : ''
      }

    </div>
    `
  }
}

customElements.define('dmx-fixture-property', DmxFixtureProperty)
