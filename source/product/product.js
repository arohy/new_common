/**
 * Product
 */

ISnew.Product = function () {
  var self = this;
  self.product = {};
};

ISnew.Product.prototype.init = function (product) {
  var self = this;

  self.product = product;

  self.tree = new ISnew.VariantsTree(product);
  self.log();
};

ISnew.Product.prototype.log = function () {
  var self = this;

  console.log(self);
};

ISnew.Product.prototype.getTree = function () {
  var self = this;

  console.log(self.tree);
};