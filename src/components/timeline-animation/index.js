import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import { addToFixtureBatch } from '../../utils/index.js'
import { getFixture } from '../../selectors/index.js'
import { store } from '../../reduxStore.js'

/*
 * Handle an animation in a timeline
 */
class TimelineAnimation extends PolymerElement {
  static get properties() {
    return {
      duration: Number,

      progress: {
        type: Number,
        observer: 'observeProgress'
      },

      fixtureIds: Array,

      animation: Object,
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
    keyframes = {...keyframes}

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

    return new keytime(timeline)
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

  observeProgress() {
    const interpolatedProperties = this.timeline.values(this.computeProgress())

    for (let i = 0; i < this.fixtureIds.length; i++) {
      addToFixtureBatch(this.fixtureIds[i], interpolatedProperties)
    }
  }

  computeProgress() {
    let progress = this.progress / this.duration
    if (progress > 1.0) {
      progress = 1
    }

    return progress
  }

  static get template() {
    return html``
  }
}

customElements.define('timeline-animation', TimelineAnimation)
