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
      keyframes: {
        ...flash(0, 0.5, 3),
        '0.5': {
          RED: 20,
          GREEN: 20,
          BLUE: 100
        },
         '1': {
          RED: 0,
          GREEN: 0,
          BLUE: 0
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
