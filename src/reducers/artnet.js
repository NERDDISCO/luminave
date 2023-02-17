import update from 'immutability-helper/index.js'
import {
  SET_ARTNET
} from '../constants/index.js'

/*
 * Art-Net Manager
 */
const artnetManager = (state = {
  reconnect: false,
  connected: false,
  url: 'ws://localhost:3007/luminave'
}, {
  type,
  data
}) => {

  switch (type) {

    case SET_ARTNET: {
      return update(state, { $merge: { ...data } })
    }

    default:
      return state
  }
}

export default artnetManager
