/**
 * Encapsulates the DMX-buffers to be used and handles sending of data to the
 * driver.
 */
export default class DmxOutput {
  /**
   * Initialize a new output.
   *
   * @param {DmxDriver} driver The driver that will bring the
   *   DMX-Data to it's destination.
   * @param {Number} numUniverses The number of dmx-universes to use.
   */
  constructor(driver) {
    this.driver = driver;
    this.timer = null;
    this.startTime = 0;
    this.frameCount = 0;
    this.frameInterval = 0;
    this.isRunning = false;

    this.dmxBuffers = [];
    this.dmxFrameCallbacks = [];
  }

  /**
   * register a callback to be called before a new frame gets rendered.
   * In order to run an animation you should call this method again as the
   * first thing in the provided callback:
   *
   * @example
   *     function loop(dt) {
   *       output.requestDmxFrame(loop);
   *
   *       // ... update dmx-buffer
   *     }
   *
   *     // render at 30FPS
   *     output.start(30);
   *     // kickoff animation
   *     output.requestDmxFrame(loop);
   *
   * @param {function(dt:Number)} callback A callback receiving the time since
   *   start() was called as argument.
   */
  requestDmxFrame(callback) {
    this.dmxFrameCallbacks.push(callback);
  }

  /**
   * Retrieve the DMX-Buffer for the specified universe. Is mainly
   * called internally when devices are attached to an output.
   * @param {Number} universe The 1-based universe-number of the buffer.
   * @returns {Buffer} The DMX-Buffer to be used by the program.
   */
  getBuffer(universe = 1) {
    const universeIndex = universe - 1;
    if (!this.dmxBuffers[universeIndex]) {
      return this.initUniverse(universeIndex);
    }

    return this.dmxBuffers[universeIndex];
  }

  /**
   * Sends all Buffers to the driver. Should only be called directly
   * when running without a frame-interval.
   * @returns {Promise} A Promise resolved when all buffers were sent, or
   *     an immediately resolved promise if the driver doesn't return promises.
   */
  send() {
    this.frameCount++;

    const results = this.dmxBuffers.map((buffer, index) => {
      if (!buffer) {
        return Promise.resolve();
      }

      return this.driver.send(buffer, index + 1);
    });

    if (results.every(r => r instanceof Promise)) {
      return Promise.all(results);
    }

    return Promise.resolve();
  }

  /**
   */
  start() {
  }

  /**
   * Stops the timer for sending data-frames. Can always be started again by
   * calling start().
   */
  stop() {
  }

  loop() {

    // invoke all requestDmxFrame callbacks
    if (this.dmxFrameCallbacks.length > 0) {
      let dt = Date.now() - this.startTime,
        callbacks = this.dmxFrameCallbacks;

      // clear callbacks-list so callbacks can add new ones.
      this.dmxFrameCallbacks = [];
      callbacks.forEach(fn => fn(dt));
    }

    // send buffer and schedule next frame
    this.send().then(() => {
      const frameDuration = Date.now() - frameStartTime;

      if (!this.isRunning) {
        return;
      }

      if (frameDuration > frameInterval) {
        console.log(`Skipped frame ${this.frameCount}`);
      }

      // the `frameDuration % frameInterval` makes sure that a skipped frame
      // is just dropped instead of trying to be as fast as possible
      this.timer = setTimeout(this.loop,
        frameInterval - (frameDuration % frameInterval));
    });
  }

  initUniverse(index) {
    const buffer = new Uint8Array(512);
    buffer.fill(0);

    this.dmxBuffers[index] = buffer;

    return buffer;
  }
}

/**
 * @typedef {Object} DmxDriver
 * @property {function(Buffer, number):Promise|null} send Sends an updated
 *     dmx-buffer and optionally returns a promise to signal completion.
 */
