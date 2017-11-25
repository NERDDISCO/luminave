import { SET_CHANNEL, SET_BPM } from '../constants/index.js'

export const setChannel = (channel, value) => ({
  channel,
  value,
  type : SET_CHANNEL
})

export const setBpm = (bpm) => ({
  bpm,
  type : SET_BPM
})
