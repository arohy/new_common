/**
 * Product
 */

ISnew.Product = function (product) {
  var self = this;
  self.product = product;

  self.price_kinds = new ISnew.ProductPriceType(product, self);
  self.variants = new ISnew.ProductVariants(product, self);
  self.log();
};

/**
 * Обновления состояний товара
 */
ISnew.Product.prototype._updateStatus = function (status) {
  var self = this;

  status.product_id = self.product.id;

  switch (status.action) {
    case 'update_variant':
      self.price_kinds.setVariant(status.id);
      break;
  };

  Events(status.action +':insales:product').publish(status);
  return;
};

/**
 * чисто логи почитать
 */
ISnew.Product.prototype.log = function () {
  var self = this;

  console.log(self);
};