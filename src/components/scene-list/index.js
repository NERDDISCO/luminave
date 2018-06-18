import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import { DomIf } from '/node_modules/@polymer/polymer/lib/elements/dom-if.js'
import '../scene-list-item/index.js'

/*
 * A list of scenes
 */
class SceneList extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      scenes: Array,
      sceneManager: Array,
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

  handleSceneSubmit(e) {
    e.preventDefault()

    // Get data out of the form
    const data = new FormData(e.target)
    const sceneIds = data.getAll('scenes')

    this.dispatchEvent(new CustomEvent('add-scenes', {
      detail: {
        event: e,
        sceneIds
      }
    }))
  }

  handleRemoveScene(e) {
    this.dispatchEvent(new CustomEvent('remove-scene', {
      detail: {
        event: e,
        sceneIndex: e.target.sceneIndex
      }
    }))
  }

  getScene(sceneId) {
    return this.sceneManager.filter(scene => scene.id === sceneId)[0]
  }

  static get template() {
    return `
      <template is="dom-if" if="[[editMode]]">
        <form on-submit="handleSceneSubmit">
          <select name="scenes" required multiple>
            <option value=""></option>

            <template is="dom-repeat" items="{{sceneManager}}" as="scene">
              <option value="[[scene.id]]">[[scene.name]]</option>
            </template>
          </select>

          <button type="submit">Add</button>
        </form>
      </template>

      <template is="dom-repeat" items="{{scenes}}" as="sceneId">
        <scene-list-item scene="{{getScene(sceneId)}}"></scene-list-item>

        <template is="dom-if" if="[[editMode]]">
          <button on-click="handleRemoveScene" scene-index="[[index]]">x</button>
        </template>
      </template>
    `
  }

}

customElements.define('scene-list', SceneList)
