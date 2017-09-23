"use strict";

var fivetwelve = require('fivetwelve/es5');

export default class StairvilleAF150 extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        amount: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 })
      }
    }));

    this.layout = {};
    this.layout.width = 1;
    this.layout.height = 1;
  }
}
