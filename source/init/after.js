/*
 * Инициализация объектов
 */
var Cart = new ISnew.Cart();
var Template = new ISnew.Template();
var Compare = new ISnew.Compare();

Site.URL = new ISnew.tools.URL();
Site.Translit = new ISnew.tools.Translit();


//  Слушаем изменения в селекторах модификаций
$(document).on('change click', '[data-option-bind]', function (event) {
  event.preventDefault();

  var $select = $(this);

  if ($select.is('select')) {
    if (event.type === 'click') {
      return false;
    }
  }

  var $formProduct = $select.parents('form[data-product-id]:first');
  var OptionSelector = $formProduct[0]['OptionSelector'];

  var option = {
    option_name_id: $select.data('option-bind'),
    position: $select.data('value-position')
  };

  if ($select.is('select')) {
    option.position = parseInt($select.val());
  }

  OptionSelector._owner.variants.setOption(option);
});