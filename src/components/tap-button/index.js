import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'

/**
 * The tap button renders a button to manually set the bpm.
 * It waits for a given number of positions.
 */
export class TapButton extends PolymerElement {
  constructor() {
    super()

    this.bpm = 0
    this.arr = []
    this.date = {
      then: new Date(),
      now: new Date()
    }
    this.timer = setTimeout(() => {}, 0)
    this.ticking = false
    this.average = 0
  }

  ready() {
    super.ready()
    this.options = {
      delay: this.attributes.delay || { value: 2000 },
      items: this.attributes.items || { value: 4 },
      controllerId: this.attributes.controllerId || { value: '' },
      partId: this.attributes.partId || { value: '' }
    }

    this.delay = this.options.delay.value
    this.items = this.options.items.value
    this.controllerId = this.options.controllerId.value
    this.partId = this.options.partId.value

    this.listen()
  }

  handleClick() {
    this.run()
  }

  run() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.ticking = false
      this.arr = []
    }, this.delay)

    this.date.then = this.date.now
    this.date.now = new Date()
    this.diff = this.date.now - this.date.then

    if (this.ticking) {
      this.arr.push(this.diff)

      if (this.arr.length > this.items) {
        const diffs = this.arr.reduce((result, t) => result += t)
        this.arr.shift()
        this.average = diffs / this.arr.length
        this.bpm = ~~(60000 / this.average)

        this.dispatchEvent(new CustomEvent('tap', { detail: { bpm: this.bpm } }))
      }

    } else {
      this.ticking = true
    }
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
        --height: 3em;
        --background: var(--background-lighter);
      }
      button {
          box-sizing: border-box;
          height: var(--height);
          width: calc(100% - 1em);
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
      <button on-click="handleClick">TAP</button>
    `
  }
}

customElements.define('tap-button', TapButton)
