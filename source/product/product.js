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

  self._selectors = {
    product: 'data-product-id',
  };

  _.merge(self, product);
  //  Валидация настроек
  self.settings = new ISnew.ProductSettings(settings, self);

  self._images = self._getImage(product.images);
  //self.price_kinds = new ISnew.ProductPriceType(self);

  self._init();
};

/**
 * Инициализация
 */
ISnew.Product.prototype._init = function (){
  var self = this;

  // должен быть здесь, чтобы перезапустить при смене настроек.
  // TODO: вынести в отдельный метод, прикруть методы к Классам
  //self.variants = new ISnew.ProductVariants(self);
  self._instance = self._initInstance();
}

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

/*
 * Инициализация форм()
 */
ISnew.Product.prototype._initInstance = function () {
  var self = this;

  self.$product = $('['+ self._selectors.product +'='+ self.id +']');

  self.$product.each(function () {
    new ISnew.ProductInstance(self, $(this));
  });
};