/**
 * Класс для работы с клиентом сайта
 */
var $ = require('jquery');
var _ = require('lodash');
var ajaxShop = require('../json/ajax.shop');

var Client = function (_owner) {
  var self = this;

  self._owner = _owner;

  self._init();
}

/**
 * Инициализация
 */
Client.prototype._init = function () {
  var self = this;

  self._get();
};

/**
 * Забираем инфу с сервера
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
 */
Client.prototype.get = function () {
  var self = this;

  return self._get();
};

module.exports = Client;