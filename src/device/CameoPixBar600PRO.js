var fivetwelve = require('fivetwelve/es5');

import RgbWAUvParam from './../util/RgbWAUvParam';

export default class CameoPixBar600PRO extends fivetwelve.DmxDevice {
  constructor(options) {
    super(Object.assign({}, options, {
      params: {
        dimmer: new fivetwelve.param.RangeParam(1, { min: 0, max: 255 }),
        strobe: new fivetwelve.param.RangeParam(2, { min: 0, max: 255 }),

        led1 : { rgbwauv : new RgbWAUvParam(3) },
        led2 : { rgbwauv : new RgbWAUvParam(9) },
        led3 : { rgbwauv : new RgbWAUvParam(15) },
        led4 : { rgbwauv : new RgbWAUvParam(21) },
        led5 : { rgbwauv : new RgbWAUvParam(27) },
        led6 : { rgbwauv : new RgbWAUvParam(33) },
        led7 : { rgbwauv : new RgbWAUvParam(39) },
        led8 : { rgbwauv : new RgbWAUvParam(45) },
        led9 : { rgbwauv : new RgbWAUvParam(51) },
        led10 : { rgbwauv : new RgbWAUvParam(57) },
        led11 : { rgbwauv : new RgbWAUvParam(63) },
        led12 : { rgbwauv : new RgbWAUvParam(69) },

      }
    }));
  }
}
