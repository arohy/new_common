/*
 * Получение состава корзины
 */

ISnew.json.getCartItems = function () {
  var result = $.Deferred();
  var cookieCart = $.cookie('cart');
  var URL = new ISnew.tools.URL();
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };

  /*
   * В куке состав корзины хранится, если там не более 4х РАЗНЫХ модификаций
   * Кука может быть пустой - дергаем инфу с сервера
   * Если кука содержит строку 'json' - дергаю инфу с сервера
   */
  if (cookieCart && cookieCart != 'json') {
    order = $.parseJSON(cookieCart) || null;
    result.resolve(order);
    // reject??
  } else {
    $.getJSON('/cart_items.json', fields)
      .done(function (order) {
        // url'ов нет
        result.resolve(order);
      })
      .fail(function (response) {
        result.reject(response);
      });
  }

  return result.promise();
};