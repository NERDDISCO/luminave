'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _RgbWAUvParam = require('./../util/RgbWAUvParam');

var _RgbWAUvParam2 = _interopRequireDefault(_RgbWAUvParam);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fivetwelve = require('fivetwelve/es5');

var CameoPixBar600PRO = function (_fivetwelve$DmxDevice) {
  _inherits(CameoPixBar600PRO, _fivetwelve$DmxDevice);

  function CameoPixBar600PRO(options) {
    _classCallCheck(this, CameoPixBar600PRO);

    return _possibleConstructorReturn(this, (CameoPixBar600PRO.__proto__ || Object.getPrototypeOf(CameoPixBar600PRO)).call(this, Object.assign({}, options, {
      params: {
        dimmer: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(2, { min: 0, max: 255 }),

        led1: { rgbwauv: new _RgbWAUvParam2.default(3) },
        led2: { rgbwauv: new _RgbWAUvParam2.default(9) },
        led3: { rgbwauv: new _RgbWAUvParam2.default(15) },
        led4: { rgbwauv: new _RgbWAUvParam2.default(21) },
        led5: { rgbwauv: new _RgbWAUvParam2.default(27) },
        led6: { rgbwauv: new _RgbWAUvParam2.default(33) },
        led7: { rgbwauv: new _RgbWAUvParam2.default(39) },
        led8: { rgbwauv: new _RgbWAUvParam2.default(45) },
        led9: { rgbwauv: new _RgbWAUvParam2.default(51) },
        led10: { rgbwauv: new _RgbWAUvParam2.default(57) },
        led11: { rgbwauv: new _RgbWAUvParam2.default(63) },
        led12: { rgbwauv: new _RgbWAUvParam2.default(69) }

      }
    })));
  }

  return CameoPixBar600PRO;
}(fivetwelve.DmxDevice);

exports.default = CameoPixBar600PRO;