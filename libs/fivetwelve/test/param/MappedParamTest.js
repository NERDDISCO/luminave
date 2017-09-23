import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice.js';
import DmxParam from '../../lib/param/DmxParam.js';
import MappedParam from '../../lib/param/MappedParam.js';

describe('MappedParam', () => {
  let device, _get, _set;

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    _set = device.setChannelValue = sinon.spy();
    _get = device.getChannelValue = sinon.stub();
  });


  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new MappedParam(7, {});

      expect(param).to.be.an(DmxParam);
    });

    it('throws an error when no mapping is specified', () => {
      expect(() => new MappedParam(123)).to.throwException();
    });
  });


  describe('getValue() / setValue()', () => {
    let param,
      mapping = {
        aValue: [25, 29],
        anotherValue: [30, 37]
      };

    beforeEach(() => {
      param = new MappedParam(7, mapping);
    });

    it('writes values to the device', () => {
      param.setValue(device, 'aValue');

      expect(_set.callCount).to.be(1);
      expect(_set.firstCall.args).to.eql([7, 25]);

      _get.withArgs(7).returns(30);
      expect(param.getValue(device)).to.be('anotherValue');
    });

    it('should handle invalid identifiers', () => {
      param.setValue(device, 'unknownValue');

      expect(_set.callCount).to.be(1);
      expect(_set.firstCall.args).to.eql([7, 0]);
    });
  });
});
