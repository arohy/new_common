/**
 * Добавление товара в сравнение
 */

ISnew.json.addCompareItem = function (id) {
  var URL = new ISnew.tools.URL();
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};