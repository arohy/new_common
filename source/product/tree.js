/**
 * Конструктор объета по работе с вариантами продукта
 * @class
 * @name ISnew.ProductVariants
 *
 * @example
 * self.variants = new ISnew.ProductVariants(_owner);
 *
 * @param  {object} _owner родительский объект класса Product
 *
 * @property {array} variants массив модификаций продукта
 * @property {object} images картики продукта в виде {'title': {small_url: 'http//'}}
 * @property {number} urlVariant id варианта из урла
 * @property {object} options все опции продукта со всеми своими значениями
 * @property {object} tree дерево вариантов
 *
 */
ISnew.ProductVariants = function (_owner) {
  var self = this;

  self._owner = _owner;
  self.variants = self._owner.product.variants;
  self.urlVariant = Site.URL.getKeyValue('variant_id');

  self._init()
};

/**
 * Инициализация объекта по работе с вариантами
 */
ISnew.ProductVariants.prototype._init = function () {
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
 */
ISnew.ProductVariants.prototype.setOwner = function (_owner) {
  var self = this;

  self._owner = _owner;

  return;
};

// ====================================================================================
//                          Методы по работе с деревом вариантов
// ====================================================================================

/**
 * Строим дерево вариантов
 */
ISnew.ProductVariants.prototype._initTree = function () {
  var self = this;
  var variants = self._owner.product.variants
  var tree = {};

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var leaf = tree;

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
 */
ISnew.ProductVariants.prototype._parseVariantOptions = function (variant, leaf) {
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
 */
ISnew.ProductVariants.prototype._addLeaf = function (option, leaf, _variantSet) {
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
 */
ISnew.ProductVariants.prototype._nodeAvailable = function (leaf) {
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
 */
ISnew.ProductVariants.prototype._update = function () {
  var self = this;
  var status = self.getVariant();

  status.action = {
    method: 'update_variant'
  };

  self._owner._updateStatus(status);

  //  если есть id в урле обновляем вариант
  if (self.urlVariant) {
    self._setOptionByVariant(self.urlVariant);
    self.urlVariant = false;
  }

  return;
};

/**
 * Получить значения с уровня
 */
ISnew.ProductVariants.prototype.getLevel = function (level) {
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
 */
ISnew.ProductVariants.prototype.getFirst = function (leaf) {
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
ISnew.ProductVariants.prototype.getVariant = function () {
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
 * Устанавливаем вариант
 */
ISnew.ProductVariants.prototype.setVariant = function (variant_id) {
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