import sinon from 'sinon';
import expect from 'expect.js';

import DmxDevice from '../../lib/device/DmxDevice.js';
import DmxParam from '../../lib/param/DmxParam.js';

describe('DmxParam', () => {
  let device;

  beforeEach(() => {
    device = sinon.createStubInstance(DmxDevice);
    device.setChannelValue = sinon.spy();
  });

  describe('constructor()', () => {
    it('can be initialized', () => {
      let param = new DmxParam(device);
      expect(param).to.be.a(DmxParam);
    });
  });
});
