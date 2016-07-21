/** @private */
var _ = require('lodash');

/** @private */
var ajax = require('../json/ajax.compare');
/** @private */
var EventBus = require('../events/events');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * Сравнение товаров
 * @class
 */
var Compare = function (options) {
  options = options || {};

  var self = this;
  self.products = [];
  self.maxItems = options.maxItems || 4;

  self.ui = new (require('./compare.ui')) (self);

  // Обновляемся
  self._update();
};

/**
 * Добавляем товар
 * @method
 *
 * @param {Object} task - задача
 * @param {number} task.item - id товара, добавляемого в сравнение
 *
 * @fires before:insales:compare
 * @fires overload:insales:compare
 * @fires in_list:insales:compare
 * @fires add_item:insales:compare
 * @fires always:insales:compare
 *
 * @example
 * Compare.add({ item: 123456 });
 */
Compare.prototype.add = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'add_item';

  // если достигли максимального кол-ва товаров
  // кидаем остановку
  if (self.products.length >= self.maxItems) {
    task.method = 'overload';
    self._events(task);
    self._always(task);

    return;
  } else if (_.findIndex(self.products, task.item) != -1) {
    task.method = 'in_list';
    self._events(task);
    self._always(task);

    return;
  } else {
    self._before(task);
    ajax.add(task.item)
      .done(function (response) {
        self._update(task);
      })
      .fail(function (response) {
        console.log('fail: ', response);
        // Завернуто сюда, потому что в done идет ещё один
        // ajax запрос. Нужно сделать удобные ответы на эти запросы
        self._always(task);
      });
  }
};

/**
 * Удаляем товар из сравнения
 * @method
 *
 * @param {Object} task - задача
 * @param {number} task.item - id товара, добавляемого в сравнение
 *
 * @fires before:insales:compare
 * @fires remove_item:insales:compare
 * @fires update_items:insales:compare
 * @fires always:insales:compare
 *
 * @example
 * Compare.remove({item: 123456});
 */
Compare.prototype.remove = function (task) {
  var self = this;

  task.item = parseInt(task.item);
  task.method = 'remove_item';

  self._before(task);
  ajax.remove(task.item)
    .done(function (response) {
      self._update(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
      // Завернуто сюда, потому что в done идет ещё один
      // ajax запрос. Нужно сделать удобные ответы на эти запросы
      self._always(task);
    });
};

/**
 * Обновляем состояние сравнения
 * @method
 *
 * @fires before:insales:compare
 * @fires update_items:insales:compare
 * @fires always:insales:compare
 *
 * @example
 * Compare.update();
 */
Compare.prototype.update = function () {
  var self = this;

  self._update({
    method: 'update_items'
  });
};

/**
 * Получение текущего состояния Сравнения
 * @method
 *
 * @example
 * Compare.getCompare();
 */
Compare.prototype.getCompare = function () {
  var self = this;

  return self;
};

/**
 * Получение актуальной инфы с сервера
 * @method
 * @private
 *
 * @param {Object} tesk - задача
 * @param {string} task.method - название метода. Объязательно. Иначе мы делаем инициализацию сущности.
 */
Compare.prototype._update = function (task) {
  var self = this;

  task = task || {};
  task.method = task.method || 'init';

  if (task.method == 'init' || task.method == 'update_items') {
    self._before(task);
  }

  ajax.get()
    .done(function (response) {
      self.products = response.products;
      self._events(task);
    })
    .fail(function (response) {
      console.log('fail: ', response);
    })
    .always(function () {
      self._always(task);
    });
};

/**
 * Вызов событий
 * @method
 * @private
 *
 * @param {Object} task - задача
 * @param {string} task.method - назание действия, которое пытаемся сделать
 */
Compare.prototype._events = function (task) {
  var self = this;
  var data = self;
  data.action = task;
  EventBus.publish(task.method +':insales:compares', data);

  if (data.action.method != 'update_items' && data.action.method != 'overload') {
    EventBus.publish('update_items:insales:compares', data);
  }
};

/**
 * Событие ПЕРЕД действием
 * @method
 * @private
 */
Compare.prototype._before = function (task) {
  EventBus.publish('before:insales:compares', task);
};

/**
 * Мы закончили что-то делать в сравнении
 * @method
 * @private
 */
Compare.prototype._always = function (task) {
  EventBus.publish('always:insales:compares', task);
};

module.exports = _Singleton(Compare).getInstance();