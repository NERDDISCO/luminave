import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice';
import HiResParam from '../../lib/param/HiResParam';

describe('HiResParam', () => {
  let device;

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    device.setChannelValue = sinon.spy();
    device.getChannelValue = sinon.stub();
  });


  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new HiResParam([1, 2], {});
      expect(param).to.be.a(HiResParam);
    });
  });


  describe('getValue() / setValue()', () => {
    it('getter and setter update channel-values (simple)', () => {
      let param = new HiResParam([3, 4], {
        min: 0, max: 540
      });

      let
        _get = device.getChannelValue,
        _set = device.setChannelValue;

      // setter
      param.setValue(device, 0);
      expect(_set.callCount).to.be(2);
      expect(_set.firstCall.args).to.eql([3, 0]);
      expect(_set.secondCall.args).to.eql([4, 0]);

      // getter
      _get.returns(255);
      expect(param.getValue(device)).to.be(540);
      expect(_get.callCount).to.be(2);
      expect(_get.firstCall.args).to.eql([3]);
      expect(_get.secondCall.args).to.eql([4]);
    });


    it('getter and setter update channel-values (complex)', () => {
      let param = new HiResParam([5, 9], {
        min: 0, max: 100
      });

      let _get = device.getChannelValue,
        _set = device.setChannelValue;

      // setter
      param.setValue(device, 50);
      expect(_set.callCount).to.be(2);
      expect(_set.firstCall.args).to.eql([5, 127]);
      expect(_set.secondCall.args).to.eql([9, 255]);

      // getter
      _get.returns(255);
      expect(param.getValue(device)).to.be(100);
      expect(_get.callCount).to.be(2);
      expect(_get.firstCall.args).to.eql([5]);
      expect(_get.secondCall.args).to.eql([9]);
    });
  });
});
