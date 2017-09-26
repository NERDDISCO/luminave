import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class ChannelInput extends PolymerElement {

  constructor() {
    super();
  }

  ready(){
    super.ready()
  }

  connectedCallback() {
    super.connectedCallback()
    const channel = parseInt(this.attributes.channel.value, 10) - 1
    const offset = parseInt(this.attributes.offset.value, 10)
    this.channelId = channel + offset
    this.channel =  this.channelId + 1
    this.value =  0
  }
  handleInput(e) {
    this.dispatchEvent(new CustomEvent('update', {
      detail: {
        channel: this.channel,
        channelId: this.channelId,
        value: e.target.value
      }
    }))
    this.value =  Math.min(255, Math.max(0, e.target.value))
  }

  static get template() {
    return `
       <style>
        :host {
          --channel-width: 4em;
          --thumb: var(--color);
        }
        .item {
          display: flex;
          align-items: center;
          font-family: monospace;
        }

        .channel {
          box-sizing: border-box;
          flex: 0 0 var(--channel-width);
          padding: 0 0.5em;
          display: flex;
          justify-content: flex-start;
          display: flex;
          align-items: center;
          height: 3em;
          padding: 0.5em;
          box-shadow: 0 0 0 1px;
        }
        .input {
          box-sizing: border-box;
          flex: 0 0 calc(100% - var(--channel-width));
          width: calc(100% - var(--channel-width));
          max-width: calc(100% - var(--channel-width));
          display: flex;
          height: 3em;
          padding: 0.5em;
          box-shadow: 0 0 0 1px;
        }
        input {
          box-sizing: border-box;
          height: 2em;
          border: 0;
          font-size: 1em;
          line-height: 1em;
          width: 100%;
          margin: 0;
          padding: 0;
          background: none;
          font-family: inherit;
          color: var(--color);
          background: var(--background);
          box-shadow: 0 0 0 1px var(--color);
        }

        input:focus {
          outline: 0;
          --color: var(--focus-color);
          --background: var(--focus-background);
          --thumb: var(--focus-color);
        }
        .value {
          box-sizing: border-box;
          flex: 0 0 4em;
        }
        .value input {
          text-align: center;
        }
        .range {
          box-sizing: border-box;
          flex: 1;
          padding-right: 0.5em;
        }
        .range input {
          -webkit-appearance: none;
        }
        .range input::-webkit-slider-runnable-track {
          background-color: transparent;
          padding: 0.25em;
        }
        .range input::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 1.5em;
          width: 1em;
          background: var(--thumb);
          box-shadow: 0 0 0 1px;
          cursor: -webkit-grab;
        }
        .range input:active,
        .range input:active *,
        .range input:active::-webkit-slider-thumb {
          cursor: -webkit-grabbing;
        }
      </style>
      <label class="item">
        <span class="channel">CH[[channel]]</span>
        <div class="input">
          <div class="range"><input on-input="handleInput" value="[[value]]" type="range" min="0" max="255"/></div>
          <div class="value"><input on-input="handleInput" value="[[value]]" type="telephone"/></div>
        </div>
     </label>
    `
  }
}

customElements.define('channel-input', ChannelInput)
