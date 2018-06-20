import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { DomIf } from '/node_modules/@polymer/polymer/lib/elements/dom-if.js'


/*
 *
 */
class DmxFixtureProperty extends PolymerElement {

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

  static get template() {
    return html`
    <div>
      <label title="[[channels]]">[[name]]</label>:

      <template is="dom-if" if="[[property.isRgb]]">
        <input type="color" on-change="handleColorChange">
      </template>

      <template is="dom-if" if="[[property.isRange]]">
        <input type="number" value="0" min="0" max="255" on-change="handleInputChange">
      </template>

      <template is="dom-if" if="[[property.isMapped]]">
        <select on-change="handleSelectChange">
          <template is="dom-repeat" items="{{property.mapping}}" as="mapping">
            <option value="[[mapping]]">[[mapping]]</option>
          </template>
        </select>
      </template>

      <template is="dom-if" if="[[property.isMultiRange]]">
        <input type="text" on-change="handleInputChange" title="[[property.mapping]]">
      </template>

      <template is="dom-if" if="[[property.isHiRes]]">
        <input type="number" on-change="handleInputChange" title="[[property.min]] to [[property.max]]" min="[[property.min]]" max="[[property.max]]">
      </template>
    </div>
    `
  }
}

customElements.define('dmx-fixture-property', DmxFixtureProperty)
