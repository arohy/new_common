/**
 * Помощник для корзины
 *
 * Важно разобраться с json и как они построены.
 */

ISnew.CartHelper = function () {
  var self = this;
  var order = {};

  /**
   * Основной метод
   */
  self.patch = function (cart, current_order) {
    order = {};

    order.order_lines = current_order.order_lines || current_order.items;
    order.positions_count = order.order_lines.length;

    order.items_count = current_order.items_count;
    order.items_price = [];

    order.total_price = current_order.total_price;

    order.discounts = current_order.discounts;

    self._itemsPrice();
    self._deliveryPrice(current_order);
    self._url();
    self._images();

    //console.log('order:', order);
    _.assign(cart, order);

    //console.log('cart:', cart);
    return cart;
  };

  /**
   * Добавляем поле с ценой только товаров, без доставки
   */
  self._itemsPrice = function () {
    var items_price = 0;
    items_price = _.reduce(order.order_lines, function (sum, item) {
      return sum + item.sale_price;
    }, 0);

    order.items_price = items_price;
    return;
  };

  /**
   * Добавляем цену доставки
   * NOTE: в разных json лежит в разных местах
   */
  self._deliveryPrice = function (current_order) {
    var delivery_price = _.toString(current_order.delivery_price) || _.toString(current_order.order.delivery_price);

    order.delivery_price = parseFloat(delivery_price);

    return;
  };

  /**
   * Фиксим url с учетом языков
   */
  self._url = function () {
    _.forEach(order.order_lines, function (item) {
      //console.log(item);
      // TODO: пока хз. нужен язык
    });
    return;
  };

  /**
   * Фиксим картинки товаров
   */
  self._images = function () {
    _.forEach(order.order_lines, function (item) {
      item.images = item.product.images;
    });
    return;
  }
};