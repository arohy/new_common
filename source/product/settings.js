/**
 * Класс для работы с настройками Продукта
 */
ISnew.ProductSettings = function (settings, _owner) {
  var self = this;

  self._default = {
    options: {
      default: 'option-default'
    },
    showVariants: true,
    initOption: true,
    fileUrl: {},
    filtered: true,

    quantity: 'int',
    max: false
  };

  self._owner = _owner;

  self._set(settings);
}

/**
 * Выставляем настройки, делаем немного магии
 */
ISnew.ProductSettings.prototype._set = function (settings) {
  var self = this;

  _.merge(self, self._default, settings);

  self._patch();
};

/**
 * всякие доп проверки
 */
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

/**
 * Жестко ставим настройки из-вне
 */
ISnew.ProductSettings.prototype.set = function (settings) {
  var self = this;

  self._set(settings);

  self._owner._init();
};