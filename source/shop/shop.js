/** @private */
var ajaxShop = require('../ajax/ajax.shop');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * @class
 *
 * @description
 * Класс для работы с вспомогательным функционалом магазинв
 */
var Shop = function () {
  var self = this;

  self.money = new (require('./money'))();
  self.client = new (require('./client'))(self);

  self._init();
}

/**
 * Иницализация
 * @private
 */
Shop.prototype._init = function () {
  var self = this;
};

/**
 * Отправка сообщений
 *
 * @method
 *
 * @see module:ajaxAPI/shop.message
 * @param {Object} message
 *
 * @return {$.ajax}
 */
Shop.prototype.sendMessage = function (message) {
  var self = this;

  return ajaxShop.message(message);
};

module.exports = _Singleton(Shop).getInstance();