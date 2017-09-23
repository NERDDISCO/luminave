import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'
import { TapButton } from '/src/components/tap-button/index.js'
import { BPMMeter } from '/src/components/bpm-meter/index.js'

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
        <tap-button class="one"
                    on-tap="handleTap"
                    delay="1000"
                    items="3"></tap-button>
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

customElements.define('bpm-meter', BPMMeter)
customElements.define('tap-button', TapButton)
customElements.define('app-content', AppContent)
customElements.define('my-app', RenderApp)
