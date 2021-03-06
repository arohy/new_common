/** @private */
var _ = require('lodash');

/** @private */
var URL = require('../tools/url');
/** @private */
var _Translit = require('../tools/translit');
/** @private */
var Translit = new _Translit();

/**
 * Конструктор объекта по работе с вариантами продукта
 * @class
 * @memberof ProductInstance
 * @alias variants
 *
 * @param  {object} _owner - родительский объект класса Product
 *
 * @private
 *
 * @example
 * self.variants = new ProductVariants(_owner);
 */
var ProductVariants = function (_owner) {
  var self = this;

  self._owner = _owner;
  self._variants = {};
  self.variants = self._owner.product.variants;
  self.urlVariant = URL.getKeyValue('variant_id');

  self._init()
};

/**
 * Инициализация объекта по работе с вариантами
 * @private
 */
ProductVariants.prototype._init = function () {
  var self = this;

  // создаем опции
  self.options = self._initOptions();
  // создаем дерево
  self.tree = self._initTree();
  // проставляем выбранные опции
  self.options = self._selectedOptions(self.options);
};

/**
 * Смена родителя
 * @private
 */
ProductVariants.prototype.setOwner = function (_owner) {
  var self = this;

  self._owner = _owner;

  return;
};

// ====================================================================================
//                          Методы по работе с деревом вариантов
// ====================================================================================

/**
 * Строим дерево вариантов
 * @private
 */
ProductVariants.prototype._initTree = function () {
  var self = this;
  var variants = self._owner.product.variants
  var tree = {};

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var leaf = tree;

    self._variants[variant.id] = variant;

    if (variant.option_values.length) {
      // все хорошо, у нас много опций
      // Разбираем опции
      self._parseVariantOptions(variant, leaf);
    } else {
      // все плохо, у нас один вариант, нет опций
      self._addLeaf({ id: 0, title: '_empty', position: 0 }, leaf, { id: variant.id, available: variant.available });
    }
  });

  _.forEach(tree, function (leaf) {
    self._nodeAvailable(leaf);
  });

  return tree;
};

// ====================================================================================
//                          Методы по работе с вариантом
// ====================================================================================

/**
 * Разбор Опций варианта
 * @private
 */
ProductVariants.prototype._parseVariantOptions = function (variant, leaf) {
  var self = this;

  _.forEach(variant.option_values, function(option, index) {
    // Добавляем новое значение в опцию
    self._addValues(option, index);

    var _variantSet = {
      id: undefined,
      available: undefined
    }

    // Если дошли до последней опции - выставляем вариант и доступность
    var _isLast = (index == (variant.option_values.length - 1));

    if (_isLast) {
      _variantSet = {
        id: variant.id,
        available: variant.available
      };
    }

    self._addLeaf(option, leaf, _variantSet);

    leaf = leaf[option.position].tree;
  });
};

/**
 * Добавляем узел дерева
 * @private
 */
ProductVariants.prototype._addLeaf = function (option, leaf, _variantSet) {
  var self = this;

  // Если такую опцию мы еще не вносили - вбиваем все, что есть.
  if (!leaf[_.toInteger(option.position)]) {
    leaf[_.toInteger(option.position)] = {
      id: _.toInteger(option.id),
      tree: {},
      title: option.title,
      name: option.title.toLowerCase(),
      variant_id: _variantSet.id,
      position: _.toInteger(option.position)
    };
  };

  // Выставляем доступность
  if (_variantSet.available !== undefined) {
    leaf[_.toInteger(option.position)].available = _variantSet.available;
  };

  return;
};

/**
 * Установка доступности вариантов
 *
 * Если все потомки узла недоступны - узел недоступен
 *
 * @private
 */
ProductVariants.prototype._nodeAvailable = function (leaf) {
  var self = this;

  if (leaf.variant_id === undefined) {
    var isAvailable = false;

    _.forEach(leaf.tree, function (child){
      if (self._nodeAvailable(child)) {
        isAvailable = true;
      };
    });

    leaf.available = isAvailable;
  };

  return leaf.available;
};

/**
 * Обновляем состояние вариантов
 * @private
 */
ProductVariants.prototype._update = function () {
  var self = this;

  self._owner._updateStatus({
    event: 'update_variant',
    method: 'change'
  });

  //  если есть id в урле обновляем вариант
  if (self.urlVariant) {
    self._setOptionByVariant(self.urlVariant);
    self.urlVariant = false;
  }

  return;
};

/**
 * Получить значения с уровня
 *
 * @param {number} level - номер уровня, откуда забираем значения
 */
ProductVariants.prototype.getLevel = function (level) {
  var self = this;
  var leaf = self.tree;

  _.forEach(self.options, function(option, option_level) {
    if (level == option_level) {
      return false;
    }
    leaf = leaf[option.selected].tree;
  });

  return leaf;
};

