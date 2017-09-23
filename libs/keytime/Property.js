//a "Property" maintains a set of tweenable values
//for e.g.:
//  position [x, y]
//  color [r, g, b, a]
//  alpha [a]

//It will also store application-level flags like
//whether or not your data is hidden, or what type
//of property you might be dealing with

//a "Property" maintains a set of tweenable values
//for e.g.:
//  position [x, y]
//  color [r, g, b, a]
//  alpha [a]

//It will also store application-level flags like
//whether or not your data is hidden, or what type
//of property you might be dealing with
import Keyframes from './Keyframes.js'

export default class Property {
  constructor(data) {
    this.keyframes = new Keyframes()
    this.value = null
    this.name = ''
    if (data) {
      this.load(data)
    }
  }

  dispose() {
    this.keyframes.clear()
  }

  export () {
    console.error('Property#export() behind a flag')

    return Object.assign(this, () => {
      keyframes: this.keyframes.frames
    })
    // return xtend(this, {
    //   keyframes: this.keyframes.frames
    // })
  }

  load(data) {
    this.dispose()

    if (!data) {
      return
    }

    for (const k in data) {
      if (!data.hasOwnProperty(k)) {
        continue
      }

      if (k === 'keyframes') {
        // console.log('keyframes not implemented yet')
        this.keyframes.frames = data.keyframes
      } else {
        this[k] = data[k]
      }
    }
  }
}
