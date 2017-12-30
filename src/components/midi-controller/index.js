import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import WebMidi from '../../../libs/webmidi/index.js'
import '../midi-grid/index.js'
import { learnMidi, addMidiMapping, addSceneToTimeline, removeSceneFromTimeline, setMidiMappingActive } from '../../actions/index.js'

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
      midiManager: {
        type: Object,
        statePath: 'midiManager'
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

    // Learning is active
    if (this.midiManager.learning > -1) {

      const mapping = { note }
      this.dispatch(addMidiMapping(this.index, this.midiManager.learning, mapping))

      // Disable learning
      this.dispatch(learnMidi(-1))

    // Handle mappped input
    } else {

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
              this.dispatch(removeSceneFromTimeline(sceneId))
            })
          }

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
