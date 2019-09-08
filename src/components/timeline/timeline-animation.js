import { LitElement, html, css } from 'lit-element'
import { addToFixtureBatch } from '../../utils/index.js'
import TimelineKeytime from './timeline-keytime.js'
import { toFixedNumber } from '../../utils/index.js'

/*
 * Handle an animation in a timeline
 */
class TimelineAnimation extends LitElement {
  static get properties() {
    return {
      duration: { type: Number },
      started: { type: Number },
      progress: { type: Number },
      repeat: { type: Boolean },
      fixtureIds: { type: Array },
      animation: { type: Object },
      timeline: { type: Object },
      sceneName: { type: String },
      showMeta: { type: Boolean }
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

    return new TimelineKeytime(timeline)
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

  computeProgress() {

    // Timeline was never started
    if (this.progress === 0) {
      return 0
    }

    let progress = (this.progress - this.started) / this.duration
    let progressMs = this.duration - (this.progress - this.started)
    

    progress = toFixedNumber(progress, 2)

    // We reached the end of the duration
    if (progress > 1.0) {

      // @TODO: Check what happens if the timeline is not running, but then it gets started again. The progress will be beyond 1.0, but it should start at 0
      if (progress > 1.5) {
        progress = 0
        progressMs = 0
      } else {
        progress = 1
      }

      // Animation is done
      this.ended()
    }

    if (progressMs < 0) {
      progressMs = 0
    }

    // In %
    const progressPercent = toFixedNumber(progress * 100, 2)

    return { progress, progressMs, progressPercent }
  }

  ended() {
    // Animation is done
    this.dispatchEvent(new CustomEvent('animation-ended', {
      detail: {}
    }))
  }

  shouldUpdate(changedProperties) {
    // Update the timeline when the animation is updated
    if (changedProperties.has('animation') && this.animation !== undefined) {
      this.timeline = this.computeTimeline(this.animation.keyframes)
      this.duration = this.animation.duration

      /*
       * The animation should be restarted if it was really changed. There are different states for an animation
       * - animation is added => started = undefined
       * - animation is there, another animation gets removed => started > animation.changed
       * - animation is there, animation gets updated => started < animation.changed -> THIS IS THE ONE
       */
      if (this.animation.changed !== undefined && this.started < this.animation.changed) {
        this.ended()
      }
    }

    return true
  }

  _metaTemplate(duration, progressMs, progressPercent) {
    return html`
      <div class="duration">${duration} ms</div>
      <div class="duration">${progressMs} ms</div>
      <div class="progress">${progressPercent} %</div>
    `
  }

  render() {
    if (this.fixtureIds === undefined) {
      return
    }

    const { duration, showMeta, _metaTemplate } = this

    let { progress, progressMs, progressPercent } = this.computeProgress()

    // Interpolate the properties of the fixtures associated with the animation
    const interpolatedProperties = this.timeline.values(progress)

    // Add the interpolated properties to the fixtureBatch (which is used to set the value in the universe)
    for (let i = 0; i < this.fixtureIds.length; i++) {
      addToFixtureBatch(this.fixtureIds[i], interpolatedProperties)
    }

    return html`
      <style>
        .progress {
          font-size: .8rem;
          text-align: right;
        }

        .duration {
          font-size: .7rem;
          opacity: .6;
          text-align: right;
        }
      </style>

      ${
        showMeta 
          ? _metaTemplate(duration, progressMs, progressPercent)
          : html``
      }

    `
  }
}

customElements.define('timeline-animation', TimelineAnimation)
