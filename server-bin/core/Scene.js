"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layer = require('./Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _EventService = require('./EventService');

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/operator/filter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A set of animations & DMX devices that can be controlled by using MIDI devices.
 *
 * - Control a set of animations
 * - Each animation is in it's own layer
 * - Each animation gets initialized in a scene
 * - A scene can be played / paused / restarted
 * - A scene is coupled to a MIDI input
 * - Creates the connection between DMX devices, animations & MIDI devices
 * - Each animation in each layer can start at any point in time
 * - Manages the status of playback for each animation
 */
var Scene = function () {
  function Scene(param) {
    _classCallCheck(this, Scene);

    this.id = param.id;
    this.name = param.name;

    this.config = param.config;

    // Reference to all animations
    this.animationManager = param.animationManager;

    // The layers of this scene
    this.layers = [];

    // Reference to the MIDI device that is associated with the scene
    this.midi = this.config.midi;

    // The progress in terms of time of this scene
    this.progress = 0;

    // Is this scene playing?
    this.isPlaying = false;

    this.count = 0;

    this.register();

    this.listen();
  }

  _createClass(Scene, [{
    key: 'register',
    value: function register() {
      var _this = this;

      this.config.layers.forEach(function (element, index, array) {

        var layer = new _Layer2.default({
          id: element.layerId,
          animations: element.animations,
          animationManager: _this.animationManager,
          devices: element.devices
        });

        _this.add(element.layerId, layer);
      });
    }
  }, {
    key: 'add',
    value: function add(layerId, layer) {
      this.layers.push(layer);
    }
  }, {
    key: 'play',
    value: function play() {
      this.isPlaying = true;

      this.layers.forEach(function (element, index, array) {
        // @TODO: Move this into this.stop()
        element.stop();
        element.play();
      });
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.isPlaying = false;
      this.progress = 0;
    }

    /*
     * - Iterate over all layers and run them
     * - Keep track of the progress
     */

  }, {
    key: 'run',
    value: function run(delta) {
      var _this2 = this;

      if (this.isPlaying) {

        this.progress += delta;

        this.count = 0;

        this.layers.forEach(function (element, index, array) {
          element.run(_this2.progress, delta);

          if (element.isPlaying === true) {
            _this2.count++;
          }
        });

        if (this.count === 0) {
          this.stop();

          console.log('Scene', '-', this.id, 'stopped');
        }
      }
    }

    /*
     * Listen to events to start this Scene.
     */

  }, {
    key: 'listen',
    value: function listen() {
      var _this3 = this;

      // @TODO: Does this make any sense at this position / class?
      var source = _Observable.Observable.fromEvent(_EventService.eventService, 'MidiController')

      // Only allow the MIDI controller that was attachted to this scene
      .filter(function (data, idx, obs) {
        return data.controllerId === _this3.midi.controllerId;
      })

      // Only allow a specific input element (button or knob) from the MIDI controller
      .filter(function (data, idx, obs) {
        return data.partId === _this3.midi.partId;
      });

      source.subscribe(function (data) {
        _this3.stop();
        _this3.play();
      });
    }
  }]);

  return Scene;
}();

exports.default = Scene;