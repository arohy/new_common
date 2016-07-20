/*
 * Получение информации о товаре
 */
var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function (id) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    format: 'json'
  };
  var result = $.Deferred();

  $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json', fields)
    .done(function (response) {
      if (response.product && _lang) {
        response.product.url += '?lang='+ _lang;
      }

      result.resolve(response.product);
    })
    .fail(function (response) {
      console.log('JSON: ошибка при получении данных от платформы', response);
      result.resolve({});
    });

  return result.promise();
};