/**
 * Cart
 *
 * Зависит от ISnew.json и Events
 */

ISnew.Cart = function () {
  var self = this;
  var json = ISnew.json;
  var cart = {};
  var Helper = new ISnew.CartHelper();

  /**
   * Добавить в корзину заданное кол-во товаров
   * на вход - объект с парами variant_id: quantity
   */
  self.add = function (items, options) {
    var current_items = self._getItems();
    var options = options || {};
    options.method = 'add_items';
    options.items = items;

    _.forIn(items, function(quantity, variant_id) {
      var current_quantity = current_items[variant_id] + quantity;

      current_items[variant_id] = current_quantity;
    });

    self._update(current_items, options);
  };

  /**
   * Удадить из корзины заданное кол-во товаров
   * на вход - объект с парами variant_id: quantity
   */
  self.remove = function (items, options) {
    var current_items = self._getItems();
    var options = options || {};
    options.method = 'remove_items';
    options.items = items;

    _.forIn(items, function(quantity, variant_id) {
      var current_quantity = current_items[variant_id] - quantity;

      current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
    });

    self._update(current_items, options);
  };

  /**
   * Устанавливает кол-во товаров в корзине для каждой позиции
   * на вход - объект с парами variant_id: quantity
   */
  self.set = function (items, options) {
    var current_items = self._getItems();
    var options = options || {};
    options.method = 'set_items';
    options.items = items;

    _.forIn(items, function(quantity, variant_id) {
      var current_quantity = quantity;

      current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
    });

    self._update(current_items, options);
  };

  /**
   * Удалить позиции из корзины
   * на вход - массив с variant_id
   */
  self.delete = function (items, options) {
    var current_items = self._getItems();
    var options = options || {};
    options.method = 'delete_items';
    options.items = items;

    _.chain(items)
      .toArray()
      .forEach(function(variant_id) {
        current_items[variant_id] = 0;
      })
      .value();

    self._update(current_items, options);
  };

  /**
   * Полностью очистить корзину
   */
  self.clear = function (options) {
    var current_items = self._getItems();
    var options = options || {};
    options.method = 'clear_items';
    options.items = items;

    _.forIn(current_items, function(quantity, variant_id) {
      current_items[variant_id] = 0;
    });

    self._update(current_items, options);
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
    self._update();
  };

  /**
   * Обновление состава корзины
   */
  self._update = function (items, options) {
    self._before(options);
    json.updateCartItems(items)
      .done(function (response) {
        self._setOrder(response, options);
      })
      .fail(function (response) {
        console.log('cart:update:fail', response);
      })
      .always(function () {
        self._always(options);
      });
  };

  /**
  * Разбирает ответы и сохраняет в var cart
  */
  self._setOrder = function (order, options) {
    var data = {};
    cart = Helper.patch(cart, order);

    data = cart;
    data.action = options;

    if (options && options.method) {
      Events(options.method +':insales:cart').publish(data);
    }

    Events('update_items:insales:cart').publish(data);
  };

  /**
   * Событие ПЕРЕД действием
   */
  self._before = function (options) {
    Events('before:insales:cart').publish(options);
  };

  /**
   * Мы закончили что-то делать в корзине
   */
  self._always = function (options) {
    Events('always:insales:cart').publish(options);
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

  self._update();
}