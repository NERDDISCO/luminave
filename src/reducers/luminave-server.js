import update from 'immutability-helper/index.js'
import {
  SET_LUMINAVE_SERVER
} from '../constants/index.js'

/**
 * Luminave server
 */
const luminaveServer = (state = {
  reconnect: false,
  connected: false,
  url: 'ws://localhost:4000/graphql',
  thorium: {
    scenes: []
  }
}, {
  type,
  data
}) => {

  switch (type) {

    case SET_LUMINAVE_SERVER: {
      return update(state, { $merge: { ...data } })
    }

    default:
      return state
  }
}

export default luminaveServer
