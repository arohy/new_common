var product= new ISnew.Product;

testProduct = function (id) {
  ISnew.json.getProduct(id)
    .done(function (response) {
      product.init(response.product);
      console.log('done');
    });
};