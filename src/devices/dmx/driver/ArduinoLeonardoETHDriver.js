/**
 * A fivetwelve-driver for the enttec usbpro mk2-interface supporting both
 * dmx-outputs.
 *
 * @example
 *     import fivetwelve from 'fivetwelve'
 *     import Serialport from 'serialport'
 *
 *     // I read somewhere that connection settings like baudrate etc are not
 *     // required as it's just a virtual serialport or something like that
 *     const usbproSerialport = new Serialport('/dev/something')
 *
 *     // configure output for two universes:
 *     const output = fivetwelve(
 *         new ArduinoLeonardoETHDriver(usbproSerialport), 2)
 */
export default class ArduinoLeonardoETHDriver {

  /**
   * Initializes the driver for the given serialport.
   * @param {object} serialport A ready configured node-serialport instance.
   *     Setting up the serialport-connection has to be done externally.

   * @param {object} options Options
   * universeMapping: A mapping of fivetwelve universe-numbers to usbpro universes 1/2.
   */
  constructor(serialport, options = {}) {
    this.serialport = serialport

    this.options = Object.assign({}, options)
    // this.opened = this.awaitSerialportOpened()
    // this.ready = this.opened.then(() => this.initUsbProMk2())
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
   * Returns a Promise that is resolved once the serialport is opened.
   * @returns {Promise<Serialport>} A promise resolving with the
   *     node-serialport-instance.
   * @private
   */
  // awaitSerialportOpened() {
  //   if (this.serialport.isOpen()) {
  //     return Promise.resolve(this.serialport)
  //   }
  //
  //   return new Promise((resolve, reject) => {
  //     this.serialport.on('open', error => {
  //       if (error) {
  //         return reject(error)
  //       }
  //
  //       return resolve(this.serialport)
  //     })
  //   })
  // }

  /**
   * Sends a single packet to the usbpro.
   * @param {Number} label The message label.
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
   * @returns {Promise} a promise that is resolved when the buffer was
   *     completely sent.
   * @private
   */
  write(buffer) {
    this.serialport.send(buffer)
  }
}
