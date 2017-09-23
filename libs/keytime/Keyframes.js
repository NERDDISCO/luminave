import Lerper from './Lerper.js'
// import vec3 from 'gl-vec3/set'

const temp = [0, 0, 0]

function sort(a, b) {
  return a.time - b.time
}

export default class Keyframes {
  constructor(frames, sorted) {

    if (!(this instanceof Keyframes)) {
      return new Keyframes(frames, sorted)
    }

    this.frames = frames || []

    if (!sorted) {
      this.sort()
    }
  }

  //Finds the index of the nearest keyframe to the given time stamp.
  //If radius is specified, it will return the nearest only within that radius
  nearestIndex(time, radius) {
    radius = typeof radius === 'number' ? radius : Number.MAX_VALUE
    let minDist = Number.MAX_VALUE
    let nearest = -1
    for (let i = 0; i < this.frames.length; i++) {
      const dist = Math.abs(this.frames[i].time - time)
      if (dist < minDist && dist <= radius) {
        minDist = dist
        nearest = i
      }
    }
    return nearest
  }

  //Gets the keyframe at the index
  nearest(time, radius) {
    const idx = this.nearestIndex(time, radius)
    return idx === -1 ? null : this.frames[idx]
  }

  //Gets the keyframe at time
  get(time) {
    return this.nearest(time, 0)
  }

  //Gets the keyframe index at time
  getIndex(time) {
    return this.nearestIndex(time, 0)
  }

  //lerps the value at the specified time stamp
  //returns null if no keyframes exist
  value(time, interpolator, out) {
    const v = this.interpolation(time)
    if (v[0] === -1 || v[1] === -1) {
      return null
    }

    const startFrame = this.frames[v[0]]
    const endFrame = this.frames[v[1]]
    const t = v[2]

    //We interpolator from left keyframe to right, with a custom easing
    //equation if specified
    if (typeof interpolator === 'function') {
      return interpolator(startFrame, endFrame, t, out)
    }

    //Otherwise we assume the values are simple numbers and lerp them
    return Lerper.lerp(startFrame.value, endFrame.value, t, out)
  }

  interpolation(time) {
    if (this.frames.length === 0) {
      return vec3(temp, -1, -1, 0)
    }

    let prev = -1
    //get last keyframe to time
    for (let i = this.frames.length - 1; i >= 0; i--) {
      if (time >= this.frames[i].time) {
        prev = i
        break
      }
    }

    //start or end keyframes
    if (prev === -1 || prev === this.frames.length - 1) {
      if (prev < 0) {
        prev = 0
      }

      return vec3(temp, prev, prev, 0)

    } else {
      const startFrame = this.frames[prev]
      const endFrame = this.frames[prev + 1]

      //clamp and get range
      time = Math.max(startFrame.time, Math.min(time, endFrame.time))
      const t = Lerper.range(startFrame.time, endFrame.time, time)

      //provide interpolation factor
      return vec3(temp, prev, prev + 1, t)
    }
  }

  next(time) {
    if (this.frames.length < 1)
      return null

    let cur = -1
    //get last keyframe to time
    for (let i = 0; i < this.frames.length; i++) {
      if (time < this.frames[i].time) {
        cur = i
        break
      }
    }
    return cur === -1 ? null : this.frames[cur]
  }

  previous(time) {
    if (this.frames.length < 1)
      return null

    let cur = -1
    //get last keyframe to time
    for (let i = this.frames.length - 1; i >= 0; i--) {
      if (time > this.frames[i].time) {
        cur = i
        break
      }
    }
    return cur === -1 ? null : this.frames[cur]
  }

  //Adds a frame at the given time stamp
  add(frame) {
    this.frames.push(frame)
    this.sort()
  }

  //convenience for .frames.splice
  //if items are inserted, a sort will be applied after insertion
  splice(index, howmany, itemsN) {
    this.frames.splice(...arguments)
    if (arguments.length > 2)
      this.sort()
  }

  //sorts the keyframes. you should do this after
  //adding new keyframes that are not in linear time
  sort() {
    this.frames.sort(sort)
  }

  //Clears the keyframe list
  clear() {
    this.frames.length = 0
  }

  get count() {
    return this.frames.length
  }
}
