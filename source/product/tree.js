/**
 * Variants tree
 */
ISnew.ProductVariants = function (product, _owner, settings) {
  var self = this;
  self._owner = _owner;

  self.variants = product.variants;
  //  тут хранятся картики продукта
  self.images = self._getImage(product);

  //  инизиализация параметров
  self.settings = {};

  if (typeof settings.validate === 'undefined') {
    self.settings = Site.Setting.validate(settings)
  }else{
    self.settings = settings;
  }
  self.settings.options['default'] = 'option-select';


  //  id варианта из урла
  self.urlVariant = Site.URL.getKeyValue('variant_id');



  self.tree = self._initTree(product.variants);
  self.options = self._initOptions(product.option_names);

  self.listOption = self._initListOption(product.variants, product.option_names);

  if (self.settings.init_option) {
    self._update();
  }
};

ISnew.ProductVariants.prototype._initListOption = function (variants, option_names) {
  var self = this;
  var _variants = variants;
  var _option_names = option_names;
  var listOption = {};
  var _temp = {};

  _.forEach(_variants, function (variant) {
    var variant_id = variant.id;
    listOption[variant_id] = {};
     _.forEach(variant.option_values, function(option, index) {
      if ( typeof _temp[option.option_name_id] === 'undefined') {

        _temp[option.option_name_id] = {};

        if ( typeof _temp[option.option_name_id][option.id] === 'undefined') {
          _temp[option.option_name_id][option.id] = {option};
          _temp[option.option_name_id][option.id] = option;
        }else{
          _temp[option.option_name_id][option.id] = option;
        }

      }else{

        if ( typeof _temp[option.option_name_id][option.id] === 'undefined') {
          _temp[option.option_name_id][option.id] = {};
          _temp[option.option_name_id][option.id] = option;
        }else{
          _temp[option.option_name_id][option.id] = option;
        }

      }

     })
  })
  listOption = _temp;
  return listOption;
}
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

  if (! self.settings.init_option) {
    self.settings.init_option = true;
  }

  self._setOptionByVariant(variant_id);

  self._update();
  return;
};

// ====================================================================================

/**
 * Подготовка опций
 */
ISnew.ProductVariants.prototype._initOptions = function (options) {
  var self = this;
  var leaf = self.tree;
  var paramOptions = self.settings.options;

  _.forEach(options, function(option, index) {
    var first = self.getFirst(leaf);
    var optionTitle = options[index].title;

    var renderType = paramOptions[optionTitle];

    //  если название шаблона для опции передано в параметрах
    if (renderType) {
      options[index].render_type = renderType;
    }else{
      options[index].render_type = paramOptions['default']
    }


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
  if (self.options[index].selected == option.position & self.settings.init_option) {
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

  if (! self.settings.init_option) {
    self.settings.init_option = true;
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

/**
 * Получаем картинки продукта
 */
ISnew.ProductVariants.prototype._getImage = function (product) {
  var self = this;

  var images = {};
  var productImages = product.images;

  //  если у продукта есть картинки
  if (productImages.length > 0) {

  _.forEach(productImages, function(value, key) {

    //  если у картинки есть title
    if(value['title']){
      var imageName = value['title'].toLowerCase();
      images[imageName] = {};
      images[imageName].thumb_url = value['thumb_url'];
      images[imageName].small_url = value['small_url'];
      images[imageName].medium_url = value['medium_url'];
      images[imageName].large_url = value['large_url'];
      images[imageName].original_url = value['original_url'];
    }

  });

  }else{
    images = false;
  }

  return images;
}