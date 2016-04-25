/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items, options) {
  var fields = {
    '_method': 'put'
  };
  options = options || {};

  _.forIn(items, function(quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function(comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = coupon;
  }

  return $.post('/cart_items.json', fields);
};