import { SET_CHANNEL } from '../constants/index.js'

export const channels = (state = [...Array(512)].map(() => 0), {type, channel, value}) => {
    switch (type) {
      case SET_CHANNEL:
          return (() => {
            const s = [...state]
            s[channel] = value
            return s
          })()
      default:
    }

    return state
  }