/**
 * Получить первый элемент на уровне
 * @param {Object|Array} leaf - список значений с одного уровня
 */
ProductVariants.prototype.getFirst = function (leaf) {
  var self = this;

  var first = _.chain(leaf)
    .toArray()
    .first()
    .value();

  return first;
};

/**
 * Получаем выбранный вариант
 */
ProductVariants.prototype.getVariant = function () {
  var self = this;
  var branch = _.get(self, self._getSelectedVector());
  var branchId = branch.variant_id;
  var id;

  //  если есть id в урле подменяем вариант
  if (self.urlVariant) {
    branchId = self.urlVariant;
  }

  id = _.findKey(self.variants, function(variant) {
    return variant.id == branchId;
  });

  //  если поиск по варианту из урла ничего не выдал
  if (!id) {
    id = _.findKey(self.variants, function(variant) {
      return variant.id == branch.variant_id;
    });
  }

  return self.variants[id];
};

/**
 * Получаем выбранный вариант
 * @param {number} _id - id варианта
 *
 * @return {Object} variant - объект, описывющий нужный вариант
 */
ProductVariants.prototype.getVariantById = function (_id) {
  var self = this;

  return self._variants[_id];
};

/**
 * Устанавливаем вариант
 * @param {number} variant_id - id варианта
 */
ProductVariants.prototype.setVariant = function (variant_id) {
  var self = this;
  var settings = self._owner.settings

  // TODO: пихнуть эту штуку в более актуальное место
  // нужна для принудительного выбора модификации
  if (!settings.initOption) {
    settings.initOption = true;
  }

  self._setOptionByVariant(variant_id);

  self._update();
  return;
};


// ====================================================================================
//                          Методы по работе с опциями
// ====================================================================================

/**
 * Подготовка опций
 *
 * @private
 *
 * @return {object} options модифицированный объект опций, добавляется renderType из параметров продукта, добавляется handle как название опции транслитом.
 */
ProductVariants.prototype._initOptions = function () {
  var self = this;

  var options = self._owner.product.option_names;
  //  получаем параметры рендера опций
  var settingsOptions = self._owner.settings.options;

  if (options.length) {
    // все хорошо, у нас есть опции
    _.forEach(options, function(option, index) {
      // название опции транслитом
      option.handle = Translit.replace(option.title);

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
 * @private
 *
 * @param {object} value значение опции, прилетает из перебора всех вариантов. value добавляется в объект self.options[index].values.
 * @param {number} index порядковый номер опции.
 */
ProductVariants.prototype._addValues = function (value, index) {
  var self = this;

  var optionValues = self.options[index].values;

  if (!optionValues[value.position]) {
    optionValues[value.position] = value;
    optionValues[value.position].name = optionValues[value.position].title.toLowerCase();
  }
}

/**
 * Устанавливаем selected
 * @private
 *
 * @param  {object} options объект со всеми опциями (self.options)
 *
 * @return {object} options модифицированный self.options c новым свойством selected. option.selected содержит позицию выбранного значения.
 */

// TODO: у нас может быть ситуация, когда нет опций в товаре.
ProductVariants.prototype._selectedOptions = function (options) {
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
 *
 * @private
 */
ProductVariants.prototype.setOption = function (option) {
  var self = this;

  var index = _.findKey(self.options, function (_option) {
    return _option.id == option.option_name_id;
  });

  // Если не опцию не меняли - на выход
  if (self.options[index].selected == option.position && self._owner.settings.initOption) {
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
 * @param {number} index - номер уровня
 */
ProductVariants.prototype.getOption = function (index) {
  var self = this;

  return self.options[index];
};

/**
 * Фильтрация опций по доступности в выбанном варианте
 *
 * @param  {number} level уровень опции в дереве (self.tree)
 *
 * @return {object} option опция готовая для рендера, в значениях опции проставлен value.disabled или удалены не относящиеся к варианту значения в зависимости от настроек продукта (self._owner.settings.filtered);
 */
ProductVariants.prototype.getFilterOption = function (level) {
  var self = this;

  var option = _.cloneDeep(self.getOption(level));
  var values = self.getLevel(level);

  _.forEach(option.values, function (value, index) {
    if (!values[value.position]) {
      //  если стоит фильтрация то ставим disabled, иначе удаляем ключ
      if (self._owner.settings.filtered) {
        value.disabled = true;
      }else{
        _.unset(option.values, value.position);
      }
    }
  });

  return option;
};

/**
 * Установить опции по варианту
 * @private
 */
ProductVariants.prototype._setOptionByVariant = function (variant_id) {
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
 * @private
 */
ProductVariants.prototype._getSelectedVector = function (_length) {
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

module.exports = ProductVariants;