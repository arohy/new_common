/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function (variant_id) {
  var URL = new ISnew.tools.URL();
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    '_method': 'delete'
  };

  return $.post(path, fields);
};