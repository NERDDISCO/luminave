import RgbWAUvParam from '../../src/util/RgbWAUvParam';

var assert = require('assert');

let instance = new RgbWAUvParam(3);

describe('RgbWAUvParam', () => {

  describe('color', () => {
    it('length is 6', () => {
      assert.equal(6, instance.color.length);
    });

    it('contains 6 x 0', () => {
      for (var i = 0; i < instance.color.length; i++) {
        assert.equal(0, instance.color[i]);
      }
    });
  });

  describe('channel', () => {
    it('is a number', () => {
      assert.equal('number', typeof instance.channel);
    });
  });

});
