import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../../reduxStore.js'
import { repeat } from 'lit-html/directives/repeat.js'
import gql from 'graphql-tag'
import { ApolloSubscription, html } from '@apollo-elements/lit-apollo'
import { getClient } from '../../graphql/graphql-client.js'
import { addSceneToTimeline, removeSceneFromTimelineAndResetFixtures } from '../../../actions/index.js'
import { getSceneByName } from '../../../selectors/index.js'



// Compute graphql documents statically for performance
const subscription = gql`
  subscription {
    timelineScenesUpdated {
      name
    }
  }
`

/*
 * Handle communication with the server
 */
class LuminaveServer extends connect(store)(ApolloSubscription) {
  
  constructor() {
    super()

    this.connected = false
    this.scenes = []

    this.resolveClient()
  }

  static get properties() {
    return {
      connected: { type: Boolean },
      scenes: { type: Array }
    }
  }

  async resolveClient() {
    this.client = await getClient({url: 'ws://localhost:4000/graphql', reconnect: true})
    this.connected = true
    this.subscription = subscription
  }

  _stateChanged(state) {
  }

  shouldUpdate(changedProps) {
    console.log(changedProps)

    if (changedProps.has('data')) {
      // @TODO: Remove scenes when component gets loaded
      // Remove scenes
      this.changeScenes(this.scenes, 'remove')

      this.scenes = this.data.timelineScenesUpdated.map(scene => scene.name)
      
      // Add scenes
      this.changeScenes(this.scenes, 'add')
    }

    return (
      changedProps.has('connected') ||
      this.loading != null ||
      this.data ||
      this.error
    );
  }

  changeScenes(sceneNames, action) {
    const arrayType = Array.isArray(sceneNames) 
      ? sceneNames 
      : [sceneNames]

    arrayType.map(name => {
      // Retrieve the scene
      const scene = getSceneByName(store.getState(), { name })

      if (scene === undefined) {
        console.log(`Scene "${name}" doesn't exist`)
      } else {

        switch (action) {
          case 'remove':
            store.dispatch(removeSceneFromTimelineAndResetFixtures(scene.id))
            break

          case 'add':
            // @TODO: TimelineManager: Don't add the same scene x+1 times
            // https://github.com/NERDDISCO/luminave/issues/16
            store.dispatch(addSceneToTimeline(scene.id))
            break

          default:
        }

      }
    })
  }

  render() {
    const { data, error, loading, connected } = this
    
    const { timelineScenesUpdated = [] } = data || {}

    return html`
      luminave-server: ${connected}

      ${
        error !== undefined ? html`🔥` : html``
      }

      <h3>Scenes</h3>
      <ul>
      ${repeat(timelineScenesUpdated, scene => html`
        <li>${scene.name}</li>
      `)}
      </ul>
    `
   }
 
}

customElements.define('luminave-server', LuminaveServer)
