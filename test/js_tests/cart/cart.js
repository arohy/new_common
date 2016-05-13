var Cart = new ISnew.Cart();

EventBus.subscribe('update_items:insales:cart', function (data) {
  var cart_widget_html = Template.render(data, 'cart_widget')

  $('.js-cart').html(cart_widget_html);
});