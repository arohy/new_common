/*
 * Получение информации о товаре
 */

ISnew.json.getProduct = function (id) {
  var result = $.Deferred();

  $.getJSON('/product_by_id/'+ _.toInteger(id) +'.json', { format: 'json' })
    .done(function (response) {
      result.resolve(response.product);
    })
    .fail(function (response) {
      console.log('JSON: ошибка при получении данных от платформы', response);
      result.resolve({});
    });

  return result.promise();
};