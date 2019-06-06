import * as constants from '../constants/index.js'
import * as selectors from '../selectors/fivetwelve.js'

/*
 * Update the data of the modV integration
 */
export const setFivetwelve = data => ({
  data,
  type: constants.SET_FIVETWELVE
})
