/** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');
/** @private */
var ajaxShop = require('../json/ajax.shop');

/**
 * @memberof Shop
 * @class
 *
 * @description
 * Класс для работы с клиентом сайта
 */
var Client = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._init();
}

/**
 * Инициализация
 * @method
 *
 * @private
 */
Client.prototype._init = function () {
  var self = this;

  self._get();
};

/**
 * Забираем инфу с сервера
 * @method
 *
 * @private
 */
Client.prototype._get = function () {
  var self = this;
  var result = $.Deferred();

  ajaxShop.client()
    .done(function (response) {
      _.merge(self, response);
      result.resolve(self);
    })
    .fail(function (response) {
      console.log('Client: _get: fail: ', response);
      result.reject(response);
    });

  return result.promise();
};

/**
 * Обновление данных
 * @method
 */
Client.prototype.get = function () {
  var self = this;

  return self._get();
};

module.exports = Client;