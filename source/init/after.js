/*
 * Инициализация объектов
 */
var Cart = new ISnew.Cart();
var Template = new ISnew.Template();
var Compare = new ISnew.Compare();
var AjaxSearch = new ISnew.Search();

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

// =======================================================================================
//                                      AJAX SEARCH
// =======================================================================================

$(function() {
  AjaxSearch.setConfig({
    data: {
      account_id: Site.account.id,
      locale: Site.language.locale,
      fields: [ 'price_min', 'price_min_available' ],
      hide_items_out_of_stock: Site.account.hide_items
    }
  });

  EventBus.subscribe('update_suggestions:insales:search', function( data ){
    //  срабатывает на события внутри формы
    if (data.action.input) {
      var $input = $(data.action.input);
      var $form_suggestions = $input.parents('form:first')

      $form_suggestions
        .find('[data-search-result]')
          .html(Template.render(data, AjaxSearch.options.template));
    } else {
      //  срабатывает на события вне формы
      $('[data-search-result]')
        .html(Template.render(data, AjaxSearch.options.template));
    }
  });
});