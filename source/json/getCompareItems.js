/**
 * Добавление товара в сравнение
 */
var URL = require('../tools/url');
var $ = require('jquery');

module.exports = function (id) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };
  var result = $.Deferred();

  $.getJSON('/compares.json', fields)
    .done(function (response) {
      result.resolve(response);
    })
    .fail(function (response) {
      result.reject(response);
    });

  return result.promise();
};