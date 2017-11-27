import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { DomRepeat } from '/node_modules/@polymer/polymer/lib/elements/dom-repeat.js'
import ReduxMixin from '../../reduxStore.js'

/*
 * Show DMX512 channels in a grid
 */
class ChannelGrid extends ReduxMixin(PolymerElement) {
  static get properties() {
    return {
      universe: {
          type: Number
      },
      universes: {
        type: Array,
        statePath: 'universeManager'
      }
    }
  }
  getUniverse(universes, universe) {
    if (universes) {
      const {channels} = universes[universe]
      return channels
    }
    return []
  }
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
        <template is="dom-repeat" items="{{getUniverse(universes, universe)}}" as="channel">
          <div class="item">{{channel}}</div>
        </template>
      </div>
    `
  }

}

customElements.define('channel-grid', ChannelGrid)
