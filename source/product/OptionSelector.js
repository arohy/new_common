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

  self.selector = {};

  self._owner = _owner;

  //  селектор формы
  self.selector['product'] = 'data-product-id';
  // data атрибут нативного селекта
  self.selector['native_select'] = 'data-product-variants';
  // data атрибут блока в который происходит рендер модификаций
  self.selector['option_selector'] = 'data-option-selector';

  //  Селекторы для _bindSelect
  //  селектор опции типа change
  self.selector['selector_change'] = '['+ self.selector.product +'="'+ _product.id +'"] [data-option-change]';
  //  селектор опции типа click
  self.selector['selector_click'] = '['+ self.selector.product +'="'+ _product.id +'"] [data-option-click] [data-selector-variant]';
  // селектор нативного селекта
  self.selector['selector_native'] = '['+ self.selector.product +'="'+ _product.id +'"] ['+ self.selector.native_select +']';



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

  var option_selector_length = self.$native_select.next('[' + self.selector.option_selector + ']').length;

  // создаем контейнер и сохраняем линк на него
  // проверка на рендер, если уже отрендерили то не добавляем новую обёртку
  if (option_selector_length === 0) {
    self.$native_select.after('<div class="option-selector" '+ self.selector.option_selector +'/>');
    self._owner.is_render = true;
  }

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

  var variants = self._owner.variants;
  var variants_options = variants.options;
  var optionsHTML = '';

  //  собираем данные которые пойдут в шаблон
  _.forEach(variants_options, function(value, i) {
    var _option = {}
    var _tempListOption = variants.listOption;

    _option.option = variants.getOption(i);
    _option.values = variants.getLevel(i);
    _option.images = variants.images;
    _option.file_url = self._owner.settings.file_url;
    _option.init_option = self._owner.settings.init_option;

    //  Вывод всех опций с фильтрацией по доступности
    var _tempFilter = self._filterOption(_option.values, _tempListOption)

    _option.options = _tempFilter[_option.option.id];

    optionsHTML += self._renderOption(_option);
  })

  self.$option_selector.html(optionsHTML);
};

/**
 * Фильтр опций
 */
ISnew.OptionSelector.prototype._filterOption = function (tempValues, tempOption) {
  var self = this;

  var _tempValues = _.cloneDeep(tempValues);
  var _tempFilter = _.cloneDeep(tempOption);

  _.forEach(_tempValues, function(_values, count) {

    _.forEach(_tempFilter, function(option_name, index) {

        if (!option_name[_values.id]) {
          return
        }
        if (option_name[_values.id].id == _values.id) {
          _tempFilter[index][_values.id].disabled = false;
          return ;
        }else{
          return ;
        }
      });
  });

  _.forEach(_tempFilter, function(_values) {
     _.forEach(_values, function(_option) {

      _option['name'] = _option.title.toLowerCase();

      if (typeof _option.disabled  === "undefined") {
        _option.disabled = true;
      }
     })
  })
  return _tempFilter;
}
/**
 * Рендер разметки
 */
ISnew.OptionSelector.prototype._renderOption = function (option) {
  var self = this;

  var optionHTML = '';
  var render_type = option.option.render_type;

  //  Если шаблонов нет или переданный рендер render_type некорректный
  if (Template.empty || !Template._templateList[render_type]) {
    optionHTML = Template.render(option, self._owner.settings.options['default']);
  }else{
    optionHTML = Template.render(option, render_type);
  }


  //  если не получили шаблон
  if (!render_type) {
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
  $(document).on('change', self.selector.selector_native, function (event) {

    var $select = $(this);
    var variantId = parseInt($(this).val());
    var $form = $select.parents('form:first');
    if ($form[0]) {
      var OptionSelector = $form[0]['OptionSelector'];
    }else{
      return
    }

    OptionSelector._owner.variants.setVariant(variantId);
  });

  //  ! не путать с нативным селектом
  //  Слушаем изменения в селекторах модификаций типа select
  $(document).on('change', self.selector.selector_change, function (event) {
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
  $(document).on('click', self.selector.selector_click, function (event) {
    event.preventDefault();

    var $span = $(this);
    var $spanParent = $(this).parents('[data-option-click]:first');
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

