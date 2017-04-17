'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CameoPixBar600PRO = require('./dmx/CameoPixBar600PRO.js');

var _CameoPixBar600PRO2 = _interopRequireDefault(_CameoPixBar600PRO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *
 *
 * @param {string} type - e.g. "CameoPixBar600PRO"
 * @param {string} deviceId - Unique identifier e.g. "cameopixbar600_1"
 * @param {string} name - e.g. "Cameo PixBar 600 PRO"
 * @param {number} universe - The parent universe the device is part of, e.g. 1
 * @param {number} address - Address of the device in the universe, e.g. 10
 *
 */
var DmxDevice = function () {
  function DmxDevice(param) {
    _classCallCheck(this, DmxDevice);

    this.type = param.type || undefined;
    this.deviceId = param.deviceId || undefined;
    this.name = param.name || undefined;

    // Mapping of devices
    this.deviceMapping = new Map();
    this.createMapping();

    // Create the instance of one specified device
    this.instance = new (this.deviceMapping.get(this.type))(param);

    // Set the output
    this.instance.setOutput(param.output);

    /*
     * @TODO: Maybe extend CameoPixBar600PRO with Device and to something like Device.dmx.CameoPixBar600PRO to create a new instance
     */
  }

  _createClass(DmxDevice, [{
    key: 'createMapping',
    value: function createMapping() {
      this.deviceMapping.set('CameoPixBar600PRO', _CameoPixBar600PRO2.default);
    }
  }]);

  return DmxDevice;
}();

exports.default = DmxDevice;