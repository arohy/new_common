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

testAdd = function(items) {
  ISnew.json.addCartItems(items)
    .done(function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    })
}