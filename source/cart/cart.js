/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

// TODO: сделать синглтон
ISnew.Cart = function () {
  var self = this;

  self._ui = new ISnew.CartDOM();
  self._order = new ISnew.CartOrder(self);
  self._tasks = new ISnew.CartTasks();

  self._get();
};

/**
 * Добавить в корзину заданное кол-во товаров
 *
 * на вход - объект. смотреть доку
 */
ISnew.Cart.prototype.add = function (task) {
  var self = this;

  task = task || {};
  task.method = 'add_items';

  self._tasks.send(task);
  self._update(self._add(task), task);
};

ISnew.Cart.prototype._add = function (task) {
  var self = this;
  var current_items = self._order.getItems();

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
ISnew.Cart.prototype.remove = function (task) {
  var self = this;

  task = task || {};
  task.method = 'remove_items';

  self._tasks.send(task);
  self._update(self._remove(task), task);
};

ISnew.Cart.prototype._remove = function (task) {
  var self = this;
  var current_items = self._order.getItems();

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
ISnew.Cart.prototype.set = function (task) {
  var self = this;
  task = task || {};
  task.method = 'set_items';

  self._tasks.send(task);
  self._update(self._set(task), task);
};

ISnew.Cart.prototype._set = function (task) {
  var self = this;
  var current_items = self._order.getItems();

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  return current_items;
};

/**
 * Удалить позиции из корзины
 * на вход - массив с variant_id
 */
ISnew.Cart.prototype.delete = function (task) {
  var self = this;
  task = task || {};
  task.method = 'delete_items';

  self._tasks.send(task);
  self._update(self._delete(task), task);
};

ISnew.Cart.prototype._delete = function (task) {
  var self = this;
  var current_items = self._order.getItems();

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
ISnew.Cart.prototype.clear = function (task) {
  var self = this;
  task = task || {};
  task.method = 'clear_items';

  self._tasks.send(task);
  self._update(self._clear(task), task);
};

ISnew.Cart.prototype._clear = function (task) {
  var self = this;
  var current_items = self._order.getItems();

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  return current_items;
};

/**
 * Устанавливаем купон
 */
ISnew.Cart.prototype.setCoupon = function (task) {
  var self = this;

  task = task || {};
  task.method = 'set_coupon';

  self._tasks.send(task);
  self._update(self._setCoupon(task), task);
};

ISnew.Cart.prototype._setCoupon = function (task) {
  var self = this;
  var current_items = self._order.getItems();

  return current_items;
};

/**
 * Получить состав корзины
 */
ISnew.Cart.prototype.getOrder = function () {
  var self = this;

  return self._order.get();
};

/**
 * Получить с сервера состав корзины
 */
// TODO: изменить на нормальныйую логику после нормолизации ответов json
// TODO: может не надо? у нас теперь появляется нормальный таск манагер :)
ISnew.Cart.prototype._get = function () {
  var self = this;
  var task = {
    method: 'init'
  };

  self._update({}, task);
};

/**
 * Обновление состава корзины
 */
ISnew.Cart.prototype._update = function (items, task) {
  var self = this;

  self._before(task);
  ISnew.json.updateCartItems(items, task)
    .done(function (response) {
      self._setOrder(response, task);
    })
    .fail(function (response) {
      console.log('cart:update:fail', response);
    })
    .always(function () {
      self._always(task);
    });
};

/**
* Разбирает ответы и сохраняет в cart._order
*/
ISnew.Cart.prototype._setOrder = function (order, task) {
  var self = this;
  var data = {};

  // фиксим вид актуального состава корзины
  //self._patch(order);

  self._order.set(order);

  data = _.clone(self._order.get());
  data.action = task;

  if (task && task.method) {
    EventBus.publish(task.method +':insales:cart', data);
  }

  if (task && task.coupon) {
    var data = data;
    data.action = 'set_coupon';
    EventBus.publish('set_coupon:insales:cart', data);
  }

  EventBus.publish('update_items:insales:cart', data);
};

/**
 * Событие ПЕРЕД действием
 */
ISnew.Cart.prototype._before = function (task) {
  EventBus.publish('before:insales:cart', task);
};

/**
 * Мы закончили что-то делать в корзине
 */
ISnew.Cart.prototype._always = function (task) {
  EventBus.publish('always:insales:cart', task);
};