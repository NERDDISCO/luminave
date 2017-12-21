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
export const setChannel = (universeIndex, channelIndex, value) => ({
  universeIndex,
  channelIndex,
  value,
  type: constants.SET_CHANNEL
})

/*
 * Set the value for a DMX512 channel
 */
export const getChannel = (universeIndex, channelIndex) => ({
  universeIndex,
  channelIndex,
  type: constants.GET_CHANNEL
})

/*
 * Set the BPM
 */
export const setBpm = value => ({
  value,
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
export const removeUniverse = universeIndex => ({
  universeIndex,
  type: constants.REMOVE_UNIVERSE
})

/*
 * Add a scene
 */
export const addScene = scene => ({
  scene,
  type: constants.ADD_SCENE
})

/*
 * Start the playback of a scene
 */
export const runScene = sceneIndex => ({
  sceneIndex,
  type: constants.RUN_SCENE
})

/*
 * Remove a DMX512 universe
 */
export const removeScene = sceneIndex => ({
  sceneIndex,
  type: constants.REMOVE_SCENE
})

/*
 * Add a fixture
 */
export const addFixture = fixture => ({
  fixture,
  type: constants.ADD_FIXTURE
})

/*
 * Remove a fixture
 */
export const removeFixture = fixtureIndex => ({
  fixtureIndex,
  type: constants.REMOVE_FIXTURE
})
