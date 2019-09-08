import { LitElement, html } from 'lit-element'
import { store } from '../../reduxStore.js'
import { setBpm } from '../../actions/index.js'

/**
 * The tap button renders a button to manually set the bpm.
 * It waits for a given number of positions.
 */
export class TapButton extends LitElement {
  constructor() {
    super()

    this.delay = 2000
    this.items = 4

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

  static get properties() {
    return {
      delay: { type: Number },
      items: { type: Number }
    }
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

      // There are enough samples
      if (this.arr.length > this.items) {
        const diffs = this.arr.reduce((result, t) => result += t)
        this.arr.shift()
        this.average = diffs / this.arr.length
        this.bpm = ~~(60000 / this.average)

        // Save BPM into store
        store.dispatch(setBpm(this.bpm))
      }

    } else {
      this.ticking = true
    }
  }

  render() {
    return html`
      <button @click="${() => this.run()}">TAP</button>
    `
  }
}

customElements.define('tap-button', TapButton)
