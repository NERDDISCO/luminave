import * as constants from '../constants/index.js'
import { getScene } from '../selectors/index.js'
import * as utils from '../utils/index.js'

/*
 * Control playback of the timeline
 */
export const playTimeline = playing => ({
  playing,
  type: constants.PLAY_TIMELINE
})

/*
 * Set the progress of the timeline
 */
export const setTimelineProgress = progress => ({
  progress,
  type: constants.SET_TIMELINE_PROGRESS
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
 *
 * Don't use this directly, use #removeSceneFromTimelineAndResetFixtures
 * to also reset the fixtures
 */
export const removeSceneFromTimeline = sceneId => ({
  sceneId,
  type: constants.REMOVE_SCENE_FROM_TIMELINE
})

/*
 * Remove a scene fromt he timeline and also reset all fixtures assigned to that scene
 */
export const removeSceneFromTimelineAndResetFixtures = sceneId => {
  return (dispatch, getState) => {

    // Get the fixtures of the scene
    getScene(getState(), { sceneId }).fixtures.map(fixtureId => {
      utils.clearFixtureInBatch(fixtureId)
    })

    // Remove the scene from the timelline
    dispatch(removeSceneFromTimeline(sceneId))
  }
}
