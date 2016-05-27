/*
 * Инициализация объектов
 */
var Cart = new ISnew.Cart();
var Template = new ISnew.Template();
var Compare = new ISnew.Compare();
var AjaxSearch = new ISnew.Search();
var Products = new ISnew.Products();
var Shop = new ISnew.Shop();

Site.URL = new ISnew.tools.URL();
Site.Translit = new ISnew.tools.Translit();

// =======================================================================================
//                                      OptionSelector
// =======================================================================================

//  Слушаем изменения в селекторах модификаций
$(document).on('change click', '[data-option-bind]', function (event) {
  event.preventDefault();

  var $option = $(this);

  if ($option.is('select') && event.type === 'click') {
    return false;
  }

  var $formProduct = $option.parents('form[data-product-id]:first');
  var OptionSelector = $formProduct[0]['OptionSelector'];

  var option = {
    option_name_id: $option.data('option-bind'),
    position: $option.data('value-position')
  };

  if ($option.is('select')) {
    option.position = parseInt($option.val());
  }

  OptionSelector._owner.variants.setOption(option);
});