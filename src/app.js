import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'
import '/src/components/tap-button/index.js'
import '/src/components/connect-button/index.js'
import '/src/components/connect-bluetooth-button/index.js'
import '/src/components/download-config-button/index.js'
import '/src/components/bpm-meter/index.js'
import '/src/components/channel-grid/index.js'
import '/src/components/device-list/index.js'
import '/src/components/midi-manager/index.js'
import '/src/components/timeline-item/index.js'

import BluetoothManager from '/src/core/BluetoothManager.js'
import USBManager from '/src/core/USBManager.js'
import MidiManager from '/src/core/MidiManager.js'
import StorageManager from '/src/core/StorageManager.js'
import DeviceManager from '/src/devices/DeviceManager.js'
import AnimationManager from '/src/core/AnimationManager.js'
import SceneManager from '/src/core/SceneManager.js'
import Render from '/src/core/Render.js'
import Configuration from '/src/core/Configuration.js'

function flatten(arr) {
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);
}

class AppContent extends PolymerElement {

  constructor() {
    super()
    this.storage = new StorageManager()
    this.configuration = new Configuration({
      storage: this.storage,
      restore: false
    })
    this.config = this.configuration
    window.configuration = this.configuration

    this.bluetooth = new BluetoothManager({ configuration: this.configuration })

    this.usb = new USBManager({ configuration: this.configuration })
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
    // this.render.start(this.config.getConfig().global.fps)

    this.deviceManager.reset()

    const bpm = this.configuration.getConfig().global.bpm || 120
    const measures = 8
    this.state = {
      bpm: bpm,
      measures,
      connected: false,
      bluetoothConnected: false,
      time: new Date(),
      duration: ~~(60 / bpm * 1000 * measures)
    }

    this.dmxList = [...this.deviceManager.list].map((e, i) => {
      const [key, value] = e

      return {
        id: key,
        channel: i,
        bufferOffset: value.instance.bufferOffset,
        deviceId: value.instance.deviceId,
        type: value.type,
        params: Object.keys(value.instance.params).map(x => ({
          param: x,
          channels: value.instance.params[x].channels
        }))
      }
    })
    this.scenesList = [...this.sceneManager.list].map((e, i) => {
      const [key, value] = e
      return {key, value}
    })

    this.dmxList.sort((a, b) => a.bufferOffset - b.bufferOffset)
    // console.log(this.scenesList)
  }

  setState(newState) {
    if (typeof this.state === 'object') {
      Promise.resolve().then(()=> {
        this.state = {...(this.state), ...newState}
      })
    } else {
      throw new Error('no state is available. Please make sure to define an initital state in your constructor')
    }
  }

  connectedCallback() {
    super.connectedCallback()
    this.listen()
    this.setTime()
  }

  setTime(){
    const {time, bpm, measures, duration} = this.state
    const now = new Date()
    const timeCounter = (now - time) / duration
    if (now - time > duration) {
      this.setState({
        time: now,
      })
    }
    this.setState({
      timeCounter
    })
    this.runTimeline(timeCounter)
    requestAnimationFrame(this.setTime.bind(this))
  }

  runTimeline(counter) {
    const values = this.getValues(counter)

    values.forEach(scene => {
      scene.children.forEach(layer => {
        layer.children.forEach(animation => {
          animation.animation.values = animation.children
          animation.animation.run()


          animation.children.forEach(prop => {
            const [r, g, b] = prop.children
            console.log(`${prop.name} (${layer.devices.join(', ')}): rgb(${~~(r)}, ${~~(g)}, ${~~(b)})`)
          })
        })
      })
    })

    // Render all DMX devices into a buffer
    this.render.run()
  }

  getValues(counter) {
    const items = this.scenesList.map(scene => {
      return {
        id: scene.key,
        children: scene.value.layers.map(layer => {
          return {
            id: layer.layerId,
            devices: layer.devices,
            children: layer.animations.map(animation => {
              const progress = counter * this.state.measures / animation.duration
              const values = animation.timeline.values(progress)
              return {
                id: animation.animationId,
                devices: animation.devices,
                animation: animation,
                children: Object.keys(values).map(key => {
                  return {
                    name: key,
                    children: values[key]
                  }
                })
              }
            })
          }
        })
      }
    })

    return items
  }

  ready() {
    super.ready()
  }

  listen() {
    window.addEventListener('USBDriver', event => {
      const {connected} = event.detail
      // Connection status for USB DMX controller
      this.configuration.getConfig().dmxInterface.connected = connected
      this.setState({connected})
    })
  }

  handleTap(e) {
    const {bpm} = e.detail
    const duration = ~~(60 / bpm * 1000 * this.state.measures)
    this.configuration.data.global.bpm = bpm
    this.setState({bpm, duration})
  }

  handleConnect(e) {
    this.usb.enable()
  }

  handleDisconnect(e) {
    this.usb.port.disconnect()
    this.usb.port = null
  }

  handleUpdate(e) {
    const { value, channelId } = e.detail
    this.usb.update(channelId, value)
  }

  handleBluetoothConnect(e) {
    this.bluetooth.enable()
    this.state.bluetoothConnected = true
  }

  handleBluetoothDisconnect(e) {
  }


  handleDownload(e) {
    console.log(window.configuration.data)
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
    <div class="flex" style="--bpm: {{state.bpm}}">
        <section class="left">
          <connect-button connected="{{state.connected}}"
                          on-connect="handleConnect"
                          on-disconnect="handleDisconnect"></connect-button>
          <connect-bluetooth-button connected="{{state.bluetoothConnected}}"
                          on-connect="handleBluetoothConnect"
                          on-disconnect="handleBluetoothDisconnect"></connect-bluetooth-button>

          <download-config-button on-download="handleDownload"></download-config-button>

          <!-- <midi-manager class="two"
                        config="{{config.getConfig()}}"></midi-manager>-->

          <bpm-meter bpm="{{state.bpm}}"></bpm-meter>
          <tap-button class="one"
                      on-tap="handleTap"
                      delay="1500"
                      items="2"
                      controllerId="korgnanopad2"
                      partId="button16"
                      ></tap-button>

        </section>
        <section class="right">
          <timeline-item scenes="{{scenesList}}"
                         time="{{state.timeCounter}}"
                         duration="{{state.duration}}"
                         bpm="{{state.bpm}}"
                         measure$="{{state.measures}}"></timeline-item>
          <!-- <channel-grid></channel-grid> -->
          <device-list on-update="handleUpdate"
                       list="{{dmxList}}"></device-list>
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
