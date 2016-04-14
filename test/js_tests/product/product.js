var product;

testProduct = function (id) {
  ISnew.json.getProduct(id)
    .done(function (response) {
      product = new ISnew.Product(response.product);
      console.log('done');
    });
};