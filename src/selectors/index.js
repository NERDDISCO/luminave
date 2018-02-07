import { createSelector } from '/node_modules/reselect/src/index.js'

/*
 * Selectors help you to retrieve data from the state so you don't have to write the
 * same code to access the state over and over again. It also helps to have a central position
 * on how to access the state
 *
 * We also make use of reselect which makes it possible to use a selector as a statePath inside any component
 * -> https://github.com/reactjs/reselect
 * -> https://redux.js.org/docs/recipes/ComputingDerivedData.html
 */

export const getScenes = state => state.sceneManager
export const getAnimations = state => state.animationManager
export const getFixtures = state => state.fixtureManager
export const getTimeline = state => state.timelineManager
export const getTimelineSceneIds = state => state.timelineManager.scenes

export const getAnimation = (state, properties) => {
  return getAnimations(state)
    .filter(animation => animation.id === properties.animationId)[0]
}

/*
 * Sort animations by animation.name
 */
export const getAnimationsSorted = createSelector(
  getAnimations,
  (animations) => {
    return animations.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
  }
)

export const getScene = (state, properties) => {
  return getScenes(state)
    .filter(scene => scene.id === properties.sceneId)[0]
}

export const getSceneId = (state, properties) => properties.scene

/*
 * Sort scenes by scene.name
 */
export const getScenesSorted = createSelector(
  getScenes,
  (scenes) => {
    return scenes.sort((a, b) => {
      const nameA = a.name.toUpperCase()
      const nameB = b.name.toUpperCase()

      if (nameA < nameB) {
        return -1
      } else if (nameA > nameB) {
        return 1
      }

      // names must be equal
      return 0
    })
  }
)

/*
 * Get the animations of a specific scene
 */
export const getSceneAnimations = createSelector(
  getSceneId, getAnimations,
  (scene, animations) => {
    return animations.filter(animation => {
      return scene.animations.includes(animation.id)
    })
  }
)

/*
 * Get scenes that are part of the timeline
 */
 export const getTimelineScenes = createSelector(
   getScenes,
   getTimelineSceneIds,
   (scenes, timelineSceneIds) => {
     return scenes.filter(scene => {
       return timelineSceneIds.includes(scene.id)
     })
   }
 )
