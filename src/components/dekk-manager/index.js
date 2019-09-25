import { LitElement, html } from 'lit-element'
import { connect } from 'pwa-helpers/connect-mixin.js'
import { store } from '../../reduxStore.js'
import { connectDekk, setDekkData, addSceneToTimeline, removeSceneFromTimelineAndResetFixtures } from '../../actions/index.js'
import { getSceneByName, getDekkConnected, getDekkData } from '../../selectors/index.js'
import { SCENE_TYPE_STATIC } from '../../constants/timeline.js'
import uuidv1 from 'uuid/v1.js'


/*
 * Handle the connection to Dekk
 */
class DekkManager extends connect(store)(LitElement) {

  static get properties() {
    return {
      connected: { type: Boolean },
      data: { type: Object },
      url: { type: String }
    }
  }

  _stateChanged(state) {
    this.connected = getDekkConnected(state)
    this.data = getDekkData(state)
  }

  connectedCallback() {
    super.connectedCallback()

    // Set the URL of the server we want to create a connection to
    this.url = 'ws://localhost:3006/luminave'

    // Try to create the connection when the component is loaded
    if (this.connected) {
      this.createWebsocket()
    }
  }

  handleClick() {
    // Close active WebSocket connection
    if (this.connected) {
      this.socket.close()
      store.dispatch(connectDekk(false))

    // Create new WebSocket connection
    } else {
      this.createWebsocket()
    }
  }

  createWebsocket() {
    this.socket = new WebSocket(this.url)

    // Connection was opened
    this.socket.addEventListener('open', () => {
      console.info('Dekk WebSocket opened to', this.url)

      store.dispatch(connectDekk(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('Dekk WebSocket closed:', event)

      store.dispatch(connectDekk(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('Dekk WebSocket error:', error)

      store.dispatch(connectDekk(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      // @TODO: Remove scenes when component gets loaded
      // Remove scenes
      this.changeScenes(this.data.scenes, 'remove')

      // Save data into state
      store.dispatch(setDekkData({ scenes: JSON.parse(data) }))

      // Add scenes
      this.changeScenes(this.data.scenes, 'add')
    })
  }

  changeScenes(sceneNames, action) {
    const arrayType = Array.isArray(sceneNames) 
      ? sceneNames 
      : [sceneNames]
    
    // Dekk will give us an array of scene names
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

          case 'add': {
            const scene = {
              sceneId: scene.id,
              timelineSceneId: uuidv1(),
              adapt: true,
              type: SCENE_TYPE_STATIC,
              added: new Date().getTime(),
              started: undefined,
              priority: 0
            }

            // @TODO: TimelineManager: Don't add the same scene x+1 times
            // https://github.com/NERDDISCO/luminave/issues/16
            store.dispatch(addSceneToTimeline(scene))
          }

            break

          default:
        }

      }
    })
  }

  render() {
    const { connected } = this

    const connectedLabel = connected 
    ? 'disconnect'
    : 'connect'

    return html`
      Dekk: <button @click="${e => this.handleClick(e)}">${connectedLabel}</button>
    `
  }
}

customElements.define('dekk-manager', DekkManager)
