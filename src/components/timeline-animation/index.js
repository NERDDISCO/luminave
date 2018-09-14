import { LitElement, html } from '/node_modules/@polymer/lit-element/lit-element.js'
import { addToFixtureBatch } from '../../utils/index.js'

/*
 * Handle an animation in a timeline
 */
class TimelineAnimation extends LitElement {
  static get properties() {
    return {
      duration: { type: Number },
      progress: { type: Number },
      fixtureIds:  { type: Array },
      animation:  { type: Object },
      timeline: { type: Object }
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

    if (this.fixtureIds === undefined) {
      return
    }

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

  shouldUpdate(changedProperties) {
    // Update the timeline when the animation is updated
    if (changedProperties.has('animation')) {
      this.timeline = this.computeTimeline(this.animation.keyframes)
    }

    return true
  }

  render() {
    this.observeProgress()

    return html``
  }
}

customElements.define('timeline-animation', TimelineAnimation)
