/**
 * OptionSelector
 */
ISnew.OptionSelector = function (product, _owner) {
  var self = this;

  self._init(product, _owner);
}

/**
 * Настройки
 */
ISnew.OptionSelector.prototype._init = function (_product, _owner) {
  var self = this;

  self.selector = {
    //  селектор опции типа select
    selector_select: '[data-product-id="'+ _product.id +'"] [data-option-select]',
    //  селектор опции типа span
    selector_span: '[data-product-id="'+ _product.id +'"] [data-option-span] [data-selector-variant]',
    //  селектор формы
    product: 'data-product-id',
    // селектор нативного селекта
    native_select: 'data-product-variants',
    // селектор блока в который происходит рендер модификаций
    option_selector: 'data-option-selector'
  };

  self._owner = _owner;

  // находим опорный DOM-узел, который описывает товар
  self.$product = $('['+ self.selector.product +'="'+ _product.id +'"]');

  // если DOM-узла нет, выходим
  if (self.$product.length == 0) {
    return;
  }

  // находим там нативный селектор/точку для рендера
  self.$native_select = self.$product.find('['+ self.selector.native_select +']');

  // если нативного селектора нет, выходим
  if (self.$native_select.length == 0) {
    return;
  }

  // создаем контейнер и сохраняем линк на него
  self.$native_select.after('<div class="option-selector" '+ self.selector.option_selector +'/>');
  self.$option_selector = self.$product.find('['+ self.selector.option_selector +']');

  // привязываем экземпляр Класса к товару
  self.$product[0]['OptionSelector'] = self;

  //  вызов рендера и слушателя
  self._renderSelector();

  self._bindSelect();

  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  //  Пока не собрали инфу о шаблонах, лочим рендер и через таймаут перезапускаем метод
  if (Template._lock) {
    setTimeout(function(){
      self._renderSelector();
    }, 300)
  }

  var variants = self._owner.variants;
  var deep = variants.options.length;

  var optionsHTML = '';

  //  собираем данные которые пойдут в шаблон
  for(var i = 0; i < deep; i++) {
    optionsHTML += self._renderOption({
      option: variants.getOption(i),
      values: variants.getLevel(i),
      images: variants.images
    });
  }

  self.$option_selector.html(optionsHTML);
};

/**
 * Рендер разметки
 */
ISnew.OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var optionHTML = '';
  var render_type = option.option.render_type;

  optionHTML = Template.render(option, render_type);

  //  если не получили шаблон
  if (optionHTML === false) {
    throw new ISnew.tools.Error('ErrorOptionSelector', 'ошибка в получении шаблона');
  }

  return optionHTML;
};

/**
 * Биндинг селекторов
 */
ISnew.OptionSelector.prototype._bindSelect = function () {
  var self = this;

  //  Слушаем изменения в нативном селекте
  $(document).on('change', '['+ self.selector.native_select +']', function (event) {
    event.preventDefault();

    var $select = $(this);
    var variantId = parseInt($(this).val());
    var OptionSelector = self.$product[0]['OptionSelector'];

    OptionSelector._owner.variants.setVariant(variantId);
  });

  //  Слушаем изменения в селекторах модификаций типа select
  $(document).on('change', self.selector.selector_select, function (event) {
    event.preventDefault();

    var $select = $(this);
    var OptionSelector = self.$product[0]['OptionSelector'];


    var option = {
      option_name_id: $select.data('option_name_id'),
      position: $select.data('position-id')
    };

    if ($select.is('select')) {
      option.position = parseInt($select.val());
    }

    OptionSelector._owner.variants.setOption(option);
  });

  //  Слушаем изменения в селекторах модификаций типа span
  $(document).on('click', self.selector.selector_span, function (event) {
    event.preventDefault();

    var $span = $(this);
    var $spanParent = $(this).parents('[data-option-span]:first');
    var positionId = $span.data('value-position');
    var optionNameId = $spanParent.data('option_name_id');
    var OptionSelector = self.$product[0]['OptionSelector'];


    var option = {
      option_name_id: optionNameId,
      position: parseInt(positionId)
    };

    OptionSelector._owner.variants.setOption(option);
  });

  //  подписываемся на обновление вариантов
  EventBus.subscribe('update_variant:insales:product', function (data) {
    var $product = $('['+ self.selector.product +'='+ data.product_id +']');
    var OptionSelector = $product[0]['OptionSelector'];

    if ( OptionSelector ) {
      OptionSelector.$native_select.val(data.id);
      OptionSelector._renderSelector();
    }
  });
};

