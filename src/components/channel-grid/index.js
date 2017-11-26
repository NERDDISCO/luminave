import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'

class ChannelGrid extends PolymerElement {
  static get template() {
    return `
      <style>
        .items {
          display: flex;
          flex-wrap: wrap;
        }
        .item {
          flex: 0 0 2em;
        }
      </style>

      <div class="items">
        <template is="dom-repeat" items="[[array]]" as="channel">
          <div class="item">[[channel]]</div>
        </template>
      </div>
    `
  }
  static get properties() {
    return {
      list: {
          Type: Array,
          notify: true
      }
    }
  }
}

customElements.define('channel-grid', ChannelGrid)
