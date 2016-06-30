/**
 * Добавление товара в сравнение
 */

ISnew.json.addCompareItem = function (id) {
  var URL = new ISnew.tools.URL();
  var fields = {
    'product[id]': _.toInteger(id),
    lang: URL.getKeyValue('lang')
  };

  return $.post('/compares.json', fields);
};