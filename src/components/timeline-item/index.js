import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

class TimelineItem extends PolymerElement {

  constructor() {
    super()
    this.measures = [...Array(1).fill().map(x => {
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

      .timeline {
        display: flex;
        position: relative;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
      }

      .step {
        position: relative;
        border-right: 1px solid;
        flex: 1;
        z-index: 1;
        background: rgba(0, 0, 0, 0.1);
        cursor: pointer;
      }

      .step:hover {
        background: rgba(0, 0, 0, 0.5);
      }

      .item {
        display: flex;
        flex-direction: column;
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
      }

      .scene-label {
        width: 200px;
        padding: 2em 0.5em;
      }

    </style>
    <div class="item">
      <div class="scenes">
        <template is="dom-repeat" items="{{ scenes }}" as="scene">
          <div class="scene">
            <label class="scene-label">{{scene}}</label>
            <div class="bar">
             <div class="timeline">
                <template is="dom-repeat" items="{{ measures }}" as="measure">
                  <template is="dom-repeat" items="{{ measure.steps }}" as="step">
                    <span class="step" on-click="handleClick"></span>
                  </template>
                </template>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    `
  }
}

customElements.define('timeline-item', TimelineItem)
