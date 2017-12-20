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
        display: grid;
        grid-template-columns: repeat(3, 1fr);
      }

      .property {
        margin: .5em 0;
      }
    </style>

        <div>
          Name: [[name]] <br>
          Type: [[type]] <br>
          Weight: [[fixture.weight]] kg<br>
          Channels: [[fixture.channels]] <br>
          Universe: [[universe]] <br>
          Address: [[address]] <br><br>

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
