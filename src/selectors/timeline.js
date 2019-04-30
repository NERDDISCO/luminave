import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'
import { getScenes } from './index.js'

export const getTimeline = state => state.timeline
export const getTimelinePlaying = state => state.timeline.playing
export const getTimelineScenes = state => state.timeline.scenes

/*
 * Get scenes that are part of the timeline
 */
export const getTimelineScenesEnhanced = createSelector(
  getScenes,
  getTimelineScenes,
  (scenes, timelineScenes) => {

    // Create a deep copy of the original array so that we don't modify the state :/
    // @TODO: Possible performance problem?
    return JSON.parse(JSON.stringify(timelineScenes)).map(timelineScene => {
      // Find the scene
      const scene = scenes.find(_scene => _scene.id === timelineScene.sceneId)

      if (scene !== undefined) {
        timelineScene.scene = scene
      }

      return timelineScene
    })

  }
)
