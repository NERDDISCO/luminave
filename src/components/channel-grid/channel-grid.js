import { LitElement, html } from 'lit-element'
import { shared } from '../../styles/shared.js'

/*
 * Show DMX512 channels in a grid
 */
class ChannelGrid extends LitElement {
  static get properties() {
    return { 
      channels: { type: Array },
      refresh: { type: Boolean }
    }
  }

  /**
   * When the value of a speicifc channel is updated, we send out an event. 
   * 
   * @param {Object} e - The event that contains the channel and it's value
   */
  handleChange(e) {
    const { value } = e.target
    const { channelIndex } = e.target.dataset
    const channelValue = parseInt(value, 10)

    this.dispatchEvent(new CustomEvent('update-channel', {
      detail: {
        channelIndex,
        channelValue
      }
    }))
  }

  shouldUpdate(changedProps) {
    const { refresh } = this

    // Make sure that when refresh is changed (especially to false) 
    // that the component renders at least once so that something is visible for the user
    if (changedProps.has('refresh')) {
      return true
    }

    return refresh
  }

  render() {
    const { channels } = this

    return html`
      ${shared}

      <style>
        .items {
          counter-reset: universe;
        }

        .item {
          flex: 0 0 3em;
          position: relative;
          padding: 0 .25em 0 1.75em;
        }

        .item:before {
          position: absolute;
          top: 0;
          left: 0;
          counter-increment: universe;
          content: counter(universe); 
          font-size: 0.65em;
          opacity: 0.7;
        }
      </style>

      <div class="items">

        ${channels.map((channel, index) => html`
          <div class="item">
            <input 
              type="number" 
              min=0 
              max=255
              .value="${channel}" 
              data-channel-index="${index}"
              @change="${e => this.handleChange(e)}"
            />
          </div>
          `
        )}
      </div>
    `
  }

}

customElements.define('channel-grid', ChannelGrid)
