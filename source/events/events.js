/**
 * Event bus
 *
 * Шина событий. Построена на $.Callbacks;
 */

/**
 * Класс Шины Событий
 */

// TODO: сделать синглтон
ISnew.EventBus = function () {
  var self = this;

  self.eventsList = {};

  return;
};

EventBus = new ISnew.EventBus();

/**
 * Публикация события с данными
 */
ISnew.EventBus.prototype.publish = function (eventId, data) {
  var self = this;

  return self._selectEvent(eventId).fire(data);
};

/**
 * Подписаться на событие
 */
ISnew.EventBus.prototype.subscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).add(callback);
};

/**
 * Отписаться от события
 */
ISnew.EventBus.prototype.unsubscribe = function (eventId, callback) {
  var self = this;

  return self._selectEvent(eventId).remove(callback);
};

/**
 * Выбор нужного события
 */
ISnew.EventBus.prototype._selectEvent = function (eventId) {
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

/**
 * Logger
 */
ISnew.EventBus.prototype._addLogger = function (options) {
  var self = this;
  var options = options || {};
  var method = options.method || false;
  var component = options.component || false;

  _.forEach(self.eventsList, function (item, eventName) {
    var event = eventName.split(':');

    if (event[0] == method && event[2] == component) {
      EventBus.subscribe(eventName, function (data) {
        console.log('Listner: Method', eventName, data);
      });
    } else if (!method && event[2] == component) {
      EventBus.subscribe(eventName, function (data) {
        console.log('Listner: Component ', eventName, data);
      });
    } else if (!method && !component) {
      EventBus.subscribe(eventName, function (data) {
        console.log('Listner: All:', eventName, data);
      });
    }
  });

  return;
};