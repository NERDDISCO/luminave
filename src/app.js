import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'


import USBManager from './core/USBManager.js'
import StorageManager from './core/StorageManager.js'

const usbManager = new USBManager({})
usbManager.enable()

const storageManager = new StorageManager({})
storageManager.save('config', {
  test: 1,
  foo: 'bar'
})

console.log(storageManager.load('config'))

const header = title => html `<h1>${title}</h1>`;

class tapButton extends PolymerElement {

  constructor() {
    super();
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

  handleClick() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.ticking = false
      this.arr = []
    }, 2000)
    this.date.then = this.date.now
    this.date.now = new Date()
    this.diff = this.date.now - this.date.then
    if (this.ticking) {
      console.log(this.ticking, this.arr)
      this.arr.push(this.diff)
      if (this.arr.length > 3) {
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

  static get template() {
    return `
        <button on-click="handleClick">TAP</button>
    `
  }
}

class bpmMeter extends PolymerElement {

  constructor() {
    super();
  }

  static get template() {
    return `
        <h3>[[bpm]]</h3>
    `
  }
}

class AppContent extends PolymerElement {

  constructor() {
    super()
    this.bpm = 0
  }

  ready() {
    super.ready()
  }

  handleTap(e) {
    this.bpm = e.detail.bpm
  }

  static get template() {
    return `
    <div>
        <bpm-meter bpm="{{bpm}}"></bpm-meter>
        <tap-button class="one" on-tap="handleTap"></tap-button>
    </div>
    `
  }
}

class RenderApp extends PolymerElement {

  static get template() {
    return render(html `
    <app-content></app-content>
    `, document.body)
  }
}

customElements.define('bpm-meter', bpmMeter)
customElements.define('tap-button', tapButton)
customElements.define('app-content', AppContent)
customElements.define('my-app', RenderApp)
