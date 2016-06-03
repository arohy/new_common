/**
 * Класс отвечает за взаимодействие верскти с конкретным
 * экземпляром Product()
 */
ISnew.ProductInstance = function (_owner, $product) {
  var self = this;

  self.selectors = {
    //  селектор формы
    product: 'data-product-id',
    // data атрибут нативного селекта
    nativeSelect: 'data-product-variants',
    // data атрибут блока в который происходит рендер модификаций
    optionSelector: 'data-option-selector',

    quantity: 'data-quantity',
    quantityButton: 'data-quantity-change'
  }

  // настройки для экземпляра
  self._owner = _owner;

  self.settings = self._owner.settings;
  self.product = self._owner;
  self.quantity = {};

  self.$product = $product;

  // прибиваем экземпляр к узлу
  $product[0].Product = self;

  self._init ();
};

/**
 * Инициализация связки
 */
ISnew.ProductInstance.prototype._init = function () {
  var self = this;

  // привязываем нужные объекты
  self.variants = new ISnew.ProductVariants(self);
  self._initQuantity();
  self.price_kinds = new ISnew.ProductPriceType(self);

  self._initOptionSelectors();
};

/**
 * Инициализация селектора
 */
ISnew.ProductInstance.prototype._initOptionSelectors = function () {
  var self = this;
  var _isActive = _.isObject(self.optionSelector);

  self._hasSelector = self.$product.find('['+ self.selectors.nativeSelect +']').length;

  if (!self._hasSelector) {
    return false;
  }

  if (!_isActive) {
    // У нас нет активных селекторов
    // заряжаем
    self.optionSelector = new ISnew.OptionSelector(self);
  } else {
    // данный селектор активен
    // наверное оти перезаписать настройки
    self.optionSelector._init();
  }

  // Дергаем вариант
  if (self.product.settings.initOption) {
    self.variants._update();
  }
};

/**
 * Инициализация счетчиков
 */
ISnew.ProductInstance.prototype._initQuantity = function () {
  var self = this;
  var $quantity = self.$product.find('['+ self.selectors.quantity +']');

  $quantity.each(function (index) {
    self.quantity[index] = new ISnew.ProductQuantity(self, this);
  });
};

/**
 * Обновление состояния
 * Должна сама забирать всю информацию из компонентов и обновлять
 * максимум - получить линк на quantity, откуда брать актуальную инфу
 * о кол-ве
 */
ISnew.ProductInstance.prototype._updateStatus = function (status) {
  var self = this;
  var _variant;
  var _quantity;
  var _$input;

  // если обновление вызвала смена варианта, то обновляем чиселку
  // и убиваем поток
  if (status.event == 'update_variant') {
    self.quantity[0].setVariant(self.variants.getVariant());
    return false;
  };

  // немного магии
  if (self._hasSelector) {
    // если в инстансе есть селектор
    _variant = self.variants.getVariant();
    _quantity = self.quantity[0].get();
    _$input = self.quantity[0].$input;
  } else {
    // если у нас куча считалок
    _variant = status.instance.variant;
    _quantity = status.instance.get();
    _$input = status.instance.$input;
  }

  // получаем тип цены
  var _price = self.price_kinds.getPrice({
    variantId: _variant.id,
    quantity: _quantity
  });

  // формируем действие
  _variant.action = {
    method: status.method,
    product: self.$product,
    price: _price,
    quantity: _quantity,
    quantityInput: _$input
  };

  if (status.event != 'update_variant') {
    EventBus.publish(status.event +':insales:product', _variant);
  }

  EventBus.publish('update_variant:insales:product', _variant);
};