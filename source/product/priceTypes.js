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

  self.variant_id = self._owner.product.variants[0].id;
  self.price_kinds = self._initPrices(self._owner.product);

  return self;
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
    action: 'update_price',
    price: self.getPrice(),
    quantity: self._owner.quantity
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

  _.forEach(self.price_kinds[self.variant_id], function (price_type) {
    if (self._owner.quantity < price_type.min_quantity) {
      return false;
    }

    price = price_type.price;
  });

  return price;
};

/**
 * Задать актуальное кол-во товара
 */
ISnew.ProductPriceType.prototype.setQuantity = function () {
  var self = this;

  self._update();
  return;
};

/**
 * Выбираем модификацию товара
 */
ISnew.ProductPriceType.prototype.setVariant = function (variant_id) {
  var self = this;
  variant_id = parseInt(variant_id);

  if (self.variant_id == variant_id) {
    return false;
  }

  self.variant_id = variant_id;

  self._update();
  return;
};