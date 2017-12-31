import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import ReduxMixin from '../../reduxStore.js'
import { setFixtureProperties } from '../../actions/index.js'
import KeytimeDeluxe from '/libs/keytime/KeytimeDeluxe.js'

/*
 * Handle an animation in a timeline
 */
class TimelineAnimation extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      progress: {
        type: Number,
        observer: 'changedProgress'
      },
      fixtureIds: Array,
      animation: Object,
      animationManager: {
        type: Array,
        statePath: 'animationManager'
      },
      fixtureManager: {
        type: Object,
        statePath: 'fixtureManager'
      },
      timeline: {
        type: Object,
        computed: 'computeTimeline(animation.keyframes)'
      }
    }
  }

  /*
   * Convert the keyframes into an array that Keytime understands:
   *
   keyframes: {
     '0': {
       dimmer: 255
     },
     '1': {
       dimmer: 35
     }
   }

   =>

   [{
     'name': 'dimmer',
     'keyframes': [
       { 'time': 0, 'value': 255 },
       { 'time': 1, 'value': 35}
     ]
   }]
   */
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

    const shit = new KeytimeDeluxe(timeline)

    // console.log(shit)

    return shit
  }

  _toArray(object) {
    const array = []

    for (const step in object) {
      array.push({
        time: parseFloat(step),
        value: object[step]
      })
    }

    return array.sort((a, b) => a.time - b.time)
  }

  changedProgress() {

    const interpolatedProperties = this.timeline.values(~~(this.progress * 10) / 10)

    console.log(~~(this.progress * 10) / 10, JSON.stringify(interpolatedProperties))

    console.log(JSON.stringify(this.getState().fixtureManager[3]))

    for (let i = 0; i < this.fixtureIds.length; i++) {
      this.dispatch(setFixtureProperties(this.fixtureIds[i], interpolatedProperties))
    }
  }

  static get template() {
    return `
      <div>
        <h4>[[animation.name]]</h4>
      </div>
    `
  }
}

customElements.define('timeline-animation', TimelineAnimation)
