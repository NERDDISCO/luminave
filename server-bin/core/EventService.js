"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventService = undefined;

var _eventemitter = require("eventemitter2");

var _eventemitter2 = _interopRequireDefault(_eventemitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Handles events between services in a kindof "pub/sub" style, well, nope, but still :/
 * You can import the instance of EventService into your Class and listen to "global" events.
 *
 * @example
 * import { eventService } from './EventService';
 *
 * class MyClass {
 *   constructor() {
 *     // Listen to eventName
 *     eventService.on("eventName", (eventData) => {});
 *
 *     // Send a event with name "eventName" that contains the data from "eventData"
 *     eventService.emit("eventName", eventData);
 *   }
 * }
 *
 */
var EventService = function (_EventEmitter) {
  _inherits(EventService, _EventEmitter);

  function EventService(param) {
    _classCallCheck(this, EventService);

    return _possibleConstructorReturn(this, (EventService.__proto__ || Object.getPrototypeOf(EventService)).call(this));
  }

  return EventService;
}(_eventemitter2.default);

exports.default = EventService;
var eventService = exports.eventService = new EventService();