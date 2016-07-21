/**
 * @memberof module:ajaxAPI/collection
 * @alias get
 *
 * @description
 * Получение информации о коллекции
 *
 * @param {string} handle - пермалинк коллекции, объязателен.
 * @param {Object} filter - объект с выбранными параметрами для фильтрации
 * @param {Object} pager - объект с настройками пагинации
 * @param {number} pager.page_size - размер разбивки на страницы
 * @param {number} pager.page - номер страницы, по которой получаем информацию
 *
 * @return {json}
 * { status: "ok", count: 19, products: [//массив товаров]}
 *
 * @example
 * var filter = {
 *   price_min: 4000,
 *   price_max: 10000
 * };
 *
 * var pager = {
 *   page_size: 25,
 *   page: 2
 * }
 *
 * ajaxAPI.collection.get('collection_handle', filter, pager)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function () {
  var URL = require('../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var path = '/collection/'+ _.toString(arguments[0]) +'.json';
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };
  var result = $.Deferred();

  _.chain(arguments)
    .drop()
    .compact()
    .forEach(function (value) {
      _.assign(fields, value);
    })
    .value();

  $.getJSON(path, fields)
    .done(function (response) {
      _.forEach(response.products, function (product) {
        if (product && _lang) {
          product.url += '?lang='+ _lang;
        }
      });

      result.resolve(response);
    })
    .fail(function (response) {
      result.reject(response);
    })

  return result.promise();
};