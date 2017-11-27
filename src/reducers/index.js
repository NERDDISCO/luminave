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
 * Update the DMX512 channels
 */
// export const channels = (state = [...Array(512)].map(() => 0), { type, channel, value }) => {
//     switch (type) {
//       case constants.SET_CHANNEL:
//           return (() => {
//             const s = [...state]
//             s[channel] = value
//
//             return s
//           })()
//       default:
//         return state
//     }
//   }

/*
 * Update the BPM
 */
export const bpm = (state = 130, { type, bpm }) => {
  switch (type) {
    case constants.SET_BPM:
      return bpm
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
export const universeManager = (state = [], { type, universe, index, universeId, channel, value }) => {
  switch (type) {
    case constants.ADD_UNIVERSE:
      return [...state, universe]

    case constants.REMOVE_UNIVERSE:
      return (() => {
        const newState = [...state]
        newState.splice(index, 1)

        return newState
      })()

    case constants.SET_CHANNEL:
      return (() => {
        const newState = [...state]
        newState[universeId].channels[channel] = value
        
        return newState
      })()

    default:
      return state
  }
}

/*
 * Handle the scenes
 */
export const sceneManager = (state = [], { type, scene, index }) => {
  switch (type) {
    case constants.ADD_SCENE:
      return [...state, scene]

    case constants.REMOVE_SCENE:
      return (() => {
        const newState = [...state]
        newState.splice(index, 1)

        return newState
      })()

    default:
      return state
  }
}
