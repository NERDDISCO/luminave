"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Animation = require("./Animation");

var _Animation2 = _interopRequireDefault(_Animation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Initialize all animations
 */
var AnimationManager = function AnimationManager(param) {
  _classCallCheck(this, AnimationManager);

  this.config = param.config;
};

exports.default = AnimationManager;