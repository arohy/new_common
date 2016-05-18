/**
 * Создание новых продуктов
 */
ISnew.Products = function (settings) {
  var self = this;

  //получаем настройки
  /*
    //  можно поменять data атрибут формы
    product_id: 'data-product-id',

    //  false отключает вывод optionSelector
    show_variants: true,

    //  Задаём шаблоны для вывода опций
    options: {
      'Цвет': 'option-image'
    }
   */
  self.settings = Site.Setting.validate(settings);

  // объект для создаваемых продуктов
  self.products = {}

  self._init();
};

ISnew.Products.prototype._init = function (owner){
  var self = this;

  self.push()
}


/**
 * Добавление новых продуктов
 */
ISnew.Products.prototype.push = function (){
  var self = this;

  $(function () {
    var tempDataProductId = self.settings.product_id.split('data-');
    var dataProductId = tempDataProductId[1] || 'product-id';
    var variantsName = 'product-variants'
    var variantsSelector = $('[data-' + variantsName + ']');
    var variantsCount = $('[data-product-variants]').length - 1;
    var variantsId = [];

    variantsSelector.each(function(index, el) {
       var thisParents = $(el).parents('form:first');
       var thatProductId = thisParents.data( dataProductId );

       if (thatProductId) {
        variantsId.push(thatProductId);
       }
       if (index === variantsCount) {
        self._create(variantsId);
       }
    });
  })
}

/**
 * Инизиализация объекта Product
 */
ISnew.Products.prototype._create = function(variantsId){
  var self = this;

  ISnew.json.getProductsList(variantsId)
      .done(function (_newSelectors) {

        _.forEach(_newSelectors, function(_new_product) {
           self.products[_new_product.id] = new ISnew.Product( _new_product , self.settings);
        });

      })
      .fail(function (response) {
        throw new ISnew.tools.Error('ErrorJson', 'ошибка при выполнени ajax запроса');
      });
}
