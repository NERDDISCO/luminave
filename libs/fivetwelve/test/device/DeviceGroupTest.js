import sinon from 'sinon';
import expect from 'expect.js';

import DmxOutput from '../../lib/transport/DmxOutput';
import DmxDevice from '../../lib/device/DmxDevice';
import DeviceGroup from '../../lib/device/DeviceGroup';
import DmxParam from '../../lib/param/DmxParam';

function createStubParam() {
  let instance = sinon.createStubInstance(DmxParam);

  instance.setValue = sinon.spy();
  instance.getValue = sinon.stub();

  return instance;
}

function createDevice(address, params) {
  let stub = new DmxDevice(address, params);

  stub.getChannelValue = sinon.stub();
  stub.setChannelValue = sinon.spy();
  stub.setDmxBuffer = sinon.spy();

  return stub;
}

describe('DeviceGroup', () => {
  describe('constructor()', () => {
    it('creates a new device-group', () => {
      let g = new DeviceGroup([createDevice()]);

      expect(g).to.be.a(DeviceGroup);
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
      const devices = [
        new DmxDevice({address: 1}),
        new DmxDevice({address: 10})
      ];
      const group = new DeviceGroup(devices);

      group.setOutput(output);
      group.setChannelValue(1, 100);

      expect(buffer[0]).to.be(100);
      expect(buffer[9]).to.be(100);
    });
  });

  describe('setDmxBuffer', () => {
    let devices = [createDevice(), createDevice()],
      buffer = new Buffer(512),
      g = new DeviceGroup(devices);


    g.setDmxBuffer(buffer);

    devices.forEach(device => {
      expect(device.setDmxBuffer.callCount).to.be(1);
      expect(device.setDmxBuffer.firstCall.args[0]).to.be(buffer);
    });
  });

  describe('get/set channel values', () => {
    let devices, group;

    beforeEach(() => {
      group = new DeviceGroup(devices = [createDevice(), createDevice()]);
    });

    it('forwards values to member-device properties', () => {
      group.setChannelValue(1, 0xff);
      expect(devices[0].setChannelValue.callCount).to.be(1);
      expect(devices[1].setChannelValue.firstCall.args).to.eql([1, 0xff]);
    });

    it('retrieves values from member-device properties', () => {
      // we want to be able to use device-groups like we use devices,
      // therefore it must return a specific value, assuming that all devices
      // in the group have the same value.
      devices[0].getChannelValue.returns(10);
      devices[1].getChannelValue.returns(10);
      expect(group.getChannelValue(1)).to.eql(10);

      // for now, we simply take the value of the first device if they differ
      devices[0].getChannelValue.returns(20);
      devices[1].getChannelValue.returns(10);
      expect(group.getChannelValue(1)).to.eql(20);
    });
  });

  describe('dynamic param properties', () => {
    let p1, p2;

    beforeEach(() => {
      p1 = createStubParam();
      p2 = createStubParam();
    });

    it('attaches properties like the devices do', () => {
      let
        devices = [createDevice(1, {p1}), createDevice(10, {p1})],
        group = new DeviceGroup(devices);

      group.p1 = 123;
      expect(p1.setValue.callCount).to.be(2);
      expect(p1.setValue.firstCall.args[1]).to.be(123);

      p1.getValue.returns(42);
      expect(group.p1).to.be(42);
    });

    it('handles nested properties', () => {
      let
        devices = [
          createDevice(1, {stuff: {p1}}),
          createDevice(10, {stuff: {p1}})
        ],
        group = new DeviceGroup(devices);

      group.stuff.p1 = 123;
      expect(p1.setValue.callCount).to.be(2);
      expect(p1.setValue.firstCall.args[1]).to.be(123);

      p1.getValue.returns(42);
      expect(group.stuff.p1).to.be(42);
    });

    it('works with devices with different parameters', () => {
      let
        devices = [createDevice(1, {p1}), createDevice(10, {p2})],
        group = new DeviceGroup(devices);

      group.p1 = 123;
      expect(p1.setValue.callCount).to.be(1);
      expect(p1.setValue.firstCall.args[1]).to.be(123);
      expect(devices[1].p1).to.be(void 0);

      p2.getValue.returns(42);

      expect(group.p2).to.be(42);
      expect(p2.getValue.callCount).to.be(1);
    });
  });

  it('should maybe have a configurable strategy for dealing with different ' +
    'param-values for devices, lets see if thats needed');
});
