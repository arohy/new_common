EventBus.subscribe('update_items:insales:cart', function (data) {
  var cart_widget_html = Template.render(data, 'cart_widget')

  $('.js-cart').html(cart_widget_html);

  _.forEach(data.order_lines, function(value, key) {
    $('[data-item-cart]').html('0');
    $('[data-item-cart="'+value.variant_id+'"]').html(value.quantity);
  });
  if (data.order_lines.length === 0) {
    $('[data-item-cart]').html('0');
  }
});