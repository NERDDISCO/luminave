import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'
import '/src/components/tap-button/index.js'
import '/src/components/connect-button/index.js'
import '/src/components/bpm-meter/index.js'
import '/src/components/channel-grid/index.js'
import '/src/components/midi-manager/index.js'

import USBManager from '/src/core/USBManager.js'
import MidiManager from '/src/core/MidiManager.js'
import StorageManager from '/src/core/StorageManager.js'
import DeviceManager from '/src/devices/DeviceManager.js'
import AnimationManager from '/src/core/AnimationManager.js'
import SceneManager from '/src/core/SceneManager.js'
import Render from '/src/core/Render.js'
import Configuration from '/src/core/Configuration.js'

class AppContent extends PolymerElement {

  constructor() {
    super()
    this.bpm = 0
    this.connected = false

    this.storage = new StorageManager()
    this.configuration = new Configuration({
      storage: this.storage,
      restore: true
    })
    this.config = this.configuration

    this.usb = new USBManager({ config: this.config.getConfig() })
    window.usbManager = this.usb

    // Manage connected MIDI devices
    this.midiManager = new MidiManager({ config: this.config.getConfig() })
    // Expose it globally so we can use it in the console
    window.midiManager = this.midiManager

    this.deviceManager = new DeviceManager({
      configuration: this.configuration,
      output: this.usb.output
    })
    this.deviceManager.register()

    // Initialize all animations
    this.animationManager = new AnimationManager({
      config: this.config.getConfig(),
      deviceManager: this.deviceManager
    })
    this.animationManager.register()

    // Initialize all scenes
    this.sceneManager = new SceneManager({
      config: this.config.getConfig(),
      animationManager: this.animationManager
    })
    this.sceneManager.register()

    // Manage playback of all animations, scenes, timelines
    this.render = new Render({
      config: this.config,
      dmxUsbInterface: this.usb,
      sceneManager: this.sceneManager
    })
    this.render.start(this.config.getConfig().global.fps)

    this.deviceManager.reset()

    this.dmxList = [...this.deviceManager.list].map((e, i) => {
      const [key, value] = e

      return {
        id: key,
        channel: i,
        bufferOffset: value.instance.bufferOffset,
        deviceMapping: [...value.deviceMapping].map(e => e[1]),
        instance: value.instance,
        type: value.type,
        params: Object.keys(value.instance.params).map(x => ({
          param: x,
          channels: value.instance.params[x].channels
        }))
      }
    })
    // Dummy filter to show LED PAR
    // filter(item => item.id.match('fungeneration'))

    this.dmxList.sort((a, b) => a.bufferOffset - b.bufferOffset)
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
    <style>
      .flex {
        display: flex;
        flex-wrap: wrap;
      }
      .left {
        flex: 0 0 20em;
      }

      .right {
        flex: 1 1 20em;
      }
    </style>
    <div class="flex">
        <section class="left">
          <connect-button connected="{{connected}}"
                          on-connect="handleConnect"
                          on-disconnect="handleDisconnect"></connect-button>

          <midi-manager class="two"
                        config="{{config.getConfig()}}"></midi-manager>

          <bpm-meter bpm="{{bpm}}"></bpm-meter>
          <tap-button class="one"
                      on-tap="handleTap"
                      delay="1000"
                      items="3"></tap-button>

        </section>
        <section class="right">
          <channel-grid on-update="handleGrid"
                        list="{{dmxList}}"></channel-grid>
        </section>
    </div>
    `
  }
}

class MyApp extends PolymerElement {
  static get template() {
    return render(html`<app-content></app-content>`, document.body)
  }
}
customElements.define('my-app', MyApp)
customElements.define('app-content', AppContent)
