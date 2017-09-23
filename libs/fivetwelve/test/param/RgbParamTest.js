import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice.js';
import DmxParam from '../../lib/param/DmxParam.js';
import RgbParam from '../../lib/param/RgbParam.js';

describe('RgbParam', () => {
  let device, _get, _set;

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    _set = device.setChannelValue = sinon.spy();
    _get = device.getChannelValue = sinon.stub();
  });


  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new RgbParam(device, [1, 2, 3]);

      expect(param).to.be.an(RgbParam);
      expect(param).to.be.an(DmxParam);
    });
  });


  describe('setValue()', () => {
    it('accepts all sorts of color-representations', () => {
      let expectations = [
        ['red', [0xff, 0, 0]],
        ['rgb(42,23,5)', [42, 23, 5]],
        ['#ffcc00', [0xff, 0xcc, 0]]
      ];

      // setter
      let param = new RgbParam([8, 9, 10]);
      for (let [color, values] of expectations) {
        param.setValue(device, color);

        expect(_set.callCount).to.be(3);
        expect(_set.firstCall.args).to.eql([8, values[0]]);
        expect(_set.secondCall.args).to.eql([9, values[1]]);
        expect(_set.thirdCall.args).to.eql([10, values[2]]);

        _set.reset();
      }
    });

    it('writes CMY-Values if configured as CMY', () => {
      let param = new RgbParam([8, 9, 10], RgbParam.CMY);
      let expectations = [
        ['red', [0, 0xff, 0xff]],
        ['cyan', [0xff, 0, 0]]
      ];

      // setter
      for (let [color, values] of expectations) {
        param.setValue(device, color);

        expect(_set.callCount).to.be(3);
        expect(_set.firstCall.args).to.eql([8, values[0]]);
        expect(_set.secondCall.args).to.eql([9, values[1]]);
        expect(_set.thirdCall.args).to.eql([10, values[2]]);

        _set.reset();
      }
    });
  });

  describe('getValue()', () => {
    it('reads values from the device', () => {
      let param = new RgbParam([8, 9, 10]);

      _get.withArgs(8).returns(10);
      _get.withArgs(9).returns(128);
      _get.withArgs(10).returns(255);

      let color = param.getValue(device);

      expect(color.rgb).to.eql([10, 128, 255]);
    });

    it('reads rgb-values from an CMY-Device', () => {
      let param = new RgbParam([8, 9, 10], RgbParam.CMY);

      _get.withArgs(8).returns(0);
      _get.withArgs(9).returns(255);
      _get.withArgs(10).returns(255);

      let color = param.getValue(device);

      expect(color.rgb).to.eql([255, 0, 0]);
    });
  });
});
