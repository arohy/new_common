var Cart = new ISnew.Cart();
var $cart = $('.js-cart');

EventBus.subscribe('update_items:insales:cart', function (data) {
  console.log('update_items:insales:cart', data);
});

EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('add_items:insales:cart', data);
});

EventBus.subscribe('remove_items:insales:cart', function (data) {
  console.log('remove_items:insales:cart', data);
});

EventBus.subscribe('delete_items:insales:cart', function (data) {
  console.log('delete_items:insales:cart', data);
});

EventBus.subscribe('set_items:insales:cart', function (data) {
  console.log('set_items:insales:cart', data);
});

EventBus.subscribe('before:insales:cart', function (data) {
  console.log('before:insales:cart', data);
});

EventBus.subscribe('always:insales:cart', function (data) {
  console.log('always:insales:cart', data);
});