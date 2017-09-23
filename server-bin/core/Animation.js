"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _KeytimeDeluxe = require('./KeytimeDeluxe');

var _KeytimeDeluxe2 = _interopRequireDefault(_KeytimeDeluxe);

var _ModVService = require('./ModVService');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A list of keyframes used to light up a list of devices to create an animation.
 *
 * @param {String} animationId - Identifier
 * @param {Object} deviceManager - Reference to the DMX device manager
 * @param {Array} devices - List of DMX devices that will be used to show the keyframes of this animation
 * @param {Number} duration - How long does the animation run
 * @param {Number} start - When does the animation start in dependence of the progress of the parent Scene
 * @param {Number} speed - A factor to control the speed @TODO: USE IT!
 * @param {Array|Object} timeline - A list of keyframes
 *
 * @TODO: Relative duration: Every keyframe is relative to the animation duration
 * @TODO: Absolute duration: Every keyframe has it's own duration
 */
var Animation = function () {
  function Animation(param) {
    _classCallCheck(this, Animation);

    this.animationId = param.animationId;
    this.deviceManager = param.deviceManager;
    this.devices = param.devices || undefined;
    this.duration = param.duration;
    this.start = param.start || 0;
    this.speed = param.speed || 1;

    // Progress in terms of time
    this.progress = 0;

    // Keyframes are raw
    if (param.timeline instanceof Array) {
      this.timeline = new _KeytimeDeluxe2.default(param.timeline);
      // Keyframes are an instance of keytime
    } else {
      this.timeline = param.timeline;
    }

    // The values of the animation in terms of the point in time
    this.values = [];

    // Is this animation running?
    this.isPlaying = false;
  }

  /*
   * Play animation.
   */


  _createClass(Animation, [{
    key: 'play',
    value: function play(delta) {
      this.isPlaying = true;
    }

    /*
     * Stop playback.
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.isPlaying = false;
      this.progress = 0;

      // @TODO: Is this really ok? If we reset the device, all other animations for this device will also die :/
      // Reset all devices
      // this.devices.forEach((element, index, array) => {
      //   this.deviceManager.get(element).color = new Color(this.timeline.value).rgb().string();
      // });
    }

    /*
     * Run the animation for the associated devices.
     *
     * @BUG: When the animation is retriggered while it is running, the last color that was send to the device stays forever at the device.
     */

  }, {
    key: 'run',
    value: function run(progressScene, delta) {
      var _this = this;

      if (this.isPlaying) {

        // The scene is started
        if (progressScene >= this.start && progressScene <= this.start + this.duration + 2 * delta) {

          // If animationProgress is smaller than duration we know that duration is not reached yet
          if (this.progress + delta <= this.duration + delta) {
            // So we add the delta to animationProgress
            this.progress += delta;

            this.updateTimeline();

            // Get the values from the timeline based on the progress of this animation
            this.values = this.timeline.values(this.progress);

            // Set the values for every device
            this.devices.forEach(function (element, index, array) {

              var device = _this.deviceManager.get(element);

              if (_this.values.hasOwnProperty('color')) {
                var color = new _color2.default(_this.values.color).rgb().string();

                device.color = color;

                if (device.hasOwnProperty('led1')) {
                  device.led1.color = color;
                  device.led2.color = color;
                  device.led3.color = color;
                  device.led4.color = color;
                  device.led5.color = color;
                  device.led6.color = color;
                  device.led7.color = color;
                  device.led8.color = color;
                  device.led9.color = color;
                  device.led10.color = color;
                  device.led11.color = color;
                  device.led12.color = color;
                }
              }

              if (_this.values.hasOwnProperty('uv')) {
                device.uv = _this.values.uv;

                if (device.hasOwnProperty('led1')) {
                  device.led1.uv = _this.values.uv;
                  device.led2.uv = _this.values.uv;
                  device.led3.uv = _this.values.uv;
                  device.led4.uv = _this.values.uv;
                  device.led5.uv = _this.values.uv;
                  device.led6.uv = _this.values.uv;
                  device.led7.uv = _this.values.uv;
                  device.led8.uv = _this.values.uv;
                  device.led9.uv = _this.values.uv;
                  device.led10.uv = _this.values.uv;
                  device.led11.uv = _this.values.uv;
                  device.led12.uv = _this.values.uv;
                }
              }

              if (_this.values.hasOwnProperty('rotate')) {
                device.rotate = _this.values.rotate;
              }

              if (_this.values.hasOwnProperty('strobe')) {
                device.strobe = _this.values.strobe;
              }

              if (_this.values.hasOwnProperty('brightness')) {
                device.brightness = _this.values.brightness;
              }

              if (_this.values.hasOwnProperty('pan')) {
                device.pan = _this.values.pan;
              }

              if (_this.values.hasOwnProperty('tilt')) {
                device.tilt = _this.values.tilt;
              }

              if (_this.values.hasOwnProperty('amount')) {
                device.amount = _this.values.amount;
              }

              if (_this.values.hasOwnProperty('led')) {}

              if (_this.values.hasOwnProperty('motor')) {
                device.motor = _this.values.motor;
              }

              if (_this.values.hasOwnProperty('fan')) {
                device.fan = _this.values.fan;
              }

              if (_this.values.hasOwnProperty('gobo')) {
                device.gobo = _this.values.gobo;
              }

              if (_this.values.hasOwnProperty('yellow')) {
                device.yellow = _this.values.yellow;
              }
            });
          } else {
            this.stop();
            console.log('Animation', '-', this.animationId, 'stopped');
          }
        }
      }
    }

    /*
     * Update the timeline to get the colors provided by modV
     *
     * @TODO: Check if config.global.useModV is enabled
     */

  }, {
    key: 'updateTimeline',
    value: function updateTimeline() {

      // Iterate over all properties from the given timeline
      this.timeline.properties.forEach(function (property, index, array) {

        // Iterate over all frames of the current keyframe for the given property
        property.keyframes.frames.forEach(function (frame, index, array) {

          if (frame.hasOwnProperty('modV') && frame.modV) {
            frame.value = _ModVService.modVService.globalColor;
          }
        });
      });
    }

    // @TODO: Implement

  }, {
    key: 'pause',
    value: function pause() {}

    // @TODO: Implement

  }, {
    key: 'reset',
    value: function reset() {}

    // @TODO: Implement

  }, {
    key: 'reverse',
    value: function reverse() {}
  }]);

  return Animation;
}();

exports.default = Animation;