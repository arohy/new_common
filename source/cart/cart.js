/**
 * Cart
 */

// TODO: сделать синглтон
var _quickCheckout = require('./cart.quickCheckout');
var _order = require('./cart.order');
var _taskManager = require('./cart.tasks');
var _UI = require('./cart.ui');

var ajax = require('../json/ajax.cart');

module.exports = Cart = function () {
  var self = this;

  self.ui = new _UI();
  self.order = new _order(self);
  self.tasks = new _taskManager(self);
  self.quickCheckout = new _quickCheckout(self);

  self.init();
};

/**
 * Получить с сервера состав корзины
 */
// TODO: изменить на нормальныйую логику после нормолизации ответов json
// TODO: может не надо? у нас теперь появляется нормальный таск манагер :)
Cart.prototype.init = function () {
  var self = this;
  var task = {
    method: 'init'
  };

  self.tasks.send(task);
};

Cart.prototype._get = function () {
  var self = this;
  var current_items = {};

  return current_items;
};

/**
 * Добавить в корзину заданное кол-во товаров
 *
 * на вход - объект. смотреть доку
 */
Cart.prototype.add = function (task) {
  var self = this;

  task = task || {};
  task.method = 'add_items';

  self.tasks.send(task);
};

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
 * на вход - объект с парами variant_id: quantity
 */
Cart.prototype.remove = function (task) {
  var self = this;

  task = task || {};
  task.method = 'remove_items';

  self.tasks.send(task);
};

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
 * на вход - объект с парами variant_id: quantity
 */
Cart.prototype.set = function (task) {
  var self = this;
  task = task || {};
  task.method = 'set_items';

  self.tasks.send(task);
};

Cart.prototype._set_items = function (task, current_items) {
  var self = this;

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  return current_items;
};

/**
 * Удалить позиции из корзины
 * на вход - массив с variant_id
 */
Cart.prototype.delete = function (task) {
  var self = this;
  task = task || {};
  task.method = 'delete_items';

  self.tasks.send(task);
};

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
 */
Cart.prototype.clear = function (task) {
  var self = this;
  task = task || {};
  task.method = 'clear_items';

  self.tasks.send(task);
};

Cart.prototype._clear_items = function (task, current_items) {
  var self = this;

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  return current_items;
};

/**
 * Добавление товаров в корзину для "Заказа в один клик"
 */
Cart.prototype.add_checkout = function (task) {
  var self = this;
  task = task || {};
  task.method = 'add_checkout';

  self.tasks.send(task);
};

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
 */
Cart.prototype.setCoupon = function (task) {
  var self = this;

  task = task || {};
  task.method = 'set_coupon';

  self.tasks.send(task);
};

Cart.prototype._set_coupon = function (task, current_items) {
  var self = this;

  return current_items;
};

/**
 * Получить состав корзины
 */
Cart.prototype.getOrder = function () {
  var self = this;

  return self.order.get();
};

/**
 * Обновление состава корзины
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
 */
Cart.prototype.setConfig = function (settings) {
  var self = this;

  self.ui.setConfig(settings);

  return;
};

Cart.prototype.addItem = function () {
  return;
};