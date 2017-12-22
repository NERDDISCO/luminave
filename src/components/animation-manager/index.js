import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { uuidV1 } from '../../../libs/abcq/uuid.js'
import { addAnimation, runAnimation, removeAnimation, addKeyframe } from '../../actions/index.js'
import '../keyframe-grid/index.js'

/*
 * Handle a list of animations
 *
 * @TODO: Use KeytimeDeluxe from './KeytimeDeluxe.js' to handle the keyframe interpolation
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

  addAnimation() {
    const id = uuidV1()
    this.dispatch(addAnimation({
      id,
      keyframes: {
        '0': {
          color: [255, 0, 0],
          dimmer: 255
        },
        '1': {
          color: [0, 255, 0],
          dimmer: 200
        }
      },
      fixtures: [],
      duration: 5,
      name: `demo animation ${id}`,
      isRunning: false
    }))

    /*
    vs

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

    */
  }

  runAnimation(e) {
    const { dataset } = e.target
    this.dispatch(runAnimation(parseInt(dataset.index, 10)))
  }

  removeAnimation(e) {
    const { dataset } = e.target
    this.dispatch(removeAnimation(parseInt(dataset.index, 10)))
  }

  addKeyframe(e) {
    const { dataset } = e.target

    this.dispatch(addKeyframe(
      parseInt(dataset.index, 10),
      {
        '0': {
          color: [255, 0, 0],
          dimmer: 200
        }
      }
    ))

  }

  static get template() {
    return `
      <button on-click="addAnimation">Add animation</button>

      <template is="dom-repeat" items="{{animations}}" as="animation">
        <div>
          Name: [[animation.name]] <br>
          Duration: [[animation.duration]] <br>

          <button on-click="runAnimation" data-index$="[[index]]">Run</button>
          <button on-click="removeAnimation" data-index$="[[index]]">Remove</button>

          <button on-click="addKeyframe" data-index$="[[index]]">Add keyframe</button>

          <keyframe-grid keyframes="{{animation.keyframes}}"></keyframe-grid>
        </div>
      </template>
    `
  }
}

customElements.define('animation-manager', AnimationManager)
