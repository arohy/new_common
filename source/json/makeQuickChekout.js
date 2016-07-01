/**
 * Оформление заказа
 */

ISnew.json.makeQuickCheckout = function (formData) {
  var URL = new ISnew.tools.URL();
  var result = $.Deferred();
  var _lang = URL.getKeyValue('lang') || '';

  formData.lang = _lang;
  formData.pid = 1;
  formData.dataType = 'json';
  formData.type = 'POST';

  $.ajax('/orders/create_with_quick_checkout.json', formData)
    .done(function (response) {
      if (response.result == 'ok') {
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