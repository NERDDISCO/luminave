var fivetwelve = require('fivetwelve/es5');

export default class CameoWookie200Rgy extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {

        mode: new fivetwelve.param.MappedParam(1, {
          off: [0, 63],
          auto: [64, 127],
          sound: [128, 191],
          dmx: [192, 255]
        }),

        colors: new fivetwelve.param.MappedParam(2, {
          original: [0, 63],
          red: [64, 127],
          green: [128, 191],
          yellow: [192, 255]
        }),

        pattern: new fivetwelve.param.MappedParam(3, {
          1: [0, 7],
          2: [8, 15],
          3: [16, 23],
          4: [24, 31],
          5: [32, 39],
          6: [40, 47],
          7: [48, 55],
          8: [56, 63],
          9: [64, 71],
          10: [72, 79],
          11: [80, 87],
          12: [88, 95],
          13: [96, 103],
          14: [104, 111],
          15: [112, 119],
          16: [120, 127],
          17: [128, 135],
          18: [136, 143],
          19: [144, 151],
          20: [152, 159],
          21: [160, 167],
          22: [168, 175],
          23: [176, 183],
          24: [184, 191],
          25: [192, 199],
          26: [200, 207],
          27: [208, 215],
          28: [216, 223],
          29: [224, 231],
          30: [232, 239],
          31: [240, 247],
          32: [248, 255]
        }),

        zoom: new fivetwelve.param.MultiRangeParam(4, {
          manual: { range: [0, 127], values: [0, 255] },
          loop: { range: [128, 255], values: [0, 255] }
        }),

        xAxisRolling: new fivetwelve.param.MultiRangeParam(5, {
          manual: { range: [0, 127], values: [0, 255] },
          speed: { range: [128, 255], values: [0, 255] }
        }),

        yAxisRolling: new fivetwelve.param.MultiRangeParam(6, {
          manual: { range: [0, 127], values: [0, 255] },
          speed: { range: [128, 255], values: [0, 255] }
        }),

        zAxisRolling: new fivetwelve.param.MultiRangeParam(7, {
          manual: { range: [0, 127], values: [0, 255] },
          speed: { range: [128, 255], values: [0, 255] }
        }),

        xAxisMoving: new fivetwelve.param.MultiRangeParam(8, {
          manual: { range: [0, 127], values: [0, 255] },
          speed: { range: [128, 255], values: [0, 255] }
        }),

        yAxisMoving: new fivetwelve.param.MultiRangeParam(9, {
          manual: { range: [0, 127], values: [0, 255] },
          speed: { range: [128, 255], values: [0, 255] }
        })
      }

    }));
  }
}
