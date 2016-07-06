/**
 * Класс для работы с настройками Продукта
 */
var _ = require('lodash');

module.exports = ProductSettings = function (settings, _owner) {
  var self = this;

  self._default = {
    options: {
      default: 'option-default'
    },
    showVariants: true,
    initOption: true,
    fileUrl: {},
    filtered: true,

    useMax: false,
    decimal: {
      kgm: 1,
      dmt: 1
    },
    withCart: false
  };

  self._owner = _owner;

  self._set(settings);
}

/**
 * Выставляем настройки, делаем немного магии
 */
ProductSettings.prototype._set = function (settings) {
  var self = this;

  _.merge(self, self._default, settings);

  self._patch();
};

/**
 * всякие доп проверки
 */
ProductSettings.prototype._patch = function () {
  var self = this;

  _.forEach(self.options, function (templateId, option) {
    // Патчим шаблоны для рендера.
    // Если такой шаблон не подключен к системе - ставим дефолтный вариант
    if (!Template.has(templateId)) {
      self.options[option] = 'option-default';
    }
  });
};

/**
 * Жестко ставим настройки из-вне
 */
ProductSettings.prototype.set = function (settings) {
  var self = this;

  self._set(settings);

  self._owner._init();
};
