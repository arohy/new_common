/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');
/** @private */
var EventBus = require('../events/events');

/**
 * Класс отвечает за работу всех помпонентов товара
 * @class
 * @private
 */
var ProductInstance = function (_owner, $product) {
  var self = this;

  self.selectors = {
    //  селектор формы
    product: 'data-product-id',
    item: 'data-item-id',
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

  self.type = 'product';

  self.$product = $product;

  // прибиваем экземпляр к узлу
  $product[0].Product = self;

  self._init ();
};

/**
 * Инициализация связки
 * @private
 */
ProductInstance.prototype._init = function () {
  var self = this;

  // привязываем нужные объекты
  self.variants = new (require('./tree')) (self);
  self._initQuantity();
  self.price_kinds = new (require('./priceTypes')) (self);

  if (self.$product.data('item-id')) {
    self.type = 'item';
  }

  self._initOptionSelectors();
  self._bindUpdateCart();
};

/**
 * Инициализация селектора
 * @private
 */
ProductInstance.prototype._initOptionSelectors = function () {
  var self = this;
  var _isActive = _.isObject(self.optionSelector);

  self._hasSelector = self.$product.find('['+ self.selectors.nativeSelect +']').length ? true : false;

  if (!self._hasSelector) {
    return false;
  }

  if (!_isActive) {
    // У нас нет активных селекторов
    // заряжаем
    self.optionSelector = new (require('./optionSelector')) (self);
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
 * @private
 */
ProductInstance.prototype._initQuantity = function () {
  var self = this;
  var $quantity = self.$product.find('['+ self.selectors.quantity +']');

  $quantity.each(function (index) {
    self.quantity[index] = new (require('./quantity')) (self, this);
  });
};

/**
 * Получаем конкретный экземпляр.
 * @param {Object} $object
 *
 * @return {Object|boolean} Возвращет экземпляр, либо false
 */
ProductInstance.prototype.getInstance = function ($object) {
  var self = this;
  var instance;

  if (_.isObject($object[0].Product)) {
    instance = $object[0];
  } else {
    instance = $object.parents('['+ self.selectors.product +']:first')[0];
  }

  if (!instance) {
    instance = false;
  } else {
    instance = instance.Product
  }

  return instance;
};

/**
 * Обновление состояния
 * @todo Должна сама забирать всю информацию из компонентов и обновлять
 * максимум - получить линк на quantity, откуда брать актуальную инфу
 * о кол-ве
 *
 * @private
 */
ProductInstance.prototype._updateStatus = function (status) {
  var self = this;
  var _variant;
  var _quantity;
  var _atCart;
  var _$input;

  // если обновление вызвала смена варианта, то обновляем чиселку
  // и убиваем поток
  _$input = self.quantity[0];

  // если в верстке не указан контейнеры со счетчиками - отваливаемся
  if (_$input === undefined) {
    console.warn('Product: Quantity', 'Не указан блок "Количество товаров" для ', self.$product);
    return false;
  }

  if (status.event == 'update_variant') {
    _$input.setVariant(self.variants.getVariant());
    return false;
  };

  // немного магии
  if (self._hasSelector) {
    // если в инстансе есть селектор
    _variant = self.variants.getVariant();
    _quantity = _$input.get();
    _$input = _$input.$input;
  } else {
    // если у нас куча считалок
    _variant = status.instance.variant;
    _quantity = status.instance.get();
    _$input = status.instance.$input;
  }

  _atCart = Cart.order.getItemByID(_variant.id);

  if (_atCart && self.settings && self.type != 'item') {
    _quantity += _atCart.quantity;
  }

  // получаем тип цены
  var _price = self.price_kinds.getPrice({
    variantId: _variant.id,
    quantity: _quantity.current
  });

  // формируем действие
  _variant.action = {
    method: status.method,
    product: self.$product,
    price: _price,
    quantity: _quantity,
    quantityInput: _$input
  };

  EventBus.publish('before:insales:'+ self.type, _variant);

  if (status.event != 'update_variant') {
    EventBus.publish(status.event +':insales:'+ self.type, _variant);
  }

  EventBus.publish('update_variant:insales:'+ self.type, _variant);

  EventBus.publish('always:insales:'+ self.type, _variant);
};

/**
 * Слушатель на обновление корзины
 * @private
 */
ProductInstance.prototype._bindUpdateCart = function () {
  var self = this;

  EventBus.subscribe('update_items:insales:cart', function (data) {
    if (data.action.method != 'init') {
      _.forEach(self.quantity, function (quantity) {
        // Добавлен дебаунс для предотвращени
        _.debounce(quantity._update, 200);
      });
    }
  });
};

module.exports = ProductInstance;