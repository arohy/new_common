/*
 * Добавление товара в корзину
 */

ISnew.json.addCartItems = function(items) {
  var fields = {};
  var path = '/cart_items.json';

  $.each( items, function( variant_id, quantity ){
    fields[ 'variant_ids['+ variant_id +']' ] = quantity;
  });

  return $.post(path , fields);
}