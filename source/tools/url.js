/**
 * Тул для разбора url.
 */
var _ = require('lodash');

var _Singleton = require('../tools/singleton');

var URL = function () {
  var self = this;

  self._init();
};

/**
 * Разбор урла
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
 */
URL.prototype.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};

module.exports = _Singleton(URL).getInstance();