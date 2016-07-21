/**
 * @memberof module:ajaxAPI/product
 * @alias get

 * @description
 * Получение информации о товаре
 *
 * @param {number} id - id товара
 *
 * @return {$.Deferred} $.promise
 *
 * @example
 * ajaxAPI.product.get(123456)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (id) {
  var URL = require('../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

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