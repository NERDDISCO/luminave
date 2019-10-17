import * as constants from '../constants/index.js'
import * as selectors from '../selectors/luminave-server.js'
import * as utils from '../utils/index.js'

/*
 * Update the data of the luminave server integration
 */
export const setLuminaveServer = data => ({
  data,
  type: constants.SET_LUMINAVE_SERVER
})

/**
 * Remove a scene
 * 
 * @param {string} sceneId - ID of the scene that should be removed
 */
export const removeSceneFromLuminaveServer = sceneId => {
  return (dispatch, getState) => {
    let scenes = selectors.getLuminaveServerThoriumScenes(getState())

    // Remove the scene with the specified sceneId
    scenes = scenes.filter(scene => scene.sceneId !== sceneId)

    // Set the scenes
    const thorium = { scenes }
    dispatch(setLuminaveServer({ thorium }))
  }
}
