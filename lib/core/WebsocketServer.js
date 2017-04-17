"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ws = require('nodejs-websocket');

var WebSocketServer = function () {
  function WebSocketServer(param) {
    _classCallCheck(this, WebSocketServer);

    this.port = param.port || 1337;
    this.debug = param.debug || false;

    /**
     * Create a WebSocket server
     */
    this.server = ws.createServer(function (connection) {

      console.log('New connection');

      // Receive data
      connection.on('text', function (data) {
        if (this.debug) {
          console.log(data);
        }

        data = JSON.parse(data);

        if (this.debug) {
          console.log(JSON.stringify(data));
        }
      });

      // Connection is closed
      connection.on('close', function (code, reason) {
        console.log('Connection closed');
      });

      // There was an error
      connection.on('error', function (error) {
        if (error.code !== 'ECONNRESET') {
          // Ignore ECONNRESET and re throw anything else
          throw error;
        }
      });
    }.bind(this)).listen(this.port);

    console.log("Started WebSocketServer on port", this.port);
  }

  _createClass(WebSocketServer, [{
    key: 'broadcast',
    value: function broadcast(server, msg) {
      server.connections.forEach(function (conn) {
        conn.sendText(msg);
      });
    }
  }]);

  return WebSocketServer;
}();

exports.default = WebSocketServer;