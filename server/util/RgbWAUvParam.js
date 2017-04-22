var fivetwelve = require('fivetwelve/es5');

/**
 * RGB-Params are used to control a color-mixing-unit of a light-fixture.
 */
export default class RgbWAUvParam extends fivetwelve.param.DmxParam {
  /**
   * Create a new RGB-Param.
   * @param {Number} channel The assigned DMX-channel within the
   *   device (1-based channel number passed as [r,g,b,w,a,uv]).
   */
  constructor(channel) {
    super([channel]);

    this.channel = channel;

    this.color = [0, 0, 0, 0, 0, 0];
  }


  setValue(device, color) {
    this.color = color;

    for (var i = 0; i < 6; i++) {
      device.setChannelValue(this.channel + i, color[i]);
    }
  }


  getValue(device) {
    let channelValues = [];

    for (var i = 0; i < 6; i++) {
      channelValues.push(device.getChannelValue(this.channel + i));
    }

    this.color = channelValues;

    return this.color;
  }
}
