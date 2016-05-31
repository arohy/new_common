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

  self.variantId = 0;
  self.price_kinds = {};

  self._init();

  return self;
};

ISnew.ProductPriceType.prototype._init = function () {
  var self = this;

  self.variantId = self._owner.variants.getVariant();
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
 * Обновление после любых действий
 */
ISnew.ProductPriceType.prototype._update = function () {
  var self = this;
  var status = {
    action: {
      method: 'update_price'
    },
    price: self.getPrice(),
    quantity: self.quantity
  };

  self._owner._updateStatus(status);
  return;
};

/**
 * Получение актуальной цены за штуку
 */
ISnew.ProductPriceType.prototype.getPrice = function () {
  var self = this;
  var price = 0;

  _.forEach(self.price_kinds[self.variantId], function (price_type) {
    if (self.quantity < price_type.min_quantity) {
      return false;
    }

    price = price_type.price;
  });

  return price;
};

/**
 * Задать актуальное кол-во товара
 */
ISnew.ProductPriceType.prototype._setQuantity = function (quantity) {
  var self = this;

  self.quantity = _.toInteger(quantity);

  return;
};

/**
 * Выбираем модификацию товара
 */
ISnew.ProductPriceType.prototype._setVariant = function (variantId) {
  var self = this;

  variantId = parseInt(variantId);

  if (self.variantId == variantId) {
    return false;
  }

  self.variantId = variantId;

  return;
};

ISnew.ProductPriceType.prototype.set = function (config) {
  var self = this;

  if (config.quantity) {
    self._setQuantity(config.quantity);
  }

  if (config.variantId) {
    self._setVariant(config.variantId);
  }

  self._update();
};