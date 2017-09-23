"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lerpArray = require('lerp-array');

var _lerpArray2 = _interopRequireDefault(_lerpArray);

var _keytime2 = require('keytime');

var _keytime3 = _interopRequireDefault(_keytime2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KeytimeDeluxe = function (_keytime) {
  _inherits(KeytimeDeluxe, _keytime);

  function KeytimeDeluxe(data) {
    _classCallCheck(this, KeytimeDeluxe);

    return _possibleConstructorReturn(this, (KeytimeDeluxe.__proto__ || Object.getPrototypeOf(KeytimeDeluxe)).call(this, data));
  }

  _createClass(KeytimeDeluxe, [{
    key: 'interpolate',
    value: function interpolate(property, frame1, frame2, t) {
      // Custom interpolation :D
      if (typeof frame1.value === 'string') {
        return frame1.value;
      }

      // Default interpolation
      return (0, _lerpArray2.default)(frame1.value, frame2.value, t);
    }
  }]);

  return KeytimeDeluxe;
}(_keytime3.default);

exports.default = KeytimeDeluxe;