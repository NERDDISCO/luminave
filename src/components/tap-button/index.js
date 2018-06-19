import { PolymerElement, html } from '/node_modules/@polymer/polymer/polymer-element.js'
import reduxMixin from '../../reduxStore.js'
import { setBpm } from '../../actions/index.js'

/**
 * The tap button renders a button to manually set the bpm.
 * It waits for a given number of positions.
 */
export class TapButton extends reduxMixin(PolymerElement) {
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
      items: this.attributes.items || { value: 4 }
    }

    this.delay = this.options.delay.value
    this.items = this.options.items.value
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

        // @see https://tur-nr.github.io/polymer-redux/docs#dispatching-actions
        this.dispatch(setBpm(this.bpm))
      }

    } else {
      this.ticking = true
    }
  }

  static get template() {
    return html`
      <button on-click="handleClick">TAP</button>
    `
  }
}

customElements.define('tap-button', TapButton)
