/**
 * Оформление заказа
 */

ISnew.json.makeCheckout = function (client, order) {
  var URL = new ISnew.tools.URL();
  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';
  var checkout = {
    lang: _lang,
    pid: 1,
    'order[delivery_variant_id]': _.toInteger(order.delivery),
    'order[payment_gateway_id]': _.toInteger(order.payment)
  };

  _.forIn(client, function (value, field) {
    checkout['client['+ field +']'] = value;
  });

  $.post('/fast_checkout.json', checkout)
    .done(function (response) {
      if (response.status == 'ok') {
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