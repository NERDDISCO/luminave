import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice.js';
import DmxParam from '../../lib/param/DmxParam.js';
import RangeParam from '../../lib/param/RangeParam.js';

describe('RangeParam', () => {
  let device, _get, _set;

  function initTestParam(channel, options) {
    return new RangeParam(channel, options);
  }

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    _set = device.setChannelValue = sinon.spy();
    _get = device.getChannelValue = sinon.stub();
  });


  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new RangeParam(device, 1, {});

      expect(param).to.be.an(RangeParam);
      expect(param).to.be.an(DmxParam);
    });
  });

  describe('getter/setter normal operation', () => {
    let param;

    beforeEach(() => {
      param = initTestParam(12, {
        min: 0, max: 1,
        rangeStart: 100, rangeEnd: 200
      });
    });


    describe('setValue()', () => {
      it('maps values to the specified range', () => {
        param.setValue(device, 0.5);
        expect(_set.callCount).to.be(1);
        expect(_set.firstCall.args).to.eql([12, 150]);

        _set.reset();
        param.setValue(device, 0);
        expect(_set.firstCall.args).to.eql([12, 100]);

        _set.reset();
        param.setValue(device, 1);
        expect(_set.firstCall.args).to.eql([12, 200]);
      });


      it('wont set out of bounds-values', () => {
        param.setValue(device, 2);
        expect(_set.firstCall.args).to.eql([12, 200]);

        _set.reset();
        param.setValue(device, -1);
        expect(_set.firstCall.args).to.eql([12, 100]);
      });
    });


    describe('getValue()', () => {
      it('retrieves values from dmx-channel', () => {
        _get.withArgs(12).returns(125);
        expect(param.getValue(device)).to.be(0.25);

        _get.reset();
        _get.withArgs(12).returns(200);
        expect(param.getValue(device)).to.be(1);
      });
    });
  });

  describe('getter/setter edge-cases', () => {
    it('uses defaults for input/output ranges', () => {
      let param = initTestParam(5);

      param.setValue(device, 0);
      expect(_set.firstCall.args).to.eql([5, 0]);

      _set.reset();
      param.setValue(device, 1);
      expect(_set.firstCall.args).to.eql([5, 255]);

      _get.withArgs(5).returns(20);
      expect(param.getValue(device)).to.be(20 / 255);

      _set.reset();
      param = initTestParam(5, {min: 0, max: 255});
      _get.withArgs(5).returns(125);
      param.setValue(device, 125);
      expect(param.getValue(device)).to.eql(125);
    });


    it('handles reversed ranges', () => {
      let param = initTestParam(3, {rangeStart: 100, rangeEnd: 0});

      param.setValue(device, 0.5);
      expect(_set.firstCall.args).to.eql([3, 50]);
      _set.reset();

      _get.withArgs(3).returns(50);
      expect(param.getValue(device)).to.be(0.5);

      _get.withArgs(3).returns(100);
      expect(param.getValue(device)).to.be(0);

      _get.withArgs(3).returns(0);
      expect(param.getValue(device)).to.be(1);

      // out of bounds test
      param.setValue(device, -1);
      expect(_set.firstCall.args).to.eql([3, 100]);
      _set.reset();
    });
  });
});
