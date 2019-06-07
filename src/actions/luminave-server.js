import * as constants from '../constants/index.js'
import * as selectors from '../selectors/luminave-server.js'
import * as utils from '../utils/index.js'

/*
 * Update the data of the luminave server integration
 */
export const setLuminaveServer = data => ({
  data,
  type: constants.SET_LUMINAVE_SERVER
})
