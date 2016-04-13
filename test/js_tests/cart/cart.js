var Cart = new ISnew.Cart();
var $cart = $('.js-cart');

Events('update_items:insales:cart').subscribe(function (data) {
  console.log('update_items:insales:cart', data);
});

Events('add_items:insales:cart').subscribe(function (data) {
  console.log('add_items:insales:cart', data);
});

Events('remove_items:insales:cart').subscribe(function (data) {
  console.log('remove_items:insales:cart', data);
});

Events('delete_items:insales:cart').subscribe(function (data) {
  console.log('delete_items:insales:cart', data);
});

Events('set_items:insales:cart').subscribe(function (data) {
  console.log('set_items:insales:cart', data);
});

Events('before:insales:cart').subscribe(function (data) {
  console.log('before:insales:cart', data);
});

Events('always:insales:cart').subscribe(function (data) {
  console.log('always:insales:cart', data);
});