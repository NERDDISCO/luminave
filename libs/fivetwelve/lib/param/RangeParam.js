import DmxParam from './DmxParam.js';
import { clampedRangeMapper } from '../util/range-mapper.js';

const DEFAULT_OPTIONS = {
  min: 0,
  max: 1,
  rangeStart: 0,
  rangeEnd: 255
};

/**
 * The channel-range param is a typical dmx-parameter that only uses a
 * subset of continuous values on a single dmx-channel.
 *
 * This is often used to combine different features operated by the same
 * hardware-components like the shutter/strobe/dimmer-module.
 */
export default class RangeParam extends DmxParam {
  constructor(channel, options) {
    super([channel]);

    options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.logical2Dmx = clampedRangeMapper(
      options.min, options.max, options.rangeStart, options.rangeEnd);
    this.dmx2Logical = clampedRangeMapper(
      options.rangeStart, options.rangeEnd, options.min, options.max);
  }

  getValue(device) {
    return this.dmx2Logical(device.getChannelValue(this.channels[0]));
  }

  setValue(device, value) {
    device.setChannelValue(this.channels[0], this.logical2Dmx(value));
  }
}
