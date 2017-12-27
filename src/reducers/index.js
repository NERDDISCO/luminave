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
    case constants.GET_CHANNEL:
      return state
    default:
      return state
  }
}

/*
 * Handle the scenes
 */
export const sceneManager = (state = [], { type, scene, sceneIndex, animationId, animationIndex, fixtureId, fixtureIndex }) => {
  switch (type) {
    case constants.ADD_SCENE:
      return update(state, { $push: [scene] })
    case constants.RUN_SCENE:
      return update(state, { [sceneIndex]: { isRunning: { $set: true } } })
    case constants.REMOVE_SCENE:
      return update(state, { $splice: [[sceneIndex, 1]] })
    case constants.ADD_ANIMATION_TO_SCENE:
      return update(state, { [sceneIndex]: { animations: { $push: [animationId] } } })
    case constants.REMOVE_ANIMATION_FROM_SCENE:
      return update(state, { [sceneIndex]: { animations: { $splice: [[animationIndex, 1]] } } })
    case constants.ADD_FIXTURE_TO_SCENE:
      return update(state, { [sceneIndex]: { fixtures: { $push: [fixtureId] } } })
    case constants.REMOVE_FIXTURE_FROM_SCENE:
      return update(state, { [sceneIndex]: { fixtures: { $splice: [[fixtureIndex, 1]] } } })
    default:
      return state
  }
}

/*
 * Handle the animations
 */
export const animationManager = (state = [], { type, animation, animationIndex, keyframeStep, keyframeProperty, keyframeValue }) => {
  switch (type) {
    case constants.ADD_ANIMATION:
      return update(state, { $push: [animation] })
    case constants.ADD_KEYFRAME: {

      // Keyframe might already have steps
      const oldSteps = state[animationIndex].keyframes[keyframeStep] || {}
      const newStep = { [keyframeProperty]: keyframeValue }

      return update(state, { [animationIndex]: { keyframes: { $merge: {[keyframeStep]: {...oldSteps, ...newStep} } } } })
    }
    case constants.RUN_ANIMATION:
      return update(state, { [animationIndex]: { isRunning: { $set: true } } })
    case constants.REMOVE_ANIMATION:
      return update(state, { $splice: [[animationIndex, 1]] })
    default:
      return state
  }
}

/*
 * Handle the DMX512 fixtures
 */
export const fixtureManager = (state = [], { type, fixture, fixtureIndex }) => {
  switch (type) {
    case constants.ADD_FIXTURE:
      return update(state, { $push: [fixture] })
    case constants.REMOVE_FIXTURE:
      return update(state, { $splice: [[fixtureIndex, 1]] })
    default:
      return state
  }
}

/*
 * Handle the MIDI controller
 */
export const midiManager = (state = {
  controllers: [],
  enabled: false,
  learning: false
}, { type, controller, controllerIndex, enabled, mapping, mappingIndex, sceneId, sceneIndex }) => {
  switch (type) {
    case constants.ENABLE_MIDI:
      return update(state, { enabled: { $set: enabled } })
    case constants.ADD_MIDI:
      return update(state, { controllers: { $push: [controller] } })
    case constants.ADD_MIDI_MAPPING: {
      // Mapping might already exist
      const old = state.controllers[controllerIndex].mapping[mappingIndex] || {}

      return update(state, { controllers: { [controllerIndex]: { mapping: { $merge: { [mappingIndex]: {...old, ...mapping} } } } } })
    }
    case constants.ADD_SCENE_TO_MIDI:
      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { scenes: { $push: [sceneId] } } } } } })
    case constants.REMOVE_SCENE_FROM_MIDI:
      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { scenes: { $splice: [[sceneIndex, 1]] } } } } } })
    case constants.LEARN_MIDI:
      return update(state, { learning: { $set: mappingIndex } })
    case constants.REMOVE_MIDI:
      return update(state, { controllers: { $splice: [[controllerIndex, 1]] } })
    default:
      return state
  }
}
