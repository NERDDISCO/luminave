import update from 'immutability-helper/index.js'
import {
  PLAY_TIMELINE,
  ADD_SCENE_TO_TIMELINE,
  REMOVE_SCENE_FROM_TIMELINE,
  RESET_TIMELINE,
  SET_TIMELINE_PROGRESS
} from '../constants/index.js'

/**
 * Handle the timeline
 */
const timeline = (state = {
  scenes: [],
  playing: false,
  progress: 0
}, { type, sceneId, scene, sceneIndex, playing, progress }) => {

  if (scene !== undefined && scene.id !== undefined) {
    sceneIndex = state.scenes.findIndex(_scene => _scene.id === scene.id)
  }

  switch (type) {
    case PLAY_TIMELINE:
      return update(state, { playing: { $set: playing } })

    case ADD_SCENE_TO_TIMELINE: {
      return update(state, { scenes: { $push: [sceneId] } })
    }
      
    case REMOVE_SCENE_FROM_TIMELINE: {
      const sceneIndex = state.scenes.indexOf(sceneId)
      return update(state, { scenes: { $splice: [[sceneIndex, 1]] } })
    }

    case RESET_TIMELINE:
      return update(state, { scenes: { $set : [] } })

    case SET_TIMELINE_PROGRESS:
      return update(state, { progress: { $set: progress } })

    default:
      return state
  }
}
export default timeline
