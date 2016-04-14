/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items, comments) {
  var fields = {
    '_method': 'put'
  };

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(comments, function(comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  return $.post('/cart_items.json', fields);
};