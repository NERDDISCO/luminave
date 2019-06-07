import update from 'immutability-helper/index.js'
import {
} from '../constants/index.js'

/**
 * 
 */
const {{camelCase name}} = (state = {
  reconnect: false,
  connected: false,
  url: 'ws://localhost:3000'
}, {
  type,
  data
}) => {

  switch (type) {
    // case ADD: {
    //   return update(state, { $push: [] })
    // }

    // case SET: {
    //   return update(state, { []: { $merge:  } })
    // }

    // case REMOVE: {
    //   return update(state, { $splice: [[, 1]] })
    // }

    default:
      return state
  }
}

export default {{camelCase name}}
