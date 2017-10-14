export default class Lerper {
  constructor() {
    this.out = undefined

  }

  values(value1, value2, t) {
    if (typeof value1 === 'number' && typeof value2 === 'number') {
      return this.lerp(value1, value2, t)
      // Assume array
    }
      const len = Math.min(value1.length, value2.length)

      if (this.out === undefined) {
        this.out = new Array(len)
      }

      for (let i = 0; i < len; i++) {
        this.out[i] = this.lerp(value1[i], value2[i], t)
      }

      return this.out

  }

  lerp(v0, v1, t) {
    return v0 * (1 - t) + v1 * t
  }

  range(min, max, value) {
    return (value - min) / (max - min)
  }
}
