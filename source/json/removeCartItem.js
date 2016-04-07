/*
 * Удаление товара из корзины
 */

ISnew.json.removeCartItem = function(variant_id) {
  var path = '/cart_items/'+ variant_id +'.json';
  var fields = {
    '_method': 'delete'
  };

  return $.post(path, fields);
}