/**
 * OptionSelector
 */
ISnew.OptionSelector = function (product, _owner) {
  var self = this;

  self._init(product, _owner);
  self._renderSelector();

  self._bindSelect();
}

/**
 * Настройки
 */
ISnew.OptionSelector.prototype._init = function (_product, _owner) {
  var self = this;

  self.selector = {
    product: 'data-product-id',
    native_select: 'data-product-variants',

    option_selector: 'data-option-selector',
    option: 'data-product-option'
  };

  self._owner = _owner;

  // находим опорный DOM-узел, который описывает товар
  self.$product = $('['+ self.selector.product +'="'+ _product.id +'"]');

  // находим там нативный селектор/точку для рендера
  self.$native_select = self.$product.find('['+ self.selector.native_select +']');

  // создаем контейнер и сохраняем линк на него
  self.$native_select.after('<div class="option-selector" '+ self.selector.option_selector +'/>');
  self.$option_selector = self.$product.find('['+ self.selector.option_selector +']');

  // привязываем экземпляр Класса к товару
  self.$product[0]['OptionSelector'] = self;
  return;
};

/**
 * Основная обертка
 */
ISnew.OptionSelector.prototype._renderSelector = function () {
  var self = this;

  var variants = self._owner.variants;
  var deep = variants.options.length;

  var optionsHTML = '';

  for(var i = 0; i < deep; i++) {
    optionsHTML += self._renderOption({
      option: variants.getOption(i),
      values: variants.getLevel(i)
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

  //console.log(option);

  optionHTML = Template.render(option,'option-select');

  return optionHTML;
};

ISnew.OptionSelector.prototype._bindSelect = function () {
  var self = this;

  $(document).on('click change', '[data-option-select]', function (event) {
    event.preventDefault();

    var $select = $(this);
    var $product = $select.parents('['+ self.selector.product +']:first');
    var OptionSelector = $product[0]['OptionSelector'];

    var option = {
      option_name_id: $select.data('option_name_id'),
      position: $select.data('position-id')
    };

    if ($select.is('select')) {
      option.position = parseInt($select.val());
    }

    OptionSelector._owner.variants.setOption(option);
  });

  EventBus.subscribe('update_variant:insales:product', function (data) {
    var $product = $('['+ self.selector.product +'='+ data.product_id +']');
    var OptionSelector = $product[0]['OptionSelector'];

    OptionSelector.$native_select.val(data.id);
    OptionSelector._renderSelector();
  });
};