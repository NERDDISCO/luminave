import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'

/*
 * Handle MIDI controller
 */
class MidiController extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.connected = false

    this.input = null
    this.output = null

    this.mapping = {}
  }

  static get properties() {
    return {
      name: String,
      inputname: String,
      outputname: String,
      width: Number,
      height: Number,
      connected: Boolean,
      midiManager: {
        type: Object,
        statePath: 'midiManager'
      },
      midiEnabled: {
        type: Boolean,
        statePath: 'midiManager.enabled',
        observer: 'midiEnabledChanged'
      }
    }
  }

  midiEnabledChanged() {
    if (this.midiEnabled) {

      // MIDI input / output ports (from a single device) are connected to the computer
      WebMidi.addListener('connected', e => {

        const { name, input, output } = e

        if (name === this.inputname) {
          this.input = input

          // Listen to "noteon" events
          this.input.addListener('noteon', 'all', this.noteon.bind(this))

        } else if (name === this.outputname) {
          // @TODO: This might be a problem, because the output is only added
          // after the device was attachted, not when the page is reloaded
          // use WebMidi.getOutputByName(outputname) instead
          this.output = output
        }

        this.connected = true
      })

      // MIDI input / output ports (from a single device) are disconnected to the computer
      WebMidi.addListener('disconnected', e => {
        const { name } = e

        if (name === this.inputname) {
          console.log('removed', 'input')
        } else if (name === this.outputname) {
          console.log('removed', 'output')
        }

        this.connected = false
      })

    }
  }

  /*
   * Handle "noteon" events
   */
  noteon(event) {
    const { data } = event
    const [,
      note,
      velocity] = data

    // Mapping exists for this note
    if (this.mapping[note] === undefined) {
      console.log('Event: noteon |', 'Note:', note)
    } else {
      const eventData = {
        partId: this.mapping[note].partId,
        id: this.id
      }

      // @TODO: Hide behind a flag
      console.log('noteon', eventData)

      window.dispatchEvent(new CustomEvent('MidiController', { detail: eventData }))
    }

  }

  static get template() {
    return `
      <div>
        <h3>[[name]] ([[connected]])</h3>

        <ul>
          <li>input: [[inputname]]</li>
          <li>output: [[outputname]]</li>
          <li>width: [[width]]</li>
          <li>height: [[height]]</li>
        </ul>
      </div>
    `
  }
}

customElements.define('midi-controller', MidiController)
