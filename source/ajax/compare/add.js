/**
 * @memberof module:ajaxAPI/compare
 * @alias add
 *
 * @description
 * Добавление товара в сравнение
 *
 * @param {number} id - id товара, добавляемого в сравнение
 *
 * @return {$.ajax} $.post
 *
 * @example
 * ajaxAPI.compare.add(123456)
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
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};