/**
 * Главный объект продукта
 *
 * @class
 * @name ISnew.Product
 *
 * @param {json} product json с информацией о товаре
 * @param {object} settings конфиг для рендера optionSelector
 *
 */
ISnew.Product = function (product, settings) {
  var self = this;

  // Банхамер должен быть на входе
  if (!product) {
    throw new ISnew.tools.Error('ErrorProduct', 'ошибка в передаче продукта');
  }

  //  Валидация настроек
  self.settings = new ISnew.ProductSettings(settings, self);

  self.product = product;

  // статус рендера
  if (!self.isRender) {
    self.isRender = false;
  };

  self.images = self._getImage(product.images);

  self.quantity = 0;
  self.price_kinds = new ISnew.ProductPriceType(self);

  self._init();
};

/**
 * Настройки
 */
ISnew.Product.prototype._init = function (){
  var self = this;

  // Важно!!
  // В товаре МОЖЕТ не быть ни одной опции, мы в таком варианте валимся
  // TODO: залатать эту дыру в .variants - это поле ДОЛЖНО быть всегда
  console.log(self);
  if (self._hasOption()) {
    self.variants = new ISnew.ProductVariants(self);
    self.OptionSelector = new ISnew.OptionSelector(self);
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
 * Проверка на наличие Опций модификаций
 */
ISnew.Product.prototype._hasOption = function () {
  var self = this;

  var _product = self.product;
  console.log(self);
  var optionCount = _product.option_names.length;

  return optionCount > 0;
};

// ====================================================================================
//                          Методы по работе с изображениями продукта
// ====================================================================================

/**
 * Получаем объект с изображениями где ключом является название изображения
 *
 * @param  {array} images массив изображений продукта (product.images)
 *
 * @return {object} _images объект с изображениями в виде {'image.title': {small_url: 'http//'}}
 */
ISnew.Product.prototype._getImage = function (images) {
  var self = this;

  var _images = {};

  //  если у продукта есть изображения
  if (_.size(images) > 0) {
    _.forEach(images, function (image) {
      //  если у изображения есть title
      if (image['title']) {
        var imageName = image['title'].toLowerCase();
        _images[imageName] = {
          thumb_url: image['thumb_url'],
          small_url: image['small_url'],
          medium_url: image['medium_url'],
          large_url: image['large_url'],
          original_url: image['original_url']
        };
      }
    });
  }

  return _images;
}