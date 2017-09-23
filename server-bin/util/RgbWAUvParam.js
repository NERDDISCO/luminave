"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fivetwelve = require('fivetwelve/es5');

/**
 * RGB-Params are used to control a color-mixing-unit of a light-fixture.
 */

var RgbWAUvParam = function (_fivetwelve$param$Dmx) {
  _inherits(RgbWAUvParam, _fivetwelve$param$Dmx);

  /**
   * Create a new RGB-Param.
   * @param {Number} channel The assigned DMX-channel within the
   *   device (1-based channel number passed as [r,g,b,w,a,uv]).
   */
  function RgbWAUvParam(channel) {
    _classCallCheck(this, RgbWAUvParam);

    var _this = _possibleConstructorReturn(this, (RgbWAUvParam.__proto__ || Object.getPrototypeOf(RgbWAUvParam)).call(this, [channel]));

    _this.channel = channel;

    _this.color = [0, 0, 0, 0, 0, 0];
    return _this;
  }

  _createClass(RgbWAUvParam, [{
    key: "setValue",
    value: function setValue(device, color) {
      this.color = color;

      for (var i = 0; i < 6; i++) {
        device.setChannelValue(this.channel + i, color[i]);
      }
    }
  }, {
    key: "getValue",
    value: function getValue(device) {
      var channelValues = [];

      for (var i = 0; i < 6; i++) {
        channelValues.push(device.getChannelValue(this.channel + i));
      }

      this.color = channelValues;

      return this.color;
    }
  }]);

  return RgbWAUvParam;
}(fivetwelve.param.DmxParam);

exports.default = RgbWAUvParam;