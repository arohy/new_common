/**
 * Класс для работы с валютой.
 */
ISnew.Money = function () {
  var self = this;
};

/**
 * Разбиралка настроек
 */
ISnew.Money.prototype._init = function (params) {
  var self = this;
  self.options = $.parseJSON(params);
  return;
};

ISnew.Money.prototype.set = function (params) {
  var self = this;
  self._init(params);
};

ISnew.Money.prototype.format = function (amount) {
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

  return self.options.format.replace('%n', value).replace('%n', self.options.unit);
};