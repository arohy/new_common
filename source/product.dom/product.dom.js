/**
 * Класс отвечает за взаимодействие верскти с конкретным
 * экземпляром Product()
 */

ISnew.ProductDOM = function (_owner) {
  var self = this;

  self._owner = _owner;

  self.selectors = {
    product: 'data-product-id',
  }

  self._init ();
};

/**
 * Инициализация связки
 */
ISnew.ProductDOM.prototype._init = function () {
  var self = this;

  $('['+ self.selectors.product +'='+ self._owner.id +']').each(function () {
    var $product = $(this);

    self._initOptionSelectors(this);
  });

  //self._bindSelectEvents();
};

/**
 * Инициализация селектора
 */
ISnew.ProductDOM.prototype._initOptionSelectors = function (product) {
  var self = this;

  var _isActive = _.isObject(product.optionSelector);

  if (!_isActive) {
    // У нас нет активных селекторов
    // заряжаем
    product.optionSelector = new ISnew.OptionSelector($(product), self._owner);
  } else {
    // данный селектор активен
    // наверное оти перезаписать настройки
    product.optionSelector._init($(product), self._owner);
  }
};

/**
 * Инициализация типа цен
 */
ISnew.ProductDOM.prototype._initPriceType = function () {
  var self = this;
};

/**
 * Инициализация считалочки товаров
 */
ISnew.ProductDOM.prototype._initQuantity = function () {
  var self = this;
};