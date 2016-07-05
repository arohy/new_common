/**
 * Logger на шине событий
 *
 * Позволяет одной командой перехватывать все события, порождаемые компонентом
 */
ISnew.EventsLogger = function () {
  var self = this;

  self.loggersList = {};
};

/**
 * Добавляем прослушку компонента
 */
ISnew.EventsLogger.prototype.add = function (component) {
  var self = this;

  self.loggersList[component] = {};
  self._init(component);

  return;
};

/**
 * Проходим по уже существующим событиям и вешаемся на них
 */
ISnew.EventsLogger.prototype._init = function (component) {
  var self = this;

  _.forEach(EventBus.eventsList, function (item, eventName) {
    self.addListner(eventName)
  });

  return;
};

/**
 * Вешаем слушателя на событие
 */
ISnew.EventsLogger.prototype.addListner = function (eventName) {
  var self = this;
  var component = self._component(eventName);

  // если такой
  if (self._inList(component) && !self._isListen(eventName)) {
    self.loggersList[component][eventName] = true;

    EventBus.subscribe(eventName, function (data) {
      console.log('LISTNER: ', eventName, _.cloneDeep(data));
    });
  }

  return;
};

/**
 * Проверяем, слушаем ли мы такой компонент?
 */
ISnew.EventsLogger.prototype._inList = function (component) {
  var self = this;

  return _.has(self.loggersList, component) ? true : false;
};

/**
 * Проверка
 */
ISnew.EventsLogger.prototype._isListen = function (eventName) {
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
 */
ISnew.EventsLogger.prototype._component = function (eventName) {
  return _.last(eventName.split(':'));
};

EventBus = new ISnew.EventBus();