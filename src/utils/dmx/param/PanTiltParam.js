/**
 * Combine pan and titl into one property
 */
export default class PanTiltParam {
  constructor(pan, tilt) {
    this.pan = pan
    this.tilt = tilt
  }

  setValue(device, value) {
    this.pan.setValue(device, value.realX)
    this.tilt.setValue(device, value.realY)
  }

  getValue(device) {
    console.log('PanTiltParam#getValue', device)
  }

}
