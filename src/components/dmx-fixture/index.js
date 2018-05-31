import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { setChannels, setFixtureAddress } from '../../actions/index.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../dmx-fixture-property/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'
import { batch } from '../../utils/index.js'

/*
 * A single DMX fixture with all properties
 */
class DmxFixture extends ReduxMixin(PolymerElement) {

  static get properties() {
    return {
      name: { type: String },
      id: { type: String },
      type: { type: String },
      address: { type: Number },
      universe: { type: Number },
      fixture: { type: Object },
      properties: Object,
      _properties: {
        type: Object,
        computed: 'computeProperties(fixture)'
      }
    }
  }

  ready() {
    super.ready()

    this.fixture = new Fixtures[this.type]({
      address: this.address,
      universe: this.universe
    })
  }

  handleSubmit(e) {
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)
    const address = parseInt(data.get('address'), 10)

    this.dispatch(setFixtureAddress(this.id, address))
  }

  // @TODO: I thought this might fix https://github.com/NERDDISCO/luminave/issues/11, but it doesn't
  computeProperties(fixture) {
    return fixture.getParamsList()
  }

  /*
   * A property gets changed on the fixture using the UI
   */
  handleChange(e) {
    const { name, value } = e.detail
    // Set the property of the fixture which will also set the values on the corresponding channels
    this.fixture[name] = value

    // Send all values of all channels to universe 0
    this.dispatch(setChannels(0, [...batch]))

    const now = new Date()

    // Send the universe to the UsbDmxManager
    window.dispatchEvent(new CustomEvent('send-universe-to-usb-dmx-controller', { detail: { now } }))

    // Send the universe to the FivetwelveManager
    window.dispatchEvent(new CustomEvent('send-universe-to-fivetwelve', { detail: { now } }))
  }

  static get template() {
    return `
        <style>
          .grid {
            display: flex;
            flex-direction: row;
            overflow: scroll;
          }

          .property {
            margin: 0 .25em;
          }
        </style>

        <div>
          <div class="grid">
            <form id="fixtureMetaProperties" on-submit="handleSubmit">
              <div class="property">[[type]]</div>
              <div class="property">[[fixture.weight]] kg</div>
              <div class="property">Channels: [[fixture.channels]]</div>
              <div class="property">Address: <input name="address" type="number" min="0" max="512" value="[[address]]"/></div>
              <button type="submit">Update</button>
            </form>
          </div>

          <div class="grid">
            <template is="dom-repeat" items="{{_properties}}" as="property">
              <dmx-fixture-property
                on-change="handleChange"

                property="[[property]]"
                name="[[property.name]]"
                type="[[property.type]]"
                channels="[[property.channels]]"

                class="property"></dmx-fixture-property>
            </template>
          </div>

        </div>
    `
  }
}

customElements.define('dmx-fixture', DmxFixture)
