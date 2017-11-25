import { SET_CHANNEL, SET_BPM } from '../constants/index.js'

export const channels = (state = [...Array(512)].map(() => 0), {type, channel, value}) => {
    switch (type) {
      case SET_CHANNEL:
          return (() => {
            const s = [...state]
            s[channel] = value
            return s
          })()
      default:
        return state
    }
  }

export const bpm = (state = 130, { type, bpm }) => {
  switch (type) {
    case SET_BPM:
      return bpm
    default:
      return state
  }
}
