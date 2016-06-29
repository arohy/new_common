/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function (variant_id) {
  var URL = new ISnew.tools.URL();
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var fields = {
    lang: URL.getKeyValue('lang'),
    '_method': 'delete'
  };

  return $.post(path, fields);
};