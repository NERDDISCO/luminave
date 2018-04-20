import { Element as PolymerElement } from '/node_modules/@polymer/polymer/polymer-element.js'
import { reduxMixin } from '../../reduxStore.js'
import { connectDekk, setDekkData, addSceneToTimeline, removeSceneFromTimelineAndResetFixtures } from '../../actions/index.js'
import { getSceneByName } from '../../selectors/index.js'

/*
 * Handle the connection to Dekk
 */
class DekkManager extends reduxMixin(PolymerElement) {

  static get properties() {
    return {
      live: {
        type: Boolean,
        statePath: 'live'
      },
      editMode: {
        type: Boolean,
        computed: 'computeEditMode(live)'
      },
      connected: {
        type: Boolean,
        statePath: 'dekkManager.connected'
      },
      data: {
        type: Object,
        statePath: 'dekkManager.data'
      },
      url: String,
      connectedLabel: {
        type: String,
        computed: 'computeConnectedLabel(connected)'
      }
    }
  }

  computeEditMode(live) {
    return !live
  }

  computeConnectedLabel(connected) {
    return connected ? 'disconnect': 'connect'
  }

  connectedCallback() {
    super.connectedCallback()

    // Set the URL of the server we want to create a connection to
    this.url = 'ws://localhost:3001/luminave'

    // Try to create the connection when the component is loaded
    if (this.connected) {
      this.createWebsocket()
    }
  }

  handleClick() {
    // Close active WebSocket connection
    if (this.connected) {
      this.socket.close()
      this.dispatch(connectDekk(false))

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

      this.dispatch(connectDekk(true))
    })

    // Connection was closed
    this.socket.addEventListener('close', event => {
      console.info('Dekk WebSocket closed:', event)

      this.dispatch(connectDekk(false))
    })

    // Error with connection
    this.socket.addEventListener('error', error => {
      console.error('Dekk WebSocket error:', error)

      this.dispatch(connectDekk(false))
    })

    // Listen for messages
    this.socket.addEventListener('message', event => {
      const { data } = event

      // @TODO: Remove scenes when component gets loaded
      // Remove scenes
      this.changeScenes(this.data.scenes, 'remove')

      // Save data into state
      this.dispatch(setDekkData({ scenes: JSON.parse(data) }))

      // Add scenes
      this.changeScenes(this.data.scenes, 'add')
    })
  }

  changeScenes(sceneNames, action) {
    const arrayType = Array.isArray(sceneNames) ? sceneNames : [sceneNames]
    
    // Dekk will give us an array of scene names
    arrayType.map(name => {
      // Retrieve the scene
      const scene = getSceneByName(this.getState(), { name })

      if (scene === undefined) {
        console.log(`Scene "${name}" doesn't exist`)
      } else {

        switch (action) {
          case 'remove':
            this.dispatch(removeSceneFromTimelineAndResetFixtures(scene.id))
            break

          case 'add':
            // @TODO: TimelineManager: Don't add the same scene x+1 times
            // https://github.com/NERDDISCO/luminave/issues/16
            this.dispatch(addSceneToTimeline(scene.id))
            break

          default:
        }

      }
    })
  }

  static get template() {
    return `
      Dekk: <button on-click="handleClick">[[connectedLabel]]</button>
    `
  }
}

customElements.define('dekk-manager', DekkManager)
