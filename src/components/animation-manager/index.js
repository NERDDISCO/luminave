import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addAnimation, runAnimation, removeAnimation } from '../../actions/index.js'
import '../animation-bee/index.js'

/*
 * Handle a list of animations
 *
 * @TODO: Use KeytimeDeluxe from './KeytimeDeluxe.js' to handle the keyframe interpolation

Our data model (simple as possible)
 '0': {
   color: [255, 0, 0],
   dimmer: 255
 },
 '0.25': {
   color: [0, 0, 255]
 },
 '1': {
   color: [0, 255, 0],
   dimmer: 200
 }


 This is how Keytime wants the timeline / keyframes

 'timeline': [{
   'name': 'color',
   'keyframes': [
     { 'time': 0, 'value': [0, 0, 0] },
     { 'time': 0.25, 'value': [0, 0, 0] },
     { 'time': 0.5, 'value': [255, 0, 0] },
     { 'time': 0.75, 'value': [0, 0, 0] },
     { 'time': .9, 'value': [0, 0, 0] }
   ]
 }]

 Internally we split the keyframes into sub keyframes to have more control

 [{
   '0': keyframes0,
   '1': keyframes0.25
 },
 {
   '0': keyframes0.25,
   '1': keyframes1
 }]

 */
class AnimationManager extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      animations: {
        type: Array,
        statePath: 'animationManager'
      }
    }
  }

  handleSubmit(e) {
    // Prevent sending data to server
    e.preventDefault()

    // Reset all fields
    e.target.reset()

    const id = uuidV1()

    this.dispatch(addAnimation({
      id,
      keyframes: {},
      duration: this.duration,
      name: this.name
    }))
  }

  handleName(e) {
    this.name = e.target.value
  }

  handleDuration(e) {
    this.duration = e.target.value
  }

  runAnimation(e) {
    const { dataset } = e.target
    this.dispatch(runAnimation(parseInt(dataset.index, 10)))
  }

  removeAnimation(e) {
    const { dataset } = e.target
    this.dispatch(removeAnimation(parseInt(dataset.index, 10)))
  }

  static get template() {
    return `
      <h2>Animations</h2>

      <form on-submit="handleSubmit">
        <label for="name">Name</label>
        <input name="name" type="text" on-change="handleName" required></input>

        <label for="duration">Duration</label>
        <input name="duration" type="number" min="0" on-change="handleDuration" required></input>

        <button type="submit">Add animation</button>
      </form>

      <template is="dom-repeat" items="{{animations}}" as="animation">
        <div>
          <h3>[[animation.name]] (duration: [[animation.duration]])</h3>

          <button on-click="runAnimation" data-index$="[[index]]">Run</button>
          <button on-click="removeAnimation" data-index$="[[index]]">Remove</button>

          <animation-bee
            index$="[[index]]"
            name="[[animation.name]]"
            duration="[[animation.duration]]"
            keyframes="[[animation.keyframes]]""></animation-bee>

        </div>
      </template>
    `
  }
}

customElements.define('animation-manager', AnimationManager)
