import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

class TimelineItem extends PolymerElement {

  constructor() {
    super()
    this.measrureCount = 8
    this.measures = [...Array(this.measrureCount).fill().map(x => {
      const steps = [...Array(4).fill().map(x => x)]
      return {
        steps
      }
    })]
    this.steps = this.measures.length * this.measures[0].steps.length
  }

  ready(){
    super.ready()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  addItem(target) {
  }

  handleClick(e) {
    this.addItem(e.target)
  }

  static get template() {
    return `
     <style>
      :host {
          font-family: monospace;
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
        height: 2em;
        margin-left: 20em;
        background: rgba(255, 255, 255, 0.5);
        transform-origin: 0 0;
        animation: move-progress calc(60s / var(--bpm) * {{measrureCount}}) linear infinite;
      }

      @keyframes move-progress {
        0% {
          transform: scale3d(0, 1, 1);
        }
        100% {
          transform: scale3d(1, 1, 1);
        }
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
        top: 0.5em;
        bottom: 0;
        left: calc(var(--time) * 100%);
        height: 3em;
        width: 3em;
        border-radius: 50%;
        transform: translateX(-50%);
        cursor: pointer;
      }
      .keyframe::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 5px;
        height: 5px;
        border-radius: 50%;
        transform: translate(-50%, -50%);
        background: currentcolor;
      }
      .keyframe:hover {
        z-index: 4;
      }

      .keyframe:hover .keyframe-label,
      .keyframe:hover .keyframe-value {
        display: block;
      }

      .keyframe-label {
        display: none;
        position: absolute;
        top: 0;
        left: 1em;
        padding: 0.25em 0.5em;
        background: rgba(0, 0, 0, 0.3);
      }

      .animation-timeline {
        position: relative;
        display: flex;
        height: 6em;
        box-shadow: inset 0 0 0 1px;
        width: calc(var(--duration) / {{measrureCount}} * 100%);
        background: rgba(0, 0, 0, 0.3);
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

    </style>
    <div class="item">
      <div class="scenes">
        <div class="progress"></div>
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
                  <template is="dom-repeat" items="{{ layer.animations }}" as="animation">
                    <h3 class="animation-id">{{animation.animationId}}</h3>
                    <template is="dom-repeat" items="{{ animation.timeline.data }}" as="timeline">
                      <div class="animation-timeline" style="--duration: {{animation.duration}}">
                        <h3 class="timeline-name">{{timeline.name}}</h3>
                        <template is="dom-repeat" items="{{timeline.keyframes }}" as="keyframe">
                          <div class="keyframe" style="--time: {{keyframe.time}}">
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
