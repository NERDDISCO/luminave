"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _DmxDevice = require('./DmxDevice');

var _DmxDevice2 = _interopRequireDefault(_DmxDevice);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handle all devices
 */
var DeviceManager = function () {
  function DeviceManager(param) {
    _classCallCheck(this, DeviceManager);

    this.list = new Map();
    this.config = param.config;
    this.output = param.output;
  }

  _createClass(DeviceManager, [{
    key: 'register',
    value: function register() {
      var _this = this;

      // Initialize all dmx devices
      this.config.devices.dmx.forEach(function (element, index, array) {

        var device = new _DmxDevice2.default({
          type: element.type,
          output: _this.output,
          universe: element.universe,
          address: element.address
        });

        // Set default values

        if (device.instance.hasOwnProperty('dimmer')) {
          device.instance.dimmer = _this.config.global.dimmer;
        }

        if (device.instance.hasOwnProperty('strobe')) {
          device.instance.strobe = 0;
        }

        if (device.instance.hasOwnProperty('mode')) {
          device.instance.mode = 'dmx';
        }

        if (device.instance.hasOwnProperty('color')) {
          device.instance.color = 'rgb(0, 0, 0)';
        }

        _this.add(element.deviceId, device);
      });
    }
  }, {
    key: 'add',
    value: function add(deviceId, device) {
      this.list.set(deviceId, device);
    }
  }, {
    key: 'get',
    value: function get(deviceId) {
      return this.list.get(deviceId).instance;
    }
  }]);

  return DeviceManager;
}();

exports.default = DeviceManager;