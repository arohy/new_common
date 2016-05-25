/**
 * Конструктор объета по работе с вариантами продукта
 * @class
 * @name ISnew.ProductVariants
 *
 * @example
 * self.variants = new ISnew.ProductVariants(_product, self);
 *
 * @param  {object} product продукт
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

  self._init()
};

/**
 * Инициализация объекта по работе с вариантами
 */
ISnew.ProductVariants.prototype._init = function () {
  var self = this;

  self.variants = self._owner.product.variants;
  self.urlVariant = Site.URL.getKeyValue('variant_id');

  // создаем опции
  self.options = self._initOptions(self._owner.product.option_names);
  // создаем дерево
  self.tree = self._initTree(self._owner.product.variants);
  // проставляем выбранные опции
  self.options = self._selectedOptions(self.options);

  if (self._owner.settings.initOption) {
    self._update();
  }
}

// ====================================================================================
//                          Методы по работе с деревом вариантов
// ====================================================================================

/**
 * Строим дерево вариантов
 */
ISnew.ProductVariants.prototype._initTree = function (variants) {
  var self = this;
  var tree = {};

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var variant_id = variant.id;
    var leaf = tree;

    // Разбираем опции
    _.forEach(variant.option_values, function(option, index) {
      var id;
      var isAvailable;

      // Добавляем новое значение в опцию
      self._addValues(option, index);

      // Если дошли до последней опции - выставляем вариант и доступность
      if (index == (variant.option_values.length - 1)) {
        id = variant_id;
        isAvailable = variant.available;
      }

      // Если такую опцию мы еще не вносили - вбиваем все, что есть.
      if (!leaf[option.position]) {
        leaf[_.toInteger(option.position)] = {
          id: _.toInteger(option.id),
          tree: {},
          title: option.title,
          name: option.title.toLowerCase(),
          variant_id: id,
          position: _.toInteger(option.position)
        };

        // Выставляем доступность
        if( isAvailable !== undefined ){
          leaf[option.position].available = isAvailable;
        };
      }

      leaf = leaf[option.position].tree;
    });
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

  status.action = 'update_variant';

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