import {Observable} from 'rxjs/Observable'
import 'rxjs/add/observable/fromEvent'
import {eventService} from './EventService'
import WebSocket from 'reconnecting-websocket'

/**
 * Handles the WebSocket connection to the server.
 *
 * @param {String} url - The URL of the WebSocket-Server, e.g. ws://localhost:
 * @param {Number} port - The port of the WebSocket-Server, e.g. 3000
 * @param {String} path - The path of the WebSocket-Server, e.g. /midi
 */
export default class WebSocketClient {
  constructor(param) {
    this.url = param.url
    this.port = param.port
    this.path = param.path

    const reconnectingWebsocketOptions = {
      maxReconnectionDelay: 500,
      minReconnectionDelay: 250,
      reconnectionDelayGrowFactor: 1.3,
      connectionTimeout: 500
    }

    // Create a connection to the server
    this.connection = new WebSocket(this.url + this.port + this.path, [], reconnectingWebsocketOptions)

    // Listen for messages from the server
    this.connection.addEventListener('message', this.fromServer.bind(this))

    // @TODO: Move this into it's own class and find a name that makes any sense :D
    const midiControllerSource = Observable.fromEvent(eventService, 'MidiController')
    midiControllerSource.subscribe(data => {
      data.type = 'midi'
      this.connection.send(JSON.stringify(data))
    })
  }

  /*
   * Handle message from the server.
   */
  fromServer(message) {

    const data = JSON.parse(message.data)

    // Connection to the server was succesful and we got a "welcome" message
    if (data.type === 'welcome') {
      console.log('WebSocketClient', '-', data.message)

      // Any other message from the server
    } else {
      console.log('WebSocketClient', '-', 'Server says:', data)
    }

  }
}
