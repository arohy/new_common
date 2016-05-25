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

  _.merge(self, self._default, settings);

  self._patch();
};

ISnew.ProductSettings.prototype._patch = function () {
  var self = this;

  _.forEach(self.options, function (templateId, option) {
    // Патчим шаблоны для рендера.
    // Если такой шаблон не подключен к системе - ставим дефолтный вариант
    if (!Template.has(templateId)) {
      self.options[option] = 'option-default';
    }
  });
};