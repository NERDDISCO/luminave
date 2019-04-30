import update from 'immutability-helper/index.js'
import * as constants from '../constants/index.js'
import * as selectors from '../selectors/index.js'
import { clearFixtureInBatch } from '../utils/index.js'

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
 * Update the LIVE mode
 */
export const live = (state = false, { type, value }) => {
  switch (type) {
    case constants.SET_LIVE:
      return update(state, { $set: value })
    default:
      return state
  }
}

/*
 * USB DMX Controller
 */
export const usbManager = (state = { lastTransmission: 0 }, { type, value }) => {
  switch (type) {
    case constants.SEND_UNIVERSE_TO_USB:
      return update(state, { lastTransmission: { $set: value } } )
    default:
      return state
  }
}

/*
 * Dekk Manager
 */
export const dekkManager = (state = {
    data: {},
    connected: false
  }, { type, data, connected }) => {
  switch (type) {
    case constants.CONNECT_DEKK:
      return update(state, { connected: { $set: connected } } )
    case constants.SET_DEKK_DATA:
      return update(state, { data: { $set: data } } )
    default:
      return state
  }
}

/*
 * fivetwelve Manager
 */
export const fivetwelveManager = (state = {
    connected: false
  }, { type, connected, value }) => {
  switch (type) {
    case constants.CONNECT_FIVETWELVE:
      return update(state, { connected: { $set: connected } } )
    case constants.SEND_UNIVERSE_TO_FIVETWELVE:
      return update(state, { lastTransmission: { $set: value } } )
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
export const universeManager = (state = [], { type, universe, universeIndex, universeId, channelIndex, value, channels }) => {

  if (universeId !== undefined) {
    universeIndex = state.findIndex(universe => universe.id === universeId)
  }

  switch (type) {
    case constants.ADD_UNIVERSE:
      return update(state, { $push: [universe] })
    case constants.REMOVE_UNIVERSE:
      return update(state, { $splice: [[universeIndex, 1]] })
    case constants.SET_CHANNEL:
      // Only update channel if value changed
      // if (state[universeIndex].channels[channelIndex] !== value) {
        return update(state, { [universeIndex]: { channels: { $splice: [[channelIndex, 1, value]] } } })
      // } else {
        // return state
      // }
    case constants.SET_CHANNELS:
      // Only update channel if value changed
      // if (state[universeIndex].channels[channelIndex] !== value) {
        return update(state, { [universeIndex]: { channels: { $set: channels } } })
      // } else {
        // return state
      // }
    case constants.GET_CHANNEL:
      return state
    default:
      return state
  }
}

/*
 * Handle the scenes
 */
export const sceneManager = (state = [], { type, scene, sceneIndex, sceneName, sceneId, animationId, animationIndex, fixtureId, fixtureIndex }) => {

  if (sceneId !== undefined) {
    sceneIndex = state.findIndex(scene => scene.id === sceneId)
  }

  if (scene !== undefined && scene.id !== undefined) {
    sceneIndex = state.findIndex(_scene => _scene.id === scene.id)
  }

  switch (type) {
    case constants.ADD_SCENE:
      return update(state, { $push: [scene] })

    case constants.SET_SCENE: {
      return update(state, { [sceneIndex]: { $merge: { ...scene } } })
    }

    case constants.RUN_SCENE:
      return update(state, { [sceneIndex]: { isRunning: { $set: true } } })
    case constants.REMOVE_SCENE:
      return update(state, { $splice: [[sceneIndex, 1]] })
    case constants.SET_SCENE_NAME:
      return update(state, { [sceneIndex]: { name: { $set: sceneName } } })
    case constants.ADD_ANIMATION_TO_SCENE:
      return update(state, { [sceneIndex]: { animations: { $push: [animationId] } } })
    case constants.REMOVE_ANIMATION_FROM_SCENE: {
      animationIndex = state[sceneIndex].animations.indexOf(animationId)
      return update(state, { [sceneIndex]: { animations: { $splice: [[animationIndex, 1]] } } })
    }
    case constants.ADD_FIXTURE_TO_SCENE:
      return update(state, { [sceneIndex]: { fixtures: { $push: [fixtureId] } } })
    case constants.REMOVE_FIXTURE_FROM_SCENE: {
      fixtureIndex = state[sceneIndex].fixtures.indexOf(fixtureId)
      return update(state, { [sceneIndex]: { fixtures: { $splice: [[fixtureIndex, 1]] } } })
    }
    default:
      return state
  }
}

/*
 * Handle the animations
 */
export const animationManager = (state = [], { type, animation, animationIndex, animationId, animationName, keyframeStep, keyframeProperty, keyframeValue }) => {

  if (animationId !== undefined) {
    animationIndex = state.findIndex(animation => animation.id === animationId)
  }

  if (animation !== undefined && animation.id !== undefined) {
    animationIndex = state.findIndex(_animation => _animation.id === animation.id)
  }

  const changed = new Date().getTime()

  switch (type) {
    case constants.ADD_ANIMATION:
      animation.changed = changed
      return update(state, { $push: [animation] })

    case constants.SET_ANIMATION: {
      animation.changed = changed
      return update(state, { [animationIndex]: { $merge: { ...animation } } })
    }

    case constants.SET_ANIMATION_NAME: {
      const animation = { 
        name: animationName,
        changed
      }

      return update(state, { [animationIndex]: { $merge: { ...animation } } })
    }

    case constants.ADD_KEYFRAME: {

      // Is not a number
      if (isNaN(keyframeValue)) {
        // Is RGB?
        if (keyframeValue.includes(',')) {
          keyframeValue = keyframeValue.split(',').map(color => parseInt(color))
        // Is not empty String
        } else if (keyframeValue.length !== 0) {

        } else {
          console.warn(keyframeValue, 'for', keyframeProperty, 'is not handled')
        }
      } else {
        // Is an Integer
        keyframeValue = parseInt(keyframeValue, 10)
      }

      // Keyframe might already have steps
      const oldSteps = state[animationIndex].keyframes[keyframeStep] || {}
      const newStep = { [keyframeProperty]: keyframeValue }

      return update(state, { [animationIndex]: { keyframes: { $merge: {[keyframeStep]: {...oldSteps, ...newStep} } }, changed: { $set: changed }  } })
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
export const fixtureManager = (state = [], { type, fixture, fixtureIndex, fixtureId, fixtureAddress, properties, fixtureBatch }) => {

  if (fixtureId !== undefined) {
    fixtureIndex = state.findIndex(fixture => fixture.id === fixtureId)
  }

  switch (type) {
    case constants.ADD_FIXTURE:
      return update(state, { $push: [fixture] })

    case constants.SET_FIXTURE: {
      return update(state, { [fixtureIndex]: { $merge: fixture } })
    }

    case constants.SET_FIXTURE_ADDRESS:
      return update(state, { [fixtureIndex]: { address: { $set: fixtureAddress } } })

    case constants.SET_FIXTURE_PROPERTIES: {
      // Properties might already been set
      const oldProperties = state[fixtureIndex].properties

      // @TODO: Only add properties that the device can understand based on the instance
      return update(state, { [fixtureIndex]: { properties: { $merge: {...oldProperties, ...properties} } } })
    }

    case constants.SET_ALL_FIXTURE_PROPERTIES: {

      return state.map((fixture, i) => {

        // fixtureBatch contains properties for the fixture in state
        if (fixtureBatch[fixture.id] !== undefined) {
          return update(state[i], { properties: { $merge: fixtureBatch[fixture.id].properties } })
        } else {
          return state[i]
        }

      })

    }

    case constants.RESET_FIXTURE_PROPERTIES: {
      // Clean up the fixtureBatch
      clearFixtureInBatch(fixtureId)

      // @TODO: Only remove the properties that are part of the scene / animation
      return update(state, { [fixtureIndex]: { properties: { $set: {} } } })
    }

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
}, { type, controller, controllerIndex, controllerId, enabled, mapping, mappingIndex, sceneId, sceneIds, sceneIndex, active }) => {

  if (controllerId !== undefined) {
    controllerIndex = state.controllers.findIndex(controller => controller.id === controllerId)
  }

  switch (type) {
    case constants.ENABLE_MIDI:
      return update(state, { enabled: { $set: enabled } })
    case constants.ADD_MIDI:
      return update(state, { controllers: { $push: [controller] } })

    case constants.SET_MIDI:
      return update(state, { controllers: { [controllerIndex]: { $merge: controller } } } )

    case constants.ADD_MIDI_MAPPING: {
      // Mapping might already exist
      const old = state.controllers[controllerIndex].mapping[mappingIndex] || {}

      return update(state, { controllers: { [controllerIndex]: { mapping: { $merge: { [mappingIndex]: {...old, ...mapping} } } } } })
    }
    case constants.SET_MIDI_MAPPING_ACTIVE:
      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { active: { $set: active } } } } } })
    case constants.ADD_SCENE_TO_MIDI:
      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { scenes: { $push: [sceneId] } } } } } })
    case constants.ADD_SCENES_TO_MIDI: {
      // Get the current scenes to merge them with the new scenes
      const oldSceneIds = state.controllers[controllerIndex].mapping[mappingIndex].scenes

      // Only add scenes that are not part of the MIDI element yet
      const newSceneIds = sceneIds.filter(sceneId => !oldSceneIds.includes(sceneId))

      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { scenes: { $push: newSceneIds } } } } } })
    }

    case constants.REMOVE_SCENE_FROM_MIDI: {
      sceneIndex = state.controllers[controllerIndex].mapping[mappingIndex].scenes.indexOf(sceneId)
      return update(state, { controllers: { [controllerIndex]: { mapping: { [mappingIndex]: { scenes: { $splice: [[sceneIndex, 1]] } } } } } })
    }

    case constants.LEARN_MIDI:
      return update(state, { learning: { $set: mappingIndex } })
    case constants.REMOVE_MIDI:
      return update(state, { controllers: { $splice: [[controllerIndex, 1]] } })
    default:
      return state
  }
}
