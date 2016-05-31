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

  // прибиваем экземпляр к узлу
  form.product = self;

  self._init ();
};

/**
 * Инициализация связки
 */
ISnew.ProductForm.prototype._init = function () {
  var self = this;

  // привязываем нужные объекты
  self.variants = new ISnew.ProductVariants(self);
  self.price_kinds = new ISnew.ProductPriceType(self);
  self.quantity = new ISnew.ProductQuantity(self);

  self._initOptionSelectors(self);

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
 * Обновление состояния
 */
ISnew.ProductForm.prototype._updateStatus = function (status) {
  var self = this;

  status.action.form = self.$form;
  //console.log(status);

  // выбираем, что нужно обновить
  switch (status.action.method) {
    case 'update_variant':
      self.price_kinds.set({ variantId: status.id });
      self.quantity.setVariant(status);
      break;
    case 'change_quantity':
      self.price_kinds.set({ quantity: status.quantity.current });
      break;
  }

  EventBus.publish(status.action.method +':insales:product', status);
};