import * as constants from '../constants/index.js'

/*
 *
 * A collection of Redux actions (= something happened)
 *
 * Example:
 ```
 export const action = (mydata) => ({
   mydata,
   type : constants.CONSTANT
 })
 ```
 */

/*
 * Set the value for a DMX512 channel
 */
export const setChannel = (universeId, channel, value) => ({
  universeId,
  channel,
  value,
  type: constants.SET_CHANNEL
})

/*
 * Set the BPM
 */
export const setBpm = bpm => ({
  bpm,
  type: constants.SET_BPM
})

/*
 * The status of the connection to the USB controller
 */
export const connectUsb = connected => ({
  connected,
  type: constants.CONNECT_USB
})

/*
 * The status of the connection to a Bluetooth controller
 */
export const connectBluetooth = connected => ({
  connected,
  type: constants.CONNECT_BLUETOOTH
})

/*
 * Add a DMX512 universe
 */
export const addUniverse = universe => ({
  universe,
  type: constants.ADD_UNIVERSE
})

/*
 * Remove a DMX512 universe
 */
export const removeUniverse = index => ({
  index,
  type: constants.REMOVE_UNIVERSE
})
