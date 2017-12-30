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
 * Add a animation to the scene
 */
export const addAnimationToScene = (sceneIndex, animationId) => ({
  sceneIndex,
  animationId,
  type: constants.ADD_ANIMATION_TO_SCENE
})

/*
 * Remove a animation from the scene
 */
export const removeAnimationFromScene = (sceneIndex, animationIndex) => ({
  sceneIndex,
  animationIndex,
  type: constants.REMOVE_ANIMATION_FROM_SCENE
})

/*
 * Add a fixture to the scene
 */
export const addFixtureToScene = (sceneIndex, fixtureId) => ({
  sceneIndex,
  fixtureId,
  type: constants.ADD_FIXTURE_TO_SCENE
})

/*
 * Add a fixture to the scene
 */
export const removeFixtureFromScene = (sceneIndex, fixtureIndex) => ({
  sceneIndex,
  fixtureIndex,
  type: constants.REMOVE_FIXTURE_FROM_SCENE
})

/*
 * Add a animation
 */
export const addAnimation = animation => ({
  animation,
  type: constants.ADD_ANIMATION
})

/*
 * Start the playback of a animation
 */
export const runAnimation = animationIndex => ({
  animationIndex,
  type: constants.RUN_ANIMATION
})

/*
 * Remove a DMX512 universe
 */
export const removeAnimation = animationIndex => ({
  animationIndex,
  type: constants.REMOVE_ANIMATION
})

/*
 * Add a keyframe
 */
export const addKeyframe = (animationIndex, keyframeStep, keyframeProperty, keyframeValue) => ({
  animationIndex,
  keyframeStep,
  keyframeProperty,
  keyframeValue,
  type: constants.ADD_KEYFRAME
})

/*
 * Add a fixture
 */
export const addFixture = fixture => ({
  fixture,
  type: constants.ADD_FIXTURE
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
 * Remove a fixture
 */
export const removeFixture = fixtureIndex => ({
  fixtureIndex,
  type: constants.REMOVE_FIXTURE
})

/*
 * Add a MIDI controller
 */
export const addMidi = controller => ({
  controller,
  type: constants.ADD_MIDI
})

/*
 * Remove a MIDI controller
 */
export const removeMidi = controllerIndex => ({
  controllerIndex,
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
export const addMidiMapping = (controllerIndex, mappingIndex, mapping) => ({
  controllerIndex,
  mappingIndex,
  mapping,
  type: constants.ADD_MIDI_MAPPING
})

/*
 * Set the active state of a  MIDI mapping for a specific input (e.g. button)
 */
export const setMidiMappingActive = (controllerIndex, mappingIndex, active) => ({
  controllerIndex,
  mappingIndex,
  active,
  type: constants.SET_MIDI_MAPPING_ACTIVE
})

/*
 * Add a scene to a MIDI controller
 */
export const addSceneToMidi = (controllerIndex, mappingIndex, sceneId) => ({
  controllerIndex,
  mappingIndex,
  sceneId,
  type: constants.ADD_SCENE_TO_MIDI
})

/*
 * Remove a scene from a MIDI controller
 */
export const removeSceneFromMidi = (controllerIndex, mappingIndex, sceneIndex) => ({
  controllerIndex,
  mappingIndex,
  sceneIndex,
  type: constants.REMOVE_SCENE_FROM_MIDI
})

/*
 * Control playback of the timeline
 */
export const playTimeline = playing => ({
  playing,
  type: constants.PLAY_TIMELINE
})

/*
 * Reset the timeline and remove everything
 */
export const resetTimeline = () => ({
  type: constants.RESET_TIMELINE
})


/*
 * Add a scene to the timeline
 */
export const addSceneToTimeline = sceneId => ({
  sceneId,
  type: constants.ADD_SCENE_TO_TIMELINE
})

/*
 * Remove a scene from the timeline
 */
export const removeSceneFromTimeline = sceneId => ({
  sceneId,
  type: constants.REMOVE_SCENE_FROM_TIMELINE
})

/*
 * Set the LIVE mode
 */
export const setLive = value => ({
  value,
  type: constants.SET_LIVE
})
