/**
 * Добавление товара в сравнение
 */

ISnew.json.getCompareItems = function (id) {
  var URL = new ISnew.tools.URL();
  var fields = {
    lang: URL.getKeyValue('lang')
  };

  return $.getJSON('/compares.json', fields);
};