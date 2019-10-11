import * as constants from '../constants/index.js'
import * as selectors from '../selectors/index.js'
import * as utils from '../utils/index.js'

export * from './timeline.js'
export * from './animation.js'
export * from './venue.js'

import { setVenueSlot } from './venue.js'

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
export const setChannels = (universeIndex, channels) => ({
  universeIndex,
  channels,
  type: constants.SET_CHANNELS
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
export const removeUniverse = universeId => ({
  universeId,
  type: constants.REMOVE_UNIVERSE
})

/*
 * Reset the DMX512 universe and all fixtures
 */
export const resetUniverseAndFixtures = universeIndex => {
  return (dispatch, getState) => {
    dispatch(resetAllFixtures())

    // Update the channels of universe x with the batch of values collected for the fixtures
    dispatch(setChannels(universeIndex, [...utils.batch]))

    // Reset the batch so that if a scene is done the values for the attachted fixtures are also reset
    utils.clearBatch()
  }
}

/*
 * Add a scene
 */
export const addScene = scene => ({
  scene,
  type: constants.ADD_SCENE
})

/*
 * Set the values of a scene
 */
export const setScene = scene => ({
  scene,
  type: constants.SET_SCENE
})

/*
 * Start the playback of a scene
 */
export const runScene = sceneId => ({
  sceneId,
  type: constants.RUN_SCENE
})

/*
 * Remove a scene
 */
export const removeScene = sceneId => ({
  sceneId,
  type: constants.REMOVE_SCENE
})

/*
 * Set the name of a scene
 */
export const setSceneName = (sceneId, sceneName) => ({
  sceneId,
  sceneName,
  type: constants.SET_SCENE_NAME
})

/*
 * Add a animation to the scene
 */
export const addAnimationToScene = (sceneId, animationId) => ({
  sceneId,
  animationId,
  type: constants.ADD_ANIMATION_TO_SCENE
})

/*
 * Remove a animation from the scene
 */
export const removeAnimationFromScene = (sceneId, animationId) => ({
  sceneId,
  animationId,
  type: constants.REMOVE_ANIMATION_FROM_SCENE
})

/*
 * Add a fixture to the scene
 */
export const addFixtureToScene = (sceneId, fixtureId) => ({
  sceneId,
  fixtureId,
  type: constants.ADD_FIXTURE_TO_SCENE
})

/*
 * Add a fixtures to the scene
 */
export const addFixturesToScene = (sceneId, fixtureIds) => {
  return (dispatch, getState) => {
    fixtureIds.map(fixtureId => dispatch(addFixtureToScene(sceneId, fixtureId)))
  }
}

/*
 * Remove a fixture from a scene
 */
export const removeFixtureFromScene = (sceneId, fixtureId) => ({
  sceneId,
  fixtureId,
  type: constants.REMOVE_FIXTURE_FROM_SCENE
})


/*
 * Remove a fixture from a scene and reset the values of the fixture in the universe
 */
export const removeFixtureFromSceneAndUniverse = (sceneId, fixtureId) => {
  return (dispatch, getState) => {
    
    utils.clearFixtureInBatch(fixtureId)

    // Reset the propeties of the fixture in the state & batch
    dispatch(removeFixtureFromScene(sceneId, fixtureId))
  }
}


/*
 * Reset all properties of all fixtures
 *
 * THIS IS DANGEROUS!!! PLEASE DON'T USE IT!
 */
export const resetAllFixtures = () => {
  return (dispatch, getState) => {

    // Get the fixtures of the scene
    selectors.getFixtures(getState()).map(fixture => {
      utils.clearFixtureInBatch(fixture.id)

      // Reset the propeties of the fixture in the state & batch
      dispatch(resetFixtureProperties(fixture.id))
    })
  }
}

/*
 * Add a fixture
 */
export const addFixture = fixture => ({
  fixture,
  type: constants.ADD_FIXTURE
})

/*
 * Set the address of a fixture
 */
export const setFixtureAddress = (fixtureId, fixtureAddress) => ({
  fixtureId,
  fixtureAddress,
  type: constants.SET_FIXTURE_ADDRESS
})

/*
 * Set the values of the fixture
 */
export const setFixture = (fixtureId, fixture) => ({
  fixtureId,
  fixture,
  type: constants.SET_FIXTURE
})

/*
 * Set the properties of a fixture
 */
export const setFixtureProperties = (fixtureId, properties) => ({
  fixtureId,
  properties,
  type: constants.SET_FIXTURE_PROPERTIES
})

/*
 * Set the properties of all fixtures
 */
export const setAllFixtureProperties = fixtureBatch => ({
  fixtureBatch,
  type: constants.SET_ALL_FIXTURE_PROPERTIES
})

/*
 * Reset the properties of a fixture
 */
export const resetFixtureProperties = fixtureId => ({
  fixtureId,
  type: constants.RESET_FIXTURE_PROPERTIES
})

/*
 * Remove a fixture
 */
export const removeFixture = fixtureId => ({
  fixtureId,
  type: constants.REMOVE_FIXTURE
})

/*
 * Remove a fixture from everywhere
 */
export const removeFixtureFromEverywhere = fixtureId => {
  return (dispatch, getState) => {

    // Remove fixture from batch
    utils.clearFixtureInBatch(fixtureId)

    // Remove fixture from all scenes
    selectors.getScenesWithFixture(getState(), { fixtureId }).map(scene => {
      dispatch(removeFixtureFromScene(scene.id, fixtureId))
    })

    // Remove fixture from all venues
    selectors.getVenuesWithFixture(getState(), { fixtureId }).map(venue => {
      venue.slots
        // Find all slots that contain the fixture
        .filter(slot => slot.fixtures.includes(fixtureId))
        .map(slot => {
          // Remove the fixture from the list of fixtures of this slot
          const fixtures = slot.fixtures.filter(_fixtureId => _fixtureId !== fixtureId)
          dispatch(setVenueSlot(venue.id, { id: slot.id, fixtures }))
        })
    })

    dispatch(removeFixture(fixtureId))
  }
}

/*
 * Add a MIDI controller
 */
export const addMidi = controller => ({
  controller,
  type: constants.ADD_MIDI
})

/*
 * Update a MIDI controller
 */
export const setMidi = (controllerId, controller) => ({
  controllerId, 
  controller,
  type: constants.SET_MIDI
})


/*
 * Remove a MIDI controller
 */
export const removeMidi = controllerId => ({
  controllerId,
  type: constants.REMOVE_MIDI
})

/*
 * Enable WebMIDI
 */
export const enableMidi = enabled => ({
  enabled,
  type: constants.ENABLE_MIDI
})

/*
 * Learn WebMIDI
 */
export const learnMidi = mappingIndex => ({
  mappingIndex,
  type: constants.LEARN_MIDI
})


/*
 * Add a MIDI mapping for a specific input (e.g. button) from a MIDI controller
 */
export const addMidiMapping = (controllerId, mappingIndex, mapping) => ({
  controllerId,
  mappingIndex,
  mapping,
  type: constants.ADD_MIDI_MAPPING
})

/*
 * Set the active state of a  MIDI mapping for a specific input (e.g. button)
 */
export const setMidiMappingActive = (controllerId, mappingIndex, active) => ({
  controllerId,
  mappingIndex,
  active,
  type: constants.SET_MIDI_MAPPING_ACTIVE
})

/*
 * Add a scene to a MIDI controller
 */
export const addSceneToMidi = (controllerId, mappingIndex, sceneId) => ({
  controllerId,
  mappingIndex,
  sceneId,
  type: constants.ADD_SCENE_TO_MIDI
})

/*
 * Add multiple scenes to a MIDI controller
 */
export const addScenesToMidi = (controllerId, mappingIndex, sceneIds) => ({
  controllerId,
  mappingIndex,
  sceneIds,
  type: constants.ADD_SCENES_TO_MIDI
})


/*
 * Remove a scene from a MIDI controller
 */
export const removeSceneFromMidi = (controllerId, mappingIndex, sceneId) => ({
  controllerId,
  mappingIndex,
  sceneId,
  type: constants.REMOVE_SCENE_FROM_MIDI
})

/*
 * Set live mode
 */
export const setLive = value => ({
  value,
  type: constants.SET_LIVE
})

/*
 * Send the universe to the USB DMX controller
 */
export const sendUniverseToUsb = value => ({
  value,
  type: constants.SEND_UNIVERSE_TO_USB
})

/*
 * Update the data of the modV integration
 */
export const setModv = data => ({
  data,
  type: constants.SET_MODV
})

/*
 * Set the data from Dekk
 */
export const setDekkData = data => ({
  data,
  type: constants.SET_DEKK_DATA
})

/*
 * Connect / disconnect to Dekk
 */
export const connectDekk = connected => ({
  connected,
  type: constants.CONNECT_DEKK
})

/*
 * Connect / disconnect to fivetwelve-bridge
 */
export const connectFivetwelve = connected => ({
  connected,
  type: constants.CONNECT_FIVETWELVE
})
