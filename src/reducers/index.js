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

export const connectionManager = (state = { usb: { connected : false }, bluetooth : { connected : false }}, { type, connected }) => {
  switch (type) {
    case constants.CONNECT_USB:
      return Object.assign({}, state, { usb: { connected } })
    case constants.CONNECT_BLUETOOTH:
      return Object.assign({}, state, { bluetooth: { connected } })
    default:
      return state
  }
}

export const universeManager = (state = [], { type, universe, index }) => {
  switch (type) {
    case constants.ADD_UNIVERSE:
      return [...state, universe]
    case constants.REMOVE_UNIVERSE:
      return (() => {
        const newState = [...state]
        newState.splice(index, 1)
        return newState
      })()
    default:
      return state
  }
}
