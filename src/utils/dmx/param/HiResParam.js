import { default as FivetwelveHiResParam } from 'fivetwelve/lib/param/HiResParam.js'

/**
 *
 */
export default class HiResParam extends FivetwelveHiResParam {
  constructor(channels, options = {}) {
    super(channels, options)


    this.min = options.min
    this.max = options.max
  }

}
