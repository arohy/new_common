/**
 * Variants tree
 */

ISnew.VariantsTree = function (product) {
  var self = this;

  self.init(product);
};

ISnew.VariantsTree.prototype.init = function (product) {
  var self = this;

  self.variantsTree = product.variants;

  console.log(self);
};