/**
 * Класс для работы с полем кол-во товара
 */
ISnew.ProductQuantity = function (_owner, _quantityNode) {
  var self = this;

  // задаем базывае
  self._owner = _owner;
  self.settings = self._owner.settings;
  self.selectors = self._owner.selectors;
  self.variant = {};

  self.quantity = {
    current: 0,
    toCheck: 0,
    max: 10000000,
    min: 0
  };
  self.unit = 'pce';
  self.decimal = 0;

  // привязываем узел
  self.node = _quantityNode;
  self.$node = $(_quantityNode);
  // сохраняем линк на наше поле ввода
  self.$input = self.$node.find('input[name]');

  // привязываем экземпляр к узлу
  _quantityNode.Quantity = self;

  self._init();
};

/**
 * Инициализаций
 */
ISnew.ProductQuantity.prototype._init = function () {
  var self = this;
  var _settings;
  var _variant;

  // снимаем с конфиги
  _settings = self._getConfig();

  self.quantity.toCheck = self._getQuantity();

  // уточняем из товара единицу измерения
  self.unit = self._owner.product.unit;

  // определяем точность
  self.decimal = _.toInteger(self.settings.decimal[self.unit]) || 0;

  // определяем, с каким вариантом мы работаем
  if (_settings.variantId) {
    self.variant = self._owner.variants.getVariantById(_settings.variantId);
  } else {
    self.variant = self._owner.variants.getVariant();
  }

  // определяем максимум
  if (self.variant.quantity && self.settings.useMax) {
    self.quantity.max = self._fixValue(self.variant.quantity);
  }

  // шаг
  self.step = self._fixValue(_settings.step || Math.pow(10, -1 * self.decimal));
  // определяем минимальное кол-во
  self.quantity.min = self._fixValue(_settings.min || self.step);

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
  var _config = self.$node.data() || {};
  var _name = _.words(self.$input.attr('name'));
  var _variant;

  if (_name[0] == 'variant' || _name[0] == 'cart') {
    _config.variantId = _.toInteger(_name[2]);
  }

  return _config;
};

/**
 * Забираем текущее значение
 */
ISnew.ProductQuantity.prototype._getQuantity = function () {
  var self = this;

  var _value = self.$input.val();
  // TODO: исправить! у нас может быть форма без инпутов???
  _value = _value ? _value.replace(',', '.').replace(/[^0-9.]/g, '') : 1;

  return self._fixValue(_value);
};

/**
 * Указываем вариант, с которым работаем ???
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
  var _quantity = _.clone(self.quantity);
  _.unset(_quantity, 'toCheck');

  if (!self.settings.useMax) {
    _.unset(_quantity, 'max');
  }

  return _quantity;
};

/**
* Добавляем значение по клику на кнопку
*/
ISnew.ProductQuantity.prototype._changeQuantity = function (value) {
  var self = this;

  self.quantity.toCheck += self._fixValue(value);

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
  var _initState = _.clone(self.quantity);

  // если больше
  if (self.settings.max && self.quantity.toCheck > self.quantity.max) {
    self.quantity.toCheck = self.quantity.max;
  }

  // ушли меньше возможного минимума
  if (isNaN(self.quantity.toCheck) || self.quantity.toCheck < self.quantity.min) {
    self.quantity.toCheck = self.quantity.min;
  }

  self.quantityChanged = false;

  // после всех этих хитрых манипуляций у нас что-то изменилось?
  if (self.quantity.current !== self.quantity.toCheck) {
    self.quantity.current = self._fixValue(self.quantity.toCheck);
    self.quantityChanged = true;
  }
  // дергаем статусы
  self._update();
};

/**
 * Обновляем мир
 */
ISnew.ProductQuantity.prototype._update = function () {
  var self = this;

  if (self.quantityChanged) {
    self.$input.val(self.quantity.current);
  }

  setTimeout(function () {
    var eventName = self.quantityChanged ? 'change_quantity' : 'unchange_quantity';
    self._owner._updateStatus({
      'event': eventName,
      method: 'update',
      instance: self,
    });
  }, 0);
};

/**
 * Вытаскиваем эекземпляр класса
 */
ISnew.ProductQuantity.prototype._getInstance = function ($selector) {
  var self = this;
  var _instance = $selector.parents('['+ self.selectors.quantity+']')[0];

  if (_instance !== undefined) {
    _instance = _instance.Quantity
  } else {
    // если не нашли экземпляр - говорим, что продолбалось, отваливаемся
    console.warn('Product: Quantity', 'Не указан блок "Количество товаров" для', $selector);
    return false;
  }

  return _instance;
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
    var quantity = self._getInstance($quantityButton);

    quantity._changeQuantity($quantityButton.data('quantity-change'));
  });
};

/**
 * Слушаем поле.
 * Для простоты мы слушаем потерю фокуса
 */
ISnew.ProductQuantity.prototype._bindQuantityInput = function () {
  var self = this;

  $(document).on('blur input', '[data-quantity] input[name]', function (event) {
    event.preventDefault();

    var $input = $(this);
    var quantity = self._getInstance($input);

    quantity._setQuantity();
  });
};

ISnew.ProductQuantity.prototype._fixValue = function (_value) {
  var self = this;

  return _.chain(_value)
    .toFinite()
    .round(self.decimal)
    .value();
};