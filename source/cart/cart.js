/**
 * Cart
 *
 * Зависит от ISnew.json, Events, ISnew.CartHelper
 */

// TODO: сделать синглтон
ISnew.Cart = function () {
  var self = this;

  self.ui = new ISnew.CartDOM();
  self._get();
}

/**
 * Добавить в корзину заданное кол-во товаров
 *
 * на вход - объект. смотреть доку
 */
ISnew.Cart.prototype.add = function (task) {
  var self = this;
  var current_items = self._getItems();
  task = task || {};
  task.method = 'add_items';

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) + _.toInteger(quantity);

    current_items[variant_id] = current_quantity;
  });

  self._update(current_items, task);
};

/**
 * Удадить из корзины заданное кол-во товаров
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.remove = function (task) {
  var self = this;
  var current_items = self._getItems();
  task = task || {};
  task.method = 'remove_items';

  _.forIn(task.items, function(quantity, variant_id) {
    var current_quantity = _.toInteger(current_items[variant_id]) - _.toInteger(quantity);

    current_items[variant_id] = current_quantity > 0 ? current_quantity : 0;
  });

  self._update(current_items, task);
};

/**
 * Устанавливает кол-во товаров в корзине для каждой позиции
 * на вход - объект с парами variant_id: quantity
 */
ISnew.Cart.prototype.set = function (task) {
  var self = this;
  var current_items = self._getItems();
  task = task || {};
  task.method = 'set_items';

  _.forIn(task.items, function(quantity, variant_id) {
    current_items[variant_id] = _.toInteger(quantity);
  });

  self._update(current_items, task);
};

/**
 * Удалить позиции из корзины
 * на вход - массив с variant_id
 */
ISnew.Cart.prototype.delete = function (task) {
  var self = this;
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
ISnew.Cart.prototype.clear = function (task) {
  var self = this;
  var current_items = self._getItems();
  task = task || {};
  task.method = 'clear_items';

  _.forIn(current_items, function(quantity, variant_id) {
    current_items[variant_id] = 0;
  });

  self._update(current_items, task);
};

/**
 * Устанавливаем купон
 */
ISnew.Cart.prototype.setCoupon = function (task) {
  var self = this;
  var current_items = self._getItems();
  task = task || {};
  task.method = 'set_coupon';

  self._update(current_items, task);
};

/**
 * Получить состав корзины
 */
ISnew.Cart.prototype.getOrder = function () {
  var self = this;
  return self;
};

/**
 * Получить с сервера состав корзины
 */
// TODO: изменить на нормальныйую логику после нормолизации ответов json
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
* Разбирает ответы и сохраняет в var cart
*/
ISnew.Cart.prototype._setOrder = function (order, task) {
  var self = this;
  var data = {};

  // фиксим вид актуального состава корзины
  self._patch(order);

  data = _.clone(self);
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

/**
 * Формируем инфу о позициях
 */
ISnew.Cart.prototype._getItems = function () {
  var self = this;
  var items = {};

  _.forEach(self.order_lines, function (item) {
    items[item.variant_id] = item.quantity;
  });

  return items;
};

/**
 * ===============================================================================================================
 */
/**
 * Фиксим инфу по корзине
 */
ISnew.Cart.prototype._patch = function (current_order) {
  var self = this;

  self.order_lines = current_order.order_lines || current_order.items;
  self.order_line_comments = current_order.order_line_comments || current_order.order.order_line_comments;

  self.positions_count = self.order_lines.length;

  self.items_count = current_order.items_count;
  self.items_price = 0;

  self.total_price = current_order.total_price;

  self.discounts = current_order.discounts;

  self._itemsPrice();
  self._deliveryPrice(current_order);
  self._url();
  self._images();

  //_.assign(self, order);
  return;
};

/**
 * Добавляем поле с ценой только товаров, без доставки
 */
ISnew.Cart.prototype._itemsPrice = function () {
  var self = this;

  self.items_price = _.reduce(self.order_lines, function (sum, item) {
    return sum + item.sale_price * item.quantity;
  }, 0);

  return;
};

/**
 * Добавляем цену доставки
 * NOTE: в разных json лежит в разных местах
 */
ISnew.Cart.prototype._deliveryPrice = function (current_order) {
  var self = this;
  var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

  self.delivery_price = parseFloat(delivery_price);

  return;
};

/**
 * Фиксим url с учетом языков
 */
ISnew.Cart.prototype._url = function () {
  var self = this;
  _.forEach(self.order_lines, function (item) {
    //console.log(item);
    // TODO: пока хз. нужен язык
  });
  return;
};

/**
 * Фиксим картинки товаров
 */
ISnew.Cart.prototype._images = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.images = item.product.images;
  });
  return;
};