import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuid } from '../../../libs/abcq/uuid.js'
import { setChannel, addFixture, removeFixture } from '../../actions/index.js'
import DmxDevice from './DmxDevice.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../dmx-fixture-property/index.js'


/*
 *
 */
class DmxFixture extends ReduxMixin(PolymerElement) {

  ready() {
    super.ready()

    // Dynamically import fixture of a specific type
    import('./dmx/' + this.type + '.js').then((module) => {

      // Create fixture
      const fixture = new module.default({
        address: this.address,
        universe: this.universe
      })

      this.fixture = fixture
      this.properties = fixture.getParamsList()
      this.offset = this.address - 1
   });
  }

  static get properties() {
    return {
      name: { type: String },
      id: { type: String },
      type: { type: String },
      address: { type: Number },
      universe: { type: Number },
      fixtures: {
        type: Array,
        statePath: 'fixtureManager'
      }
    }
  }

  handleChange(e) {
    const { name, value } = e.detail
    this.fixture[name] = value
  }

  static get template() {
    return `
    <style>
      .grid {
        display: flex;
        flex-direction: row;
        width: 100vw;
      }

      .property {
        margin: 0 .25em;
      }
    </style>

        <div>
          <div class="grid">
            <div class="property" title="[[id]]">Name: [[name]]</div>
            <div class="property">Type: [[type]]</div>
            <div class="property">Weight: [[fixture.weight]] kg</div>
            <div class="property">Channels: [[fixture.channels]]</div>
            <div class="property">Address: [[address]] </div>
            <div class="property">Universe: [[universe]]</div>
          </div>

          <div class="grid">
            <template is="dom-repeat" items="{{properties}}" as="property">
              <dmx-fixture-property
                on-change="handleChange"

                property="[[property]]"
                name="[[property.name]]"
                type="[[property.type]]"
                channels="[[property.channels]]"

                class="property"
              >
              </dmx-fixture-property>
            </template>
          </div>

        </div>
    `
  }
}

customElements.define('dmx-fixture', DmxFixture)
