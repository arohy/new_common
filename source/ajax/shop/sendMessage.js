/*
 * Отправление сообщения
 */
var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function (input) {
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