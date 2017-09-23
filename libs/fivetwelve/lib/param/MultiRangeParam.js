import DmxParam from './DmxParam.js';
import { clampedRangeMapper } from '../util/range-mapper.js';
import { clamp } from '../util/clamp.js';

//                  functionname arguments        unit  seperator
//                  |            |arguments       |     |     final argument
//                  |            ||               |     |     |
const rxFunction = /(\w+)\s*(?:\(((?:\d*(?:\.\d+)?\w*\s*,\s*)*(?:\d*(?:\.\d+)?\w*))\))?/; // eslint-disable-line max-len

/**
 * A parameter with multiple functions. Values are generally strings that
 * are interpreted as functions. So for a definition like
 *
 * shutter = MultiRangeParam(10, {
 *   closed: {range: [0,6]},
 *   open: {range: [7,13]},
 *   strobe: {range: [14,100], values: [0, 1]}
 * })
 *
 * all of these values are valid:
 *
 * shutter: open; // not a function-call, sets start of the range
 * shutter: closed(); // same as above
 * shutter: strobe(0.4); // will set the corresponding mapped value
 * shutter: strobe; // no value: is assumed to be zero (or the lowest of min
 * and max if zero isn't within)
 */
export default class MultiRangeParam extends DmxParam {
  /**
   * @param {number} channel
   * @param {object.<string, RangeDefinition>} rangeDefinitions
   */
  constructor(channel, rangeDefinitions = {}) {
    super([channel]);

    this.dmxToValueCache = [];
    this.mapping = {};

    // setup this.mapping
    Object.keys(rangeDefinitions).forEach(key => {
      const rangeDefinition = rangeDefinitions[key];

      if (!rangeDefinition.range) {
        throw new Error('invalid definition for range "' + key + '". ' +
          'Parameter range is missing.');
      }

      const [rangeStart, rangeEnd] = rangeDefinition.range;
      const [valueStart = 0, valueEnd = 1] = rangeDefinition.values || [];
      const { toDmx, toValue } = rangeDefinition;

      const _toDmx = toDmx ?
        (...args) => clamp(rangeDefinition.toDmx(...args), rangeStart, rangeEnd) :
        clampedRangeMapper(valueStart, valueEnd, rangeStart, rangeEnd);

      const _toValue = toValue ||
        clampedRangeMapper(rangeStart, rangeEnd, valueStart, valueEnd);

      this.mapping[key] = Object.assign({}, rangeDefinition, {
        key,
        isKeyword: !rangeDefinition.values && !toDmx && !toValue,
        toDmx: _toDmx,
        toValue: toDmx && !toValue ? null : _toValue
      });
    });
  }

  getValue(device) {
    const dmxToValue = (dmxValue, definition) => {
      // fallback case: use the dmx()-syntax if no definition is found.
      if (!definition || !definition.toValue) {
        return `dmx(${dmxValue})`;
      }

      const value = definition.toValue(dmxValue);
      if (definition.key === 'default') {
        return value;
      }

      if (definition.isKeyword) {
        return definition.key;
      }

      return definition.key + '(' + value + ')';
    };

    const dmxValue = device.getChannelValue(this.channels[0]);
    if (!this.dmxToValueCache[dmxValue]) {
      const definition = this._getRangeDefinitionForValue(dmxValue);

      this.dmxToValueCache[dmxValue] = dmxToValue(dmxValue, definition);
    }

    return this.dmxToValueCache[dmxValue];
  }

  setValue(device, value) {
    // when there is no default-range configured, we simply set the channel to 0
    if (!value && !this.mapping.default) {
      device.setChannelValue(this.channels[0], 0);
      return;
    }

    // special mapping default accepts values without function-name
    if (this.mapping.default && (value === '' || isFinite(value))) {
      device.setChannelValue(this.channels[0],
        Math.round(this.mapping.default.toDmx(value)));

      return;
    }

    const [, name, arg = '0'] = value.match(rxFunction);
    const args = arg.split(',').map(s => Number(s.trim()));

    // special case: dmx(value) will directly set the value
    if (name === 'dmx') {
      device.setChannelValue(this.channels[0], args[0]);
    } else {
      device.setChannelValue(this.channels[0],
        Math.round(this.mapping[name].toDmx(...args)));
    }
  }

  _getRangeDefinitionForValue(value) {
    const keys = Object.keys(this.mapping);
    for (let key of keys) {
      const { range } = this.mapping[key];
      if (range[0] > value || range[1] < value) {
        continue;
      }

      return this.mapping[key];
    }

    return null;
  }
}

/**
 * @typedef {object} RangeDefinition
 * @property {string} key the range-name
 * @property {number[]} range the dmx-range (`[rangeStart, rangeEnd]`)
 * @property {number[]} values the value-range (`[valueStart, valueEnd]`)
 * @property {function(...args): number} toDmx
 *     computes the dmx-value from a given value.
 * @property {function(number): number} toValue
 *     computes the value for a given dmx-value
 */
