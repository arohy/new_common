/**
 * Создание новых продуктов
 */
ISnew.Products = function (settings) {
  var self = this;

  self._init(settings);
};

ISnew.Products.prototype._init = function (settings){
  var self = this;

  // объект для создаваемых продуктов
  self.collection = {}

  self._addProduct(settings)
}


/**
 * Добавление новых продуктов
 */
ISnew.Products.prototype._addProduct = function (settings){
  var self = this;

  $(function () {
    var variantsCount = $('[data-product-id]').length - 1;
    var variantsId = [];

    //  Проходим по всем формам и собираем id для создания новых продуктов
    $('[data-product-id]').each(function(index, el) {
       var thatProductId = $(el).data( 'product-id' );

       if (thatProductId) {
        variantsId.push(thatProductId);
       }
       if (index === variantsCount) {
        self._create(variantsId, settings);
       }
    });
  })
}

/**
 * Инизиализация объекта Product
 */
ISnew.Products.prototype._create = function(variantsId, settings){
  var self = this;

  ISnew.json.getProductsList(variantsId)
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
 * Обновление настроек
 */
ISnew.Products.prototype.setConfig = function (settings){
  var self = this;

  $.each(self.collection, function(index, product) {
     product.setConfig(settings);
  });
}