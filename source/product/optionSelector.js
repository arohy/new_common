/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');

/** @private */
var Error = require('../tools/error');
/** @private */
var EventBus = require('../events/events');

/**
 * Объект отвечающий за работу опшн селектора
 *
 * @class
 * @memberof ProductInstance
 *
 * @param {Object} _owner
 * @private
 */
var OptionSelector = function (_owner) {
  var self = this;

  self._owner = _owner;

  self.selectors = self._owner.selectors;
  self.$product = _owner.$product;

  self._init();
};

/**
 * Инициализация
 * @private
 */
OptionSelector.prototype._init = function () {
  var self = this;
  var product = self._owner;

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // находим там нативный селект/точку для рендера
  self.$nativeSelect = self.$product.find('['+ self.selectors.nativeSelect +']');

  // если нативного селектора нет, выходим
  if (self.$nativeSelect.length == 0) {
    return;
  }

  var $optionSelector = self.$product.find('['+ self.selectors.optionSelector +']');

  // создаем контейнер и сохраняем линк на него
  if (!$optionSelector.length) {
    self.$nativeSelect.after('<div class="option-selector" '+ self.selectors.optionSelector +'/>');
  }

  self.$optionSelector = self.$product.find('['+ self.selectors.optionSelector +']').html('');

  self.$nativeSelect.hide();

  self._bindEvents();
  //  вызов рендера
  self._renderSelector();

  return;
};

/**
 * Основная обертка
 * @private
 */
OptionSelector.prototype._renderSelector = function () {
  var self = this;

  var variants = self._owner.variants;
  var images = self._owner.product._images;
  var settings = self._owner.product.settings;

  // Если в настройках не отключили отображение селекторов
  if (settings.showVariants && self.$optionSelector) {
    //  собираем отрендеренные селекторы
    var optionsHTML = _.reduce(variants.options, function (html, value, index) {
      return html += self._renderOption({
        option: variants.getFilterOption(index),
        images: images,
        fileUrl: settings.fileUrl,
        initOption: settings.initOption
      });
    }, '');

    self.$optionSelector.html(optionsHTML);
  }
};

/**
 * Рендер разметки
 * @private
 */
OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var renderType = option.option.renderType;

  //  если не получили шаблон
  if (!renderType) {
    throw new Error('ErrorOptionSelector', 'ошибка в получении шаблона');
  }

  return Template.render(option, renderType);
};

/**
 * Прибиваем события
 * @private
 */
OptionSelector.prototype._bindEvents = function () {
  var self = this;

  if (document._optionSelectors) {
    return false;
  }

  document._optionSelectors = true;

  self._bindSetVariant();
  self._bindOptionTriggers();
  self._bindEvents();
  self._bindUpdateVariant();
};

/**
 * Навешиваем свой дефолтный слушатель для обновления рендера
 * @private
 */
OptionSelector.prototype._bindUpdateVariant = function () {
  var self = this;

  EventBus.subscribe('update_variant:insales:product', function (data) {
    if (data.action.method == 'update') {
      var product = self._owner.getInstance(data.action.product);
      var OptionSelector;

      if (!product) {
        return false;
      }

      OptionSelector = product.optionSelector;

      if (OptionSelector) {
        OptionSelector.$nativeSelect.val(data.id);
        OptionSelector._renderSelector();
      }
    }
  });
};

/**
 * Слушаем изменения в нативном селекте
 * @private
 */
OptionSelector.prototype._bindSetVariant = function () {
  var self = this;

  $(document).on('change', '['+ self.selectors.nativeSelect +']', function (event) {
    event.preventDefault();
    var $select = $(this);

    var variantId = _.toInteger($select.val());
    var $product = $select
      .parents('[data-product-id]:first')[0];

    var product = self._owner.getInstance($select);
    if (!product) {
      return false;
    }

    product.variants.setVariant(variantId);
  });
};

/**
 * Слушаем изменения в селекторах модификаций
 * @private
 */
OptionSelector.prototype._bindOptionTriggers = function () {
  var self = this;

  $(document).on('change click', '[data-option-bind]', function (event) {
    event.preventDefault();

    var $option = $(this);
    var product = self._owner.getInstance($option);
    var option;

    if ($option.is('select') && event.type === 'click') {
      return false;
    }

    if (!product) {
      return false;
    }

    option = {
      option_name_id: $option.data('option-bind'),
      position: $option.data('value-position')
    };

    if ($option.is('select')) {
      option.position = _.toInteger($option.val());
    }

    product.variants.setOption(option);
  });
};

module.exports = OptionSelector;