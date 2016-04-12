/**
 * Cart
 */

ISnew.Cart = function (options) {
  var self = this;
  var json = ISnew.json;
  var cart = {};

  // Обновить корзину и дернуть события
  self.reload = function () {
    json.getCartItems()
      .done(function (response) {
        console.log('cart:reload:done', response);
        cart = response;
      })
      .fail(function (response) {
        console.log('cart:reload:fail', response);
      });
  };

  // Добавить товар в корзину и дернуть события
  self.add = function (items) {
    json.addCartItems(items)
      .done(function (response) {
        console.log('cart:add:done', response);
      })
      .fail(function (response) {
        console.log('cart:add:fail', response);
      })
  };

  // Удалить товар из корзины и дернуть события
  self.remove = function (item) {

  };

  // Изменить состав корзины и дернуть события
  self.update = function () {

  };

  // получить информацию о заказе
  self.getOrder = function () {

  }

  // обновить информацию о заказе
  self.setOrder = function (order) {

  }
}