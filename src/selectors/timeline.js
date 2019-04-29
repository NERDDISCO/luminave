import { createSelector } from 'reselect/src/index.js'
import { collator } from '../utils/index.js'
import { getScenes } from './index.js'

export const getTimeline = state => state.timeline
export const getTimelinePlaying = state => state.timeline.playing
export const getTimelineSceneIds = state => state.timeline.scenes

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
