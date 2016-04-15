/**
 * Product
 */

ISnew.Product = function (product) {
  var self = this;
  self.product = product;

  self.variants = new ISnew.ProductVariants(product, self);
  self.price_kinds = new ISnew.ProductPriceType(product.price_kinds, self);
  self.log();
};

ISnew.Product.prototype.log = function () {
  var self = this;

  console.log(self);
};