/** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');

/** @private */
var _Singleton = require('../tools/singleton');

/**
 * @class
 *
 * @description Шина событий. Построена на $.Callbacks;
 */
var EventBus = function () {
  var self = this;

  if (window.EventBus) {
    return window.EventBus;
  }

  self.eventsList = {};
  self.logger = new (require('./events.logger')) (self);

  window.EventBus = self;

  return;
};

/**
 * Публикация события с данными
 * @method
 *
 * @param {string} eventId - имя события
 * @param {Object} data - объект с передаваемой информацией
 * @param {Onject} data.action - объект со вспомогательной информаций, содержит исходное состояние, ссылку на узел, который вызвал собтие, что пытались сделать и т.д.
 *
 * @example
 * EventBus.publish('test_event', {isTest: true, title: 'Test', status: 'ok'});
 */
EventBus.prototype.publish = function (eventId, data) {
  var self = this;

  self.logger.addListner(eventId);

  return self._selectEvent(eventId).fire(data);
};

/**
 * Подписаться на событие
 * @method
 *
 * @param {string} eventId - имя события
 * @param {function|string} callback - функция, которая должна отработать при вызове события eventId. входной параметр - data
 *
 * @example
 * EventBus.subscribe('test_event', function (data) { console.log(data) });
 */
EventBus.prototype.subscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).add(callback);
};

/**
 * Отписаться от события
 * @method
 *
 * @param {string} eventId - имя события, от которого соьираемся отписаться
 * @param {string} callback - handle функции, которую хотим отключить от шины
 */
EventBus.prototype.unsubscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).remove(callback);
};

/**
 * Выбор нужного события
 * @method
 * @private
 */
EventBus.prototype._selectEvent = function (eventId) {
  var self = this;
  var Event;

  eventId = _.toString(eventId);
  Event = self.eventsList[eventId];

  // Если у нас новое событие, создаем его и объявляем в системе.
  if (!Event) {
    // Объявляем методы
    Event = $.Callbacks('memory');
    self.eventsList[eventId] = Event;
  }

  return Event;
};

module.exports = _Singleton(EventBus).getInstance();