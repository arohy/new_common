/**
 * Объект отвечающий за работу опшн селектора
 *
 * @class
 * @name ISnew.OptionSelector
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _owner ссылка на родительский класс ISnew.Products
 *
 *
 * @property {object} selector в объекте хранятся названия селекторов
 * @property {object} $product опорный DOM-узел, который описывает товар
 * @property {object} $nativeSelect нативный селект который выводим через liquid
 * @property {object} $optionSelector контейнер куда происходит рендер селекторов опций
 *
 */
ISnew.OptionSelector = function (_owner) {
  var self = this;

  self._init(_owner);
}

/**
 * Инициализация
 *
 * @param {json} product json с информацией о товаре
 * @param {object} _owner ссылка на родительский класс ISnew.Products
 *
 */
ISnew.OptionSelector.prototype._init = function (_owner) {
  var self = this;

  self.selector = {
    //  селектор формы
    product: 'data-product-id',
    // data атрибут нативного селекта
    nativeSelect: 'data-product-variants',
    // data атрибут блока в который происходит рендер модификаций
    optionSelector: 'data-option-selector'
  };

  self._owner = _owner;

  // находим опорный DOM-узел, который описывает товар
  self.$product = $('['+ self.selector.product +'="'+ self._owner.product.id +'"]');

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // находим там нативный селект/точку для рендера
  self.$nativeSelect = self.$product.find('['+ self.selector.nativeSelect +']');

  // если нативного селектора нет, выходим
  if (self.$nativeSelect.length == 0) {
    return;
  }

  var optionSelector_length = self.$nativeSelect.next('[' + self.selector.optionSelector + ']').length;

  // создаем контейнер и сохраняем линк на него
  // проверка на рендер, если уже отрендерили то не добавляем новую обёртку
  if (optionSelector_length === 0) {
    self.$nativeSelect.after('<div class="option-selector" '+ self.selector.optionSelector +'/>');
    self._owner.isRender = true;
  }

  self.$optionSelector = self.$product.find('['+ self.selector.optionSelector +']');

  // привязываем экземпляр Класса к товару
  self.$product[0]['OptionSelector'] = self;

  self._bindSelect();

  //  вызов рендера и слушателя
  self._renderSelector();

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  var variants = self._owner.variants;
  var images = self._owner.images;

  // Если в настройках не отключили отображение селекторов
  if (self._owner.settings.showVariants) {
    //  собираем отрендеренные селекторы
    var optionsHTML = _.reduce(variants.options, function (html, value, index) {
      return html += self._renderOption({
        option: variants.getFilterOption(index),
        images: images,
        fileUrl: self._owner.settings.fileUrl,
        initOption: self._owner.settings.initOption
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
 * Биндинг селекторов
 */
ISnew.OptionSelector.prototype._bindSelect = function () {
  var self = this;

  //  подписываемся на обновление вариантов
  EventBus.subscribe('update_variant:insales:product', function (data) {
    var $product = $('['+ self.selector.product +'='+ data.product_id +']');
    var OptionSelector = $product[0]['OptionSelector'];

    if ( OptionSelector ) {
      OptionSelector.$nativeSelect.val(data.id);
      OptionSelector._renderSelector();
    }
  });
};

//  Слушаем изменения в нативном селекте
$(document).on('change', '[data-product-variants]', function (event) {
  event.preventDefault();
  var $select = $(this);

  var variantId = parseInt($(this).val());
  var $formProduct = $select.parents('form:first');
  if ($formProduct[0]) {
    var OptionSelector = $formProduct[0]['OptionSelector'];
  }else{
    return;
  }

  OptionSelector._owner.variants.setVariant(variantId);
});