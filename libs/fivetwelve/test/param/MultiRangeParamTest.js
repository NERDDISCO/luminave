import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice.js';
import DmxParam from '../../lib/param/DmxParam.js';
import MultiRangeParam from '../../lib/param/MultiRangeParam.js';

describe('MultiRangeParam', () => {
  let device, _getChannelValueStub, _setChannelValueSpy;

  function initTestParam(channel, options) {
    return new MultiRangeParam(channel, options);
  }

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    _setChannelValueSpy = device.setChannelValue = sinon.spy();
    _getChannelValueStub = device.getChannelValue = sinon.stub();
  });


  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new MultiRangeParam(device, 1, {});

      expect(param).to.be.an(DmxParam);
    });
  });

  describe('getter/setter normal operation', () => {
    let param;

    beforeEach(() => {
      param = initTestParam(12, {
        closed: {range: [0, 6]},
        open: {range: [7, 13]},
        strobe: {range: [14, 100], values: [0, 1]},
        random: {range: [101, 201], values: [0, 1]},
        something: {range: [202, 222], values: [0, 40]}
      });
    });


    describe('setValue()', () => {
      it('handles keyword-arguments', () => {
        param.setValue(device, 'closed');
        expect(_setChannelValueSpy.callCount).to.be(1);
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 0]);

        _setChannelValueSpy.reset();

        param.setValue(device, 'open');
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 7]);
      });

      it('handles function-arguments', () => {
        param.setValue(device, 'strobe(0)');
        expect(_setChannelValueSpy.callCount).to.be(1);
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 14]);

        _setChannelValueSpy.reset();

        param.setValue(device, 'random(0.5)');
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 151]);
      });

      it('handles rounding', () => {
        param.setValue(device, 'something(1)'); // value 202.5
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 203]);
      });

      it('handles number-formats', () => {
        param.setValue(device, 'something(1.6)');
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 203]);

        _setChannelValueSpy.reset();

        param.setValue(device, 'something(.01)');
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 202]);
      });

      it('handles empty values', () => {
        param.setValue(device, '');
        expect(_setChannelValueSpy.firstCall.args).to.eql([12, 0]);

        _setChannelValueSpy.reset();
        const p2 = new MultiRangeParam(32, {
          default: {range: [0, 255], values: [-1, 1]}
        });

        p2.setValue(device, '');
        expect(_setChannelValueSpy.firstCall.args).to.eql([32, 128]);
      });
    });

    describe('getValue()', () => {
      it('retrieves values from dmx-channel', () => {
        _getChannelValueStub.withArgs(12).returns(0);
        expect(param.getValue(device)).to.be('closed');

        _getChannelValueStub.reset();

        _getChannelValueStub.withArgs(12).returns(151);
        expect(param.getValue(device)).to.be('random(0.5)');
        // double check to make sure the cached code-path is covered
        expect(param.getValue(device)).to.be('random(0.5)');
      });
    });
  });

  describe('special ranges', () => {
    it('handles default-ranges', () => {
      const param = new MultiRangeParam(42, {
        something: {range: [0, 100], values: [0, 100]},
        default: {range: [100, 200], values: [0, 100]}
      });

      param.setValue(device, 'default(50)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([42, 150]);

      _setChannelValueSpy.reset();

      param.setValue(device, 50);
      expect(_setChannelValueSpy.firstCall.args).to.eql([42, 150]);

      _getChannelValueStub.withArgs(42).returns(150);
      expect(param.getValue(device)).to.eql(50);
    });

    it('handles the special dmx()-range', () => {
      const param = new MultiRangeParam(13, {});

      param.setValue(device, 'dmx(213)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([13, 213]);

      _getChannelValueStub.withArgs(13).returns(123);
      expect(param.getValue(device)).to.eql('dmx(123)');
    });

    it('handles ranges with mapping-functions', () => {
      const param = new MultiRangeParam(11, {
        fn: {
          range: [100, 200],
          toDmx(value) { return 100 + value * 2; },
          toValue(dmxValue) { return (dmxValue - 100) / 2; }
        }
      });

      param.setValue(device, 'fn(10)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([11, 120]);

      // clamping to specified range
      _setChannelValueSpy.reset();
      param.setValue(device, 'fn(100)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([11, 200]);

      _setChannelValueSpy.reset();
      param.setValue(device, 'fn(-100)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([11, 100]);

      _getChannelValueStub.withArgs(11).returns(150);
      expect(param.getValue(device)).to.eql('fn(25)');
    });

    it('handles ranges with multi-param mapping-functions', () => {
      const param = new MultiRangeParam(11, {
        fn: {
          range: [100, 200],
          toDmx: (a, b) => 100 + a + b
        }
      });

      param.setValue(device, 'fn(3, 5)');
      expect(_setChannelValueSpy.firstCall.args).to.eql([11, 108]);

      _getChannelValueStub.withArgs(11).returns(108);
      expect(param.getValue(device)).to.eql('dmx(108)');
    });
  });
});
