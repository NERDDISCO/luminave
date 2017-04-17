'use strict';

var _ExpressServer = require('./core/ExpressServer');

var _ExpressServer2 = _interopRequireDefault(_ExpressServer);

var _randomColor = require('random-color');

var _randomColor2 = _interopRequireDefault(_randomColor);

var _DmxDevice = require('./device/DmxDevice');

var _DmxDevice2 = _interopRequireDefault(_DmxDevice);

var _CameoFlat1RGBW = require('./device/dmx/CameoFlat1RGBW');

var _CameoFlat1RGBW2 = _interopRequireDefault(_CameoFlat1RGBW);

var _CameoWookie200Rgy = require('./device/dmx/CameoWookie200Rgy');

var _CameoWookie200Rgy2 = _interopRequireDefault(_CameoWookie200Rgy);

var _AdjStarburst = require('./device/dmx/AdjStarburst');

var _AdjStarburst2 = _interopRequireDefault(_AdjStarburst);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');


var fivetwelve = require('fivetwelve/es5');
var fivetwelve_driver_usbpro = require('fivetwelve-driver-usbpro/es5');


// Use the serialport (USB)
var Serialport = require('serialport');
if (process.env.NODE_ENV == 'development') {
  Serialport = require('virtual-serialport');
}

// Serial connection (USB) to Enttec DMX USB PRO Mk2
var usbProSerialport = new Serialport('/dev/cu.usbserial-EN193448');
// Initialize the driver using the serial connection
var driver = new fivetwelve_driver_usbpro(usbProSerialport);
// Create the output using the driver and initialize 2 universes
var output = fivetwelve.default(driver, 2);

// Load the config
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Load the DmxDevice factory

var pixbar2;

// Initialize all dmx devices
config.devices.dmx.forEach(function (element, index, array) {

  pixbar2 = new _DmxDevice2.default({
    type: element.type,
    output: output,
    universe: element.universe,
    address: element.address
  });
});

// Load devices


// // Create the DMX devices and set the basic configuration
var device1 = new _CameoFlat1RGBW2.default({ universe: 1, address: 100 });

var device2 = new _CameoFlat1RGBW2.default({ universe: 2, address: 1 });
var scanner = new _CameoWookie200Rgy2.default({ universe: 2, address: 10 });
var discoBall = new _AdjStarburst2.default({ universe: 2, address: 20 });

// Connect the devices to the DMX output
device1.setOutput(output);
device2.setOutput(output);
scanner.setOutput(output);
discoBall.setOutput(output);

var dimmer = 25;
var fps = 1;

// Set initial values for the devices
device1.dimmer = dimmer;
device1.strobe = 0;
device1.color = 'rgb(0, 0, 0)';
device1.white = 0;

device2.dimmer = dimmer;
device2.strobe = 0;
device2.color = 'rgb(0, 0, 0)';
device2.white = 0;

pixbar2.instance.dimmer = dimmer;
pixbar2.instance.strobe = 0;

scanner.mode = 'dmx';
scanner.colors = 'red';
scanner.pattern = 1;
scanner.zoom = 'loop(100)';
scanner.xAxisRolling = 'manual(0)';
scanner.yAxisRolling = 'manual(0)';
scanner.zAxisRolling = 'manual(0)';
scanner.xAxisMoving = 'manual(0)';
scanner.yAxisMoving = 'manual(0)';

discoBall.color = 'rgb(255, 0, 0)';
discoBall.white = 0;
discoBall.yellow = 0;
discoBall.uv = 255;
discoBall.strobe = 'on';
discoBall.dimmer = dimmer;
discoBall.rotate = 'off';

var pixbar_active = 1;
var pixbar_animation_color = [255, 0, 0];

// Animation loop
output.requestDmxFrame(function loop(time) {

  // Set a random color for each device
  device1.color = (0, _randomColor2.default)().rgbString();
  device2.color = (0, _randomColor2.default)().rgbString();

  for (var i = 1; i <= 12; i++) {
    pixbar2.instance['led' + i].rgbwauv = [0, 0, 0, 0, 0, 255];

    if (i === pixbar_active) {
      pixbar2.instance['led' + i].rgbwauv = [pixbar_animation_color[0], pixbar_animation_color[1], pixbar_animation_color[2], 0, 0, 0];
    }
  }

  if (pixbar_active >= 12) {
    pixbar_active = 0;
  }
  pixbar_active++;

  output.requestDmxFrame(loop);
});

// Start the DMX output with the specified fps
output.start(1000 / fps);

console.log("Started VisionLord in", process.env.NODE_ENV, "mode with", fps, "fps");
console.log(config.log.separator);

var expressServer = new _ExpressServer2.default({
  port: config.server.port,
  config: config
});