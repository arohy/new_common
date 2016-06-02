/**
 * Класс для работы с полем кол-во товара
 */
ISnew.ProductQuantity = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.settings = _owner.settings;
  self.selectors = self._owner.selectors;
  self.variant = self._owner.variants.getVariant();

  self.quantity = {
    current: 0,
    toCheck: 0,
    max: 10000000,
    min: 0
  };

  self.unit = 'pce';
  self.decimal = 0;

  self._onInit = true;

  self._init();
};

/**
 * Инициализаций
 */
ISnew.ProductQuantity.prototype._init = function () {
  var self = this;
  var _settings;

  // находим опорный элемент
  self.$input = self._owner.$form.find('['+ self.selectors.quantity +']');

  // снимаем с него конфиги
  _settings = self._getConfig();

  self.quantity.toCheck = self._getQuantity();

  // уточняем из товара единицу измерения
  self.unit = self._owner.product.unit;

  // определяем максимум
  if (self.variant.quantity && self.settings.max) {
    self.quantity.max = self.variant.quantity;
  }

  // определяем точность
  self.decimal = self.settings.decimal[self.unit] || 0;
  // шаг
  self.step = _settings.step || Math.pow(10, -1 * self.decimal);
  // определяем минимальное кол-во
  self.quantity.min = _settings.min || self.step;

  self._check();

  self._bindEvents();
};

/**
 * Забираем data- из поля ввода
 * data-quantity - '' или id variant
 * data-step - шаг
 * data-min - минимальное
 */
ISnew.ProductQuantity.prototype._getConfig = function () {
  var self = this;

  return self.$input.data() || {};
};

/**
 * Забираем текущее значение
 */
ISnew.ProductQuantity.prototype._getQuantity = function () {
  var self = this;

  var _value = self.$input.val();
  // TODO: исправить! у нас может быть форма без инпутов???
  _value = _value ? _value.replace(',', '.').replace(/[^0-9.]/g, '') : 1;

  return parseFloat(_value);
};

/**
 * Указываем вариант, с которым работаем
 */
ISnew.ProductQuantity.prototype.setVariant = function (variant) {
  var self = this;

  self.variant = variant;
  self._check();
};

/**
 *
 */
ISnew.ProductQuantity.prototype.get = function () {
  var self = this;

  return self.quantity.current;
};

/**
* Добавляем значение по клику на кнопку
*/
ISnew.ProductQuantity.prototype._changeQuantity = function (value) {
  var self = this;

  self.quantity.toCheck += parseFloat(value);

  self._check();
};

/**
 * Устанвливаем новое значение при изменении поля
 */
ISnew.ProductQuantity.prototype._setQuantity = function () {
  var self = this;

  self.quantity.toCheck = self._getQuantity();

  self._check();
};

/**
 * Проверка
 */
ISnew.ProductQuantity.prototype._check = function () {
  var self = this;

  // если больше
  if (self.settings.max && self.quantity.toCheck > self.quantity.max) {
    self.quantity.toCheck = self.quantity.max;
  }

  // ушли меньше возможного минимума
  if (isNaN(self.quantity.toCheck) || self.quantity.toCheck < self.quantity.min) {
    self.quantity.toCheck = self.quantity.min;
  }

  // все ок
  self.quantity.current = self.quantity.toCheck;
  // дергаем статусы
  self._update();
};

/**
 * Обновляем мир
 */
ISnew.ProductQuantity.prototype._update = function () {
  var self = this;

  if (self._onInit) {
    self._onInit = false;
    return false;
  }

  self._owner._updateStatus('change_quantity');
};

/**
 * Биндим события
 */
ISnew.ProductQuantity.prototype._bindEvents = function () {
  var self = this;

  // очередной костыль в мой гроб
  if (document.ProductQuantity) {
    return false;
  };

  self._bindQuantityButtons();
  self._bindQuantityInput();

  document.ProductQuantity = true;
};

/**
 * Слушаем нажатия на кнопки +-
 */
ISnew.ProductQuantity.prototype._bindQuantityButtons = function () {
  var self = this;

  $(document).on('click', '['+ self.selectors.quantityButton +']', function (event) {
    event.preventDefault();

    var $quantityButton = $(this);
    var product = $quantityButton.parents('['+ self.selectors.product+']')[0].product;

    product.quantity._changeQuantity($quantityButton.data('quantity-change'));
  });
};

/**
 * Слушаем поле.
 * Для простоты мы слушаем потерю фокуса
 */
ISnew.ProductQuantity.prototype._bindQuantityInput = function () {
  var self = this;

  $(document).on('blur', '[data-quantity]', function (event) {
    event.preventDefault();

    var $quantity = $(this);
    var product = $quantity.parents('[data-product-id]:first')[0].product;

    if (product) {
      product.quantity._setQuantity();
    }
  });
};