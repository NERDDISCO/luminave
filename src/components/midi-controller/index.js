import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import '../midi-grid/index.js'
import { learnMidi, addMidiMapping, addSceneToTimeline, removeSceneFromTimelineAndResetFixtures, setMidiMappingActive } from '../../actions/index.js'
import { getMidiLearning, getMidiEnabled, getLive, getMidiControllers } from '../../selectors/index.js'


/*
 * Handle MIDI controller
 */
class MidiController extends connect(store)(LitElement) {

  constructor() {
    super()

    this.connected = false

    this.input = null
    this.output = null
  }

  static get properties() {
    return {
      name: { type: String },
      id: { type: String },
      index: { type: Number },
      inputname: { type: String },
      outputname: { type: String },
      width: { type: Number },
      height: { type: Number },
      connected: { type: Boolean },
      mapping: { 
        type: Array,
        hasChanged: (newValue, oldValue) => !Object.is(newValue, oldValue)
      },
      midiLearning: { type: Number },
      midiEnabled: { type: Boolean },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.midiLearning = getMidiLearning(state)
    this.live = getLive(state)

    if (this.midiEnabled !== getMidiEnabled(state)) {
      this.midiEnabled = getMidiEnabled(state)
      this.midiEnabledChanged()
    }
  }

  firstUpdated() {
    // Initialize mapping
    if (this.mapping.length === 0) {
      const elements = this.width * this.height

      for (let i = 0; i < elements; i++) {
        store.dispatch(addMidiMapping(this.index, i, {
          scenes: [],
          note: -1,
          label: '',
          type: '',
          active: false,
          value: 0
        }))
      }
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    if (this.input !== null) {
      this.input.removeListener()
      this.input = null
      this.output = null
      this.connected = false
    }
  }

  midiEnabledChanged() {
    if (this.midiEnabled) {
      // MIDI input / output ports (from a single device) are connected to the computer
      WebMidi.addListener('connected', e => {

        const { port } = e
        const { name, type } = port

        // The connected event is triggered twice for input, that's why we need to check
        // if this.input is already defined or not, @see https://github.com/NERDDISCO/luminave/issues/14
        if (name === this.inputname && type === 'input' && this.input === null) {
          this.input = port

          // Listen to "noteon" events
          this.input.addListener('noteon', 'all', this.noteon.bind(this))

          // Listen to "controlchange" events
          this.input.addListener('controlchange', 'all', this.controlchange.bind(this))

          // Controller is connected
          this.connected = true

        } else if (name === this.outputname && type === 'output') {
          this.output = port
        }
      })

      // MIDI input / output ports (from a single device) are disconnected to the computer
      WebMidi.addListener('disconnected', e => {
        const { name, type } = e.port

        if (name === this.inputname && type === 'input') {
          // Remove all listener
          this.input.removeListener()

          this.input = null
        } else if (name === this.outputname && type === 'output') {
          this.output = null
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
    const [ channel, note, velocity ] = data

    // Learning is active
    if (this.midiLearning > -1) {

      const mapping = { note }
      store.dispatch(addMidiMapping(this.index, this.midiLearning, mapping))

      // Disable learning
      store.dispatch(learnMidi(-1))

    // Handle mappped input
    } else {

      const mappingIndex = this.mapping.findIndex(element => element.note === note)

      // Found a mapping
      if (mappingIndex > -1) {

        // Get the element
        const element = this.mapping[mappingIndex]

        // Change the active status of the element (pressed vs not pressed)
        const elementState = !element.active

        // Set active state of element
        store.dispatch(setMidiMappingActive(this.index, mappingIndex, elementState))

        if (elementState) {
          // Add all scenes to the timeline
          element.scenes.map(sceneId => store.dispatch(addSceneToTimeline(sceneId)))

          // Button light: on
          this.output.send(144, [note, 127])
        } else {
          // Remove all scenes from the timeline
          element.scenes.map(sceneId => store.dispatch(removeSceneFromTimelineAndResetFixtures(sceneId)))

          // Button light: off
          this.output.send(144, [note, 0])
        }
      }

    }
  }

  controlchange(event) {
    const { data } = event
    const [, note, velocity] = data

    // Learning is active
    if (this.midiLearning > -1) {

      const mapping = { note }
      store.dispatch(addMidiMapping(this.index, this.midiLearning, mapping))

      // Disable learning
      store.dispatch(learnMidi(-1))

    // Handle mappped input
    } else {
      const mappingIndex = this.mapping.findIndex(element => element.note === note)

      // Found a mapping
      if (mappingIndex > -1) {
        const value = velocity
        const mapping = { value }
        store.dispatch(addMidiMapping(this.index, mappingIndex, mapping))
      }
    }
  }

  render() {

    const { live, name, connected, inputname, outputname, width, height, mapping, index } = this

    return html`
      <div>
        <h3>${name} (${connected})</h3>

        ${
          live 
          ? ''
          : html`
            <ul>
              <li>input: ${inputname}</li>
              <li>output: ${outputname}</li>
            </ul>
          `
        }

        <midi-grid
          width="${width}"
          height="${height}"
          .mapping="${mapping}"
          controllerindex="${index}"></midi-grid>

      </div>
    `
  }
}

customElements.define('midi-controller', MidiController)
