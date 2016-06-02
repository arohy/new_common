/**
 * Типы цен
 *
 * @class
 * @name ISnew.ProductPriceType
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _owner ссылка на родительский класс ISnew.Products
 *
 */
ISnew.ProductPriceType = function (_owner) {
  var self = this;
  self._owner = _owner;

  self.price_kinds = {};

  self._init();

  return self;
};

ISnew.ProductPriceType.prototype._init = function () {
  var self = this;

  self.price_kinds = self._initPrices(self._owner.product);
};

/**
 * Инициализация
 */
ISnew.ProductPriceType.prototype._initPrices = function (product) {
  var self = this;
  var price_kinds = product.price_kinds;
  var price_types = {};

  _.forEach(product.variants, function (variant) {
    price_types[variant.id] = [];

    price_types[variant.id].push({
      min_quantity: 0,
      price: parseFloat(variant.price)
    });

    _.forEach(variant.prices, function (price, index) {
      price_types[variant.id].push({
        min_quantity: price_kinds[index].value,
        price: parseFloat(variant.prices[index])
      });
    })
  });

  return price_types;
};

/**
 * Получение актуальной цены за штуку
 */
ISnew.ProductPriceType.prototype.getPrice = function (options) {
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