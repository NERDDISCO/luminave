import update from 'immutability-helper/index.js'
import {
  SET_MODV
} from '../constants/index.js'

/*
 * modV Manager
 */
const modvManager = (state = {
  reconnect: false,
  connected: false,
  url: 'ws://localhost:3006/luminave'
}, {
  type,
  data
}) => {

  switch (type) {

    case SET_MODV: {
      return update(state, { $merge: { ...data } })
    }

    default:
      return state
  }
}

export default modvManager
