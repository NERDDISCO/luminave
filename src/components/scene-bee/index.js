import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addAnimationToScene, addFixtureToScene, removeFixtureFromScene } from '../../actions/index.js'
import '../fixture-list/index.js'

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

  removeAnimation() {
    // @TODO: Implement
  }

  removeFixture() {
    // @TODO: Implement
  }

  handleAnimationSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    this.dispatch(addAnimationToScene(this.index, this.animationId))
  }

  handleSelectedAnimation(e) {
    this.animationId = e.target.selectedOptions[0].value
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

        <form on-submit="handleAnimationSubmit">
          <select name="type" on-change="handleSelectedAnimation" required>
            <option value=""></option>

            <template is="dom-repeat" items="{{animationManager}}" as="animation">
              <option value="[[animation.id]]">[[animation.name]]</option>
            </template>
          </select>

          <button type="submit">Add animation</button>
        </form>

        <template is="dom-repeat" items="{{animations}}" as="animation">
          [[animation]]
        </template>


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
