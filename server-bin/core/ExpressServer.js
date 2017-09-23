"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _expressWs = require('express-ws');

var _expressWs2 = _interopRequireDefault(_expressWs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _serveFavicon = require('serve-favicon');

var _serveFavicon2 = _interopRequireDefault(_serveFavicon);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _EventService = require('./EventService');

var _ModVService = require('./ModVService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 * Create a HTTP-Server with Express and a WebSocket-Server with ws.
 *
 *  * @TODO: Check if compression https://github.com/websockets/ws#websocket-compression is really disabled?
 */
var ExpressServer = function () {
  function ExpressServer(param) {
    var _this = this;

    _classCallCheck(this, ExpressServer);

    this.port = param.port || 3000;
    this.config = param.config;
    this.app = (0, _express2.default)();

    // Create HTTP server
    this.server = _http2.default.createServer(this.app);

    this.server.listen(this.config.server.port);
    this.server.on('error', this.onError.bind(this));
    this.server.on('listening', this.onListening.bind(this));

    //const index = require('./routes/index');

    var express_ws = (0, _expressWs2.default)(this.app, this.server, {
      perMessageDeflate: false
    });
    this.app = express_ws.app;

    // view engine setup
    this.app.set('views', _path2.default.join(__dirname, '../../client-bin/views'));
    this.app.set('view engine', 'jade');

    // uncomment after placing your favicon in /public
    //this.app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    //this.app.use(logger('dev'));
    this.app.use(_bodyParser2.default.json());
    this.app.use(_bodyParser2.default.urlencoded({ extended: false }));
    this.app.use((0, _cookieParser2.default)());
    this.app.use(_express2.default.static(_path2.default.join(__dirname, '../../client-bin')));

    // Root route
    this.app.get('/', function (req, res, next) {
      res.render('index', { title: 'VisionLord', mydata: JSON.stringify(_this.config) });
    });

    // WebSocket: MIDI
    this.app.ws(this.config.server.websocket.path.midi, function (ws, req) {
      // There is a new connection
      console.log(_this.config.server.websocket.path.midi, '-', 'opened 😍');

      // Welcome the client
      ws.send(JSON.stringify({ 'type': 'welcome', 'message': '❤️' }));

      // Receive a message from the client
      ws.on('message', function (message) {
        var data = JSON.parse(message);

        console.log(_this.config.server.websocket.path.midi, '-', data);

        _EventService.eventService.emit('MidiController', data);
      });

      ws.on('error', function (msg) {
        console.error(msg);
      });

      ws.on('close', function () {
        console.log(_this.config.server.websocket.path.midi, '-', 'closed 😱');
        console.log(_this.config.log.separator);
      });
    }); // WebSocket: /midi


    // WebSocket: modV
    this.app.ws(this.config.server.websocket.path.modV, function (ws, req) {
      // There is a new connection
      console.log(_this.config.server.websocket.path.modV, '-', 'opened 😍');

      // Welcome the client
      ws.send(JSON.stringify({ 'type': 'welcome', 'message': '❤️' }));

      // Receive a message from the client
      ws.on('message', function (message) {
        var data = JSON.parse(message);

        console.log(_this.config.server.websocket.path.modV, '-', data);

        _ModVService.modVService.globalColor = data.average;

        // eventService.emit('modV', data);
      });

      ws.on('error', function (msg) {
        console.error(msg);
      });

      ws.on('close', function () {
        console.log(_this.config.server.websocket.path.modV, '-', 'closed 😱');
        console.log(_this.config.log.separator);
      });
    }); // WebSocket: /midi


    // Catch 404 and forward to error handler
    this.app.use(function (req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // Error handler
    this.app.use(function (err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};

      // Render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    console.log('Started Server: Express + WebSocket on port', this.config.server.port);
    console.log(this.config.log.separator);
  }

  // Event listener for HTTP server "listening" event


  _createClass(ExpressServer, [{
    key: 'onListening',
    value: function onListening() {
      var addr = this.server.address();
      var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
      (0, _debug2.default)('Listening on ' + bind);
    }

    // Event listener for HTTP server "error" event

  }, {
    key: 'onError',
    value: function onError(error) {
      if (error.syscall !== 'listen') {
        throw error;
      }

      var bind = typeof port === 'string' ? 'Pipe ' + this.port : 'Port ' + this.port;

      // handle specific listen errors with friendly messages
      switch (error.code) {
        case 'EACCES':
          console.error(bind + ' requires elevated privileges');
          process.exit(1);
          break;
        case 'EADDRINUSE':
          console.error(bind + ' is already in use');
          process.exit(1);
          break;
        default:
          throw error;
      }
    }
  }]);

  return ExpressServer;
}();

exports.default = ExpressServer;