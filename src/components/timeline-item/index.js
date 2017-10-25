import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import Animation from '/src/core/Animation.js'
import '/src/components/scene-item/index.js'
import '/src/components/timeline-grid/index.js'

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

  getTime(time, duration) {
    return time * duration
  }

  addAnimation(e) {
    const {target} = e
    const {layer, scene} = target.dataset
    this.openPrompt()
    this._addAnimation(scene, layer)
  }

  openPrompt() {
    // open dialog with input mask
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

  handleClick(e){
    const {active, scene} = e.target.dataset
    this.dispatchEvent(new CustomEvent('activate', {detail: {
      scene,
      active: active === 'yes' ? true : false,
    }}))
  }

  activeLabel(active) {
    return active ? 'deactivate' : 'activate'
  }

  activeState(active) {
    return active ? 'yes' : 'no'
  }

  static get template() {
    return `
     <style>
      :host {
        font-family: monospace;
      }

      .item {
        position: relative;
      }

      .scenes {
        position: relative;
      }
    </style>

    <div class="item">
      <timeline-grid measures="{{measures}}" progress="{{time}}"></timeline-grid>
      <div class="scenes">
        <template is="dom-repeat" items="{{ scenes }}" as="scene">
          <!-- <button on-click="handleClick" data-scene$="{{scene.key}}" data-active$="{{activeState(scene.value.config.active)}}">{{activeLabel(scene.value.config.active)}}</button> -->
          <scene-item measures={{measureCount}} scene="{{scene}}" time="{{time}}"></scene-item>
        </template>
      </div>
    </div>
    `
  }
}

customElements.define('timeline-item', TimelineItem)
