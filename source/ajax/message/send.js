/**
 * @memberof module:ajaxAPI/shop
 * @alias message
 *
 * @description
 * Отпаравка сообщений
 *
 * @param {Object} options - объект с полями
 * @param {string} options.content - тело сообщения. Обязательно
 * @param {string} options.from - e-mail, с которого "отправлено" сообщение. Обязательно
 * @param {string} options.phone - телефон, указывается в теле письма. По-умолчанию - пустое
 * @param {string} options.name - имя, указывается в теле письма. По-умолчанию - пустое.
 * @param {string} options.subject - тема письма.
 *
 * @return {$.Deferred} $.promise
 *
 * @example
 * ajaxAPI.shop.message({
 *   'from': 'json@test.ru',
 *   'name': 'test is my name',
 *   'subject': 'test is my subject',
 *   'content': 'YAAAAR!!!!',
 *   'phone': '+00000000000000'
 * })
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (input) {
  var URL = require('../../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';
  var message = {
    lang: _lang
  };

  _.forIn(input, function (value, key) {
    message['feedback['+ key +']'] = value;
  });

  $.post('/client_account/feedback.json', message)
    .done(function (response) {
      if (message && response.status == 'ok') {
        result.resolve(response);
      } else {
        response.message = message;
        result.reject(response);
      }
    });

  return result.promise();
};