'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fivetwelve = require('fivetwelve/es5');

var AdjStarburst = function (_fivetwelve$DmxDevice) {
  _inherits(AdjStarburst, _fivetwelve$DmxDevice);

  function AdjStarburst(options) {
    _classCallCheck(this, AdjStarburst);

    return _possibleConstructorReturn(this, (AdjStarburst.__proto__ || Object.getPrototypeOf(AdjStarburst)).call(this, Object.assign({}, options, {
      params: {
        color: new fivetwelve.param.RgbParam([1, 2, 3]),
        white: new fivetwelve.param.RangeParam(4, { min: 0, max: 255 }),
        yellow: new fivetwelve.param.RangeParam(5, { min: 0, max: 255 }),
        uv: new fivetwelve.param.RangeParam(6, { min: 0, max: 255 }),

        strobe: new fivetwelve.param.MultiRangeParam(7, {
          off: { range: [0, 7] },
          on: { range: [8, 15], values: [8, 15] },
          slowToFast: { range: [16, 131], values: [16, 131] },
          slowOpenToFastClose: { range: [140, 181], values: [140, 181] },
          fastOpenToSlowClose: { range: [190, 231], values: [190, 231] },
          random: { range: [240, 247], values: [240, 247] }
        }),

        dimmer: new fivetwelve.param.RangeParam(8, { min: 0, max: 255 }),

        rotate: new fivetwelve.param.MultiRangeParam(9, {
          off: { range: [0, 30] },
          clockwise: { range: [31, 140], values: [0, 255] },
          stop: { range: [141, 145] },
          counterClockwise: { range: [146, 255], values: [0, 255] }
        })
      }
    })));
  }

  return AdjStarburst;
}(fivetwelve.DmxDevice);

exports.default = AdjStarburst;