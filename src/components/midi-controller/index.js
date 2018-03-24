import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import '../midi-grid/index.js'
import { learnMidi, addMidiMapping, addSceneToTimeline, removeSceneFromTimelineAndResetFixtures, setMidiMappingActive } from '../../actions/index.js'

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
          scenes: [],
          active: false
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
      midiLearning: {
        type: Number,
        statePath: 'midiManager.learning'
      },
      midiEnabled: {
        type: Boolean,
        statePath: 'midiManager.enabled',
        observer: 'midiEnabledChanged'
      },
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      }
    }
  }

  computeEditMode(live) {
    return !live
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

        } else if (name === this.outputname && type === 'output') {
          this.output = port
        }

        this.connected = true
      })

      // MIDI input / output ports (from a single device) are disconnected to the computer
      WebMidi.addListener('disconnected', e => {
        const { name, type } = e.port

        if (name === this.inputname && type === 'input') {
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
    const [, note, velocity] = data

    // Learning is active
    if (this.midiLearning > -1) {

      const mapping = { note }
      this.dispatch(addMidiMapping(this.index, this.midiLearning, mapping))

      // Disable learning
      this.dispatch(learnMidi(-1))

    // Handle mappped input
    } else {

      // @TODO: This is complete bullshit!
      // Please use a filter or an array or something, but DONT iterate over the mapping EVERY FUCKING TIME OMG
      // THIS IS ONLY BECAUSE THE MAPPING IS AN OBJECT :/

      // I have to do this because I need the mappingIndex AND this.mapping is an object.
      // So please think of something that is easier to read
      for (const mappingIndex in this.mapping) {
        const element = this.mapping[mappingIndex]

        if (element.note === note) {
          element.active = !element.active

          // Set active state of element
          this.dispatch(setMidiMappingActive(this.index, mappingIndex, element.active))

          if (element.active) {
            // Add all scenes to the timeline
            element.scenes.map(sceneId => {
              this.dispatch(addSceneToTimeline(sceneId))
            })
          } else {
            // Remove all scenes from the timeline
            element.scenes.map(sceneId => {
              this.dispatch(removeSceneFromTimelineAndResetFixtures(sceneId))
            })
          }

          break
        }
      }

    }
  }

  static get template() {
    return `
      <div>
        <h3>[[name]] ([[connected]])</h3>

        <template is="dom-if" if="[[editMode]]">
          <ul>
            <li>input: [[inputname]]</li>
            <li>output: [[outputname]]</li>
          </ul>
        </template>

        <midi-grid
          width="[[width]]"
          height="[[height]]"
          mapping$="[[mapping]]"
          controllerindex="[[index]]"></midi-grid>

      </div>
    `
  }
}

customElements.define('midi-controller', MidiController)
