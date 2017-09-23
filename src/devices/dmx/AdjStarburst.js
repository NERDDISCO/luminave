"use strict";

var fivetwelve = require('fivetwelve/es5');

export default class AdjStarburst extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
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
          random: { range: [240, 247], values: [240, 247] },
        }),

        dimmer: new fivetwelve.param.RangeParam(8, { min: 0, max: 255 }),

        rotate: new fivetwelve.param.MultiRangeParam(9, {
          off: { range: [0, 30] },
          clockwise: { range: [31, 140], values: [0, 255] },
          stop: { range: [141, 145] },
          counterClockwise: { range: [146, 255], values: [255, 0] }
        })
      }
    }));

    this.layout = {};
    this.layout.width = 1;
    this.layout.height = 1;
  }
}
