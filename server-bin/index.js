'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _DmxUsbInterface = require('./core/DmxUsbInterface');

var _DmxUsbInterface2 = _interopRequireDefault(_DmxUsbInterface);

var _ExpressServer = require('./core/ExpressServer');

var _ExpressServer2 = _interopRequireDefault(_ExpressServer);

var _DeviceManager = require('./device/DeviceManager');

var _DeviceManager2 = _interopRequireDefault(_DeviceManager);

var _AnimationManager = require('./core/AnimationManager');

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _SceneManager = require('./core/SceneManager');

var _SceneManager2 = _interopRequireDefault(_SceneManager);

var _Render = require('./core/Render');

var _Render2 = _interopRequireDefault(_Render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Load the config
// @TODO: Transform this into a ConfigService so the config can be injected into other classes
var config = JSON.parse(_fs2.default.readFileSync('./config.json', 'utf8'));

// Connect to the USB DMX interface
var dmxUsbInterface = new _DmxUsbInterface2.default({ config: config });

// Initialize all devices
var deviceManager = new _DeviceManager2.default({ config: config, output: dmxUsbInterface.output });
deviceManager.register();

// Initialize all animations
var animationManager = new _AnimationManager2.default({ config: config, deviceManager: deviceManager });
animationManager.register();

// Initialize all scenes
var sceneManager = new _SceneManager2.default({ config: config, animationManager: animationManager });
sceneManager.register();

// Manage playback of all animations, scenes, timelines
var render = new _Render2.default({ config: config, dmxUsbInterface: dmxUsbInterface, sceneManager: sceneManager });
render.start(config.global.fps);

deviceManager.reset();

console.log("Started VisionLord in", process.env.NODE_ENV, "mode with", config.global.fps, "fps");
console.log(config.log.separator);

var expressServer = new _ExpressServer2.default({ port: config.server.port, config: config });