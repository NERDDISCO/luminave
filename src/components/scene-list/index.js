import { LitElement, html } from '@polymer/lit-element/lit-element.js'
import { repeat } from 'lit-html/directives/repeat.js'
import '../scene-list-item/index.js'

/*
 * A list of scenes
 */
class SceneList extends LitElement {
  static get properties() {
    return {
      scenes: { type: Array },
      sceneManager: { type: Array },
      live: { type: Boolean }
    }
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
    const { sceneId } = e.target

    this.dispatchEvent(new CustomEvent('remove-scene', {
      detail: {
        event: e,
        sceneId
      }
    }))
  }

  getScene(sceneId) {
    return this.sceneManager.filter(scene => scene.id === sceneId)[0]
  }

  render() {
    const { scenes, sceneManager, live } = this
    const itemTemplates = []

    for (let index = 0; index < scenes.length; index++) {
      const sceneId = scenes[index]

      itemTemplates.push(html`
        <scene-list-item .scene="${this.getScene(sceneId)}"></scene-list-item>

        ${
          live 
          ? ''
          : html`<button @click="${e => this.handleRemoveScene(e)}" .sceneId="${sceneId}">x</button>`
        }
      `)
    }

    return html`
      <style>
        :host {
          max-height: 8em;
          display: block;
          overflow: scroll;
        }
      </style>

      ${
        live 
        ? ''
        : html`
          <form @submit="${e => this.handleSceneSubmit(e)}">
            <select name="scenes" required multiple>
              <option value=""></option>
              ${repeat(sceneManager, scene => html`
                <option value="${scene.id}">${scene.name}</option>
              `)}
            </select>

            <button type="submit">Add</button>
          </form>
        `
      }

      ${itemTemplates}

    `
  }

}

customElements.define('scene-list', SceneList)
