/**
 * Класс для работы с Магазином??
 */
var ajaxShop = require('../json/ajax.shop');
var _Singleton = require('../tools/singleton');

var Shop = function () {
  var self = this;

  self.money = new (require('./money'))();
  self.client = new (require('./client'))(self);

  self._init();
}

Shop.prototype._init = function () {
  var self = this;
};

/**
 * Отправка сообщений
 */
Shop.prototype.sendMessage = function (message) {
  var self = this;

  return ajaxShop.message(message);
};

module.exports = _Singleton(Shop).getInstance();