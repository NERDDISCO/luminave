/*


* update midi-manager mapping to be an array instead of an object
 -> BUT what happens with the grid?
 -> we can't transform the mapping object into an array when it's changing
 because of the active state of a button when it's pressed. MAYBE save the active state
 into another element of the midi controller? not into the mapping itself? so
 the active state can be updated individually and doesn't trigger the mapping 

*/



✅ const channels = [...Array(512)].map(() => 0)
☀️ const fixtures = [{}, {}]
// effects.js
export const flash(n) => ({})
export const fade(n) => ({})
export const rgb(obj) => ({})


/**
 */
import {* as effects} from './effects'

const universums = [{
  id: 'FOO',
  channels: [...channels]
},
{
  id: 'BAR',
  channels: [...channels]
}]
// effects.flash
// effects.fade
const animations = [
  {
    name: 'flash and fade',
    id: 'FLASH_FADE',
    data: {
      // (simple as possible)
      keyframes: {
        ...flash(0, 0.5, 3),
        '0': {
          dimmer: 255
        },
        '0.25': {
          color: [0, 0, 255]
        },
        '1': {
          color: [0, 255, 0],
          dimmer: 200
        }
      }
    }
  },
  {
    name: 'rainbow',
    id: 'RAINBOW',
    data: {/*  animation data */}
  }
]

// This is how Keytime wants the timeline / keyframes

 'timeline': [{
   'name': 'color',
   'keyframes': [
     { 'time': 0, 'value': [0, 0, 0] },
     { 'time': 0.25, 'value': [0, 0, 0] },
     { 'time': 0.5, 'value': [255, 0, 0] },
     { 'time': 0.75, 'value': [0, 0, 0] },
     { 'time': .9, 'value': [0, 0, 0] }
   ]
 }]

 // Internally we split the keyframes into sub keyframes to have more control over them

keyframes =
 [{
   '0': 'keyframes0',
   '1': 'keyframes0.25'
 },
 {
   '0': 'keyframes0.25',
   '1': 'keyframes1'
 }]





const scenes = [{
  name: 'intro scene',
  id: 'INTRO_SCENE',
  animations: [{id: 'FLASH_FADE', start: 0, dur: 0.2}, {id: 'RAINBOW', start: 0.4, dur: 0.5}]
}]

const seclectedFixtures = [{
  id: 'FUN_GENERATION',
  universum: 'FOO',
  properties: {
    r: {
      id: 'RED',
      channel: 33
    },
    g: {
      id: 'GREEN',
      channel: 34
    },
    b: {
      id: 'BLUE',
      channel: 35
    }
  },
  scenes: [{
    id: 'INTRO_SCENE',
    start: [],
    trigger:
    'DEVICE:CHANNEL:NOTE' ,
    duration: 60000
  }]
}]

const midiManger = {
  enabled: true,
  controllers: [{
    id: '489-491-491',
    name: 'nanoPAD2',
    input: 'nanoPAD2 PAD',
    output: 'nanoPAD2 CTRL',
    width: 8,
    height: 2,
    mapping: {
      0: {
        note: 35
      }
    }
  }]
}

const timelineManager = {
  playing: true,
  scenes: [
    '123-123-123'
  ],
  live: true // true = add a scene and when it's done it's removed / false = add a scene and keep it after it's done
}


// @see https://github.com/NERDDISCO/VisionLord/blob/40d7495d51f2edd8d4e563f1199854cb7c86141b/src/core/BluetoothManager.js
const bluetoothManager = {
  devices: []
}
