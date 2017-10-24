import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import {styles} from './styles.js'

class AnimationItem extends PolymerElement {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  getEnd(frames, index, duration) {
    const nextFrame = frames[index + 1]
    const end = index < (frames.length - 1) ? nextFrame.time : duration
    return end
  }

  isActive(frames, index, duration, time, loopMeasures, measures, activeScene) {
    const relativeTime = 1 / loopMeasures * measures
    const end = this.getEnd(frames, index, duration)
    requestAnimationFrame(()=> {
      //  console.log(duration, end)
    })
    return activeScene && (time > (duration * relativeTime)) ? time < (end * relativeTime) ? 'active' : '' : ''
  }

  static get template() {
    return `
      <style>
        ${styles}
      </style>
      <template is="dom-repeat" items="{{ animation.timeline.data }}" as="timeline">
        <div class="animation"
             style$="--duration: {{animation.duration}};
                     --loop-measures: {{measures}}">
          <div class="animation-label">{{timeline.name}}</div>
          <div class="animation-timeline">
            <template is="dom-repeat" items="{{timeline.keyframes}}" as="keyframe">
              <div class$="keyframe {{isActive(timeline.keyframes,
                                              index,
                                              keyframe.time,
                                              time,
                                              measures,
                                              animation.duration,
                                              activescene
                                              )}}"
                   style$="--start: {{keyframe.time}};
                           --end: {{getEnd(timeline.keyframes, index, keyframe.time)}}">
              </div>
            </template>
          </div>
        </div>
      </template>
    `
  }
}

customElements.define('animation-item', AnimationItem)
