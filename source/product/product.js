/**
 * Product
 */
ISnew.Product = function (product, settings) {
  var self = this;


  self._init(product, self, settings);
};

/**
 * Настройки
 */
ISnew.Product.prototype._init = function (_product, _owner, settings){
  var self = this;

  if (typeof settings.validate === 'undefined') {
    self.settings = Site.Setting.validate(settings)
  }else{
    self.settings = settings;
  }

  if (typeof _product.id === 'undefined') {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче продукта');
  }

  self.product = _product;
  self._owner = _owner;


  self.quantity = 0;
  self.price_kinds = new ISnew.ProductPriceType(_product, _owner, self.settings);

  //  если есть модификации и в настройках true - запускаем создание OptionSelector
  if (self._owner._isVariants(_product) & self.settings.show_variants) {
    self.variants = new ISnew.ProductVariants(_product, _owner, self.settings);
    self.OptionSelector = new ISnew.OptionSelector(_product, _owner, self.settings);
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
