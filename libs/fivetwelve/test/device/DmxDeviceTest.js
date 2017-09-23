import sinon from 'sinon';
import expect from 'expect.js';

import DmxOutput from '../../lib/transport/DmxOutput';
import DmxDevice from '../../lib/device/DmxDevice';
import DmxParam from '../../lib/param/DmxParam';

function createStubParam() {
  let instance = sinon.createStubInstance(DmxParam);

  instance.setValue = sinon.spy();
  instance.getValue = sinon.stub();

  return instance;
}

describe('DmxDevice', () => {
  let dmxBuffer;

  beforeEach(() => {
    dmxBuffer = new Buffer(100);
    dmxBuffer.fill(0);
  });

  describe('constructor()', () => {
    it('can be initialized', () => {
      let device = new DmxDevice({address: 1});
      expect(device).to.be.a(DmxDevice);
    });


    it('binds parameters as properties to the instance', () => {
      let param = createStubParam(),
        device = new DmxDevice({address: 1, params: {param}});

      device.param = 42;
      expect(param.setValue.callCount).to.be(1);
      expect(param.setValue.firstCall.args[1]).to.eql(42);

      param.getValue.returns(110);
      expect(device.param).to.be(110);
    });

    it('binds grouped params as properties', () => {
      let param = createStubParam(),
        device = new DmxDevice({address: 1, params: {group: {param}}});

      device.group.param = 123;
      expect(param.setValue.firstCall.args[1]).to.eql(123);

      param.getValue.returns(231);
      expect(device.group.param).to.be(231);
    });
  });

  describe('setOutput()', () => {
    let buffer = null,
      output = sinon.createStubInstance(DmxOutput);

    beforeEach(() => {
      buffer = new Buffer(512);
      output.getBuffer.returns(buffer);
    });

    it('correctly sets the dmx output-buffer', () => {
      let device = new DmxDevice({address: 1});

      device.setOutput(output);
      device.setChannelValue(1, 100);
      expect(buffer[0]).to.be(100);
    });
  });

  describe('setDmxBuffer()', () => {
    it('get/setChannelValue handle a missing buffer and ignore calls', () => {
      let device = new DmxDevice({address: 1});

      device.setChannelValue(1, 100);
      expect(device.getChannelValue(1)).to.be(0);

      device.setDmxBuffer(new Buffer(512));
      device.setChannelValue(1, 100);
      expect(device.getChannelValue(1)).to.be(100);
    });
  });


  describe('setChannelValue()', () => {
    it('calculates the correct channel-index', () => {
      let device = new DmxDevice({address: 1});
      device.setDmxBuffer(dmxBuffer);
      device.setChannelValue(1, 0xff);
      expect(dmxBuffer[0]).to.be(0xff);

      device = new DmxDevice({address: 35});
      device.setDmxBuffer(dmxBuffer);
      device.setChannelValue(10, 0xac);
      // dmx-base 35, channel 10 -> dmx-channel 44 -> index 43
      expect(dmxBuffer[43]).to.be(0xac);
    });


    it('throws an error if no channel is specified', () => {
      let device = new DmxDevice({address: 1});

      expect(device.setChannelValue.bind(device))
          .withArgs().to.throwException();
    });
  });

  describe('getChannelValue()', () => {
    it('calculates the correct channel-index', () => {
      let device = new DmxDevice({address: 1});
      device.setDmxBuffer(dmxBuffer);
      dmxBuffer[0] = 0xde;
      expect(device.getChannelValue(1)).to.be(0xde);

      device = new DmxDevice({address: 35});
      device.setDmxBuffer(dmxBuffer);
      dmxBuffer[35] = 0x12;
      expect(device.getChannelValue(2)).to.be(0x12);
    });


    it('throws an error if no channel is specified', () => {
      let device = new DmxDevice({address: 1});

      expect(device.getChannelValue.bind(device))
        .withArgs().to.throwException();
    });
  });

  describe('setParams()', () => {
    it('writes values to params', () => {
      let p1 = createStubParam(),
        p2 = createStubParam(),
        device = new DmxDevice({address: 12, params: {p1, p2}});

      device.setParams({p1: 123, p2: 212});

      expect(p1.setValue.callCount).to.be(1);
      expect(p1.setValue.firstCall.args[1]).to.eql(123);
      expect(p2.setValue.callCount).to.be(1);
      expect(p2.setValue.firstCall.args[1]).to.eql(212);
    });

    it('only sets values for known params', () => {
      let p1 = createStubParam(),
        device = new DmxDevice({address: 12, params: {p1}});

      device.setParams({p1: 123, p2: 212});

      expect(device.p2).to.be(void 0);
    });
  });


  describe('getParams()', () => {
    it('reads values for all parameters', () => {
      let p1 = createStubParam(),
        p2 = createStubParam(),
        device = new DmxDevice({address: 11, params: {p1, p2}});

      p1.getValue.returns(123);
      p2.getValue.returns(211);

      expect(device.getParams()).to.eql({p1: 123, p2: 211});
    });
  });
});
