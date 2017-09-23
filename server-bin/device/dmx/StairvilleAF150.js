"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fivetwelve = require('fivetwelve/es5');

var StairvilleAF150 = function (_fivetwelve$DmxDevice) {
  _inherits(StairvilleAF150, _fivetwelve$DmxDevice);

  function StairvilleAF150(options) {
    _classCallCheck(this, StairvilleAF150);

    var _this = _possibleConstructorReturn(this, (StairvilleAF150.__proto__ || Object.getPrototypeOf(StairvilleAF150)).call(this, Object.assign({}, options, {
      params: {
        amount: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 })
      }
    })));

    _this.layout = {};
    _this.layout.width = 1;
    _this.layout.height = 1;
    return _this;
  }

  return StairvilleAF150;
}(fivetwelve.DmxDevice);

exports.default = StairvilleAF150;