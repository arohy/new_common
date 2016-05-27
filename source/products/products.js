/**
 * Централизованная работа с товарами
 */
ISnew.Products = function () {
  var self = this;

  // настройки
  self._settings = {};
  // объект с готовыми к употреблению товарами
  self._products = {};

  // массив с актуальными id (которые есть на странице +-)
  self._storage = new ISnew.ProductsStorage(self);

  self._init();
};

/**
 * Инициализация
 */
ISnew.Products.prototype._init = function () {
  var self = this;

  self._getDomId()
    .done(function (idList) {
      self._getList(idList);
    });
};

/**
 * Получаем готовый к употреблению товар
 */
ISnew.Products.prototype.get = function (id) {
  var self = this;

  id = _.toInteger(id);

  return self._getOne(id);
};

/**
 * Получение списка товаров
 */
ISnew.Products.prototype.getList = function (idList) {
  var self = this;

  idList = _.toArray(idList);

  return self._getList(idList);
};

/**
 * Обновление настроек продуктов созданных через
 */
ISnew.Products.prototype.setConfig = function (settings){
  var self = this;

  self._settings = settings;

  _.forEach(self._products, function (product) {
    product.settings.set(self._settings);
  });
};

/**
 * Получение списка из id из DOM
 */
ISnew.Products.prototype._getDomId = function () {
  var self = this;
  var result = $.Deferred();
  var _idList = [];

  $(function () {
    $('[data-product-id]').each(function (index, form) {
      var id = _.toInteger($(form).data('product-id'));

      _idList.push(id);
    });

    //console.log('Products: _getDomId: ', _.size(_idList), _idList);
    result.resolve(_.uniq(_idList));
  });

  return result.promise();
};

/**
 * Получение списка товаров
 */
ISnew.Products.prototype._getList = function (_idList) {
  var self = this;
  var result = $.Deferred();

  // проверить все ли товары инициализированны?
  var diffId = _.difference(_idList, self._actualId);
  /*
  console.log('Products: _getList: _idList', _idList);
  console.log('Products: _getList: diffId', diffId);
  */

  if (diffId.length) {
    // чего-то нет
    // Забираем из харнилища
    self._storage.getProducts(diffId)
      .done(function (products) {
        // инитим товары
        _.forEach(products, function (product) {
          self._initProduct(product);
        });

        // отдаем результат
        result.resolve(_.pick(self._products, _idList));
      });
  } else {
    // всё есть - отдаем
    result.resolve(_.pick(self._products, _idList));
  }

  return result.promise();
};

/**
 * Получение информации о товаре
 */
ISnew.Products.prototype._getOne = function (_id) {
  var self = this;
  var result = $.Deferred();

  // а по сути нужно сделать все тоже, что и в
  // _getList, но забрать первый элемент
  self._getList([_id])
    .done(function (products) {
      products = _.toArray(products);
      result.resolve(products[0]);
    });

  return result.promise();
};

/**
 *
 */
ISnew.Products.prototype._initProduct = function (_productJSON) {
  var self = this;

  self._products[_productJSON.id] = new ISnew.Product(_productJSON, self._settings);
};