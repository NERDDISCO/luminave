import * as constants from '../constants/index.js'
import { getScenesWithAnimation, getVenuesWithAnimation } from '../selectors/index.js'
import { removeAnimationFromScene, setVenueSlot } from './index.js'

/*
 * Add a animation
 */
export const addAnimation = animation => ({
  animation,
  type: constants.ADD_ANIMATION
})

/*
 * Update a animation
 */
export const setAnimation = animation => ({
  animation,
  type: constants.SET_ANIMATION
})

/*
 * Start the playback of a animation
 */
export const runAnimation = animationId => ({
  animationId,
  type: constants.RUN_ANIMATION
})

/*
 * Remove an animation from the animationManager
 */
export const removeAnimation = animationId => ({
  animationId,
  type: constants.REMOVE_ANIMATION
})

/*
 * Remove the animation from everywhere
 */
export const removeAnimationFromEverywhere = animationId => {
  return (dispatch, getState) => {

    const scenes = getScenesWithAnimation(getState(), { animationId })

    // Remove animation from all scenes
    scenes.map(scene => {
      dispatch(removeAnimationFromScene(scene.id, animationId))
    })

    // Remove animation from all venues
    getVenuesWithAnimation(getState(), { animationId }).map(venue => {
      venue.slots
        // Find all slots that contain the fixture
        .filter(slot => slot.animations.includes(animationId))
        .map(slot => {
          // Remove the fixture from the list of animations of this slot
          const animations = slot.animations.filter(_animationId => _animationId !== animationId)
          dispatch(setVenueSlot(venue.id, { id: slot.id, animations }))
        })
    })

    dispatch(removeAnimation(animationId))
  }
}


/*
 * Add a keyframe to an animation
 */
export const addKeyframe = (animationId, keyframeStep, keyframeProperty, keyframeValue) => ({
  animationId,
  keyframeStep,
  keyframeProperty,
  keyframeValue,
  type: constants.ADD_KEYFRAME
})

/*
 * Add keyframes to an animation
 */
export const addKeyframes = (animationId, keyframeStep, keyframeProperties) => {
  return (dispatch, getState) => {
    Object.entries(keyframeProperties).map(keyframeProperty => {
      const [property, value] = keyframeProperty

      dispatch(addKeyframe(animationId, keyframeStep, property, value))
    })

  }
}
