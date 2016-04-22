var product;

EventBus.subscribe('update_price:insales:product', function (data) {
  console.log('update_price:insales:product', data);
});

EventBus.subscribe('update_variant:insales:product', function (data) {
  console.log('update_variant:insales:product', data);
});