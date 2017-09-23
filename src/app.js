import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'
import '/src/components/tap-button/index.js'
import '/src/components/connect-button/index.js'
import '/src/components/bpm-meter/index.js'
import '/src/components/channel-grid/index.js'

import USBManager from '/src/core/USBManager.js'
import StorageManager from '/src/core/StorageManager.js'
import DeviceManager from '/src/devices/DeviceManager.js'
import getConfig from '/src/core/GetConfig.js'

class AppContent extends PolymerElement {

  constructor() {
    super()
    this.bpm = 0
    this.connected = false

    this.storage = new StorageManager()
    this.config = getConfig()
    console.log(this.config)

    window.usbManager = this.usb
    this.usb = new USBManager({ config: this.config })

    this.deviceManager = new DeviceManager({
      config: this.config,
      output: this.usb.output
    })
    this.deviceManager.register()
  }

  ready() {
    super.ready()
  }

  handleTap(e) {
    this.bpm = e.detail.bpm
  }

  handleConnect(e) {
    this.connected = e.detail.connected

    this.usb.enable()
  }

  handleDisconnect(e) {
    this.connected = e.detail.connected
    this.usb.port.disconnect()
    this.usb.port = null
  }

  handleGrid(e) {
    const { value, channelId } = e.detail
    console.log('value:', value, 'channelId:', channelId)

    this.usb.update(channelId, value)
  }

  static get template() {
    return `
    <div>
        <bpm-meter bpm="{{bpm}}"></bpm-meter>
        <connect-button connected="{{connected}}"
                        on-connect="handleConnect"
                        on-disconnect="handleDisconnect"></connect-button>
        <tap-button class="one"
                    on-tap="handleTap"
                    delay="1000"
                    items="3"></tap-button>
        <channel-grid on-update="handleGrid"
                      config="{{config}}"></channel-grid>
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

customElements.define('app-content', AppContent)
customElements.define('my-app', RenderApp)
