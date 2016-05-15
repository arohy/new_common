/**
 * Создание новых продуктов
 */
ISnew.Collection = function () {
  var self = this;

  // объект для создаваемых продуктов
  self.products = {}

  self._init(self);
};

ISnew.Collection.prototype._init = function (owner){
  var self = this;
  self._owner = owner;

  self.push()
}

/**
 * Добавление новых продуктов
 */
ISnew.Collection.prototype.push = function (){
  var self = this;

  $(function () {
    var variantsName = 'product-variants'
    var variantsSelector = $('[data-' + variantsName + ']');
    var variantsCount = $('[data-product-variants]').length - 1;
    var variantsId = [];

    variantsSelector.each(function(index, el) {
       var thisParents = $(el).parents('form:first');
       var thatProductId = thisParents.data('product-id');
       variantsId.push(thatProductId);

       if (index === variantsCount) {
        self._create(variantsId);
       }
    });
  })
}

/**
 * Инизиализация объекта Product
 */
ISnew.Collection.prototype._create = function(variantsId){
  var self = this;

  ISnew.json.getProductsList(variantsId)
      .done(function (_newSelectors) {

        _.forEach(_newSelectors, function(_new_product) {
           self.products[_new_product.id] = new ISnew.Product( _new_product );
        });

      })
      .fail(function (response) {
        throw new ISnew.tools.Error('ErrorJson', 'ошибка при выполнени ajax запроса');
      });
}
