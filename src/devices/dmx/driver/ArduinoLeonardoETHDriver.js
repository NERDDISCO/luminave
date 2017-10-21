const DEFAULT_OPTIONS = { universeMapping: { 1: 1 } }

/**
 * A fivetwelve driver for the Arduino Leonardo ETH with DMX512 isolated shield
 * @see https://www.tindie.com/products/Conceptinetics/25kv-isolated-dmx-512-shield-for-arduino-r2/
 */
export default class ArduinoLeonardoETHDriver {

  /**
   * Initializes the driver for the given serialport.
   * @param {object} serialport A ready configured USBPort instance.
   * @param {object} options Options
   * universeMapping: A mapping of fivetwelve universe-numbers to universes.
   */
  constructor(serialport, options = {}) {
    this.serialport = serialport

    this.connected = false

    this.options = Object.assign({}, DEFAULT_OPTIONS, options)
  }

  /**
   * Sends the given values to the dmx-interface over the serialport.
   * @param {Buffer} buffer A buffer with the dmx-values to be sent.
   * @param {Number} universe The 1-based universe-number.
   * @returns {Promise} A promise that will be resolved when the buffer is
   *   completely sent.
   */
  send(buffer, universe) {
    const usbProUniverse = this.options.universeMapping[universe]


    if (!usbProUniverse) {
      return Promise.reject(new Error('No USB universum found'))
    }

    window.dispatchEvent(new CustomEvent('USBDriver', { detail: this }))

    return this.sendPacket(buffer)
  }

  /**
   * Sends a single packet to the usbpro.
   * @param {Buffer} data The message payload.
   * @returns {Promise} A promise indicating when the data has been sent.
   * @private
   */
  sendPacket(data) {
    return this.write(data).then(result => {
      this.connected = true
      return Promise.resolve()
    }).catch(error => {
      this.connected = false
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

      return this.serialport.send(buffer).then(result => {
        // USBOutTransferResult - { bytesWritten: 512, status: "ok" }
        if (result.status === 'ok') {
          return resolve(result.data)
        }

        return reject(new Error(`Status not "ok". Instead recieved status "${result.status}"`))

      }).catch(reject)
    })
    // There is no serialport yet
  }
}
