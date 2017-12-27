import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addAnimationToScene, addFixtureToScene, removeFixtureFromScene, removeAnimationFromScene } from '../../actions/index.js'
import '../fixture-list/index.js'
import '../animation-list/index.js'

/*
 * Handle a list of scenes
 */
class SceneBee extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      name: String,
      duration: Number,
      index: Number,
      fixtures: Array,
      fixtureManager: {
        type: Array,
        statePath: 'fixtureManager'
      },
      animations: Array,
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  handleAddAnimation(e) {
    const { event, animationId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    this.dispatch(addAnimationToScene(this.index, animationId))
  }

  handleRemoveAnimation(e) {
    const { animationIndex } = e.detail

    this.dispatch(removeAnimationFromScene(this.index, animationIndex))
  }

  handleAddFixture(e) {
    const { event, fixtureId } = e.detail

    // Prevent sending data to server & reset all fields
    event.preventDefault()
    event.target.reset()

    this.dispatch(addFixtureToScene(this.index, fixtureId))
  }

  handleRemoveFixture(e) {
    const { fixtureIndex } = e.detail

    this.dispatch(removeFixtureFromScene(this.index, fixtureIndex))
  }

  static get template() {
    return `
      <div>
        <h4>Animations</h4>
        <animation-list
          on-add-animation="handleAddAnimation"
          on-remove-animation="handleRemoveAnimation"
          data-index$="[[index]]"
          animations$="{{animations}}"
          animation-manager$="[[animationManager]]"></animation-list>


        <h4>Fixtures</h4>
        <fixture-list
          on-add-fixture="handleAddFixture"
          on-remove-fixture="handleRemoveFixture"
          data-index$="[[index]]"
          fixtures="{{fixtures}}"
          fixture-manager="[[fixtureManager]]"></fixture-list>
      </div>
    `
  }
}

customElements.define('scene-bee', SceneBee)
