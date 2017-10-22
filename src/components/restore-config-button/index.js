import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

/**
 * The tap button renders a button to manually set the bpm.
 * It waits for a given number of positions.
 */
export class RestoreConfigButton extends PolymerElement {
  constructor() {
    super()
  }

  ready() {
    super.ready()
    this.options = {
      controllerId: this.attributes.controllerId || { value: '' },
      partId: this.attributes.partId || { value: '' }
    }

    this.controllerId = this.options.controllerId.value
    this.partId = this.options.partId.value

    this.listen()
  }

  handleClick() {
    this.run()
  }

  run() {
    this.dispatchEvent(new CustomEvent('restore', { detail: { } }))
  }

  /*
   * Listen to events to start this Scene.
   *
   * @TODO: Does this make any sense at this position / class?
   */
  listen() {

    window.addEventListener('MidiController', event => {
      const data = event.detail

      // Only allow the MIDI controller that was attachted to this scene
      if (data.controllerId === this.controllerId) {

        // Only allow a specific input element (button or knob) from the MIDI controller
        if (data.partId === this.partId) {
          this.run()
        }
      }
    })
  }

  static get template() {
    return `
    <style>
      :host {
        --background: var(--background-lighter);
      }
      button {
          box-sizing: border-box;
          height: var(--height);
          width: calc(50% - 1em);
          border: 0;
          font-size: 1em;
          line-height: calc(var(--height) - 1em);
          margin: 0.3em 0 0 0;
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
      <button on-click="handleClick">Restore Config</button>
    `
  }
}

customElements.define('restore-config-button', RestoreConfigButton)
