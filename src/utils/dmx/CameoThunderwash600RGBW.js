import RgbParam from "./param/RgbParam.js";
import RangeParam from "fivetwelve/lib/param/RangeParam.js";

import DmxDevice from "./DmxDevice.js";

export default class CameoThunderwash600RGBW extends DmxDevice {
  constructor(options) {
    super(
      Object.assign({}, options, {
        params: {
          dimmer: new RangeParam(1, { min: 0, max: 255 }),
          strobe: new RangeParam(2, { min: 0, max: 255 }),
          color: new RgbParam([3, 4, 5]),
          duration: new RangeParam(6, { min: 0, max: 255 }),
          white: new RangeParam(7, { min: 0, max: 255 }),
        },
      })
    );

    this.channels = 7;
    this.weight = 3.25;
  }
}
