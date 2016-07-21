/** @private */
var $ = require('jquery');
/** @private */
var EventBus = require('../events/events');

/**
 * @class
 * @memberof Compare
 * @private
 *
 * @description
 * DOM + Compare
 */
var CompareDOM = function (_owner) {
  var self = this;
  self._owner = _owner;

  self._init();
}

/**
 * Инициализация
 * @method
 * @private
 */
CompareDOM.prototype._init = function () {
  var self = this;

  self.options = {
    /** @default */
    add: 'data-compare-add',
    /** @default */
    delete: 'data-compare-delete',

    /** @default */
    disabled: 'disabled',
    /** @default */
    inProcess: 'inProcess'
  };

  self._bindAddItem();
  self._bindDelteItem();
};

/**
 * Обработчик добавления
 * @method
 * @private
 *
 * @listens always:insales:compares
 */
CompareDOM.prototype._bindAddItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.add +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._addItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    var try_added = (data.method == 'add_item' || data.method == 'overload');
    if (data.button && try_added) {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика добавления товара в сравнение по кнопке
 * @method
 * @private
 *
 * @param {Object} $button - jQuery-нода кнопки
 */
CompareDOM.prototype._addItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.add))
  };

  self._owner.add(task);
  return;
};

/**
 * Обработчик удаления
 * @method
 * @private
 *
 * @listens always:insales:compares
 */
CompareDOM.prototype._bindDelteItem = function () {
  var self = this;

  $(document).on('click', '['+ self.options.delete +']', function (event) {
    event.preventDefault();
    var $button = $(this);

    if (!$button.prop(self.options.inProcess)) {
      $button.prop(self.options.inProcess, true);
      self._deleteItem($button);
    }
  });

  EventBus.subscribe('always:insales:compares', function (data) {
    if (data.button && data.method == 'remove_item') {
      data.button.prop(self.options.inProcess, false);
    }
  });
};

/**
 * Основаня логика удаления товара из сравнения по кнопке
 * @method
 * @private
 *
 * @param {Object} $button - jQuery-нода кнопки
 */
CompareDOM.prototype._deleteItem = function ($button) {
  var self = this;
  var task = {
    button: $button,
    item: parseInt($button.attr(self.options.delete))
  };

  self._owner.remove(task);
};

module.exports = CompareDOM;