import DmxParam from './DmxParam.js';
import {rangeMapper} from '../util/range-mapper.js';
/**
 * HiResParams are used to represent 16bit DMX-parameters.
 */
export default class HiResParam extends DmxParam {
  /**
   * Creates a new HiResParam.
   * @param {Array.<Number>} channels The channels involved, always in MSB-first
   *     order, i.e. `[msbChannel, lsbChannel]`
   * @param {HiResParamOptions} options
   */
  constructor(channels, options = {}) {
    super(channels);

    let min = options.min || 0,
      max = options.max || 1;

    // range mapping
    const uint16MaxVal = Math.pow(2, 16) - 1;

    this.logical2Dmx = rangeMapper(min, max, 0, uint16MaxVal);
    this.dmx2Logical = rangeMapper(0, uint16MaxVal, min, max);
  }

  /**
   * Sets the parameter-value on the given device.
   * Is called by the dynamic properties of the device.
   * @param {DmxDevice} device
   * @param {Number} value
   */
  setValue(device, value) {
    let dmxValue = Math.floor(this.logical2Dmx(value));

    /* eslint-disable no-bitwise */
    device.setChannelValue(this.channels[0], dmxValue >> 8);
    device.setChannelValue(this.channels[1], dmxValue & 0xff);
    /* eslint-enable no-bitwise */
  }

  /**
   * Retrieves the current param value for the device.
   * Is called by the dynamic properties of the device.
   * @param {DmxDevice} device
   * @returns {Number}
   */
  getValue(device) {
    let msb = device.getChannelValue(this.channels[0]),
      lsb = device.getChannelValue(this.channels[1]);

    return this.dmx2Logical((msb << 8) + lsb); // eslint-disable-line no-bitwise
  }
}

/**
 * Options to be passed to the param-contructor.
 * @typedef {Object} HiResParamOptions
 * @property {Number} min The min logical value for conversion (default: 0).
 * @property {Number} max The max logical value for conversion. (default: 1).
 */
