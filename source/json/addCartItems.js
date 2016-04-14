/*
 * Добавление товара в корзину
 */

/**
 * Принимаем объект
 *
 * Внезапно, если это объект невалидного вида мы все равно получим ответ!!!
 */

ISnew.json.addCartItems = function (items, comments) {
  var fields = {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = quantity;
  });

  _.forIn(comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  return $.post('/cart_items.json', fields);
}