/**
 * Product
 */
ISnew.Product = function (product) {
  var self = this;

  if (!product) {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче аргумента');
  }

  self._init(product, self);
};

/**
 * Настройки
 */
ISnew.Product.prototype._init = function (_product, _owner){
  var self = this;

  self.product = _product;
  self._owner = _owner;

  self.quantity = 0;
  self.price_kinds = new ISnew.ProductPriceType(_product, _owner);

  //  если есть модификации запускаем создание OptionSelector
  if (self._owner._isVariants(_product)) {
    self.variants = new ISnew.ProductVariants(_product, _owner);
    self.OptionSelector = new ISnew.OptionSelector(_product, _owner);
  }
}

/**
 * Обновления состояний товара
 */
ISnew.Product.prototype._updateStatus = function (status) {
  var self = this;

  status.product_id = self.product.id;

  // Если у нас переключался вариант - обновляем тип цен
  if (status.action == 'update_variant') {
    self.price_kinds.setVariant(status.id);
  };

  // Трегирим нужное событие и сбрасываем состояние
  EventBus.publish(status.action +':insales:product', status);
  return;
};

/**
 * Установка кол-ва товара
 */
ISnew.Product.prototype.setQuantity = function (quantity) {
  var self = this;

  self.quantity = parseFloat(quantity);

  self.price_kinds.setQuantity(self.quantity);
  return;
};

/**
 * Проверка на наличие модификаций
 */
ISnew.Product.prototype._isVariants = function (_product) {
  var optionCount = _product.option_names.length;

  return optionCount > 0;
};
