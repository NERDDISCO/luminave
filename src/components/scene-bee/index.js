import { LitElement, html } from 'lit-element'
import { store } from '../../reduxStore.js'
import { setSceneName, addAnimationToScene, addFixturesToScene, removeFixtureFromScene, removeAnimationFromScene, addSceneToTimeline, removeScene, resetUniverseAndFixtures, removeFixtureFromSceneAndUniverse } from '../../actions/index.js'
import '../fixture-list/index.js'
import '../animation-list/index.js'
import { SCENE_TYPE_STATIC } from '../../constants/timeline.js'
import uuidv1 from 'uuid/v1.js'



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
    const { sceneId } = e.target

    const scene = {
      sceneId,
      timelineSceneId: uuidv1(),
      adapt: true,
      type: SCENE_TYPE_STATIC,
      added: new Date().getTime(),
      started: undefined,
      priority: 0
    }

    store.dispatch(addSceneToTimeline(scene))
  }

  removeScene(e) {
    const { sceneId } = e.target
    store.dispatch(removeScene(sceneId))
  }

  handleAddAnimation(e) {
    const { event, animationId } = e.detail
    const { sceneId } = e.target

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    store.dispatch(addAnimationToScene(sceneId, animationId))
  }

  handleRemoveAnimation(e) {
    const { animationId } = e.detail
    const { sceneId } = e.target

    store.dispatch(removeAnimationFromScene(sceneId, animationId))

    // #35: Reset fixture properties after animation was removed
    // @TODO: Only reset the fixtures that are attached to the scene
    store.dispatch(resetUniverseAndFixtures(0))
  }

  handleAddFixtures(e) {
    const { event, fixtureIds } = e.detail
    const { sceneId } = e.target

    // Prevent sending data to server & reset all fields
    event.preventDefault()

    store.dispatch(addFixturesToScene(sceneId, fixtureIds))
  }

  handleRemoveFixture(e) {
    const { fixtureId } = e.detail
    const { sceneId } = e.target

    store.dispatch(removeFixtureFromSceneAndUniverse(sceneId, fixtureId))
  }

  handleNameChange(e) {
    const { value } = e.target
    store.dispatch(setSceneName(this.id, value))
  }

  render() {
    const { id, animations, fixtures, animationManager, fixtureManager, name } = this

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

        <button @click="${e => this.removeScene(e)}" .sceneId="${id}">Remove</button>
        <button @click="${e => this.runScene(e)}" .sceneId="${id}">Run</button>

        <animation-list
          @add-animation="${e => this.handleAddAnimation(e)}"
          @remove-animation="${e => this.handleRemoveAnimation(e)}"
          .sceneId="${id}"
          .animations="${animations}"
          .animationManager="${animationManager}"></animation-list>


        <fixture-list
          @add-fixtures="${e => this.handleAddFixtures(e)}"
          @remove-fixture="${e => this.handleRemoveFixture(e)}"
          .sceneId="${id}"
          .fixtures="${fixtures}"
          .fixtureManager="${fixtureManager}"></fixture-list>
      </div>
    `
  }
}

customElements.define('scene-bee', SceneBee)
