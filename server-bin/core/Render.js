"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animation = require("./Animation");

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * Handle the rendering of all animations in a specific timeline / scene.
 */
var Render = function () {
  function Render(param) {
    _classCallCheck(this, Render);

    this.config = param.config;
    this.dmxUsbInterface = param.dmxUsbInterface;

    // Reference to all scenes
    this.sceneManager = param.sceneManager;

    // Time between now and last time loop was called
    this.delta = 0;

    // The last time loop was called
    this.lastTime = 0;
  }

  /**
   * Start rendering all elements in "list" by using the desired fps
   */


  _createClass(Render, [{
    key: "start",
    value: function start(fps) {
      // @TODO: Is this correct? Don't we need to just call loop?
      this.dmxUsbInterface.output.requestDmxFrame(this.loop.bind(this));

      // Start the DMX output with the specified fps
      this.dmxUsbInterface.output.start(1000 / fps);
    }
  }, {
    key: "loop",
    value: function loop(time) {
      var _this = this;

      // Delta between the current call and the last time loop was called
      this.delta = time - this.lastTime;

      // Iterate over all scenes
      this.sceneManager.list.forEach(function (element, key) {
        // Run each scene
        element.run(_this.delta);
      });

      // Save the current time into lastTime so we can calculate the delta for the next call of loop
      this.lastTime = time;

      // Call loop again
      this.dmxUsbInterface.output.requestDmxFrame(this.loop.bind(this));
    }
  }]);

  return Render;
}();

exports.default = Render;