import update from 'immutability-helper/index.js'
import {
  SET_FIVETWELVE
} from '../constants/index.js'

/**
 * 
 */
const fivetwelve = (state = {
  reconnect: false,
  connected: false,
  url: 'ws://localhost:1234'
}, {
  type,
  data
}) => {

  switch (type) {
    case SET_FIVETWELVE: {
      return update(state, { $merge: { ...data } })
    }

    default:
      return state
  }
}

export default fivetwelve
