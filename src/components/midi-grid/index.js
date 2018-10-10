import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { repeat } from '/node_modules/lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { learnMidi, addScenesToMidi, removeSceneFromMidi, addMidiMapping } from '../../actions/index.js'
import '../scene-list/index.js'
import { MIDI_TYPES, MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY, MIDI_TYPE_BUTTON } from '../../constants/index.js'
import { getMidiLearning, getScenes, getLive } from '../../selectors/index.js'
import { classMap } from '/node_modules/lit-html/directives/classMap.js'


/*
 * Show MIDI buttons in a grid
 */
class MidiGrid extends connect(store)(LitElement) {

  constructor() {
    super()

    this.types = MIDI_TYPES
    this.types.sort()
  }

  static get properties() {
    return {
      width: { type: Number },
      height: { type: Number },
      mapping: { type: Array },
      controllerId: { type: String },
      learnIndex: { type: Number },
      sceneManager: { type: Array },
      live: { type: Boolean }
    }
  }

  _stateChanged(state) {
    this.learnIndex = getMidiLearning(state)
    this.sceneManager = getScenes(state)
    this.live = getLive(state)
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
    const { mappingIndex } = e.target
    store.dispatch(learnMidi(mappingIndex))
  }

  handleAddScenes(e) {
    const { event, sceneIds } = e.detail
    const { mappingIndex } = e.target

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    store.dispatch(addScenesToMidi(this.controllerId, mappingIndex, sceneIds))
  }

  handleRemoveScene(e) {
    const { sceneId } = e.detail
    const { mappingIndex } = e.target

    store.dispatch(removeSceneFromMidi(this.controllerId, mappingIndex, sceneId))
  }

  handleLabelChange(e) {
    const label = e.target.value
    const { mappingIndex } = e.target

    const mapping = { label }
    store.dispatch(addMidiMapping(this.controllerId, mappingIndex, mapping))
  }

  handleType(e) {
    e.preventDefault()

    const data = new FormData(e.target)
    const type = data.get('type')
    const mappingIndex = parseInt(data.get('mappingIndex'), 10)

    const mapping = { type }
    store.dispatch(addMidiMapping(this.controllerId, mappingIndex, mapping))
  }

  selectedType(elementType, type) {
    return elementType === type 
    ? 'selected' 
    : ''
  }

  showValueForType(type) {
    if (type === MIDI_TYPE_KNOB || type === MIDI_TYPE_FADER) {
      return true
    }

    return false
  }

  isNotEmpty(type) {
    return type !== MIDI_TYPE_EMPTY
  }

  isButton(type) {
    return type === MIDI_TYPE_BUTTON
  }

  render() {
    const { width, mapping, learnIndex, sceneManager, live, types } = this
    const itemTemplates = []

    for (let index = 0; index < mapping.length; index++) {
      const element = mapping[index]
      
      itemTemplates.push(html`
        <div style="${this.computeItemVars(element, index, learnIndex)}" class="item ${classMap({active: element.active})}">

          <div class="wrapper">

          ${
            live 
            ? html`
              ${
                this.showValueForType(element.type) 
                ? html`<span class="control-value">${element.value}</span><br />` 
                : ''
              }

              <span class="label">${element.label}</span>
            `
            : ''
          }
            
          ${
            live 
            ? ''
            : html`

              ${
                this.isNotEmpty(element.type)
                ? html`
                  <input class="name" name="label" type="text" @change="${e => this.handleLabelChange(e)}" value="${element.label}" .mappingIndex="${index}" />
                  <br>
                ` 
                : ''
              }

              <form @submit="${e => this.handleType(e)}">
                <input name="mappingIndex" type="hidden" value="${index}" />
                <select name="type" required>
                  <option value=""></option>
                  ${repeat(types, type => html`
                    <option value="${type}" ?selected="${this.selectedType(element.type, type)}">${type}</option>
                  `)}
                </select>
                <button type="submit">Change</button>
              </form>

              ${
                this.isNotEmpty(element.type)
                ? html`
                  <br>
                  Note: ${element.note}
                  <button class="learn" @click="${e => this.handleLearn(e)}" .mappingIndex="${index}">Learn</button>                
                ` 
                : ''
              }

              ${
                this.isNotEmpty(element.type) && this.isButton(element.type)
                ? html`
                  <scene-list
                    @add-scenes="${e => this.handleAddScenes(e)}"
                    @remove-scene="${e => this.handleRemoveScene(e)}"
                    .mappingIndex="${index}"
                    .scenes="${element.scenes}"
                    .sceneManager="${sceneManager}"
                    .live="${live}">
                  </scene-list>            
                `
                : ''
              }
          `}

          </div>
        </div>
      `)
    }

    return html`
      <style>
        .container {
          display: grid;
          grid-template-columns: repeat(var(--width), auto);
        }

        .item {
          --on: calc(255 * var(--isActive));
          background: var(--mdc-theme-surface);
          border: 2px solid var(--mdc-theme-background);
          min-height: 5em;
          color: #000;
          text-align: center;
          overflow: hidden;
        }

        .item.active {
          background: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary);
        }

        .item .learn {
          --on: calc(255 * var(--isLearning));
          background: rgb(255, var(--on), var(--on));
        }

        .live .item {
          border: 5px solid var(--mdc-theme-background);
          border-radius: .5em;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .live .control-value {
          color: var(--mdc-theme-background);
          opacity: .5;
        }

        .live .label {
          font-size: 22px;
          font-weight: 400;
        }

        .live {
          font-weight: bold;
        }
      </style>

      <div class="container ${classMap({ live })}" style="${this.computeGridVars(width)}">
        ${itemTemplates}
      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
