/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

/**
 * Класс Шины Событий
 */

// TODO: сделать синглтон

var $ = require('jquery');
var _ = require('lodash');

var _Singleton = require('../tools/singleton');

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
 */
EventBus.prototype.publish = function (eventId, data) {
  var self = this;

  self.logger.addListner(eventId);

  return self._selectEvent(eventId).fire(data);
};

/**
 * Подписаться на событие
 */
EventBus.prototype.subscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).add(callback);
};

/**
 * Отписаться от события
 */
EventBus.prototype.unsubscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).remove(callback);
};

/**
 * Выбор нужного события
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