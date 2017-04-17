'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CameoPixBar600PRO = require('./dmx/CameoPixBar600PRO.js');

var _CameoPixBar600PRO2 = _interopRequireDefault(_CameoPixBar600PRO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 *
 * @param {string} type - e.g. "dmx/CameoPixBar600PRO"
 * @param {string} deviceId - Unique identifier e.g. "cameopixbar600_1"
 * @param {string} name - e.g. "Cameo PixBar 600 PRO"
 *
 * @param {number} width - The width of the device e.g. 12
 * @param {number} height - The width of the device e.g. 1
 *
 * The Cameo PixBar 600 PRO has 12 LEDs beside each other.
 *
 */
var Device = function Device(param) {
  _classCallCheck(this, Device);

  this.type = param.type || undefined;
  this.deviceId = param.deviceId || undefined;
  this.name = param.name || undefined;

  this.layout = {};
  this.layout.width = param.width || undefined;
  this.layout.height = param.height || undefined;

  this.instance = new _CameoPixBar600PRO2.default(param);

  /*
   * @TODO: Maybe extend CameoPixBar600PRO with Device and to something like Device.dmx.CameoPixBar600PRO to create a new instance
   */

  console.log(this.instance);
};

exports.default = Device;