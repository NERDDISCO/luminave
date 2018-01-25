import { createSelector } from '/node_modules/reselect/src/index.js'

/*
 * Selectors help you to retrieve data from the state so you don't have to write the
 * same code to access the state over and over again. It also helps to have a central position
 * on how to access the state
 *
 * @TODO: Use reselect
 * -> https://github.com/reactjs/reselect
 * -> https://redux.js.org/docs/recipes/ComputingDerivedData.html
 */

export const getScenes = state => state.sceneManager
export const getAnimations = state => state.animationManager
export const getFixtures = state => state.fixtureManager


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
  return state.sceneManager.filter(scene => scene.id === properties.sceneId)[0]
}

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
