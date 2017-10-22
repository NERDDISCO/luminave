import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import Animation from '/src/core/Animation.js'

class TimelineItem extends PolymerElement {

  constructor() {
    super()
    this.measureCount = 0
    this.measures = []
  }

  ready(){
    super.ready()
  }

  connectedCallback() {
    super.connectedCallback()
    this.measureCount = parseInt(this.attributes.measure.value, 10)
    this.measures = [...Array(this.measureCount).fill().map(x => {
      const steps = [...Array(4).fill().map(x => x)]
      return {
        steps
      }
    })]
    this.steps = this.measures.length * this.measures[0].steps.length
  }

  addItem(target) {
  }

  handleClick(e) {
    this.addItem(e.target)
  }

  getTime(time, duration) {
    return time * duration
  }

  isActive(time, measures) {
    const localDuration = 1 / this.measureCount * measures

    return  time < localDuration ? 'active' : ''
  }

  isActiveFrame(time, measures, frameTime, frames, i) {
    const localDuration = 1 / this.measureCount * measures
    const end = this.getEnd(measures, frameTime, frames, i)

    return time > (frameTime * localDuration) ? time < (end * localDuration) ? 'active' : '' : ''
  }

  getEnd(measures, frameTime, frames, i) {
    const localDuration = 1 / this.measureCount * measures
    const nextFrame = frames[i + 1]
    const end = i < (frames.length - 1) ? nextFrame.time : frameTime
    return end
  }

  getWidth(start, measures, frameTime, frames, i) {
    const end = this.getEnd(measures, frameTime, frames, i)
    return end - start
  }

  addAnimation(e) {
    const {target} = e
    const {layer, scene} = target.dataset
    this._addAnimation(scene, layer)
  }

  _addAnimation(scene, layer) {

    const animation = {
      'animationId': 'uniqueId',
      'duration': 4,
      'name': 'uniqueName',
      'start': 0,
      'timeline': [{
        'name': 'color',
        'value': [0, 0, 0],
        'keyframes': [{
          'time': 0,
          'value': [255, 0, 0]
        }, {
          'time': 1,
          'value': [0, 0, 0]
        }]
      }]
    }

    console.log(scene, layer, animation)

    /*
     * Boilerplate code to put a new layer + animation into the config
     */

    // Add a new layer to scene
    window.configuration.data.scenes[0].layers.push({
      layerId: 'uniqueLayerId',

      // The devices the animation should run on
      devices: ['fungeneration_ledspot_1'],

      // Add a new animation to the layer
      animations: [{
        animationId: 'uniqueId',
        start: 0
      }]
    })

    // Add new property to animation
    animation.timeline.push({
      'name': 'dimmer',
      'value': [0, 0, 0],
      'keyframes': [{
        'time': 0,
        'value': 0
      }, {
        'time': 0.35,
        'value': 255
      },
      {
       'time': 1,
       'value': 0
     }]
    })

    // Add the animation to the list of animations
    window.configuration.data.animations.push(animation)

    // Save configuration into localStorage
    window.configuration.sync()

  }

