/**
 * Variants tree
 */
ISnew.ProductVariants = function (product, _owner, settings) {
  var self = this;

  self._init(product, _owner, settings)
};

/**
 * Инициализация объекта по работе с вариантами
 *
 * @property {object} variants массив модификаций продукта
 * @property {object} images картики продукта в виде {'title': {smal_url: 'http//'}}
 * @property {number} urlVariant id варианта из урла
 * @property {object} options все опции продукта со всеми своими значениями
 * @property {object} tree дерево вариантов
 */
ISnew.ProductVariants.prototype._init = function (product, _owner, settings) {
  var self = this;
  self._owner = _owner;

  self.variants = product.variants;
  self.images = self._getImage(product.images);
  self.urlVariant = Site.URL.getKeyValue('variant_id');

  self.options = {};
  self.options = self._initOptions(product.option_names);

  self.tree = self._initTree(product.variants);

  self.options = self._selectedOptions(self.options);


  if (self._owner.settings.init_option) {
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

  if (! self._owner.settings.init_option) {
    self._owner.settings.init_option = true;
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
 * @param  {object} options коллекция опций продукта (product.option_names)
 *
 * @return {object} options модифицированный объект опций, добавляется renderType из параметров продукта, добавляется handle как название опции транслитом.
 */
ISnew.ProductVariants.prototype._initOptions = function (options) {
  var self = this;

  //  получаем параметры рендера опций
  var settingsOptions = self._owner.settings.options;

  _.forEach(options, function(option, index) {
    var optionTitle = options[index].title;

    var renderType = settingsOptions[optionTitle];

    //  если название шаблона для опции передано в параметрах
    if (renderType) {
      options[index].render_type = renderType;
    }else{
      options[index].render_type = settingsOptions['default'];
    }

    //  название опции транслитом
    options[index].handle = Site.Translit.replace(optionTitle);

    //  массив значений опции
    options[index].values = {};
  });

  return options;
}

/**
 * Собираем все значения опций варианта и привязываем их нужной опции
 *
 * @param {object} value значение опции, прилетает из перебора всех значений варианта. Из value собираются уникальные значения каждой опции в объект values. values является свойством объектов из self.options.
 * @param {number} index порядковый номер опции к которой относится значение.
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
  if (self.options[index].selected == option.position & self._owner.settings.init_option) {
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

  if (! self._owner.settings.init_option) {
    self._owner.settings.init_option = true;
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
 * Фильтрация опций
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
  })

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

// ====================================================================================
//                          Методы по работе с изображениями продукта
// ====================================================================================

/**
 * Получаем объект с изображениями где ключом является название изображения
 *
 * @param  {array} images массив изображений продукта (product.images)
 * @return {object} _images объект с изображениями, ключом является название картики, значением объект с url изображений по размерам.
 */
ISnew.ProductVariants.prototype._getImage = function (images) {
  var self = this;

  var _images = {};

  //  если у продукта есть изображения
  if (_.size(images) > 0) {
      _.forEach(images, function(image) {
        //  если у изображения есть title
        if(image['title']){
          var imageName = image['title'].toLowerCase();
          _images[imageName] = {};
          _images[imageName].thumb_url = image['thumb_url'];
          _images[imageName].small_url = image['small_url'];
          _images[imageName].medium_url = image['medium_url'];
          _images[imageName].large_url = image['large_url'];
          _images[imageName].original_url = image['original_url'];
        }
      });
  }

  return _images;
}