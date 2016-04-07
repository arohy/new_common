/*
 * Добавление товара в корзину
 */

/**
 * Принимаем объект
 *
 * Внезапно, если это объект невалидного вида мы все равно получим ответ!!!
 */

ISnew.json.addCartItems = function (items) {
  var fields = {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = quantity;
  });

  return $.post('/cart_items.json', fields);
}