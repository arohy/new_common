/**
 * Класс отвечает за взаимодействие верскти с конкретным
 * экземпляром Product()
 */

ISnew.ProductForm = function (_owner, form) {
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
  self.$form = $(form);
  self.quantity = 0;

  // прибиваем экземпляр к узлу
  form.product = self;

  self._init ();
};

/**
 * Инициализация связки
 */
ISnew.ProductForm.prototype._init = function () {
  var self = this;

  // клонируем и привязываем нужные объекты
  self.variants = _.cloneDeep(self._owner.variants);
  self.variants.setOwner(self);

  self.price_kinds = _.cloneDeep(self._owner.price_kinds);
  self.price_kinds.setOwner(self);

  self._initOptionSelectors(self);
  self._initQuantity(self);

  // Дергаем вариант
  if (self.product.settings.initOption) {
    self.variants._update();
  }
};

/**
 * Инициализация селектора
 */
ISnew.ProductForm.prototype._initOptionSelectors = function (product) {
  var self = this;

  var _isActive = _.isObject(product.optionSelector);

  if (!_isActive) {
    // У нас нет активных селекторов
    // заряжаем
    product.optionSelector = new ISnew.OptionSelector(product);
  } else {
    // данный селектор активен
    // наверное оти перезаписать настройки
    product.optionSelector._init();
  }
};

/**
 * Инициализация типа цен
 */
ISnew.ProductForm.prototype._initPriceType = function () {
  var self = this;
};

/**
 * Инициализация считалочки товаров
 */
ISnew.ProductForm.prototype._initQuantity = function (product) {
  var self = this;

  self.quantity = new ISnew.ProductQuantity(product);
};

/**
 * Обновление состояния
 */
ISnew.ProductForm.prototype._updateStatus = function (status) {
  var self = this;

  status.action.form = self.$form;
  console.log('ProductForm: ', status);
  // выбираем, что нужно обновить
  switch (status.action.method) {
    case 'update_variant':
      self.price_kinds.setVariant(status.id);
      self.quantity.setVariant(status);
      break;
    case 'change_quantity':
      self.price_kinds.setQuantity(status);
      break;
  }

  EventBus.publish(status.action.method +':insales:product', status);
};