import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import WebMidi from 'webmidi'
import '../midi-grid/midi-grid.js'
import { learnMidi, setMidi, addMidiMapping, addSceneToTimeline, removeSceneFromTimelineAndResetFixtures, setMidiMappingActive } from '../../actions/index.js'
import { getMidiLearning, getMidiEnabled, getLive } from '../../selectors/index.js'
import { SCENE_TYPE_STATIC } from '../../constants/timeline.js'
import { MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY, MIDI_TYPE_BUTTON, MIDI_TYPE_ROUND_BUTTON } from '../../constants/index.js'
import uuidv1 from 'uuid/v1.js'


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
      inputname: { type: String },
      outputname: { type: String },
      width: { type: Number },
      height: { type: Number },
      ccasnoteon: { type: Boolean },
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
        store.dispatch(addMidiMapping(this.id, i, {
          scenes: [],
          note: -1,
          label: '',
          type: '',
          active: false,
          value: 0,
          isEditing: false
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

        // Light up the buttons when the controller gets added based on what is saved in the mapping
        if (this.input !== null && this.output !== null) {
          // Do this once output and input are defined
          const len = this.mapping.length
          for (let i = 0; i < len; i++) {
            if (this.mapping[i].active && this.mapping[i].type !== MIDI_TYPE_EMPTY) {
              // Button light: on
              // The last value is the velocity and defines the color (if available)
              this.output.send(144, [this.mapping[i].note, 122])
            }
          }
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
      store.dispatch(addMidiMapping(this.id, this.midiLearning, mapping))

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
        store.dispatch(setMidiMappingActive(this.id, mappingIndex, elementState))
        if (elementState) {

          // Add all scenes to the timeline
          element.scenes.map(sceneId => {
            const scene = {
              sceneId,
              timelineSceneId: uuidv1(),
              adapt: true,
              type: SCENE_TYPE_STATIC,
              added: new Date().getTime(),
              started: undefined,
              priority: 0
            }

            store.dispatch(addSceneToTimeline(scene))
          })

          // Button light: on
          // The last value is the velocity and defines the color (if available)
          this.output.send(144, [note, 122])
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
    const { ccasnoteon } = this
    const { data } = event
    const [channel , note, velocity] = data

    // Trigger NoteOn instead of CC
    if (ccasnoteon && velocity > 0) {
      this.noteon(event)

      return
    }

    // Learning is active
    if (this.midiLearning > -1) {

      const mapping = { note }
      store.dispatch(addMidiMapping(this.id, this.midiLearning, mapping))

      // Disable learning
      store.dispatch(learnMidi(-1))

    // Handle mappped input
    } else {
      const mappingIndex = this.mapping.findIndex(element => element.note === note)

      // Found a mapping
      if (mappingIndex > -1) {
        const value = velocity
        const mapping = { value }
        store.dispatch(addMidiMapping(this.id, mappingIndex, mapping))
      }
    }
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
    const ccasnoteon = data.has('ccasnoteon')
    const controllerId = this.id

    store.dispatch(setMidi(controllerId, {
      name,
      input,
      output,
      width,
      height,
      ccasnoteon
    }))
  }  

  render() {

    const { live, name, connected, inputname, outputname, width, height, ccasnoteon, mapping, id } = this

    return html`
      <div>
        <h3>${name} (${connected})</h3>

        ${
          live
          ? ''
          : html`
            <form @submit="${e => this.handleSubmit(e)}">
              <label for="name">Name</label>
              <input name="name" type="text" value="${name}" required />

              <label for="input">Input</label>
              <input name="input" type="text" value="${inputname}" required />

              <label for="output">Output</label>
              <input name="output" type="text" value="${outputname}" required />

              <label for="width">Width</label>
              <input name="width" type="number" min="1" max="255" value="${width}" required />

              <label for="height">Height</label>
              <input name="height" type="number" min="1" max="255" value="${height}" required />

              <label for="ccasnoteon">CC as NoteOn</label>
              <input name="ccasnoteon" type="checkbox" ?checked=${ccasnoteon} />

              <button type="submit">Update</button>
            </form>
          `
        }

        <midi-grid
          width="${width}"
          height="${height}"
          .mapping="${mapping}"
          .controllerId="${id}"></midi-grid>

      </div>
    `
  }
}

customElements.define('midi-controller', MidiController)
