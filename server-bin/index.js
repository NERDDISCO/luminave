'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _ExpressServer = require('./core/ExpressServer');

var _ExpressServer2 = _interopRequireDefault(_ExpressServer);

var _DeviceManager = require('./device/DeviceManager');

var _DeviceManager2 = _interopRequireDefault(_DeviceManager);

var _AnimationManager = require('./core/AnimationManager');

var _AnimationManager2 = _interopRequireDefault(_AnimationManager);

var _randomColor = require('random-color');

var _randomColor2 = _interopRequireDefault(_randomColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fivetwelve = require('fivetwelve/es5');
var fivetwelve_driver_usbpro = require('fivetwelve-driver-usbpro/es5');
var Serialport = require('serialport');
if (process.env.NODE_ENV == 'development') {
  Serialport = require('virtual-serialport');
}

// Load the config
var config = JSON.parse(_fs2.default.readFileSync('./config.json', 'utf8'));

// USB connection to Enttec DMX USB PRO Mk2
var usbProSerialport = new Serialport(config.serialport.path);
// Initialize the driver using the serial connection
var driver = new fivetwelve_driver_usbpro(usbProSerialport);
// Create the output using the driver and initialize 2 universes
var output = fivetwelve.default(driver, 2);

// Initialize all devices
var deviceManager = new _DeviceManager2.default({ config: config, output: output });
deviceManager.register();

var animationManager = new _AnimationManager2.default({ config: config });

// Set initial values for the devices
deviceManager.get('cameo_laser').pattern = 19;
deviceManager.get('cameo_laser').colors = 'original';
deviceManager.get('cameo_laser').zoom = 'manual(0)';
deviceManager.get('cameo_laser').xAxisRolling = 'manual(0)';
deviceManager.get('cameo_laser').yAxisRolling = 'manual(0)';
deviceManager.get('cameo_laser').zAxisRolling = 'manual(0)';
deviceManager.get('cameo_laser').xAxisMoving = 'manual(0)';
deviceManager.get('cameo_laser').yAxisMoving = 'speed(10)';

// Has to be "on", otherwise you don't see anything at all
deviceManager.get('adj_planet').strobe = 'on';
deviceManager.get('adj_planet').uv = 255;
deviceManager.get('adj_planet').dimmer = 255;
deviceManager.get('adj_planet').color = 'rgb(0, 0, 0)';

var pixbar_active = 1;
var pixbar_animation_color = [255, 0, 0];

// @TODO: The "animation loop" should be part of in AnimationManager or Timeline or something like that

// Animation loop
output.requestDmxFrame(function loop(time) {

  // Set a random color for each device
  // deviceManager.get('cameo_ledspot_1').color = randomColor().rgbString();
  // deviceManager.get('cameo_ledspot_2').color = randomColor().rgbString();
  deviceManager.get('adj_planet').color = (0, _randomColor2.default)().rgbString();

  for (var i = 1; i <= 12; i++) {
    deviceManager.get('cameopixbar600_1')['led' + i].rgbwauv = [0, 0, 0, 0, 0, 255];

    if (i === pixbar_active) {
      deviceManager.get('cameopixbar600_1')['led' + i].rgbwauv = [pixbar_animation_color[0], pixbar_animation_color[1], pixbar_animation_color[2], 0, 0, 0];
    }
  }
  pixbar_active = ++pixbar_active % 13;

  output.requestDmxFrame(loop);
});

// Start the DMX output with the specified fps
output.start(1000 / config.global.fps);

console.log("Started VisionLord in", process.env.NODE_ENV, "mode with", config.global.fps, "fps");
console.log(config.log.separator);

var expressServer = new _ExpressServer2.default({
  port: config.server.port,
  config: config
});