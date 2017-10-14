// var eases = require('./eases.js')
import Lerper from './Lerper.js'
import Property from './Property.js'

export default class BasicTimeline {
  constructor(data) {
    this.data = data
    this.properties = []

    this.lerper = new Lerper()

    if (this.data) {
      this.load(this.data)
    }
  }


  /*
   * Eases the time; by default only linear ease is supported (entry point exposes others)
   */
  ease(name, t) {
    return t
    // return eases[name](t)
  }

  indexOfName(list, name) {
    for (let i = 0; i < list.length; i++) {
 if (list[i].name === name) {
return i
}
}

return -1
  }

  dispose() {
    this.properties.forEach((item, index, array) => {
 item.dispose()
})
    this.properties.length = 0
  }

  addProperty(propData) {
    this.properties.push(new Property(propData))
  }

  duration() {
    let maxTime = 0

    for (let j = 0; j < this.properties.length; j++) {
      const { prop } = this.properties[j]
      const { frames } = prop.keyframes.frames

      for (let i = 0; i < frames.length; i++) {
        maxTime = Math.max(frames[i].time, maxTime)
      }

    }

    return maxTime
  }

  /*
   * Returns the first control by the specified name or index
   */
  property(prop) {
    const idx =
      typeof prop === 'number'
      ? prop
      : this.indexOfName(this.properties, prop)

    return idx < 0
      ? undefined
      : this.properties[idx]
  }

  /*
   * Loads timeline animation data
   */
  load(data) {
    this.dispose()

    if (!data) {
      return
    }

    this.properties = this.data.map(d => new Property(d))
  }

  export () {
    return this.properties.map(p => p.export())
  }

  /*
   * Interpolate between two frames; subclasses can override to provide custom
   * interpolators (e.g. quaternions, paths, etc)
   */
  interpolate(property, frame1, frame2, t) {
    return this.lerper.lerp(frame1.value, frame2.value, t)
  }

  /*
   * Determine the value at the given time stamp of the specified property
   */
  valueOf(time, property) {
    const keys = property.keyframes
    const v = keys.interpolation(time)
    const [v0, v1, t] = v

    // return default value of property
    if (v0 === -1 || v1 === -1) {
      return property.value
    }


    const start = keys.frames[v0]
    const end = keys.frames[v1]

    // frames match, return the first
    if (v0 === v1) {
      return start.value
    }

    // ease and interpolate frames

      const easeName = end.ease
      if (easeName) // remap time with easing equation
        {
t = this.ease(easeName, t)
}

return this.interpolate(property, start, end, t)

  }

  // Convenience to get the values of all properties at a given time stamp
  values(time, out) {
    if (!out) {
      out = {}
    }

    for (let i = 0; i < this.properties.length; i++) {
      const prop = this.properties[i]
      out[prop.name] = this.valueOf(time, prop)
    }

    return out
  }

}
