import * as constants from '../constants/index.js'

export const setChannel = (channel, value) => ({
  channel,
  value,
  type : constants.SET_CHANNEL
})

export const setBpm = bpm => ({
  bpm,
  type : constants.SET_BPM
})

export const connectUsb = connected => ({
  connected,
  type : constants.CONNECT_USB
})

export const connectBluetooth = connected => ({
  connected,
  type : constants.CONNECT_BLUETOOTH
})

export const addUniverse = universe => ({
  universe,
  type : constants.ADD_UNIVERSE
})

export const removeUniverse = index => ({
  index,
  type : constants.REMOVE_UNIVERSE
})
