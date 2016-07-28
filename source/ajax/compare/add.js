/** @private */
var URL = require('../../tools/url');
/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');

/**
 * @memberof module:ajaxAPI/compare
 * @alias add
 *
 * @description
 * Добавление товара в сравнение
 *
 * @param {number} id - id товара, добавляемого в сравнение
 *
 * @return {$.ajax}
 *
 * @example
 * ajaxAPI.compare.add(123456)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (id) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};