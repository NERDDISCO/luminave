import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { addKeyframe, setFixtureProperties } from '../../actions/index.js'
import { FIXTURE_PROPERTIES } from '../../constants/index.js'
import '../keyframe-grid/index.js'
import KeytimeDeluxe from '/libs/keytime/KeytimeDeluxe.js'

/*
 * Handle a list of scenes
 */
class AnimationBee extends ReduxMixin(PolymerElement) {

  constructor() {
    super()

    this.properties = FIXTURE_PROPERTIES
    this.properties.sort()
  }

  static get properties() {
    return {
      name: String,
      duration: Number,
      index: Number,
      keyframes: Object,
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      },
      timeline: {
        type: Object,
        computed: 'computeTimeline(keyframes)'
      }
    }
  }


  /*

  keyframes: {
    '0': {
      dimmer: 255
    },
    '0.25': {
      color: [0, 0, 255]
    },
    '1': {
      color: [0, 255, 0],
      dimmer: 200
    }
  }

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

  // @TODO: steps are not sorted
  computeTimeline(keyframes) {
    const keyframesArray = this._toArray(keyframes)
    let properties = []

    for (const step in keyframes) {
      // Get all properties from keyframe for the step
      properties = properties.concat(Object.keys(keyframes[step]))
    }

    // Remove duplicates
    properties = [...new Set(properties)]

    // Create timeline based on properties
    const timeline = properties.map(name => {
      const property = {
        name,
        keyframes: []
      }

      property.keyframes = keyframesArray
        // Get keyframes with specified name
        .filter(keyframe => keyframe.value[name] !== undefined)
        .map(keyframe => {
          // @TODO handle different types of data so that Keytime can interpolate them
          return {
            time: keyframe.time,
            value: keyframe.value[name]
          }
        })

      return property
    })

    return new KeytimeDeluxe(timeline)
  }

  _toArray(object) {
    const array = []

    for (const step in object) {
      array.push({
        time: parseFloat(step),
        value: object[step]
      })
    }

    array.sort((a, b) => a.step - b.step)

    return array
  }

  testKeytime() {
    const progress = Math.random()

    const interpolatedProperties = this.timeline.values(progress)

    this.dispatch(setFixtureProperties('6a411750-ebb8-11e7-8006-77b470e0e719', interpolatedProperties))

    // // Iterate over all properties
    // Object.entries(interpolatedProperties).map(([name, value]) => {
    //   console.log(name, value)
    // })

  }


  handleKeyframeSubmit(e) {
    // Prevent sending data to server & reset all fields
    e.preventDefault()
    e.target.reset()

    this.dispatch(addKeyframe(this.index, this.step, this.property, this.value))
  }

  handleStep(e) {
    this.step = e.target.value
  }

  handleSelectedProperty(e) {
    this.property = e.target.selectedOptions[0].value
  }

  handleValue(e) {
    this.value = e.target.value
  }

  static get template() {
    return `
      <div>
        <h4>Keyframes</h4>

        <button on-click="testKeytime">Test Keytime</button>

        <form on-submit="handleKeyframeSubmit">
          <label for="name">Step</label>
          <input name="name" type="text" on-change="handleStep" required></input>

          <label for="property">Property</label>
          <select name="property" on-change="handleSelectedProperty" required>
            <option value=""></option>
            <template is="dom-repeat" items="{{properties}}" as="property">
              <option value="[[property]]">[[property]]</option>
            </template>
          </select>

          <label for="value">Value</label>
          <input name="value" type="text" on-change="handleValue" required></input>

          <button type="submit">Add keyframe</button>
        </form>

        <keyframe-grid keyframes="{{keyframes}}"></keyframe-grid>
      </div>
    `
  }
}

customElements.define('animation-bee', AnimationBee)
