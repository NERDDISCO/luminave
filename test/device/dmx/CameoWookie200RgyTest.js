'use strict';

import CameoWookie200Rgy from '../../../server/device/dmx/CameoWookie200RGY';

var assert = require('assert');
var fivetwelve = require('fivetwelve/es5');


const driver = { send(buffer, universe) {} };
const output = fivetwelve.default(driver);


let instance = new CameoWookie200Rgy({ universe: 1, address: 1 });
instance.setOutput(output);

describe('CameoWookie200RGY', () => {

  describe('mode', () => {

    it('is "off"', () => {
      instance.mode = 'off';
      assert.equal('off', instance.mode);
    });

    it('is "auto"', () => {
      instance.mode = 'auto';
      assert.equal('auto', instance.mode);
    });

    it('is not defined', () => {
      instance.mode = 'foo';
      assert.equal('off', instance.mode);
    });

  });



  describe('zoom', () => {

    it('is "manual(255)" = 127 as DMX value', () => {
      instance.zoom = 'manual(255)';
      assert.equal(127, instance.getChannelValue(4));
    });

    it('is "loop(0)" = 128 as DMX value', () => {
      instance.zoom = 'loop(0)';
      assert.equal(128, instance.getChannelValue(4));
    });

  });

});
