/**
 * Класс отвечает за взаимодействие верскти с конкретным
 * экземпляром Product()
 */

ISnew.ProductForm = function (_owner, form) {
  var self = this;

  self.selectors = {
    product: 'data-product-id',
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

  self.variants = _.cloneDeep(self.product.variants);
  self.variants.setOwner(self);

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
    product.optionSelector._init($(product), self._owner);
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
ISnew.ProductForm.prototype._initQuantity = function () {
  var self = this;
};

/**
 * Обновление состояния
 */
ISnew.ProductForm.prototype._updateStatus = function (status) {
  var self = this;

  status.action.form = self.$form;

  EventBus.publish(status.action.method +':insales:product', status);
};