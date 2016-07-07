/**
 * Класс для работы с Магазином??
 */
var client = require('./client');
var money = require('./money');

var ajaxShop = require('../json/ajax.shop');
var _Singlton = require('../tools/singlton');

var Shop = function () {
  var self = this;

  self.money = new money();
  self.client = new client(self);

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

module.exports = _Singlton(Shop).getInstance();