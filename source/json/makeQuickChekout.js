/**
 * Оформление заказа
 */

ISnew.json.makeQuickCheckout = function (formData) {
  var URL = new ISnew.tools.URL();
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