import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addMidi, removeMidi, enableMidi } from '../../actions/index.js'
import '../midi-controller/index.js'

/*
 * Handle DMX fixtures
 */
class MidiManager extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    // Web MIDI is disabled
    this.dispatch(enableMidi(false))

    // Enable Web MIDI
    WebMidi.enable(err => {

      if (err) {
        console.error('Web MIDI API could not be enabled:', err)
      } else {
        // MIDI input / output ports (from a single device) are connected to the computer
        WebMidi.addListener('connected', e => {
          const { manufacturer, name, id } = e
          console.log('MIDIController added:', 'Manufacturer:', manufacturer, '| Name:', name, '| ID:', id)
        })

        // Web MIDI is enabled
        this.dispatch(enableMidi(true))
      }

    })
  }

  static get properties() {
    return {
      controllers: {
        type: Array,
        statePath: 'midiManager.controllers'
      }
    }
  }

  removeMidi(e) {
    const { dataset } = e.target
    this.dispatch(removeMidi(parseInt(dataset.index, 10)))
  }

  handleController(e) {
    console.log('handleController', e)
  }

  handleName(e) {
    this.name = e.target.value
  }

  handleInput(e) {
    this.input = e.target.value
  }

  handleOutput(e) {
    this.output = e.target.value
  }

  handleWidth(e) {
    this.width = e.target.value
  }

  handleHeight(e) {
    this.height = e.target.value
  }

  handleSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    this.dispatch(addMidi({
      id: uuidV1(),
      name: this.name,
      input: this.input,
      output: this.output,
      width: this.width,
      height: this.height,
      mapping: {}
    }))
  }

  static get template() {
    return `
    <style>
      .grid {
        width: 100vw;
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

    <h2>MIDI controllers</h2>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="input">Input</label>
        <input name="input" type="text" on-change="handleInput" required></input>

        <label for="output">Output</label>
        <input name="output" type="text" on-change="handleOutput" required></input>

        <label for="width">Width</label>
        <input name="width" type="number" min="1" max="255" on-change="handleWidth" required></input>

        <label for="height">Height</label>
        <input name="height" type="number" min="1" max="255" on-change="handleHeight" required></input>

        <button type="submit">Add controller</button>
      </form>

      <div class="grid">

        <template is="dom-repeat" items="{{controllers}}" as="controller">
          <div>
            <midi-controller
              id="[[controller.id]]"
              index="[[index]]"
              name="[[controller.name]]"
              mapping="[[controller.mapping]]"
              inputname="[[controller.input]]"
              outputname="[[controller.output]]"
              width="[[controller.width]]"
              height="[[controller.height]]"></midi-controller>

            <button on-click="removeMidi" data-index$="[[index]]">Remove</button>
          </div>
        </template>

      </div>
    `
  }
}

customElements.define('midi-manager', MidiManager)
