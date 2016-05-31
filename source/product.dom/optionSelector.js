/**
 * Объект отвечающий за работу опшн селектора
 *
 * @class
 * @name ISnew.OptionSelector
 *
 * @param {jQuery Object} $product - ссылка на форму
 * @param {object} _product ссылка на родительский класс ISnew.Products
 *
 * @property {object} selector в объекте хранятся названия селекторов
 * @property {object} $product опорный DOM-узел, который описывает товар
 * @property {object} $nativeSelect нативный селект который выводим через liquid
 * @property {object} $optionSelector контейнер куда происходит рендер селекторов опций
 *
 */
ISnew.OptionSelector = function (_owner) {
  var self = this;

  self._owner = _owner;

  self.selectors = self._owner.selectors;
  self.$product = _owner.$form;

  self._init();
};

/**
 * Инициализация
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _product ссылка на родительский класс ISnew.Products
 *
 */
ISnew.OptionSelector.prototype._init = function () {
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

  self.$optionSelector = self.$product.find('['+ self.selectors.optionSelector +']');

  //  вызов рендера
  self._renderSelector();

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
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
 */
ISnew.OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var renderType = option.option.renderType;

  //  если не получили шаблон
  if (!renderType) {
    throw new ISnew.tools.Error('ErrorOptionSelector', 'ошибка в получении шаблона');
  }

  return Template.render(option, renderType);
};

/**
 * Навешиваем свой дефолтный слушатель для обновления рендера
 */
EventBus.subscribe('update_variant:insales:product', function (data) {
  var $product = data.action.form;
  var OptionSelector = $product[0].product.optionSelector;

  if (OptionSelector) {
    OptionSelector.$nativeSelect.val(data.id);
    OptionSelector._renderSelector();
  }
});

/**
 * Слушаем изменения в нативном селекте
 */
$(document).on('change', '[data-product-variants]', function (event) {
  event.preventDefault();
  var $select = $(this);

  var variantId = _.toInteger($select.val());
  var product = $select
    .parents('[data-product-id]:first')[0]
    .product;

  product.variants.setVariant(variantId);
});

//  Слушаем изменения в селекторах модификаций
$(document).on('change click', '[data-option-bind]', function (event) {
  event.preventDefault();

  var $option = $(this);

  if ($option.is('select') && event.type === 'click') {
    return false;
  }

  var product = $option
    .parents('[data-product-id]:first')[0]
    .product;

  var option = {
    option_name_id: $option.data('option-bind'),
    position: $option.data('value-position')
  };

  if ($option.is('select')) {
    option.position = _.toInteger($option.val());
  }

  product.variants.setOption(option);
});