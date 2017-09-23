"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Scene = require("./Scene");

var _Scene2 = _interopRequireDefault(_Scene);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Handle all scenes.
 * @TODO: Listen to MIDI events and start scenes accordingly
 */
var SceneManager = function () {
  function SceneManager(param) {
    _classCallCheck(this, SceneManager);

    this.list = new Map();
    this.config = param.config;

    // Reference to all animations
    this.animationManager = param.animationManager;
  }

  _createClass(SceneManager, [{
    key: "register",
    value: function register() {
      var _this = this;

      // Initialize all scenes
      this.config.scenes.forEach(function (element, index, array) {

        var scene = new _Scene2.default({
          config: element,
          id: element.sceneId,
          name: element.name,
          animationManager: _this.animationManager
        });

        _this.add(element.sceneId, scene);
      });
    }
  }, {
    key: "add",
    value: function add(sceneId, scene) {
      this.list.set(sceneId, scene);
    }
  }, {
    key: "get",
    value: function get(sceneId) {
      return this.list.get(sceneId);
    }
  }]);

  return SceneManager;
}();

exports.default = SceneManager;