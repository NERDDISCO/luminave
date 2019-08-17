import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/directives/repeat.js'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { learnMidi, addScenesToMidi, removeSceneFromMidi, addMidiMapping } from '../../actions/index.js'
import '../scene-list/index.js'
import { MIDI_TYPES, MIDI_TYPE_KNOB, MIDI_TYPE_FADER, MIDI_TYPE_EMPTY, MIDI_TYPE_BUTTON, MIDI_TYPE_ROUND_BUTTON } from '../../constants/index.js'
import { getMidiLearning, getScenes, getLive } from '../../selectors/index.js'
import { classMap } from 'lit-html/directives/classMap.js'
import { when } from 'lit-html/directives/when.js'
import '@material/mwc-button/mwc-button.js'
import '@material/mwc-icon/mwc-icon.js'


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
      '--isLearning': isLearning ? 1 : 0,
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

    const { target } = e
    const tagName = target.tagName.toLowerCase()

    // Form was submit
    if (tagName === 'form') {
      const data = new FormData(e.target)
      const type = data.get('type')
      const mappingIndex = parseInt(data.get('mappingIndex'), 10)

      const mapping = { type }
      store.dispatch(addMidiMapping(this.controllerId, mappingIndex, mapping))
    
    // On change
    } else {

      const { parentElement } = target

      // Submit the form
      if (parentElement.tagName.toLowerCase() === 'form') {
        parentElement.dispatchEvent(new CustomEvent('submit', { detail: {} }))
      }

    }
  }

  handleEdit(e, isEditing) {
    const { mappingIndex } = e.target
    const mapping = { isEditing }

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

  isRoundButton(type) {
    return type === MIDI_TYPE_ROUND_BUTTON
  }

  templateNormal(element, index) {
    const { live } = this

    return html`
      ${
        this.showValueForType(element.type) 
        ? html`<span class="control-value">${element.value}</span><br />` 
        : ''
      }

      <span class="label">${element.label}</span>

      ${
        live
        ? html``
        : html`
          <div class="menu">
            <mwc-button icon="edit" @click="${e => this.handleEdit(e, true)}" .mappingIndex="${index}"></mwc-button>
          </div>
        `
      }
      
    `
  }

  templateEdit(element, index) {

    const { sceneManager, live, types } = this

    return html`
      <div class="menu">
        <mwc-button icon="cancel" @click="${e => this.handleEdit(e, false)}" .mappingIndex="${index}"></mwc-button>
      </div>

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
              ` 
              : ''
            }

            <form @submit="${e => this.handleType(e)}">
              <input name="mappingIndex" type="hidden" value="${index}" />
              <select name="type" required @change="${e => this.handleType(e)}" .mappingIndex="${index}">
                <option value=""></option>
                ${repeat(types, type => html`
                  <option value="${type}" ?selected="${this.selectedType(element.type, type)}">${type}</option>
                `)}
              </select>
            </form>

            ${
              this.isNotEmpty(element.type) && (this.isButton(element.type) || this.isRoundButton(element.type))
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

            ${
              this.isNotEmpty(element.type)
              ? html`
                <div class="learn">
                  Note: ${element.note}
                  <button @click="${e => this.handleLearn(e)}" .mappingIndex="${index}">Learn</button>
                </div>
              ` 
              : ''
            }

        `}

      </div>
    `
  }

  render() {
    const { width, mapping, learnIndex, sceneManager, live, types } = this
    const itemTemplates = []

    for (let index = 0; index < mapping.length; index++) {
      const element = mapping[index]
      const { isEditing = false } = element

      const itemClasses = {
        'item': true,
        'active': element.active,
        'empty': !this.isNotEmpty(element.type), 
        'round': this.isRoundButton(element.type)
      }

      itemTemplates.push(html`
        <div style="${this.computeItemVars(element, index, learnIndex)}" class="${classMap(itemClasses)}">

          ${when(isEditing, () => this.templateEdit(element, index), () => this.templateNormal(element, index))}

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
          position: relative;
          --on: calc(255 * var(--isActive));
          background: var(--mdc-theme-surface);
          min-height: 5em;
          color: #000;
          text-align: center;
          overflow: hidden;
          border: .35em solid var(--mdc-theme-background);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .item.active {
          background: var(--mdc-theme-secondary);
          color: var(--mdc-theme-on-secondary);
        }

        .item.round {
          border-radius: 20%;
          background: var(--paper-blue-200);
        }

        .item.round.active {
          background: var(--paper-orange-400);
        }

        .live .item.round {
          border-radius: 50%;
        }

        .label {
          font-size: 1.5em;
          font-weight: 400;
        }

        .item .learn {
          background: rgba(255, 0, 0, var(--isLearning));
          font-size: 0.65em;
          opacity: 0.5;
        }

        .item .learn:hover {
          opacity: 1;
        }

        .live .item {
          border: .35em solid var(--mdc-theme-background);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .item.empty {
          background: var(--mdc-theme-background);
        }

        .live .control-value {
          color: var(--mdc-theme-background);
          opacity: .5;
        }

        .menu {
          position: absolute;
          top: 0;
          right: 0;
          opacity: .5;
        }

        .menu:hover {
          opacity: 1;
        }
      </style>

      <div class="container ${classMap({ live })}" style="${this.computeGridVars(width)}">
        ${itemTemplates}
      </div>
    `
  }

}

customElements.define('midi-grid', MidiGrid)
