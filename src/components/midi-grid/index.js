import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { DomIf } from '/node_modules/@polymer/polymer/lib/elements/dom-if.js'
import { learnMidi, addSceneToMidi, removeSceneFromMidi } from '../../actions/index.js'
import '../scene-list/index.js'

/*
 * Show MIDI buttons in a grid
 */
class MidiGrid extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      width: Number,
      height: Number,
      mapping: Object,
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

  handleAddScene(e) {
    const { event, sceneId } = e.detail
    const { dataset } = e.target

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    this.dispatch(addSceneToMidi(this.controllerindex, parseInt(dataset.index, 10), sceneId))
  }

  handleRemoveScene(e) {
    const { sceneIndex } = e.detail
    const { dataset } = e.target
    const mappingIndex = parseInt(dataset.index, 10)

    this.dispatch(removeSceneFromMidi(this.controllerindex, mappingIndex, sceneIndex))
  }

  _toArray(object) {
    const array = []

    for (const mappingIndex in object) {
      array.push(object[mappingIndex])
    }

    return array
  }

  _toLabel(index) {
    return `Button ${index + 1}`
  }

  static get template() {
    return `
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

        <template is="dom-repeat" items={{_toArray(mapping)}} as="element">
          <div class="item" style="{{computeItemVars(element, index, learnIndex)}}">

            <template is="dom-if" if="[[editMode]]">
              [[_toLabel(index)]]
              <br>
              Note: [[element.note]]
              <button class="learn" on-click="handleLearn" data-index$="[[index]]">Learn</button>
            </template>

            <scene-list
              on-add-scene="handleAddScene"
              on-remove-scene="handleRemoveScene"
              data-index$="[[index]]"
              scenes$="{{element.scenes}}"
              scene-manager="[[sceneManager]]"></scene-list>

          </div>
        </template>

      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
