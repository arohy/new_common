/**
 * @module ajaxAPI/checkout/order
 *
 * @description
 * Оформление заказа с указанием способа оплаты и доставки. Важно - все поля обязательны для заполнения.
 *
 * @param {Object} client - объект с полями {email: почта, name: имя, phone: телефон}
 * @param {string} client.email - почта
 * @param {string} client.name - ФИО
 * @param {string} client.phone - телефон
 * @param {Object} order - объект с обязательными полями
 * @param {number} order.delivery - id способа доставки
 * @param {number} order.payment - id способа оплаты
 *
 * @return {$.Deferred} $.promise
 *
 * @example
 * ajaxAPI.checkout.order(client, order)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (client, order) {
  var URL = require('../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';
  var checkout = {
    lang: _lang,
    pid: 1,
    'order[delivery_variant_id]': _.toInteger(order.delivery),
    'order[payment_gateway_id]': _.toInteger(order.payment)
  };
  var iframe;

  _.forIn(client, function (value, field) {
    checkout['client['+ field +']'] = value;
  });

  _.forIn(order.shipping_address, function (value, field) {
    checkout['shipping_address['+ field +']'] = value;
  });

  if (order.comment) {
    checkout['order[comment]'] = order.comment;
  }

  $.post('/fast_checkout.json', checkout)
    .done(function (response) {
      if (response.status == 'ok') {
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
      result.reject(response)
    })

  return result.promise();
};