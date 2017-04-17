'use strict';

const fs = require('fs');
import ExpressServer from './core/ExpressServer';

let fivetwelve = require('fivetwelve/es5');
let fivetwelve_driver_usbpro = require('fivetwelve-driver-usbpro/es5');
import randomColor from 'random-color';

// Use the serialport (USB)
let Serialport = require('serialport');
if (process.env.NODE_ENV == 'development') {
  Serialport = require('virtual-serialport');
}



// Serial connection (USB) to Enttec DMX USB PRO Mk2
const usbProSerialport = new Serialport('/dev/cu.usbserial-EN193448');
// Initialize the driver using the serial connection
const driver = new fivetwelve_driver_usbpro(usbProSerialport);
// Create the output using the driver and initialize 2 universes
const output = fivetwelve.default(driver, 2);

// Load the config
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Load the DmxDevice factory
import DmxDevice from './device/DmxDevice';
var pixbar2;

// Initialize all dmx devices
config.devices.dmx.forEach((element, index, array) => {

  pixbar2 = new DmxDevice({
    type: element.type,
    output: output,
    universe: element.universe,
    address: element.address,
  });

});



// Load devices
import CameoFlat1RGBW from './device/dmx/CameoFlat1RGBW';
import CameoWookie200Rgy from './device/dmx/CameoWookie200Rgy';
import AdjStarburst from './device/dmx/AdjStarburst';






// // Create the DMX devices and set the basic configuration
const device1 = new CameoFlat1RGBW({ universe: 1, address: 100 });

const device2 = new CameoFlat1RGBW({ universe: 2, address: 1 });
const scanner = new CameoWookie200Rgy({ universe: 2, address: 10 });
const discoBall = new AdjStarburst({ universe: 2, address: 20 });

// Connect the devices to the DMX output
device1.setOutput(output);
device2.setOutput(output);
scanner.setOutput(output);
discoBall.setOutput(output);



let dimmer = 25;
let fps = 1;

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









let pixbar_active = 1;
let pixbar_animation_color = [255, 0, 0];

// Animation loop
output.requestDmxFrame(function loop(time) {

  // Set a random color for each device
  device1.color = randomColor().rgbString();
  device2.color = randomColor().rgbString();

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

var expressServer = new ExpressServer({
  port: config.server.port,
  config: config
});
