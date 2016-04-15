var product;

Events('update_price:insales:product').subscribe(function (data) {
  console.log('update_price:insales:product', data);
});

Events('update_variant:insales:product').subscribe(function (data) {
  console.log('update_variant:insales:product', data);
});