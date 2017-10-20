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
      return Promise.resolve()
    }

    return this.sendPacket(buffer)
  }

  /**
   * Sends a single packet to the usbpro.
   * @param {Buffer} data The message payload.
   * @returns {Promise} A promise indicating when the data has been sent.
   * @private
   */
  sendPacket(data) {
    return this.write(data)
  }

  /**
   * Writes the raw data to the serialport.
   * @param {Buffer} buffer A buffer to be sent to the serialport.
   * @returns {Promise} a promise that is resolved when the buffer was completely sent.
   * @private
   */
  write(buffer) {
    // @TODO: DEBUG
    // console.log('Arduino', buffer)

    // There is no serialport yet
    if (this.serialport === null) {
      console.error('🔥 NO SERIALPORT CONNECTED 🔥')
    } else {
      this.serialport.send(buffer).
        then(result => {
        // USBOutTransferResult - { bytesWritten: 512, status: "ok" }
        // console.log('out', result)
        if (result.status !== 'ok') {
          console.error(result.status, result.data)
        }
      }, error => {
        console.error(error)
        Promise.resolve()
      })
    }
  }
}
