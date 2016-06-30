/**
 * Обновление корзины
 */

ISnew.json.updateCartItems = function (items, options) {
  var URL = new ISnew.tools.URL();
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    '_method': 'put'
  };
  var dfd = $.Deferred();

  options = options || {};

  _.forIn(items, function (quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  $.post('/cart_items.json', fields)
    .done(function (response) {
      _.forEach(response.items, function (item) {
        if (item && _lang) {
          item.product_url += '?lang='+ _lang;
          item.product.url += '?lang='+ _lang;
        }
      });

      dfd.resolve(response);
    })
    .fail(function (response) {
      dfd.reject(response);
    });

  return dfd.promise();
};