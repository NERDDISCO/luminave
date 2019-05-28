import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'

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
export const getMidi = state => state.midiManager
export const getMidiEnabled = state => state.midiManager.enabled
export const getMidiControllers = state => state.midiManager.controllers
export const getMidiLearning = state => state.midiManager.learning
export const getDekk = state => state.dekkManager
export const getDekkConnected = state => state.dekkManager.connected
export const getDekkData = state => state.dekkManager.data
export const getFivetwelveConnected = state => state.fivetwelveManager.connected
export const getUsbDmxControllerConnected = state => state.connectionManager.usb.connected
export const getVenues = state => state.venueManager

export const getAnimation = (state, properties) => {
  return getAnimations(state)
    .filter(animation => animation.id === properties.animationId)[0]
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
 * Get a specific fixture by using the fixtureId
 */
export const getVenue = (state, properties) => {
  return getVenues(state)
    .filter(venue => venue.id === properties.venueId)[0]
}

/*
 * Sort venues by venue.name
 */
export const getVenuesSorted = createSelector(
  getVenues,
  venues => venues.sort((a, b) => collator.compare(a.name, b.name))
)

/*
 * Sort fixtures by fixture.name
 */
export const getFixturesSorted = createSelector(
  getFixtures,
  fixtures => fixtures.sort((a, b) => collator.compare(a.name, b.name))
)
