/**
 * Product
 */
ISnew.Product = function (product, settings) {
  var self = this;

  self._init(product, settings);
};

/**
 * Настройки
 */
ISnew.Product.prototype._init = function (_product, settings){
  var self = this;

  self.validateSettings(settings);

  if (!_product) {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче продукта');
  }

  self.product = _product;

  if (!self.is_render) {
    self.is_render = false;
  }

  self.quantity = 0;
  self.price_kinds = new ISnew.ProductPriceType(_product, self);

  //  если есть модификации и в настройках true - запускаем создание OptionSelector
  if (self._isVariants(_product) & self.settings.show_variants) {
    self.variants = new ISnew.ProductVariants(_product, self);
    self.OptionSelector = new ISnew.OptionSelector(_product, self);
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

/**
 * Обновление настроек
 */
ISnew.Product.prototype.setConfig = function (settings){
  var self = this;

  self._init(self.product, settings);
}


ISnew.Product.prototype.validateSettings = function (_settings) {
  var self = this;

  self.settings = _settings || {};

  console.log(self.settings.options)
  if (!self.settings.options) {
    self.settings.options = {};
    self.settings.options['default'] = 'option-default';
  }else{
    self.settings.options['default'] = 'option-default';
  }

  if (!self.settings.product_id) {
    self.settings.product_id = 'data-product-id'
  }

  if (!self.settings.show_variants) {
    self.settings.show_variants = true;
  }

  if (!self.settings.init_option) {
    self.settings.init_option = true;
  }

  if (!self.settings.file_url) {
    self.settings.file_url = {};
  }

  if (!self.settings.options) {
    self.settings.options = {};
  }

  if (!self.settings.validate) {
    self.settings.validate = true;
  }

}