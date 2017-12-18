import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { DomIf } from '/node_modules/@polymer/polymer/lib/elements/dom-if.js'


/*
 *
 */
class DmxFixtureProperty extends ReduxMixin(PolymerElement) {

  static get properties() {
    return {
      name: { type: String },
      type: { type: String },
      channels: { type: Number },
      property: { type: Object }
    }
  }

  handleColorChange(e) {
    let { value } = e.target

    // #XXXXXX -> ["XX", "XX", "XX"]
    value = value.match(/[A-Za-z0-9]{2}/g)

    // ["XX", "XX", "XX"] -> [n, n, n]
    value = value.map(v => {
      return parseInt(v, 16)
    })

    this.dispatchEvent(new CustomEvent('change', {
      detail: {
        value,
        name: this.name
      }
    }))
  }

  handleInputChange(e) {
    const { value } = e.target

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
    return `
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
        <input type="number" on-change="handleInputChange" title="[[property.mapping]]" min="[[property.min]]" max="[[property.max]]">
      </template>
    </div>
    `
  }
}

customElements.define('dmx-fixture-property', DmxFixtureProperty)
