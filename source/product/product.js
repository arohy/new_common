/** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');

/** @private */
var Error = require('../tools/error');
/** @private */
var _Settings = require('./settings');
/** @private */
var _Instance = require('./productInstance');

/**
 * Главный объект продукта
 *
 * @class
 *
 * @param {json} product json с информацией о товаре
 * @param {object} settings конфиг для рендера optionSelector
 *
 * @todo Превратить в справочник всей подготовленной информации по товару
 */
var Product = function (product, settings) {
  var self = this;

  // Банхамер должен быть на входе
  if (!product) {
    throw new Error('ErrorProduct', 'ошибка в передаче продукта');
  }

  self._selectors = {
    product: 'data-product-id',
  };

  _.merge(self, product);
  //  Валидация настроек
  self.settings = new _Settings(settings, self);

  self._images = self._getImage(product.images);

  self._init();
};

/**
 * Инициализация
 * @private
 */
Product.prototype._init = function (){
  var self = this;

  // должен быть здесь, чтобы перезапустить при смене настроек.
  // TODO: вынести в отдельный метод, прикруть методы к Классам
  //self.variants = new ProductVariants(self);
  self._initInstance();
}

// ====================================================================================
//                          Методы по работе с изображениями продукта
// ====================================================================================

/**
 * Получаем объект с изображениями где ключом является название изображения
 * @private
 *
 * @param {array} images массив изображений продукта (product.images)
 *
 * @return {object} _images объект с изображениями в виде {'image.title': {small_url: 'http//'}}
 */
Product.prototype._getImage = function (images) {
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

/**
 * Инициализация оберток [data-product-id] с инициализацией всех дочерних элементов
 * @private
 */
Product.prototype._initInstance = function () {
  var self = this;

  self._instance = {};
  self.$product = $('['+ self._selectors.product +'="'+ self.id +'"]');

  self.$product.each(function (index) {
    self._instance[index] = new _Instance(self, $(this));
  });
};

module.exports = Product;