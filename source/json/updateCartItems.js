/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items) {
  var fields = {
    '_method': 'put'
  };

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = quantity;
  });

  return $.post('/cart_items.json', fields);
}