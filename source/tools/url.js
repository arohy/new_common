/** @private */
var _ = require('lodash');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * Тул для разбора url.
 * @module tools/url
 */
var URL = function () {
  var self = this;

  self._init();
};

/**
 * Разбор урла
 * @method
 * @private
 */
URL.prototype._init = function () {
  var self = this;
  self.keys = {};
  self.location = window.location;

  _.chain(self.location.search.replace('?', ''))
    .split('&')
    .forEach(function (part) {
      if (part !== '') {
        part = part.split('=');
        self.keys[part[0]] = part[1];
      }
    })
    .value();

  return;
};

/**
 * Вытаскиваем значение ключа
 * @memberof module:tools/url
 * @method {string} key - имя ключа
 *
 * @return {string|boolean} Возвращает значение или false
 */
URL.prototype.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};

module.exports = _Singleton(URL).getInstance();