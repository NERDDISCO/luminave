import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { learnMidi } from '../../actions/index.js'

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

        <template is="dom-repeat" items=[[_toArray(mapping)]] as="element">
          <div class="item" style="{{computeItemVars(index, learnIndex)}}">
            [[_toLabel(index)]]
            <br>
            Note: [[element.note]]
            <button on-click="handleLearn" data-index$="[[index]]">Learn</button>
          </div>
        </template>

      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
