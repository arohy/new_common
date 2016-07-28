/** @private */
var _ = require('lodash');

/**
 * @memberof Shop
 * @class
 * @alias Shop.money
 *
 * @description
 * Класс для работы с валютой.
 */
var Money = function () {
  var self = this;

  self._init();
};

/**
 * Инициалиация
 * @method
 * @private
 *
 * @todo
 * Получить json для автоматического получения настроек, и сделать их автоматическое применение
 */
Money.prototype._init = function () {
  var self = this;

  return;
};

/**
 * Разбор настроек
 * @method
 * @private
 */
Money.prototype._set = function (params) {
  var self = this;

  self.options = JSON.parse(params);

  return;
};

/**
 * Вызов применения настроек
 * @method
 *
 * @param {Object} params - Объект с настройками валюты, в ликвид '{{ money_with_currency_format }}'
 */
Money.prototype.set = function (params) {
  var self = this;

  self._set(params);
};

/**
 * Форматирование входной строки к виду, согласно настройкам БО
 * @method
 *
 * @param {string|number} amount - строка или число, которое надо отформатировать в валюту
 *
 * @return {string} Строка, содержащая результат форматирования
 *
 * @example
 * Shop.money.format(1234.00);
 */
Money.prototype.format = function (amount) {
  var self = this;
  var value = amount;
  var patern = /(\d)(?=(\d\d\d)+(?!\d))/g;

  if (amount === null || amount === undefined) {
    return '';
  }

  value = value.toString().replace(',', '.');
  value = parseFloat(value).toFixed(2) || 0;
  value = value.toString().split('.');
  value[0] = value[0].replace(patern, '$1'+ self.options.delimiter);

  if (self.options.show_price_without_cents) {
    value = value[0];
  } else {
    value = value.join(self.options.separator);
  }

  value = self.options.format.replace('%n', value).replace('%u', self.options.unit);

  return value;
};

module.exports = Money;