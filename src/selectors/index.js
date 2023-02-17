import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'

export * from './venue.js'

/*
 * Selectors help you to retrieve data from the state so you don't have to write the
 * same code to access the state over and over again. It also helps to have a central position
 * on how to access the state
 *
 * We also make use of reselect which makes it possible to use a selector as a statePath inside any component
 * -> https://github.com/reactjs/reselect
 * -> https://redux.js.org/docs/recipes/ComputingDerivedData.html
 */
export const getBpm = state => state.bpm
export const getDrawerOpened = state => state.app.drawerOpened
export const getLive = state => state.live
export const getConnections = state => state.connectionManager
export const getUniverses = state => state.universeManager
export const getScenes = state => state.sceneManager
export const getAnimations = state => state.animationManager
export const getFixtures = state => state.fixtureManager
export const getModv = state => state.modvManager
export const getModvUrl = state => state.modvManager.url
export const getModvReconnect = state => state.modvManager.reconnect
export const getModvConnected = state => state.modvManager.connected
export const getArtnet = state => state.artnetManager
export const getArtnetUrl = state => state.artnetManager.url
export const getArtnetReconnect = state => state.artnetManager.reconnect
export const getArtnetConnected = state => state.artnetManager.connected
export const getMidi = state => state.midiManager
export const getMidiEnabled = state => state.midiManager.enabled
export const getMidiControllers = state => state.midiManager.controllers
export const getMidiLearning = state => state.midiManager.learning
export const getDekk = state => state.dekkManager
export const getDekkConnected = state => state.dekkManager.connected
export const getDekkData = state => state.dekkManager.data
export const getUsbDmxControllerConnected = state => state.connectionManager.usb.connected

export const getAnimation = (state, properties) => {
  return getAnimations(state)
    .filter(animation => animation.id === properties.animationId)[0]
}

export const getAnimationByName = (state, properties) => {
  return getAnimations(state)
    .filter(animation => animation.name === properties.name)[0]
}

/*
 * Sort animations by animation.name
 */
export const getAnimationsSorted = createSelector(
  getAnimations,
  animations => animations.sort((a, b) => collator.compare(a.name, b.name))
)

export const getScene = (state, properties) => {
  return getScenes(state)
    .filter(scene => scene.id === properties.sceneId)[0]
}

// @TODO: This will be a problem because name is not unique
export const getSceneByName = (state, properties) => {
  return getScenes(state)
    .filter(scene => scene.name === properties.name)[0]
}

/*
 * Sort scenes by scene.name
 */
export const getScenesSorted = createSelector(
  getScenes,
  scenes => scenes.sort((a, b) => collator.compare(a.name, b.name))
)

/*
 * Get scenes that contain a certain animationId
 */
export const getScenesWithAnimation = (state, properties) => {
  return getScenes(state)
    .filter(scene => scene.animations.includes(properties.animationId))
}

/*
 * Get scenes that contain a certain fixtureId
 */
export const getScenesWithFixture = (state, properties) => {
  return getScenes(state)
    .filter(scene => scene.fixtures.includes(properties.fixtureId))
}

/*
 * Get a specific fixture by using the fixtureId
 */
export const getFixture = (state, properties) => {
  return getFixtures(state)
    .filter(fixture => fixture.id === properties.fixtureId)[0]
}

/*
 * Get a specific fixture by using the name of the fixture
 */
export const getFixtureByName = (state, properties) => {
  return getFixtures(state)
    .filter(fixture => fixture.name === properties.name)[0]
}

/*
 * Sort fixtures by fixture.name
 */
export const getFixturesSorted = createSelector(
  getFixtures,
  fixtures => fixtures.sort((a, b) => collator.compare(a.name, b.name))
)
