/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

ISnew.Cart = function () {
  var self = this;
  var json = ISnew.json;
  var cart = {};
  var Helper = new ISnew.CartHelper();

  /**
   * Добавить в корзину заданное кол-во товаров
   *
   * на вход - объект. смотреть доку
   */
  self.add = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'add_items';

    _.forIn(task.items, function(quantity, variant_id) {
      var current_quantity = current_items[variant_id] + quantity;

      current_items[variant_id] = current_quantity;
    });

    self._update(current_items, task);
  };

  /**
   * Удадить из корзины заданное кол-во товаров
   * на вход - объект с парами variant_id: quantity
   */
  self.remove = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'remove_items';

    _.forIn(task.items, function(quantity, variant_id) {
      var current_quantity = current_items[variant_id] - quantity;

      current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
    });

    self._update(current_items, task);
  };

  /**
   * Устанавливает кол-во товаров в корзине для каждой позиции
   * на вход - объект с парами variant_id: quantity
   */
  self.set = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'set_items';

    _.forIn(task.items, function(quantity, variant_id) {
      current_items[variant_id] = quantity;
    });

    self._update(current_items, task);
  };

  /**
   * Удалить позиции из корзины
   * на вход - массив с variant_id
   */
  self.delete = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'delete_items';

    _.chain(task.items)
      .toArray()
      .forEach(function(variant_id) {
        current_items[variant_id] = 0;
      })
      .value();

    self._update(current_items, task);
  };

  /**
   * Полностью очистить корзину
   */
  self.clear = function (task) {
    var current_items = self._getItems();
    task = task || {};
    task.method = 'clear_items';

    _.forIn(current_items, function(quantity, variant_id) {
      current_items[variant_id] = 0;
    });

    self._update(current_items, task);
  };

  /**
   * Получить состав корзины
   */
  self.getOrder = function () {
    return cart;
  };

  /**
   * Получить с сервера состав корзины
   */
  self._get = function () {
    // TODO: изменить на нормальныйую логику после нормолизации ответов json
    var task = {
      method: 'init'
    };
    self._update({}, task);
  };

  /**
   * Обновление состава корзины
   */
  self._update = function (items, task) {
    self._before(task);
    json.updateCartItems(items, task.comments)
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
  * Разбирает ответы и сохраняет в var cart
  */
  self._setOrder = function (order, task) {
    var data = {};
    cart = Helper.patch(cart, order);

    data = cart;
    data.action = task;

    if (task && task.method) {
      Events(task.method +':insales:cart').publish(data);
    }

    Events('update_items:insales:cart').publish(data);
  };

  /**
   * Событие ПЕРЕД действием
   */
  self._before = function (task) {
    Events('before:insales:cart').publish(task);
  };

  /**
   * Мы закончили что-то делать в корзине
   */
  self._always = function (task) {
    Events('always:insales:cart').publish(task);
  };

  /**
   * Формируем инфу о позициях
   */
  self._getItems = function () {
    var items = {};

    _.forEach(cart.order_lines, function (item) {
      items[item.variant_id] = item.quantity;
    });

    return items;
  };

  self._get();
}