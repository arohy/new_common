/** @private */
var _ = require('lodash');
/** @private */
var ajax = require('../ajax/ajax.cart');
/** @private */
var EventBus = require('../events/events');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * @class
 * Cart
 */
var Cart = function () {
  var self = this;

  self.ui = new (require('./cart.ui')) (self);
  self.order = new (require('./cart.order')) (self);
  self.tasks = new (require('./cart.tasks')) (self);
  self.quickCheckout = new (require('./cart.quickCheckout')) (self);

  self.init();
};

/**
 * Инициализация. Создаем первичную таску
 * @method
 * @private
 */
Cart.prototype.init = function () {
  var self = this;
  var task = {
    method: 'init'
  };

  self.tasks.send(task);
};

/**
 * @todo WTF?!?!
 * @method
 * @private
 */
Cart.prototype._get = function () {
  var self = this;
  var current_items = {};

  return current_items;
};

/**
 * Добавить в корзину заданное кол-во товаров
 * @method
 *
 * @param {Object} task - задача
 * @param {Object} task.items - { variant_id: quantity, ... }
 * @param {Object} task.comments - { variant_id: comment, ...}
 * @param {string} task.coupon - название купона
 *
 * @fires before:insales:cart
 * @fires add_items:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.add = function (task) {
  var self = this;

  task = task || {};
  task.method = 'add_items';

  self.tasks.send(task);
};

/**
 * Обработчик задачи добавления товара
 * @method
 * @private
 *
 * @param {Object} task - исходная задача
 * @param {Object} current_items - актуальное состояние корзины
 *
 * @return {Object} current_items - пропатченный состав корзины
 */
Cart.prototype._add_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

    current_items[variant_id] = current_quantity;
  });

  return current_items;
};

/**
 * Удадить из корзины заданное кол-во товаров
 * @method
 *
 * @param {Object} task - задача
 * @param {Object} task.items - { variant_id: quantity, ... }
 * @param {Object} task.comments - { variant_id: comment, ...}
 * @param {string} task.coupon - название купона
 *
 * @fires before:insales:cart
 * @fires remove_items:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.remove = function (task) {
  var self = this;

  task = task || {};
  task.method = 'remove_items';

  self.tasks.send(task);
};

/**
 * Основной обработчик удаления
 * @method
 * @private
 *
 * @param {Object} task - выполняемая задача
 * @param {Object} current_items - актуальный состав
 *
 * @return {Object} current_items - пропатченный состав корзины
 */
Cart.prototype._remove_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) - _.toInteger(quantity);

    current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
  });

  return current_items;
};

/**
 * Устанавливает кол-во товаров в корзине для каждой позиции
 * @method
 *
 * @param {Object} task - задача
 * @param {Object} task.items - { variant_id: quantity, ... }
 * @param {Object} task.comments - { variant_id: comment, ...}
 * @param {string} task.coupon - название купона
 *
 * @fires before:insales:cart
 * @fires set_items:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.set = function (task) {
  var self = this;
  task = task || {};
  task.method = 'set_items';

  self.tasks.send(task);
};

/**
 * Основной обработчик set_items
 * @method
 * @private
 *
 * @param {Object} task - выполняемая задача
 * @param {Object} current_items - актуальный список товаров
 *
 * @return {Object} current_items - пропатченный список товаров
 */
Cart.prototype._set_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  return current_items;
};

/**
 * Удалить позиции из корзины
 * @method
 *
 * @param {Object} task - задача
 * @param {Array} task.items - [variant_id, ...]
 *
 * @fires before:insales:cart
 * @fires delete_items:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.delete = function (task) {
  var self = this;
  task = task || {};
  task.method = 'delete_items';

  self.tasks.send(task);
};

/**
 * Обработчик удаления
 * @method
 * @private
 *
 * @param {Object} task - выполняемая задача
 * @param {Object} current_items - актуальный состав корзины
 *
 * @return {Object} current_items - пропаченный состав корзины
 */
Cart.prototype._delete_items = function (task, current_items) {
  var self = this;

  _.chain(task.items)
    .toArray()
    .forEach(function(variant_id) {
      current_items[variant_id] = 0;
    })
    .value();

  return current_items;
};

/**
 * Полностью очистить корзину
 * @method
 *
 * @fires before:insales:cart
 * @fires clear_items:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.clear = function (task) {
  var self = this;
  task = task || {};
  task.method = 'clear_items';

  self.tasks.send(task);
};

/**
 * Обработчик очистки корзины
 * @method
 * @private
 *
 * @param {Object} task - выполняеая задача
 * @param {Object} current_items - актуальный состав
 *
 * @return {Object} current_items - пропатченнный состав корзины, вида {variant_id: 0, variant_id: 0, ...}
 */
Cart.prototype._clear_items = function (task, current_items) {
  var self = this;

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  return current_items;
};

/**
 * Добавление товаров в корзину для "Заказа в один клик"
 * @method
 * @private
 *
 * @param {}
 *
 * @fires before:insales:cart
 * @fires add_checkout:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.add_checkout = function (task) {
  var self = this;
  task = task || {};
  task.method = 'add_checkout';

  self.tasks.send(task);
};

/**
 * Обработчик
 * @method
 * @private
 */
Cart.prototype._add_checkout = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

    current_items[variant_id] = current_quantity;
  });

  return current_items;
};

/**
 * Устанавливаем купон
 * @method
 *
 * @param {Object} task - задача
 * @param {string} task.coupon - название купона
 *
 * @fires before:insales:cart
 * @fires set_coupon:insales:cart
 * @fires update_items:insales:cart
 * @fires always:insales:cart
 */
Cart.prototype.setCoupon = function (task) {
  var self = this;

  task = task || {};
  task.method = 'set_coupon';

  self.tasks.send(task);
};

/**
 * Обработчик
 * @method
 * @private
 */
Cart.prototype._set_coupon = function (task, current_items) {
  var self = this;

  return current_items;
};

/**
 * Получить состав корзины
 * @method
 * @deprecated c 0.6.0. Использовать Cart.order.get();
 * @private
 */
Cart.prototype.getOrder = function () {
  var self = this;

  return self.order.get();
};

/**
 * Обновление состава корзины. Основной способ изменеия состава. Все остальные таски забрасывают сюда
 * @method
 * @private
 *
 * @param {Object} items
 * @param {Object} task
 */
Cart.prototype._update = function (items, task) {
  var self = this;

  self.tasks._before();

  ajax.update(items, task)
    .done(function (response) {
      self.tasks._done(response);
    })
    .fail(function (response) {
      self.tasks._fail(response);
    })
    .always(function () {
      self.tasks._always();
    });
};

/**
 * Установка настроек для корзины
 * @method
 * @private
 */
Cart.prototype.setConfig = function (settings) {
  var self = this;

  self.ui.setConfig(settings);

  return;
};

/**
 * Заглушка для "Купить в один клик" из бандла
 * @method
 * @private
 */
Cart.prototype.addItem = function () {
  return;
};

module.exports = _Singleton(Cart).getInstance();