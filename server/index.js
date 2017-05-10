'use strict';

import fs from 'fs';
import DmxUsbInterface from './core/DmxUsbInterface';
import ExpressServer from './core/ExpressServer';
import DeviceManager from './device/DeviceManager';
import AnimationManager from './core/AnimationManager';
import SceneManager from './core/SceneManager';
import Render from './core/Render';

// Load the config
// @TODO: Transform this into a ConfigService so the config can be injected into other classes
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));

// Connect to the USB DMX interface
let dmxUsbInterface = new DmxUsbInterface({ config: config });

// Initialize all devices
let deviceManager = new DeviceManager({ config: config, output: dmxUsbInterface.output });
deviceManager.register();

// Initialize all animations
let animationManager = new AnimationManager({ config: config, deviceManager: deviceManager });
animationManager.register();

// Initialize all scenes
let sceneManager = new SceneManager({ config: config, animationManager: animationManager });
sceneManager.register();

// Manage playback of all animations, scenes, timelines
let render = new Render({ config: config, dmxUsbInterface: dmxUsbInterface, sceneManager: sceneManager });
render.start(config.global.fps);

deviceManager.reset();

console.log("Started VisionLord in", process.env.NODE_ENV, "mode with", config.global.fps, "fps");
console.log(config.log.separator);

let expressServer = new ExpressServer({ port: config.server.port, config: config });
