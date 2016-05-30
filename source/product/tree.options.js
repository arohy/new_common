// ====================================================================================
//                          Методы по работе с опциями
// ====================================================================================

/**
 * Подготовка опций
 *
 * @return {object} options модифицированный объект опций, добавляется renderType из параметров продукта, добавляется handle как название опции транслитом.
 */
ISnew.ProductVariants.prototype._initOptions = function () {
  var self = this;

  var options = self._owner.product.option_names;
  //  получаем параметры рендера опций
  var settingsOptions = self._owner.settings.options;

  if (options.length) {
    // все хорошо, у нас есть опции
    _.forEach(options, function(option, index) {
      // название опции транслитом
      option.handle = Site.Translit.replace(option.title);

      // Выставляем шаблон для опции, либо из настроек, либо дефолтный шаблон
      option.renderType = settingsOptions[option.title] || settingsOptions.default;

      // массив значений опции
      option.values = {};
    });
  } else {
    // всё плохо - у товара один вариант, свойств нет
    options[0] = {
      handle: '_empty',
      title: '_empty',
      values: {},
      renderType: settingsOptions.default,
      position: 0,
      id: 0
    };
  }

  return options;
}

/**
 * Собираем все значения опций варианта в опции по индексу (self.options[index].values)
 *
 * @param {object} value значение опции, прилетает из перебора всех вариантов. value добавляется в объект self.options[index].values.
 * @param {number} index порядковый номер опции.
 */
ISnew.ProductVariants.prototype._addValues = function (value, index) {
  var self = this;

  var optionValues = self.options[index].values;

  if (!optionValues[value.position]) {
    optionValues[value.position] = value;
    optionValues[value.position].name = optionValues[value.position].title.toLowerCase();
  }
}

/**
 * Устанавливаем selected
 *
 * @param  {object} options объект со всеми опциями (self.options)
 *
 * @return {object} options модифицированный self.options c новым свойством selected. option.selected содержит позицию выбранного значения.
 */

// TODO: у нас может быть ситуация, когда нет опций в товаре.
ISnew.ProductVariants.prototype._selectedOptions = function (options) {
  var self = this;
  var leaf = self.tree;

  _.forEach(options, function(option, index) {
    var first = self.getFirst(leaf);

    options[index].selected = first.position;
    leaf = first.tree;
  });

  return options;
};

/**
 * Устанавливаем опцию внешним обработчиком.
 * АХТУНГ!!! Влечет обновление актуального варианта!
 */
ISnew.ProductVariants.prototype.setOption = function (option) {
  var self = this;

  var index = _.findKey(self.options, function (_option) {
    return _option.id == option.option_name_id;
  });

  // Если не опцию не меняли - на выход
  if (self.options[index].selected == option.position & self._owner.settings.initOption) {
    return;
  }

  self.options[index].selected = option.position;

  /**
   * Проходим по выбранным опциям и фиксим неприавльно выбранные.
   * Неправильные - если при текущем варианте мы уходм в лес.
   */
  _.forEach(self.options, function (_option, index) {
    var isLeaf = _.get(self, self._getSelectedVector(index + 1));

    // Если мы не можем найти такую ветку - вытаскиваем строение уровня
    // и помечаем первое свойство как выбранное
    if (isLeaf === undefined) {
      var leaf = self.getLevel(index);
      var first = self.getFirst(leaf);

      _option.selected = first.position;
    }
  });

  if (! self._owner.settings.initOption) {
    self._owner.settings.initOption = true;
  }

  self._update();
  return;
};

/**
 * Получить опцию
 */
ISnew.ProductVariants.prototype.getOption = function (index) {
  var self = this;

  return self.options[index];
};

/**
 * Фильтрация опций по доступности в выбанном варианте
 *
 * @param  {number} level уровень опции в дереве (self.tree)
 * @return {object} option опция готовая для рендера, в значениях опции проставлен value.disabled или удалены не относящиеся к варианту значения в зависимости от настроек продукта (self._owner.settings.filtered);
 */
ISnew.ProductVariants.prototype.getFilterOption = function (level) {
  var self = this;

  var option = _.cloneDeep(self.getOption(level));
  var values = self.getLevel(level);

  _.forEach(option.values, function (value, index) {
    if (!values[value.position]) {
      //  если стоит фильтрация то ставим disabled, иначе удаляем ключ
      if (self._owner.settings.filtered) {
        value.disabled = true;
      }else{
        delete option.values[index];
      }
    }
  });

  return option;
};

/**
 * Установить опции по варианту
 */
ISnew.ProductVariants.prototype._setOptionByVariant = function (variant_id) {
  var self = this;

  var index = _.findKey(self.variants, function (variant) {
    return variant.id == variant_id;
  });

  if (self.variants[index]) {
    _.forEach(self.variants[index].option_values, function(option, option_index) {
      self.options[option_index].selected = option.position;
    });
  }
  return;
};

/**
 * генерим путь по выбранным опциям
 */
ISnew.ProductVariants.prototype._getSelectedVector = function (_length) {
  var self = this;
  var vector = '';
  _length = (_length || self.options.length) - 1;

  _.forEach(self.options, function(option, index) {
    vector += '.tree['+ (option.selected) +']';
    if (_length == index) {
      return false;
    }
  });

  return vector;
};