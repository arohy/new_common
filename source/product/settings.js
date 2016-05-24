/**
 * Класс для работы с настройками Продукта
 */
ISnew.ProductSettings = function (settings) {
  var self = this;

  self._default = {
    options: {
      default: 'option-default'
    },
    showVariants: true,
    initOption: true,
    fileUrl: {},
    filtered: true
  }

  self.set(settings);
}

ISnew.ProductSettings.prototype.set = function (settings) {
  var self = this;

  _.assign(self, self._default, settings);
};