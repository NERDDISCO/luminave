
import { html, css } from 'lit-element/lit-element.js'
import gql from 'graphql-tag'
import { ApolloSubscription } from '@apollo-elements/lit-apollo'
import { removeSceneFromTimelineAndResetFixtures, addSceneToTimeline } from '../../actions'
import { setLuminaveServer } from '../../actions/luminave-server.js'
import { getSceneByName } from '../../selectors/index.js'
import { SCENE_TYPE_STATIC } from '../../constants/timeline.js'

import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import uuidv1 from 'uuid/v1.js'

 const subscription = gql`
 subscription {
   timelineScenesUpdated {
     name
   }
 }
 `

/**
 * Subsribe to the luminave-server to get updates for the timeline
 */
class LuminaveServerSubscriptionTimeline extends connect(store)(ApolloSubscription) {

  constructor() {
    super()
  }
  
  static get properties() {
    return {
      client: { type: Object },
      scenes: { type: Array }
    }
  }

  _stateChanged() {
  }

  static get styles() {
    return css`
    `
  }

  shouldUpdate(changedProps) {
    if (changedProps.has('client')) {
      return true
    }

    if (changedProps.has('data')) {
      this._updateTimeline(this.data.timelineScenesUpdated)
    }

    return (
      this.loading !== null ||
      this.data ||
      this.error
    )
  }

  updated(changedProps) {
    // Create a new subscription if the client was set
    if (changedProps.has('client')) {
      this.subscription = subscription
    }
  }

  /**
   * Update the timeline using the incoming scenes. 
   * 
   * @param {Object} scenes - The scenes from luminave-server
   */
  _updateTimeline(scenes) {
    // Remove scenes
    this.changeScenes(this.scenes, 'remove')

    scenes = scenes.map(scene => {
      return {
        name: scene.name,
        type: SCENE_TYPE_STATIC,
        adapt: true,
        started: undefined,
        timelineSceneId: uuidv1()
      }
    })

    // Add scenes
    this.changeScenes(scenes, 'add')

    // Save current scenes
    // @TODO Decouple this from the actual source and move it into the luminave-server-manager
    const thorium = { scenes }
    store.dispatch(setLuminaveServer({ thorium }))
  }

  /**
   * Change the scenes in the timeline based on the action. 
   * 
   * @param {Object[]} scenes - The scenes that should be added or removed
   * @param {string} action - add or remove
   */
  changeScenes(scenes, action) {
    const arrayType = Array.isArray(scenes) 
      ? scenes 
      : [scenes]

    arrayType.map(scene => {
      const { name } = scene

      // Retrieve the scene
      const _scene = getSceneByName(store.getState(), { name })

      if (_scene === undefined) {
        console.log(`Can't ${action} scene "${scene.name}" because it doesn't exist`)
      } else {
        scene.sceneId = _scene.id

        switch (action) {
          case 'remove':
            store.dispatch(removeSceneFromTimelineAndResetFixtures(scene.sceneId))
            break

          case 'add':
            store.dispatch(addSceneToTimeline(scene))
            break

          default:
        }

      }
    })
  }


  render() {
    const { error } = this

    return html`
    ${error}
    `
  }
}

customElements.define('luminave-server-subscription-timeline', LuminaveServerSubscriptionTimeline)
