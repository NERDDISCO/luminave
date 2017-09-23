"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modVService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _randomColor = require('random-color');

var _randomColor2 = _interopRequireDefault(_randomColor);

var _EventService = require('./EventService');

var _Observable = require('rxjs/Observable');

require('rxjs/add/observable/fromEvent');

require('rxjs/add/operator/filter');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provide colors from modV.
 */
var ModVService = function () {
  function ModVService(param) {
    _classCallCheck(this, ModVService);

    this.globalColor = (0, _randomColor2.default)().rgbArray();

    // this.random();
  }

  _createClass(ModVService, [{
    key: 'random',
    value: function random() {
      var _this = this;

      setInterval(function () {
        _this.globalColor = (0, _randomColor2.default)().rgbArray();
      }, 120);
    }

    // @TODO: Implement

  }, {
    key: 'listen',
    value: function listen() {
      // var source = Observable
      //   .fromEvent(eventService, 'MidiController')
      //
      //   // Only allow the MIDI controller that was attachted to this scene
      //   .filter((data, idx, obs) => {
      //     return data.controllerId === this.midi.controllerId;
      //   })
      //
      //   // Only allow a specific input element (button or knob) from the MIDI controller
      //   .filter((data, idx, obs) => {
      //     return data.partId === this.midi.partId;
      //   });
      //
      // source.subscribe(data => {
      //   this.stop();
      //   this.play();
      // });
    }
  }]);

  return ModVService;
}();

exports.default = ModVService;
var modVService = exports.modVService = new ModVService();