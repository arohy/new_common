/**
 * Объект создаёт new ISnew.Product на основе ajax запроса к json продуктов
 *
 * @class
 * @name ISnew.Products
 *
 * @example
 * var settings = {
 *   initOption: true,
 *   filtered: true,
 *   showVariants: true,
 *   fileUrl: fileUrl,
 *   options: {
 *     'Цвет': 'option-image',
 *     'Размер': 'option-span'
 *   }
 * }
 * var Products = new ISnew.Products(settings);
 *
 * @param {object} settings конфиг для рендера optionSelector
 *
 * @property {object} _list коллекция созданных экземпляров продукта
 * @property {object} _settings текущие настройки для товаров
 */
ISnew.Products = function (settings) {
  var self = this;

  // объект для создаваемых продуктов
  self._list = {}
  self._settings = settings || {};

  self._init(settings);
};

/**
 * Инициализация, запускает _loadList(id)
 *
 */
ISnew.Products.prototype._init = function () {
  var self = this;

  // забираем ID-шники
  self._getID()
    .done(function (productsId) {
      // грузим инфу по товарам
      self._loadList(productsId);
    });
}

/**
 * Собираем id из DOM
 */
ISnew.Products.prototype._getID = function () {
  var self = this;

  var result = $.Deferred();
  var productsId = {};

  // пробегаем по формам и собирает их id в массив. После передаем массив в _load();
  $(function () {
    //  Проходим по всем формам и собираем id для создания новых продуктов
    $('[data-product-id]').each(function (index, el) {
      var id = _.toInteger($(el).data('product-id'));

      if (id) {
        productsId[id] = 0;
      }
    });

    result.resolve(_.keys(productsId));
  });

  // возвращаем результат
  return result.promise();
};

ISnew.Products.prototype._addProduct = function (product) {
  var self = this;

  self._list[product.id] = new ISnew.Product(product, self.settings);
};

/**
 * Создание экземпляров продукта
 *
 * @param  {array} productsId массив id продуктов для ajax запроса
 * @param {object} settings конфиг для рендера optionSelector
 */

ISnew.Products.prototype._loadList = function (productsId) {
  var self = this;

  ISnew.json.getProductsList(productsId)
    .done(function (_productsList) {
      _.forEach(_productsList, function (product) {
        self._addProduct(product);
      });
    })
    .fail(function (response) {
      throw new ISnew.tools.Error('ErrorJson', 'ошибка при выполнени ajax запроса');
    });
};

/**
 * Обновление настроек продуктов созданных через new ISnew.Products();
 *
 * @param {object} settings конфиг для рендера optionSelector
 *
 * @example
 * var settings = {
 *   initOption: true,
 *   filtered: true,
 *   showVariants: true,
 *   fileUrl: fileUrl,
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

  self.settings = settings;

  _.forEach(self._list, function(product) {
    product.settings.set(self.settings);
  });
}

/**
 * Получаем готовый к употреблению товар
 */
ISnew.Products.prototype.get = function (id) {
  var self = this;

  id = parseInt(id);

  var result = $.Deferred();
  var product = self._get(id);

  // Был такой товар в списке?
  // если да - resolve
  // иначе - добираем данные с сервера
  if (!_.isEmpty(product)) {
    result.resolve(product);
  } else {
    ISnew.json.getProduct(id)
      .done(function (product) {
        self._addProduct(product);
        result.resolve(self._get(id));
      });
  }

  return result.promise();
}

/**
 * Забираем нужный товар
 */
ISnew.Products.prototype._get = function (id) {
  var self = this;

  return self._list[parseInt(id)];
};