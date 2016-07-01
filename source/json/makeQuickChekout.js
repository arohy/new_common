/**
 * Оформление заказа
 */

ISnew.json.makeQuickCheckout = function (client) {
  var URL = new ISnew.tools.URL();
  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';
  var checkout = {
    lang: _lang,
    pid: 1
  };

  _.forIn(client, function (value, field) {
    checkout['client['+ field +']'] = value;
  });

  $.post('/orders/create_with_quick_checkout.json', checkout)
    .done(function (response) {
      if (response.status == 'ok') {
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