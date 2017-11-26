import * as constants from '../constants/index.js'

export const channels = (state = [...Array(512)].map(() => 0), {type, channel, value}) => {
    switch (type) {
      case constants.SET_CHANNEL:
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
    case constants.SET_BPM:
      return bpm
    default:
      return state
  }
}

export const connections = (state = {}, { type, connected }) => {
  switch (type) {
    case constants.CONNECT_USB:
      return Object.assign({}, state, { usb: connected })
    case constants.CONNECT_BLUETOOTH:
      return Object.assign({}, state, { bluetooth: connected })
    default:
      return state
  }
}
