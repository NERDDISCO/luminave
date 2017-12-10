import update from '../../node_modules/immutability-helper/index.js'
import * as constants from '../constants/index.js'

/*
 *
 * A collection of Redux reducers (= change application state based on Redux actions)
 *
 * Example:
 ```
 export const reducer = (state = 'default'), {type, mydata}) => {
     switch (type) {
       case constants.TYPE:
           return mydata
       default:
         return state
     }
   }
```
 */

/*
 * Update the BPM
 */
export const bpm = (state = 130, { type, value }) => {
  switch (type) {
    case constants.SET_BPM:
      return value
    default:
      return state
  }
}

/*
 * Handle the connections to USB & Bluetooth
 */
export const connectionManager = (
  state = {
    usb: { connected: false },
    bluetooth: { connected: false }
  },
  { type, connected }

) => {

  switch (type) {
    case constants.CONNECT_USB:
      return Object.assign({}, state, { usb: { connected } })
    case constants.CONNECT_BLUETOOTH:
      return Object.assign({}, state, { bluetooth: { connected } })
    default:
      return state
  }
}

/*
 * Handle the DMX512 universes
 */
export const universeManager = (state = [], { type, universe, universeIndex, channelIndex, value }) => {
  switch (type) {
    case constants.ADD_UNIVERSE:
      return update(state, { $push: [universe] })
    case constants.REMOVE_UNIVERSE:
      return update(state, { $splice: [[universeIndex, 1]] })
    case constants.SET_CHANNEL:
      return update(state, { [universeIndex]: { channels: { $splice: [[channelIndex, 1, value]] } } })
    default:
      return state
  }
}

/*
 * Handle the scenes
 */
export const sceneManager = (state = [], { type, scene, sceneIndex }) => {
  switch (type) {
    case constants.ADD_SCENE:
      return update(state, { $push: [scene] })
    case constants.REMOVE_SCENE:
      return update(state, { $splice: [[sceneIndex, 1]] })
    default:
      return state
  }
}
