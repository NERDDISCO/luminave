const DEFAULT_OPTIONS = { universeMapping: { 1: 1 } }

/**
 * A fivetwelve driver for the Arduino Leonardo ETH with DMX512 isolated shield
 * @see https://www.tindie.com/products/Conceptinetics/25kv-isolated-dmx-512-shield-for-arduino-r2/
 *
 * @deprecated Please remove this after webusb-dmx512-controller/controller.js is feature complete
 */
export default class ArduinoLeonardoETHDriver {

  /**
   * Initializes the driver for the given serialport.
   * @param {object} serialport A ready configured USBPort instance.
   * @param {object} options Options
   */
  constructor(serialport, options = {}) {
    this.serialport = serialport
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  /**
   * Sends the given values to the dmx-interface over the serialport.
   * @param {Array} universe A buffer with the dmx-values to be sent.
   * @returns {Promise} A promise that will be resolved when the buffer is completely sent.
   */
  send(universe) {
    const buffer = Uint8Array.from(universe)

    return this.write(buffer).then(result => {
      return Promise.resolve()
    }).
    catch(error => {
      // @TODO: Handle the error because its an indicator why no data is send to the Arduino via USB
      // and this helps a LOT if nothing is working
      return Promise.resolve()
    })
  }

  /**
   * Writes the raw data to the serialport.
   * @param {Buffer} buffer A buffer to be sent to the serialport.
   * @returns {Promise} a promise that is resolved when the buffer was completely sent.
   * @private
   */
  write(buffer) {
    return new Promise((resolve, reject) => {
      // Serialport is not connected
      if (this.serialport === null) {
        return reject(new Error('🔥 NO SERIALPORT CONNECTED 🔥'))
      }

      // Send data to USB
      return this.serialport.send(buffer).then(result => {

        // USBOutTransferResult - { bytesWritten: 512, status: "ok" }
        if (result.status === 'ok') {
          return resolve(result)
        }

        return reject(new Error(`Status not "ok". Instead received status "${result.status}"`))

      }).
      catch(reject)
    })
    // There is no serialport yet
  }
}
