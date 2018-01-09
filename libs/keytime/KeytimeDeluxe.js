import Lerper from '/libs/keytime/Lerper.js'
import BasicTimeline from '/libs/keytime/BasicTimeline.js'

/*
 * This is not part of timeline, but an extension to add custom interpolations
 */
export default class KeytimeDeluxe extends BasicTimeline {
  constructor(data) {
    super(data)

    this.lerper = new Lerper()
  }

  interpolate(property, frame1, frame2, t) {
    // // Custom interpolation :D
    // if (typeof frame1.value === 'string') {
    //   return frame1.value
    // }

    // Default interpolation
    return this.lerper.values(frame1.value, frame2.value, t)
  }
}
