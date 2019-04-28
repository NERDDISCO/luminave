
import { LitElement, html } from 'lit-element/lit-element.js'
import { defaultValue } from '../../directives/default-value.js'
import { classMap } from 'lit-html/directives/classMap.js'

/*
 * Handle the configuration of an integration (like the API of modV)
 */
class IntegrationConfiguration extends LitElement {

  static get properties() {
    return {
      name: { type: String, reflect: true },
      connected: { type: Boolean },
      url: { type: String },
      defaultUrl: { type: String },
      reconnect: { type: Boolean },
      reconnectIntervalConfigurable: { type: Boolean },
      connectionStatus: { type: String }
    }
  }

  constructor() {
    super()

    this.name = 'Configuration'
    this.reconnect = false
    this.reconnectInterval = 5000
    // Is it possible to set the reconnect inteval? 
    this.reconnectIntervalConfigurable = false
    this.connectionStatus = 'disconnected'
    this._reconnectTimer = undefined
    this.defaultUrl = 'localhost'
  }

  handleUrlChange(e) {
    const url = e.target.value
    this.url = url
    this.dispatchEvent(new CustomEvent('url-changed', { detail: { url } }))
  }

  handleReconnectChange(e) {
    const reconnect = e.target.checked
    this.reconnect = reconnect
    this.dispatchEvent(new CustomEvent('reconnect-changed', { detail: { reconnect } }))
  }

  handleClick(e) {
    e.preventDefault()

    // Close active connection
    if (this.connected) {
      this.dispatchEvent(new CustomEvent('close-connection', { detail: {} }))

    // Create new connection
    } else {
      this.dispatchEvent(new CustomEvent('open-connection', { detail: {} }))
    }
  }

  render() {
    const { connected, url, defaultUrl, reconnect, reconnectIntervalConfigurable, connectionStatus, reconnectInterval } = this

    const connectedLabel = connected 
    ? 'disconnect'
    : 'connect'

    

    const statusClasses = {
      'status': true,
      'connected': connectionStatus === 'connected',
      'disconnected': connectionStatus === 'disconnected',
      'error': connectionStatus === 'error'
    }

    return html`
      <style>
        .width {
          width: 220px;
        }

        .status {
          position: relative;
          width: 1.85em;
          height: 1.25em;
          display: inline-block;
        }

        .status:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          padding: .25em;
          background: #fff;
          font-size: 1rem;
          line-height: 1rem;
        }

        .status.connected:after {
          content: '❤️';
        }

        .status.error:after {
          content: '💀';
        }

        .status.disconnected:after {
          content: '👀';
        }
      </style>

      <div class="${classMap(statusClasses)}" title="${connectionStatus}"></div>

      <label for="url">URL</label>
      <input class="width" name="url" type="text" 
        value="${defaultValue(url, defaultUrl)}" 
        @change="${e => this.handleUrlChange(e)}" required />

      <label for="reconnect">Auto-Reconnect</label>
      <input name="reconnect" type="checkbox" 
        .checked="${reconnect}"
        @click="${e => this.handleReconnectChange(e)}" />

      ${
        reconnect && reconnectIntervalConfigurable
        ? html`
          <input name="reconnectInterval" type="number" 
            value="${reconnectInterval}"
            @change="${e => this.handleIntervalChange(e)}" />
        `
        : ''
      }

      <button @click="${e => this.handleClick(e)}">${connectedLabel}</button>
    `
  }
}

customElements.define('integration-configuration', IntegrationConfiguration)
