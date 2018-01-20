


/* ToDo


- 1 scene is broken

- fix localStorage
- save button

- integrate modV
--- only replace color if present in animation, otherwise: NOT
--- activate modV with MIDI press -> set color on every device with a single animation

- update univese on every frame while in live mode

- only write into localStorage with throttle while in live mode
- jsperf localStorage + JSON.stringify
--- https://github.com/StartPolymer/s-utils/blob/master/utils/throttle.html
--- https://www.npmjs.com/package/lodash-es

- calculate progress in every scene instead of timeline-manager in order to loop or remove from timeline

- midi: set color of button if midi is active

- add a type to midi input:
--- normal: remove scene after duration is done = active = false immidieatly because we can add the scene over and over again
--- loop: loop scene until button is pressed again (current behavoir)
--- pressed: loop the scene until button is released (this means we also have to listen to noteoff)


- midi: group of buttons -> if button is in group and another button is already
active when another button is pressed -> buttons in group are set to active = false and new button gets active


- don't use template tags to hide stuff, but provide another template with only the stuff needed ? DISCUSS










live: {
  type: Boolean,
  statePath: 'live'
},
editMode: {
  type: Boolean,
  computed: 'computeEditMode(live)'
}


computeEditMode(live) {
  return !live
}

<template is="dom-if" if="[[editMode]]">


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
