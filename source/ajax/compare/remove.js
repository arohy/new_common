/**
 * @memberof module:ajaxAPI/compare
 * @alias remove
 *
 * @description
 * Удаление товара из сравнения
 *
 * @param {number} id - id товара, удаляемого из списка.
 *
 * @return {$.ajax} $.post
 *
 * @example
 * ajaxAPI.compare.remove(123456)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (id) {
  var URL = require('../../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
};