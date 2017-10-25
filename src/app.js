import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { html } from '/node_modules/lit-html/lit-html.js'
import { render } from '/node_modules/lit-html/lib/lit-extended.js'
import '/src/components/tap-button/index.js'
import '/src/components/connect-button/index.js'
import '/src/components/restart-button/index.js'
import '/src/components/pause-button/index.js'
import '/src/components/connect-bluetooth-button/index.js'
import '/src/components/download-config-button/index.js'
import '/src/components/restore-config-button/index.js'
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

      // true: Restore configuration from config.js
      // false: Load configuration from localStorage
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
    window.deviceManager = this.deviceManager
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
    window.sceneManager = this.sceneManager
    this.sceneManager.register()

    // Manage playback of all animations, scenes, timelines
    this.render = new Render({
      config: this.config,
      dmxUsbInterface: this.usb,
      sceneManager: this.sceneManager
    })

    this.deviceManager.reset()

    const bpm = this.configuration.getConfig().global.bpm || 120
    const measures = 8
    this.state = {
      bpm: bpm,
      measures,
      connected: false,
      bluetoothConnected: false,
      paused: false,
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

    // this.scenesList[0].value.config.active = false
    // console.log(this.scenesList[0].value.config.active)
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

  /*
   * Loop
   */
  setTime() {
    const {time, bpm, measures, duration, paused} = this.state

    // Paused
    if (paused) {
      // @TODO: Pause is not correct, it has to also save the current position that we paused so it can contiune at that position

    // Running
    } else {
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

    }

    setTimeout(() => {
      requestAnimationFrame(this.setTime.bind(this))
    }, 1000 / window.configuration.data.global.fps)

    const values = this.getValues(this.state.timeCounter, this.scenesList.filter(scene => Boolean(scene.value.config.active)))
    this.runTimeline(values)
  }

  runTimeline(scenes) {

    // console.log(scenes.length, 'scenes are running')

    scenes.forEach(scene => {

      // if true disable to set inactive on next run
      // if "loop" don't do anything.
      if (scene.active === true) {
        // @todo disable active
        //scene.value.config.active = false
      }

      scene.children.forEach(layer => {
        this.render.run()

        // Run calcualted colors from timeline into the devices attachted to each animation
        layer.children.forEach(animation => {
          animation.instance.values = animation.values
          animation.instance.run()
        })
      })
    })
  }

  getValues(counter, scenes) {
    const items = scenes.map(scene => {
      return {
        id: scene.key,
        active: scene.value.config.active,
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
                instance: animation,
                values: values
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

  handleRestart(e) {
    this.setState({
      time: new Date(),
      timeCounter: 0
    })
  }

  handlePause(e) {
    let {paused} = this.state

    this.setState({
      paused: !paused
    })
  }

handleRestore(e) {
  window.configuration.restoreConfig()
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
          <restore-config-button on-restore="handleRestore"></restore-config-button>

          <!-- <midi-manager class="two"
                        config="{{config.getConfig()}}"></midi-manager>-->

          <restart-button
            on-restart="handleRestart"
            controllerId="korgnanopad2"
            partId="button15"
          ></restart-button>

          <pause-button
            on-pause="handlePause"
            controllerId="korgnanopad2"
            partId="button14"
          ></pause-button>

          <tap-button class="one"
                      on-tap="handleTap"
                      delay="2000"
                      items="2"
                      controllerId="korgnanopad2"
                      partId="button16"
                      ></tap-button>
          <bpm-meter bpm="{{state.bpm}}"></bpm-meter>

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
