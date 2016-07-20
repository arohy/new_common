/**
 * @module ajaxAPI/checkout/quick
 *
 * @description
 * Оформление заказа
 *
 * @param {Object} formData - объект сериализованной формы
 *
 * @return {$.Deferred} $.promise
 *
 * @example
 * ajaxAPI.checkout.quick(form.serialize())
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (formData) {
  var URL = require('../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';
  var iframe;

  formData.lang = _lang;
  formData.pid = 1;
  formData.dataType = 'json';
  formData.type = 'POST';

  $.ajax('/orders/create_with_quick_checkout.json', formData)
    .done(function (response) {
      if (response.result == 'ok') {
        iframe = $("<iframe src='/orders/successful' width='0' height='0'></iframe>");

        $('body').append(iframe);
        iframe.on('load', function() {
          return $(iframe).remove();
        });

        result.resolve(response);
      } else {
        result.reject(response);
      }
    })
    .fail(function (response) {
      result.reject(response);
    });

  return result.promise();
};