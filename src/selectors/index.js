/*
 * Selectors help you to retrieve data from the state so you don't have to write the
 * same code to access the state over and over again. It also helps to have a central position
 * on how to access the state
 *
 * @TODO: Use reselect
 * -> https://github.com/reactjs/reselect
 * -> https://redux.js.org/docs/recipes/ComputingDerivedData.html
 */

 export const getScene = (state, properties) => {
   return state.sceneManager.filter(scene => scene.id === properties.sceneId)[0]
 }
