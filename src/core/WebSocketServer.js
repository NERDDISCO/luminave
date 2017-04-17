"use strict";

let ws = require('nodejs-websocket');

/**
 * @deprecated
 *
 * @TODO: Delete
 */
export default class WebSocketServer {

  constructor(param) {
    this.port = param.port || 1337;
    this.debug = param.debug || false;

    /**
     * Create a WebSocket server
     */
    this.server = ws.createServer(function(connection) {

      console.log('New connection');

      // Receive data
      connection.on('text', function(data) {
        if (this.debug) {
          console.log(data);
        }

        data = JSON.parse(data);

        if (this.debug) {
          console.log(JSON.stringify(data));
        }

      });


      // Connection is closed
      connection.on('close', function(code, reason) {
        console.log('Connection closed');
      });


      // There was an error
      connection.on('error', function(error) {
        if (error.code !== 'ECONNRESET') {
          // Ignore ECONNRESET and re throw anything else
          throw error;
        }
      });

    }.bind(this)).listen(this.port);

    console.log("Started WebSocketServer on port", this.port);

  }

  broadcast(server, msg) {
    server.connections.forEach(function(conn) {
      conn.sendText(msg);
    });
  }

}
