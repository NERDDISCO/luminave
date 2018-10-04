import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { store } from '../../reduxStore.js'
import { setChannels, setFixture, setFixtureProperties, addKeyframes } from '../../actions/index.js'
import { getAnimations } from '../../selectors/index.js'
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../dmx-fixture-property/index.js'
import * as Fixtures from '../../utils/dmx-fixtures.js'
import { batch } from '../../utils/index.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import '../animation-list/index.js'

import '/node_modules/@polymer/iron-icons/iron-icons.js'
import '/node_modules/@polymer/iron-icons/maps-icons.js'

/*
 * A single DMX fixture with all properties
 */
class DmxFixture extends connect(store)(LitElement) {

  static get properties() {
    return {
      name: { type: String },
      id: { type: String },
      type: { type: String },
      address: { type: Number },
      universe: { type: Number },
      properties: { type: Object },
      _fixture: { type: Object },
      _properties: { type: Object },
      animationManager: { type: Array },
      _animations: { type: Array }
    }
  }

  _stateChanged(state) {
    this.animationManager = getAnimations(state)
  }

  handleSubmit(e) {
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)
    const address = parseInt(data.get('address'), 10)
    const name = data.get('name')

    store.dispatch(setFixture(this.id, { 
      name, 
      address 
    }))
  }

  /*
   * A property gets changed on the fixture using the UI
   */
  handleChange(e) {
    const { name, value } = e.detail
    // Set the property of the fixture which will also set the values on the corresponding channels
    this._fixture[name] = value

    // Send all values of all channels to universe 0
    store.dispatch(setChannels(0, [...batch]))

    // Save the changed property into state
    store.dispatch(setFixtureProperties(this.id, { [name]: value }))

    const now = new Date()

    // Send the universe to the UsbDmxManager
    window.dispatchEvent(new CustomEvent('send-universe-to-usb-dmx-controller', { detail: { now } }))

    // Send the universe to the FivetwelveManager
    window.dispatchEvent(new CustomEvent('send-universe-to-fivetwelve', { detail: { now } }))
  }

  handleCreateKeyframe(e) {
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)
    const step = data.get('step')

    const [animationId] = this._animations

    store.dispatch(addKeyframes(animationId, step, this.properties))
  }

  /*
   * Add an animation to a scene, which will be used in handleSubmitSceneAnimationFixtures
   */
  handleAddAnimation(e) {
    const { event, animationId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    this._animations = [animationId]
  }

  handleRemoveAnimation(e) {
    const { animationId } = e.detail
    this._animations = this._animations.filter(_animationId => _animationId !== animationId)
  }

  render() {
    // Initialize the fixture based on the type
    this._fixture = new Fixtures[this.type]({
      address: this.address,
      universe: this.universe
    })

    // Get the properties of the fixture
    this._properties = this._fixture.getParamsList()

    const { properties, type, address, name, _fixture, _properties, _animations, animationManager } = this

    return html`
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

          <div class="grid">
            <div>

              <form id="fixtureMetaProperties" @submit="${e => this.handleSubmit(e)}">
                <div>
                  <label for="name">Name</label>
                  <input id="name" name="name" type="text" .value="${name}"/>
                </div>
              
                <div>
                  <label for="address">Address</label>
                  <input id="address" name="address" type="number" min="0" max="512" .value="${address}"/>
                </div>

                <button type="submit">Update</button>
              </form>

              <iron-icon icon="info-outline" id="info"></iron-icon>
              Type: ${type}
              <br />
              Weight: ${_fixture.weight} kg
              <br />
              Channels: ${_fixture.channels}


              <form id="createKeyframe" @submit="${e => this.handleCreateKeyframe(e)}">
                <animation-list
                  name="animation"
                  @add-animation="${e => this.handleAddAnimation(e)}"
                  @remove-animation="${e => this.handleRemoveAnimation(e)}"
                  .animations="${_animations}"
                  .animationManager="${animationManager}">
                </animation-list>

                <div>
                  <label for="step">Step</label>
                  <input id="step" name="step" type="number" min="0" max="1" value="0" />
                </div>

                <button type="submit">Create Keyframe</button>
              </form>
            </div>
          </div>

          <div class="grid">

            ${repeat(_properties, property => html`
              <dmx-fixture-property
                @change="${e => this.handleChange(e)}"

                .property="${property}"
                .value="${properties[property.name]}"
                name="${property.name}"
                type="${property.type}"
                channels="${property.channels}"

                class="property">
              </dmx-fixture-property>
            `)}

          </div>

    `
  }
}

customElements.define('dmx-fixture', DmxFixture)
