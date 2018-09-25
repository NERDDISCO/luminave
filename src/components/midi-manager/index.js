import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import { uuidV1 } from '../../../libs/uuid/uuid.js'
import { addMidi, removeMidi, enableMidi } from '../../actions/index.js'
import { getMidiControllers, getLive } from '../../selectors/index.js'
import '../midi-controller/index.js'

/*
 * Handle DMX fixtures
 */
class MidiManager extends connect(store)(LitElement) {

  constructor() {
    super()

    // Web MIDI is disabled
    store.dispatch(enableMidi(false))

    // Enable Web MIDI
    WebMidi.enable(err => {

      if (err) {
        console.error('Web MIDI API could not be enabled:', err)
      } else {
        // MIDI input / output ports (from a single device) are connected to the computer
        WebMidi.addListener('connected', e => {
          const { manufacturer, name, id, type } = e.port
          console.log('MIDIController added:', 'Manufacturer:', manufacturer, '| Name:', name, '| ID:', id, '| Type:', type)
        })

        WebMidi.addListener('disconnected', e => {
          const { manufacturer, name, type, id } = e.port
          console.log('MIDIController removed:', 'Manufacturer:', manufacturer, '| Name:', name, '| ID:', id, '| Type:', type)
        })

        // Web MIDI is enabled
        store.dispatch(enableMidi(true))
      }

    })
  }

  static get properties() {
    return {
      controllers: { type: Array },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.live = getLive(state)
    this.controllers = getMidiControllers(state)
  }

  removeMidi(e) {
    const { controllerId } = e.target
    store.dispatch(removeMidi(controllerId))
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)

    const name = data.get('name')
    const input = data.get('input')
    const output = data.get('output')
    const width = parseInt(data.get('width'), 10)
    const height = parseInt(data.get('height'), 10)

    store.dispatch(addMidi({
      id: uuidV1(),
      name,
      input,
      output,
      width,
      height,
      mapping: []
    }))
  }

  render() {
    const { controllers, live } = this

    return html`
      <style>
        .grid {
          display: flex;
          flex-direction: column;
        }

        .fixture {
          border: 1px solid var(--color-lighter);
          margin: 0 0 .25em 0;
        }

        h3 {
          margin-bottom: 0em;
          margin-top: 1em;
          border-top: 2px solid var(--background-darker);
        }
      </style>

      ${
        live 
        ? ''
        : html`
          <form @submit="${e => this.handleSubmit(e)}">
            <label for="name">Name</label>
            <input name="name" type="text" required />

            <label for="input">Input</label>
            <input name="input" type="text" required />

            <label for="output">Output</label>
            <input name="output" type="text" required />

            <label for="width">Width</label>
            <input name="width" type="number" min="1" max="255" required />

            <label for="height">Height</label>
            <input name="height" type="number" min="1" max="255" required />

            <button type="submit">Add controller</button>
          </form>
        `
      }

      <div class="grid">

        ${repeat(controllers, controller => html`

          <div>
            <midi-controller
              id="${controller.id}"
              name="${controller.name}"
              .mapping="${controller.mapping}"
              inputname="${controller.input}"
              outputname="${controller.output}"
              width="${controller.width}"
              height="${controller.height}">
            </midi-controller>

            ${
              live 
              ? ''
              : html`<button @click="${e => this.removeMidi(e)}" .controllerId="${controller.id}">Remove</button>`
            }
                
          </div>
        
        `)}

      </div>
    `
  }
}

customElements.define('midi-manager', MidiManager)
