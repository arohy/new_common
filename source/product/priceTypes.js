/**
 * Типы цен
 *
 * @class
 * @name ProductPriceType
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _owner ссылка на родительский класс Products
 *
 */
var _ = require('lodash');

module.exports = ProductPriceType = function (_owner) {
  var self = this;
  self._owner = _owner;

  self.price_kinds = {};

  self._init();

  return self;
};

ProductPriceType.prototype._init = function () {
  var self = this;

  self.price_kinds = self._initPrices(self._owner.product);
};

/**
 * Инициализация
 */
ProductPriceType.prototype._initPrices = function (product) {
  var self = this;
  var price_kinds = product.price_kinds;
  var price_types = {};

  _.forEach(product.variants, function (variant) {
    price_types[variant.id] = [];

    price_types[variant.id].push({
      min_quantity: 0,
      price: parseFloat(variant.price)
    });

    if (product.price_kinds.length) {
      _.forEach(variant.prices, function (price, index) {
        price_types[variant.id].push({
          min_quantity: price_kinds[index].value,
          price: parseFloat(variant.prices[index])
        });
      })
    }
  });

  return price_types;
};

/**
 * Получение актуальной цены за штуку
 */
ProductPriceType.prototype.getPrice = function (options) {
  var self = this;
  var price = 0;

  _.forEach(self.price_kinds[options.variantId], function (price_type) {
    if (options.quantity < price_type.min_quantity) {
      return false;
    }

    price = price_type.price;
  });

  return price;
};