/**
 * Variants tree
 */

ISnew.ProductVariants = function (product) {
  var self = this;

  self.tree = {};
  self.options = [];

  self.buildTree(product.variants);
  self.initOptions(product.option_names);
};

/**
 * Строим дерево вариантов
 */
ISnew.ProductVariants.prototype.buildTree = function (variants) {
  var self = this;

  // Проходимся по вариантам
  _.forEach(variants, function (variant) {
    var variant_id = variant.id;
    var leaf = self.tree;

    // Разбираем опции
    _.forEach(variant.option_values, function(option, index) {
      var id;
      var isAvailable;

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

  _.forEach(self.tree, function (leaf) {
    self.treeAvailable(leaf);
  });

  return;
};

/**
 * Установка доступности вариантов
 */
ISnew.ProductVariants.prototype.treeAvailable = function (leaf) {
  var self = this;

  if (leaf.variant_id === undefined) {
    var isAvailable = false;

    _.forEach(leaf.tree, function (child){
      if (self.treeAvailable(child)) {
        isAvailable = true;
      };
    });

    leaf.available = isAvailable;
  };

  return leaf.available;
};

/**
 * Получить значения с уровня
 */
ISnew.ProductVariants.prototype.getTreeLevel = function (level) {
  var self = this;
  var leaf = self.tree;

  _.forEach(self.options, function(option_level, option) {
    if (level == option_level) {
      return false;
    }
    leaf = leaf[option.selected].tree;
  });

  return;
};

/**
 * Получить первый элемент на уровне
 */
ISnew.ProductVariants.prototype.getTreeFirst = function (leaf) {
  var self = this;

  var first = _.chain(leaf)
    .toArray()
    .first()
    .value();

  return first;
};

/**
 * Подготовка опций
 */
ISnew.ProductVariants.prototype.initOptions = function (options) {
  var self = this;
  var leaf = self.tree;

  self.options = options;

  _.forEach(self.options, function(option, index) {
    var first = self.getTreeFirst(leaf);

    self.options[index].selected = first.position;
    leaf = first.tree;
  });

  return;
};

/**
 * Выбрать опцию
 */
ISnew.ProductVariants.prototype.setOption = function (option) {
  var self = this;

  option = {
    index: _.toInteger(option.index),
    value: _.toInteger(option.value)
  };

  self.options[option.index].selected = option.value;

  return;
};

/**
 * Получить опцию
 */
ISnew.ProductVariants.prototype.getOption = function (index) {
  var self = this;

  return self.options[index].selected;
};

/**
 * Установить опции по вырианту
 */
ISnew.ProductVariants.prototype.setOptionByVariant = function () {
  var self = this;
};