import lerp from '/node_modules/lerp-array/index.js'
import keytime from '/node_modules/keytime/index.js'

export default class KeytimeDeluxe extends keytime {
  constructor(data) {
    super(data)
  }

  interpolate(property, frame1, frame2, t) {
    // Custom interpolation :D
    if (typeof frame1.value === 'string') {
      return frame1.value
    }

    // Default interpolation
    return lerp(frame1.value, frame2.value, t)
  }
}
