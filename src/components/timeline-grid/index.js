import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import {styles} from './styles.js'

class TimelineGrid extends PolymerElement {
  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
  }

  static get template() {
    return `
      <style>
        ${styles}
      </style>
      <div class="progress" style$="--progress:{{progress}}">
        <div class="needle"></div>
      </div>
      <div class="grid">
        <div class="bar">
          <div class="timeline">
            <template is="dom-repeat" items="{{ measures }}" as="measure">
              <template is="dom-repeat" items="{{ measure.steps }}" as="step">
                <div class="step"></div>
              </template>
            </template>
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('timeline-grid', TimelineGrid)
