import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import reduxMixin from '../../reduxStore.js'
import '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { DomIf } from '/node_modules/@polymer/polymer/lib/elements/dom-if.js'
import { learnMidi, addScenesToMidi, removeSceneFromMidi, addMidiMapping } from '../../actions/index.js'
import '../scene-list/index.js'
import { MIDI_TYPES, MIDI_TYPE_BUTTON, MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY } from '../../constants/index.js'

/*
 * Show MIDI buttons in a grid
 */
class MidiGrid extends reduxMixin(PolymerElement) {

  constructor() {
    super()

    this.types = MIDI_TYPES
    this.types.sort()
  }

  static get properties() {
    return {
      width: Number,
      height: Number,
      mapping: Array,
      controllerindex: Number,
      learnIndex: {
        type: Number,
        statePath: 'midiManager.learning'
      },
      sceneManager: {
        type: Array,
        statePath: 'sceneManager'
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

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeGridVars(width) {
    const vars = { '--width': width }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  /*
   * Change CSS properties based on properties of the component that can be
   * changed during runtime
   */
  computeItemVars(element, index, learnIndex) {
    const isLearning = index === learnIndex
    const vars = {
      '--isLearning': isLearning ? 0 : 1,
      '--isActive': element.active ? 0 : 1
    }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  handleLearn(e) {
    const { dataset } = e.target
    const mappingIndex = parseInt(dataset.index, 10)
    this.dispatch(learnMidi(mappingIndex))
  }

  handleAddScenes(e) {
    const { event, sceneIds } = e.detail
    const { dataset } = e.target

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    this.dispatch(addScenesToMidi(this.controllerindex, parseInt(dataset.index, 10), sceneIds))
  }

  handleRemoveScene(e) {
    const { sceneIndex } = e.detail
    const { dataset } = e.target
    const mappingIndex = parseInt(dataset.index, 10)

    this.dispatch(removeSceneFromMidi(this.controllerindex, mappingIndex, sceneIndex))
  }

  handleLabelChange(e) {
    const label = e.target.value
    const { dataset } = e.target
    const mappingIndex = parseInt(dataset.index, 10)

    const mapping = { label }
    this.dispatch(addMidiMapping(this.controllerindex, mappingIndex, mapping))
  }

  handleType(e) {
    e.preventDefault()

    const data = new FormData(e.target)
    const type = data.get('type')
    const mappingIndex = parseInt(data.get('mappingIndex'), 10)

    const mapping = { type }
    this.dispatch(addMidiMapping(this.controllerindex, mappingIndex, mapping))
  }

  selectedType(elementType, type) {
    return elementType === type ? 'selected' : ''
  }

  showValueForType(type) {
    if (type === MIDI_TYPE_KNOB || type === MIDI_TYPE_FADER) {
      return true
    } else {
      return false
    }
  }

  isNotEmpty(type) {
    return type !== MIDI_TYPE_EMPTY
  }

  static get template() {
    return html`
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          --on: calc(255 * var(--isActive));
          background: rgb( var(--on), 255, var(--on));
          border: 1px solid rgba(0, 0, 0, 0.25);
          margin: 0.05em;
          min-height: 1.5em;
          color: #000;
          text-align: center;
          overflow: hidden;
        }

        .item .learn {
          --on: calc(255 * var(--isLearning));
          background: rgb(255, var(--on), var(--on));
        }
      </style>

      <div class="container" style="{{computeGridVars(width)}}">

        <template is="dom-repeat" items={{mapping}} as="element">
          <div class="item" style="{{computeItemVars(element, index, learnIndex)}}">

            <template is="dom-if" if="[[live]]">
              [[element.label]]
            </template>

<!--
            <template is="dom-if" if="[[showValueForType(element.type)]]">
              [[element.value]]
            </template>
-->

            <template is="dom-if" if="[[editMode]]">
              <template is="dom-if" if="[[isNotEmpty(element.type)]]">
                <input class="name" name="label" type="text" on-change="handleLabelChange" value="[[element.label]]" data-index$="[[index]]"></input>
                <br>
              </template>

              <form on-submit="handleType">
                <input name="mappingIndex" type="hidden" value="[[index]]"></input>
                <select name="type" required>
                  <option value=""></option>
                  <template is="dom-repeat" items="{{types}}" as="type">
                    <option value="[[type]]" selected="[[selectedType(element.type, type)]]">[[type]]</option>
                  </template>
                </select>
                <button type="submit">Change</button>
              </form>

              <template is="dom-if" if="[[isNotEmpty(element.type)]]">
                <br>
                Note: [[element.note]]
                <button class="learn" on-click="handleLearn" data-index$="[[index]]">Learn</button>
              </template
            </template>

            <template is="dom-if" if="[[isNotEmpty(element.type)]]">
              <scene-list
                on-add-scenes="handleAddScenes"
                on-remove-scene="handleRemoveScene"
                data-index$="[[index]]"
                scenes$="{{element.scenes}}"
                scene-manager="[[sceneManager]]"></scene-list>
            </template>

          </div>
        </template>

      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
