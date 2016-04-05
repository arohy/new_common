/*
 * Инициализация переменных
 */

if (!ISnew) {
  var ISnew = {};
}

if (!Site) {
  var Site = {};
}

if (!ISnew.json) {
  ISnew.json = {};
}
/*
 * Получение информации о товаре
 */

if (!ISnew.json) {
  ISnew.json = {}
};

ISnew.json.getProduct = function (id) {
  var path = '/product_by_id/'+ id +'.json';

  return $.getJSON(path);
}