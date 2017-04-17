'use strict';

import DmxDevice from '../../src/device/DmxDevice';

var assert = require('assert');
var fivetwelve = require('fivetwelve/es5');


const driver = { send(buffer, universe) {} };
const output = fivetwelve.default(driver);


let dmxDevice = new DmxDevice({ type: 'CameoPixBar600PRO', output: output, universe: 1, address: 10 });

describe('DmxDevice', () => {

  describe('has an instance of CameoPixBar600PRO', () => {

    it('is not undefined', () => {
      assert.equal(true, dmxDevice.instance !== undefined);
    });

    it('has led12 field', () => {
      assert.equal(true, 'led12' in dmxDevice.instance);
    });

    it('width is 12', () => {
      assert.equal(12, dmxDevice.instance.layout.width);
    });

    it('has universe 1', () => {
      assert.equal(1, dmxDevice.instance.universe);
    });

    it('has address 10', () => {
      assert.equal(10 - 1, dmxDevice.instance.bufferOffset);
    });

  });

});
