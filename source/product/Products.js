/**
 * Объект создаёт new ISnew.Product на основе ajax запроса к json продуктов
 *
 * @class
 * @name ISnew.Products
 *
 * @example
 * var settings = {
 *   init_option: true,
 *   filtered: true,
 *   show_variants: true,
 *   file_url: fileUrl,
 *   options: {
 *     'Цвет': 'option-image',
 *     'Размер': 'option-span'
 *     }
 * }
 * var Products = new ISnew.Products(settings);
 *
 * @param {object} settings конфиг для рендера optionSelector
 *
 * @property {object} collection коллекция созданных экземпляров продукта
 */
ISnew.Products = function (settings) {
  var self = this;

  self._init(settings);
};

/**
 * Инициализация, запускает _addProduct(settings)
 *
 * @param {object} settings конфиг для рендера optionSelector
 *
 */
ISnew.Products.prototype._init = function (settings){
  var self = this;

  // объект для создаваемых продуктов
  self.collection = {}

  self._addProduct(settings)
}


/**
 * Добавление новых продуктов. Метод пробегает по формам и собирает их id в массив. После передает массив на _create(productsId, settings).
 *
 * @param {object} settings конфиг для рендера optionSelector
 */
ISnew.Products.prototype._addProduct = function (settings){
  var self = this;

  $(function () {
    var variantsCount = $('[data-product-id]').length - 1;
    var productsId = [];

    //  Проходим по всем формам и собираем id для создания новых продуктов
    $('[data-product-id]').each(function(index, el) {
       var thatProductId = $(el).data( 'product-id' );

       if (thatProductId) {
        productsId.push(thatProductId);
       }
       if (index === variantsCount) {
        self._create(productsId, settings);
       }
    });
  })
}

/**
 * Создание экземпляров продукта
 *
 * @param  {array} productsId массив id продуктов для ajax запроса
 * @param {object} settings конфиг для рендера optionSelector
 */
ISnew.Products.prototype._create = function(productsId, settings){
  var self = this;

  ISnew.json.getProductsList(productsId)
      .done(function (_newSelectors) {

        _.forEach(_newSelectors, function(_new_product) {
           self.collection[_new_product.id] = new ISnew.Product( _new_product , settings);
        });

      })
      .fail(function (response) {
        throw new ISnew.tools.Error('ErrorJson', 'ошибка при выполнени ajax запроса');
      });
}

/**
 * Обновление настроек продуктов созданных через new ISnew.Products();
 *
 * @param {object} settings конфиг для рендера optionSelector
 *
 *  * @example
 * var Products = new ISnew.Products();
 * var settings = {
 *   init_option: true,
 *   filtered: true,
 *   show_variants: true,
 *   file_url: fileUrl,
 *   options: {
 *     'Цвет': 'option-image',
 *     'Размер': 'option-span'
 *     }
 * }
 * Products.setConfig(settings);
 *
 */
ISnew.Products.prototype.setConfig = function (settings){
  var self = this;

  $.each(self.collection, function(index, product) {
     product.setConfig(settings);
  });
}