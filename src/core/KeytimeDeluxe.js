// import lerp from '/node_modules/lerp-array/index.js'
import BasicTimeline from '/libs/keytime/BasicTimeline.js'

export default class KeytimeDeluxe extends BasicTimeline {
  constructor(data) {
    super(data)
    console.log("asdf");
  }

  interpolate(property, frame1, frame2, t) {
    // Custom interpolation :D
    if (typeof frame1.value === 'string') {
      return frame1.value
    }

    // Default interpolation
    return this.lerpValues(frame1.value, frame2.value, t)
  }
}
