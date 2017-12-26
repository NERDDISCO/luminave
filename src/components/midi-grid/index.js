import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { learnMidi, addSceneToMidi } from '../../actions/index.js'
import '../midi-scenes/index.js'

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
      }
    }
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
  computeItemVars(index, learnIndex) {
    const isLearning = index === learnIndex
    const vars = {
      '--isLearning': isLearning ? 0 : 1
    }

    return Object.keys(vars).map(key => [key, vars[key]].join(':')).join(';')
  }

  handleLearn(e) {
    const { dataset } = e.target
    const mappingIndex = parseInt(dataset.index, 10)
    this.dispatch(learnMidi(mappingIndex))
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

  _toJson(object) {
    return JSON.stringify(object)
  }

  handleSceneSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    const { dataset } = e.target
    const index = parseInt(dataset.index, 10)

    this.dispatch(addSceneToMidi(this.controllerindex, index, this.sceneId))
  }

  handleSelectedScene(e) {
    this.sceneId = e.target.selectedOptions[0].value
  }


  static get template() {
    return `
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          --on: calc(255 * var(--isLearning));

          background: rgb(255, var(--on), var(--on));
        }
      </style>

      <div class="container" style="{{computeGridVars(width)}}">

        <template is="dom-repeat" items={{_toArray(mapping)}} as="element">
          <div class="item" style="{{computeItemVars(index, learnIndex)}}">
            [[_toLabel(index)]]
            <br>
            Note: [[element.note]]
            <button on-click="handleLearn" data-index$="[[index]]">Learn</button>


            <form on-submit="handleSceneSubmit" data-index$="[[index]]">
              <select name="type" on-change="handleSelectedScene" required>
                <option value=""></option>

                <template is="dom-repeat" items="{{sceneManager}}" as="scene">
                  <option value="[[scene.id]]">[[scene.name]]</option>
                </template>
              </select>

              <button type="submit">Add scene</button>
            </form>

            <midi-scenes scenes$="{{element.scenes}}"></midi-scenes>

          </div>
        </template>

      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
