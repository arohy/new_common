/**
 * Logger на шине событий
 *
 * Позволяет одной командой перехватывать все события, порождаемые компонентом
 */
/** @private */
var _ = require('lodash');

/**
 * Добавляем прослушку компонента
 * @class
 *
 * @private
 */
var EventsLogger = function (_owner) {
  var self = this;
  self._owner = _owner;

  self.loggersList = {};
};

/**
 * Добавление логера для компонента
 * @method
 *
 * @memberof EventBus
 * @alias logger.add
 * @param {string} component - имя компонента, который хотим прослушать
 *
 * @example
 * EventBus.logger.add
 */
EventsLogger.prototype.add = function (component) {
  var self = this;

  self.loggersList[component] = {};
  self._init(component);

  return;
};

/**
 * Проходим по уже существующим событиям и вешаемся на них
 *
 * @method
 * @private
 */
EventsLogger.prototype._init = function (component) {
  var self = this;

  _.forEach(self._owner.eventsList, function (item, eventName) {
    self.addListner(eventName)
  });

  return;
};

/**
 * Вешаем слушателя на событие
 *
 * @method
 * @private
 */
EventsLogger.prototype.addListner = function (eventName) {
  var self = this;
  var component = self._component(eventName);

  // если такой
  if (self._inList(component) && !self._isListen(eventName)) {
    self.loggersList[component][eventName] = true;

    self._owner.subscribe(eventName, function (data) {
      console.log('LISTNER: ', eventName, _.cloneDeep(data));
    });
  }

  return;
};

/**
 * Проверяем, слушаем ли мы такой компонент?
 *
 * @method
 * @private
 */
EventsLogger.prototype._inList = function (component) {
  var self = this;

  return _.has(self.loggersList, component) ? true : false;
};

/**
 * Проверка
 *
 * @method
 * @private
 */
EventsLogger.prototype._isListen = function (eventName) {
  var self = this;
  var component = self._component(eventName);
  var status = false;

  if (self._inList(component)) {
    status = _.has(self.loggersList[component], eventName);
  }

  return status;
};

/**
 * Вытаскиваем название компонента из события
 *
 * @method
 * @private
 */
EventsLogger.prototype._component = function (eventName) {
  return _.last(eventName.split(':'));
};

module.exports = EventsLogger;