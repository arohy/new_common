/** @private */
var _ = require('lodash');

/**
 * @memberof Cart
 * @class
 * Класс отвечает за работу и форматирование состава корзины
 */
var CartOrder = function (_cart) {
  var self = this;

  self._owner = _cart;
};

/**
 * Обновляем состав корзины
 * @method
 * @private
 *
 * @param {Object} order - объект с ответом от платформы
 */
CartOrder.prototype.set = function (order) {
  var self = this;

  self._patch(order);

  return self;
};

/**
 * Забираем актуальный состав корзины
 * @method
 */
CartOrder.prototype.get = function () {
  var self = this;

  return self;
};

/**
 * Забираем информацию только о позициях
 * @method
 */
CartOrder.prototype.getItems = function () {
  var self = this;
  var items = {};

  _.forEach(self.order_lines, function (item) {
    items[item.variant_id] = item.quantity;
  });

  return items;
};

/**
 * Забираем комментарии
 * @method
 */
CartOrder.prototype.getComments = function () {
  var self = this;

  return self.order_line_comments;
};

/**
 * Фиксим инфу по корзине
 * @method
 * @private
 *
 * @param {Object} current_order - текущий состав корзины, ответ от платформы
 */
CartOrder.prototype._patch = function (current_order) {
  var self = this;

  self.order_lines = current_order.items;
  self.order_line_comments = current_order.order.order_line_comments;

  self.positions_count = self.order_lines.length;

  self.items_count = current_order.items_count;
  self.items_price = 0;

  self.total_price = current_order.total_price;

  self.discounts = current_order.discounts;

  self._itemsPrice();
  self._deliveryPrice(current_order);
  self._setId()
  self._images();

  return;
};

/**
 * Добавляем поле с ценой только товаров, без доставки
 * @method
 * @private
 */
CartOrder.prototype._itemsPrice = function () {
  var self = this;

  self.items_price = _.reduce(self.order_lines, function (sum, item) {
    return sum + item.sale_price * item.quantity;
  }, 0);

  return;
};

/**
 * Добавляем цену доставки
 * @method
 * @private
 *
 * @todo разрулить момент, что в разных json лежит в разных местах
 */
CartOrder.prototype._deliveryPrice = function (current_order) {
  var self = this;
  var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

  self.delivery_price = parseFloat(delivery_price);

  return;
};

/**
 * Вытаскиваем наружу id
 * @method
 * @private
 */
CartOrder.prototype._setId = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.id = item.variant_id;
  });
  return;
};

/**
 * Фиксим картинки товаров
 * @method
 * @private
 */
CartOrder.prototype._images = function () {
  var self = this;

  _.forEach(self.order_lines, function (item) {
    item.images = item.product.images;
  });
  return;
};

/**
 * Вытаскиваем информацию о позиции по id
 * @method
 *
 * @param {number} id - id варианта
 */
CartOrder.prototype.getItemByID = function (id) {
  var self = this;
  var _item;

  id = _.toInteger(id);

  _.forEach(self.order_lines, function (item) {
    if (item.id === id) {
      _item = item;
      return false;
    }
  });

  return _item;
};

module.exports = CartOrder;