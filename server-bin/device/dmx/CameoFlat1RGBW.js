"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fivetwelve = require('fivetwelve/es5');

var CameoFlat1RGBW = function (_fivetwelve$DmxDevice) {
  _inherits(CameoFlat1RGBW, _fivetwelve$DmxDevice);

  function CameoFlat1RGBW(options) {
    _classCallCheck(this, CameoFlat1RGBW);

    var _this = _possibleConstructorReturn(this, (CameoFlat1RGBW.__proto__ || Object.getPrototypeOf(CameoFlat1RGBW)).call(this, Object.assign({}, options, {
      params: {
        dimmer: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(2, { min: 0, max: 255 }),
        color: new fivetwelve.param.RgbParam([3, 4, 5]),
        white: new fivetwelve.param.RangeParam(6, { min: 0, max: 255 })
      }
    })));

    _this.layout = {};
    _this.layout.width = 1;
    _this.layout.height = 1;
    return _this;
  }

  return CameoFlat1RGBW;
}(fivetwelve.DmxDevice);

exports.default = CameoFlat1RGBW;