/**
 * @memberof module:ajaxAPI/compare
 * @alias get
 *
 * @description
 * Получение списка сравнения
 *
 * @return {$.Deferred} $.promise
 *
 * @example
 * ajaxAPI.compare.get()
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (id) {
  var URL = require('../../tools/url');
  var $ = require('jquery');

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