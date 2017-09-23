import { DmxOutput } from './transport/index.js'
import * as param from './param/index.js'

export { param }
export { DeviceGroup, DmxDevice } from './device/index.js'
export { DmxOutput } from './transport/index.js'

/**
 * @typedef {Object} DmxDriver
 * @property {function(Buffer):Promise} send Sends a dmx-buffer.
 */

/**
 * Initalizes the DmxOutput with the given driver.
 *
 * @param {DmxDriver} driver The DMX-Driver implementation.
 * @param {Number} numUniverses The number of DMX-universes.
 * @returns {DmxOutput} The initialized output
 */
export default function init(driver, numUniverses) {
  return new DmxOutput(driver, numUniverses)
}
