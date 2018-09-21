import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { store } from '../../reduxStore.js'
import { setSceneName, addAnimationToScene, addFixturesToScene, removeFixtureFromScene, removeAnimationFromScene, addSceneToTimeline, removeScene, resetUniverseAndFixtures } from '../../actions/index.js'
import '../fixture-list/index.js'
import '../animation-list/index.js'

/*
 * Handle a list of scenes
 */
class SceneBee extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      duration: { type: Number },
      id: { type: String },
      index: { type: Number },
      fixtures: { type: Array },
      fixtureManager: { type: Array },
      animations: { type: Array },
      animationManager: { type: Array }
    }
  }

  runScene(e) {
    store.dispatch(addSceneToTimeline(this.id))
  }

  removeScene(e) {
    const { dataset } = e.target
    store.dispatch(removeScene(parseInt(dataset.index, 10)))
  }

  handleAddAnimation(e) {
    const { event, animationId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    store.dispatch(addAnimationToScene(this.index, animationId))
  }

  handleRemoveAnimation(e) {
    const { animationIndex } = e.detail

    store.dispatch(removeAnimationFromScene(this.index, animationIndex))

    // #35: Reset fixture properties after animation was removed
    // @TODO: Only reset the fixtures that are attached to the scene
    store.dispatch(resetUniverseAndFixtures(0))
  }

  handleAddFixtures(e) {
    const { event, fixtureIds } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    store.dispatch(addFixturesToScene(this.index, fixtureIds))
  }

  handleRemoveFixture(e) {
    const { fixtureIndex } = e.detail

    store.dispatch(removeFixtureFromScene(this.id, fixtureIndex))
  }

  handleNameChange(e) {
    const sceneName = e.target.value
    store.dispatch(setSceneName(this.index, sceneName))
  }

  render() {
    const { index, id, animations, fixtures, animationManager, fixtureManager, name } = this

    return html`
    <style>
      h4 {
        margin: 0.25em 0;
      }

      .name {
        display: inline-block;
        margin: 0;
      }
    </style>

      <div>
        <input class="name" name="name" type="text" @change="${e => this.handleNameChange(e)}" value="${name}" />

        <button @click="${e => this.removeScene(e)}" data-index="${index}">Remove</button>
        <button @click="${e => this.runScene(e)}" sceneId="${id}">Run</button>

        <animation-list
          @add-animation="${e => this.handleAddAnimation(e)}"
          @remove-animation="${e => this.handleRemoveAnimation(e)}"
          data-index="${index}"
          .animations="${animations}"
          .animationManager="${animationManager}"></animation-list>


        <fixture-list
          @add-fixtures="${e => this.handleAddFixtures(e)}"
          @remove-fixture="${e => this.handleRemoveFixture(e)}"
          data-index="${index}"
          .fixtures="${fixtures}"
          .fixtureManager="${fixtureManager}"></fixture-list>
      </div>
    `
  }
}

customElements.define('scene-bee', SceneBee)