  static get template() {
    return `
     <style>
      :host {
        font-family: monospace;
        --progress: {{time}};
      }

      *, *::before, *::after {
        box-sizing: border-box;
      }

      .timeline {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }

      .progress {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 20em;
        box-shadow: inset 0 0 0 1px;
      }

      .needle {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        box-shadow: inset 1px 0 0 0;
        transform-origin: 0 0;
        transform: translate3d(calc(var(--progress) * 100%), 0, 0);
      }

      .step {
        position: relative;
        box-shadow: inset 0 0 0 1px;
        flex: 1;
        z-index: 1;
        background: rgba(0, 0, 0, 0.5);
        cursor: pointer;
        opacity: 0.1;
      }

      .step:hover {
        opacity: 0.8;
      }

      .item {
        position: relative;
      }

      .scenes {
        position: relative;
      }

      .bar {
        position: relative;
        flex: 1;
        background: rgba(255, 255, 255, 0.1);
      }

      .scene {
        display: flex;
        box-shadow: inset 0 0 0 1px;
        margin: 0 0 1em 0;
      }

      .scene-label {
        width: 20em;
        height: 2em;
        padding-left: 0.5em;
        display: flex;
        align-items: center;
        align-content: center;
        align-self: flex-start;
        box-shadow: inset 0 0 0 1px;
      }

      .keyframe {
        position: absolute;
        z-index: 2;
        top: 50%;
        bottom: 0;
        border-radius: 2px;
        left: calc(var(--start) * 100%);
        height: 3em;
        width: calc((var(--end) - var(--start)) * 100%);
        transform: translate(0, -50%);
        box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.6);
        cursor: pointer;
        background: currentcolor;
        color: rgba(150, 0, 0, 0.5);
      }

      .keyframe.active {
        color: rgba(0, 150, 0, 0.5);
      }

      .keyframe::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 0%;
        width: 1em;
        height: 1em;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: currentcolor;
        box-shadow: 0 0 0 0.5em rgba(0, 0, 0, 0.3);
      }
      .keyframe:hover {
        z-index: 4;
      }

      .keyframe:hover .keyframe-label {
        display: block;
      }

      .keyframe-label {
        display: none;
        position: absolute;
        bottom: 1em;
        left: 2em;
        padding: 0.25em 0.5em;
        background: #fff;
        color: #000;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 4px 7px rgba(0, 0, 0, 0.6);
      }

      .animation-timeline {
        position: relative;
        display: flex;
        height: 6em;
        box-shadow: inset 0 0 0 1px;
        width: calc(var(--duration) / {{measureCount}} * 100%);
        background: rgba(0, 0, 0, 0.4);
      }

      .animation-timeline.active {
        background: rgba(150, 150, 0, 0.4);
      }
      .animations {
        position: relative;
      }
      .animation-id {
        position: absolute;
        margin: 0;
        height: 2em;
        top: 2em;
        padding-left: 0.5em;
        display: flex;
        align-items: center;
        align-content: center;
        width: 18em;
        font-size: 1em;
        right: 100%;
        box-shadow: inset 0 0 0 1px;
      }

      .timeline-name {
        position: absolute;
        margin: 0;
        bottom: 0;
        height: 2em;
        padding-left: 0.5em;
        display: flex;
        align-items: center;
        align-content: center;
        width: 16em;
        font-size: 1em;
        right: 100%;
        box-shadow: inset 0 0 0 1px;
      }

      .add-animation {
        position: relative;
        z-index: 3;
        background: #fff;
        color: #000;
        border-radius: 0;
        border: 0;
        cursor: pointer;
      }
      .add-animation:hover {
        background: #ddd;
      }

    </style>
    <div class="item">
      <div class="scenes">
        <div>{{getTime(time, duration)}}</div>
        <div class="progress">
          <div class="needle"></div>
        </div>
        <template is="dom-repeat" items="{{ scenes }}" as="scene">
          <div class="scene">
            <label class="scene-label">{{scene.key}}</label>
            <div class="bar">
              <div class="timeline">
                <template is="dom-repeat" items="{{ measures }}" as="measure">
                  <template is="dom-repeat" items="{{ measure.steps }}" as="step">
                    <div class="step" on-click="handleClick"></div>
                  </template>
                </template>
              </div>
              <template is="dom-repeat" items="{{ scene.value.layers }}" as="layer">
                <div class="animations">
                  <div><button class="add-animation" on-click="addAnimation" data-layer$="{{layer.layerId}}" data-scene$="{{scene.key}}">Add Animation</button></div>
                  <template is="dom-repeat" items="{{ layer.animations }}" as="animation">
                    <h3 class="animation-id">{{animation.animationId}}</h3>
                    <template is="dom-repeat" items="{{ animation.timeline.data }}" as="timeline">
                      <div class$="animation-timeline {{isActive(time, animation.duration)}}"
                           style$="--duration: {{animation.duration}};">
                        <h3 class="timeline-name">{{timeline.name}}</h3>
                        <template is="dom-repeat" items="{{timeline.keyframes}}" as="keyframe">
                          <div class$="keyframe {{isActiveFrame(time, animation.duration, keyframe.time, timeline.keyframes, index)}}"
                               style$="--start: {{keyframe.time}}; --end: {{getEnd(animation.duration, keyframe.time, timeline.keyframes, index)}}">
                            <div class="keyframe-label">
                            {{timeline.name}}
                            <br/>
                            {{keyframe.value}}
                            </div>
                          </div>
                        </template>
                      </div>
                    </template>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
    `
  }
}

customElements.define('timeline-item', TimelineItem)
