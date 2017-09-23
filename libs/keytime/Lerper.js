export default class Lerper {
  constructor() {

  }

  values(value1, value2, t) {
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return this.lerp(value1, value2, t)
      // Assume array
    } else {
      var len = Math.min(value1.length, value2.length)
      out = out || new Array(len)

      for (var i = 0; i < len; i++) {
        out[i] = this.lerp(value1[i], value2[i], t)
      }

      return out
    }
  }

  lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
  }

  range(min, max, value) {
    return (value - min) / (max - min)
  }
}
