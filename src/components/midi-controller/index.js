import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import '../midi-grid/index.js'
import { learnMidi, addMidiMapping, addSceneToTimeline } from '../../actions/index.js'

/*
 * Handle MIDI controller
 */
class MidiController extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.connected = false

    this.input = null
    this.output = null
  }

  ready() {
    super.ready()

    // Initialize mapping
    if (Object.keys(this.mapping).length === 0) {
      const elements = this.width * this.height

      for (let i = 0; i < elements; i++) {
        this.dispatch(addMidiMapping(this.index, i, {
          scenes: []
        }))
      }
    }
  }

  static get properties() {
    return {
      name: String,
      id: String,
      index: Number,
      inputname: String,
      outputname: String,
      width: Number,
      height: Number,
      connected: Boolean,
      mapping: Object,
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
    const [, note, velocity] = data

    if (this.midiManager.learning !== -1) {

      const mapping = { note }
      this.dispatch(addMidiMapping(this.index, this.midiManager.learning, mapping))

      // Disable learning
      this.dispatch(learnMidi(-1))
    }

    // Iterate over all mappings
    Object.values(this.mapping)
      .filter(element => element.note === note)
      .map(element => {

        element.scenes.map(sceneId => {
          this.dispatch(addSceneToTimeline(sceneId))
        })

      })

  }

  static get template() {
    return `
      <div>
        <h3>[[name]] ([[connected]])</h3>

        <ul>
          <li>input: [[inputname]]</li>
          <li>output: [[outputname]]</li>
        </ul>

        <midi-grid
          width="[[width]]"
          height="[[height]]"
          mapping="[[mapping]]"
          controllerindex="[[index]]"></midi-grid>

      </div>
    `
  }
}

customElements.define('midi-controller', MidiController)
