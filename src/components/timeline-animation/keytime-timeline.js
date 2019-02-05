import Keytime from 'keytime/keytime.js'

export default class KeytimeTimeline extends Keytime {
  constructor(data) {
    super(data)

    this.regexMultirangeParam = /([a-zA-Z]+)\(([0-9]{1,3})\)/g
  }

  interpolate(property, frame1, frame2, time) {
    // @TODO: I guess this is not good for performance, because this is executed over and over?
    let value1 = this.regexMultirangeParam.exec(frame1.value)

    if (value1 === null) {
      // Custom interpolation for Strings
      if (typeof frame1.value === 'string') {
        return frame1.value
      }
    } else {
      // Reset the regex
      this.regexMultirangeParam.lastIndex = 0

      // Get the value for the second parameter
      let value2 = this.regexMultirangeParam.exec(frame2.value)

      // Reset the regex
      this.regexMultirangeParam.lastIndex = 0

      // Recreate the MultiRangeParam, for example 'clockwise(20)'
      return `${value1[1]}(${Math.round(this.lerp(parseInt(value1[2], 10), parseInt(value2[2], 10), time))})`
    }

    return this.lerp(frame1.value, frame2.value, time)
  }
}
