import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addAnimationToScene, addFixtureToScene } from '../../actions/index.js'

/*
 * Handle a list of scenes
 */
class SceneBee extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      name: String,
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

  handleFixtureSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    this.dispatch(addFixtureToScene(this.index, this.fixtureId))
  }

  handleSelectedFixture(e) {
    this.fixtureId = e.target.selectedOptions[0].value
  }

  static get template() {
    return `
      <div>
        <h3>[[name]]</h3>
        <!-- @TODO: <animation-list> -->
        <!-- @TODO: <fixture-list> -->

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

        <form on-submit="handleFixtureSubmit">
          <select name="type" on-change="handleSelectedFixture" required>
            <option value=""></option>

            <template is="dom-repeat" items="{{fixtureManager}}" as="fixture">
              <option value="[[fixture.id]]">[[fixture.name]]</option>
            </template>
          </select>

          <button type="submit">Add fixture</button>
        </form>

        <template is="dom-repeat" items="{{fixtures}}" as="fixture">
          [[fixture]]
        </template>
      </div>
    `
  }
}

customElements.define('scene-bee', SceneBee)
