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
ISnew.OptionSelector = function ($product, _product) {
  var self = this;

  self.selector = {
    //  селектор формы
    product: 'data-product-id',
    // data атрибут нативного селекта
    nativeSelect: 'data-product-variants',
    // data атрибут блока в который происходит рендер модификаций
    optionSelector: 'data-option-selector'
  };

  self._product = _product;
  self.$product = $product;

  self._init();
}

/**
 * Инициализация
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _product ссылка на родительский класс ISnew.Products
 *
 */
ISnew.OptionSelector.prototype._init = function () {
  var self = this;
  var product = self.$product[0];

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // делаем полноценный клон, привязывем к форме
  self.variants = _.cloneDeep(self._product.variants);
  self.variants.setDomNode(self);

  // находим там нативный селект/точку для рендера
  self.$nativeSelect = self.$product.find('['+ self.selector.nativeSelect +']');

  // если нативного селектора нет, выходим
  if (self.$nativeSelect.length == 0) {
    return;
  }

  // создаем контейнер и сохраняем линк на него
  // проверка на рендер, если уже отрендерили то не добавляем новую обёртку
  if (!_.isObject(product.optionSelector)) {
    self.$nativeSelect.after('<div class="option-selector" '+ self.selector.optionSelector +'/>');
    self.$optionSelector = self.$product.find('['+ self.selector.optionSelector +']');
  }

  // привязываем экземпляр Класса к товару
  product.optionSelector = self;


  //  вызов рендера и слушателя
  self._renderSelector();

  // Дергаем вариант
  if (self._product.settings.initOption) {
    self.variants._update();
  }

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  var variants = self.variants;
  var images = self._product._images;
  var settings = self._product.settings;

  // Если в настройках не отключили отображение селекторов
  if (settings.showVariants) {
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
 * Обновление состояния
 */
ISnew.OptionSelector.prototype._updateStatus = function (status) {
  var self = this;

  status.action = {
    form: self.$product
  };

  EventBus.publish('update_variant:insales:product', status);
};

/**
 * Навешиваем свой дефолтный слушатель для обновления рендера
 */
EventBus.subscribe('update_variant:insales:product', function (data) {
  var $product = data.action.form;
  var OptionSelector = $product[0]['optionSelector'];

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
  var $product = $select.parents('form[data-product-id]:first');
  var OptionSelector = $product[0]['optionSelector'];

  if (!_.isObject(OptionSelector)) {
    return;
  }

  OptionSelector.variants.setVariant(variantId);
});

//  Слушаем изменения в селекторах модификаций
$(document).on('change click', '[data-option-bind]', function (event) {
  event.preventDefault();

  var $option = $(this);

  if ($option.is('select') && event.type === 'click') {
    return false;
  }

  var $product = $option.parents('form[data-product-id]:first');
  var OptionSelector = $product[0]['optionSelector'];

  var option = {
    option_name_id: $option.data('option-bind'),
    position: $option.data('value-position')
  };

  if ($option.is('select')) {
    option.position = _.toInteger($option.val());
  }

  OptionSelector.variants.setOption(option);
});