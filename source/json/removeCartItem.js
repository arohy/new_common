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

testRemove = function(id) {
  ISnew.json.removeCartItem(id)
    .done(function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    });
}