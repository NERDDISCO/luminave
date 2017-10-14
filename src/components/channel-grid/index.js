import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import '../channel-input/index.js'

class ChannelGrid extends PolymerElement {

  constructor() {
    super()
  }

  ready() {
    super.ready()
  }

  handleUpdate(e) {
    const { value, channelId } = e.detail
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        value,
        channelId
      }
    }))
  }

  connectedCallback() {
    super.connectedCallback()
     console.log(this.list)
 }

  static get template() {
    return `
      <style>
        .flex {
          display: flex;
          flex-wrap: wrap;
        }
        channel-input {
          flex: 0 0 33.3%;
        }

        .view {
          background: var(--background);
          color: var(--color);
        }
        .item-id, .param, .spacer {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 0;
          font-size: 1em;
          margin: 0;
          padding: 0.5em;
          font-family: monospace;
          font-weight: normal;
        }
        .item-id {
          flex-basis: 100%;
        }
        .param {
          flex-basis: 100%;
        }
      </style>
      <div class="flex view">
        <template is="dom-repeat" items="{{ list }}">
          <span class="item-id">{{item.id}}</span>
          <template is="dom-repeat" items="{{ item.params }}" as="param">
            <span class="param">{{param.param}}</span>
            <template is="dom-repeat" items="{{ param.channels }}" as="channel">
              <channel-input channel$="{{channel}}" offset$="{{item.bufferOffset}}" on-update="handleUpdate"></channel-input>
            </template>
          </template>
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
