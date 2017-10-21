import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

class DownloadConfigButton extends PolymerElement {

  constructor() {
    super()
  }
  ready(){
    super.ready()
  }

  handleClick(e) {
    this.dispatchEvent(new CustomEvent('download', { detail: { e } }))
  }

  static get template() {
    return `
        <style>
        button {

          --background: hsla(120, 40%, 20%, var(--connected));
          /*--color: hsla(120, 40%, 60%, var(--connected));*/

            box-sizing: border-box;
            height: 2em;
            border: 0;
            font-size: 1em;
            line-height: 1em;
            margin: 05.em;
            padding: 0.5em 1em;
            font-family: monospace;
            border-radius: 0;
            color: var(--color);
            background: var(--background);
            box-shadow: 0 0 0 1px var(--color);
            cursor: pointer;
          }

        button:focus {
          outline: 0;
          --color: var(--focus-color);
          --background: var(--focus-background);
        }

        button:active {
          --background: var(--background-darker);
          --color: var(--color-lighter);
        }
      </style>
      <button on-click="handleClick">Config</button>
    `
  }
}

customElements.define('download-config-button', DownloadConfigButton)
