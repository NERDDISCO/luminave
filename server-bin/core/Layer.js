"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animation = require('./Animation');

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handle animations.
 */
var Layer = function () {
  function Layer(param) {
    _classCallCheck(this, Layer);

    this.layerId = param.id;

    this.animationConfigs = param.animations;

    // Reference to all animations
    this.animationManager = param.animationManager;

    // Reference to DMX devices
    this.devices = param.devices;

    // List of animations in this layer
    this.animations = [];

    // Is this Layer playing?
    this.isPlaying = false;

    this.register();
  }

  /*
   * Initialize animations that are part of this layer.
   */


  _createClass(Layer, [{
    key: 'register',
    value: function register() {
      var _this = this;

      this.animationConfigs.forEach(function (element, index, array) {

        var instance = _this.animationManager.get(element.animationId);

        var animation = new _Animation2.default({
          animationId: element.animationId,
          duration: instance.duration,
          start: element.start,
          timeline: instance.timeline,
          deviceManager: instance.deviceManager,
          devices: _this.devices
        });

        _this.add(animation);
      });
    }

    /*
     * Add animation to the list of animations.
     */

  }, {
    key: 'add',
    value: function add(animation) {
      this.animations.push(animation);
    }

    /*
     * Play animations.
     */

  }, {
    key: 'play',
    value: function play() {
      this.isPlaying = true;

      // Run all animations
      this.animations.forEach(function (element, index, array) {
        // @TODO: Move this into this.stop()
        element.stop();
        element.play();
      });
    }

    /*
     * Stop the playback.
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.isPlaying = false;
    }

    /*
     * Run the animations based on the progress of the parent Scene "progressScene" and
     * the "delta" between the last iteration and now.
     */

  }, {
    key: 'run',
    value: function run(progressScene, delta) {
      var _this2 = this;

      if (this.isPlaying) {

        this.count = 0;

        // Run all animations
        this.animations.forEach(function (element, index, array) {

          // Start the animation if the start time is reached & duration is not reached yet
          element.run(progressScene, delta);

          // The animation is not stopped yet
          if (element.isPlaying) {
            _this2.count++;
          }
        });

        // All animations are stopped
        if (this.count === 0) {
          this.stop();
          console.log('Layer', '-', this.layerId, 'stopped');
        }
      }
    }
  }]);

  return Layer;
}();

exports.default = Layer;