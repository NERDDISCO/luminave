import { default as FivetwelveRangeParam } from 'fivetwelve/lib/param/RangeParam.js'

/**
 *
 */
export default class RangeParam extends FivetwelveRangeParam {
  constructor(channels, options = {}) {
    super(channels, options)


    this.min = options.min
    this.max = options.max
  }

}
