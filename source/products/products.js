/** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');
/** @private */
var _Storage = require('./storage');
/** @private */
var _Product = require('../product/product');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * Централизованная работа с товарами
 * @class
 *
 */
var Products = function () {
  var self = this;

  // настройки
  self._settings = {};
  // объект с готовыми к употреблению товарами
  self._products = {};

  // массив с актуальными id (которые есть на странице +-)
  self._storage = new _Storage(self);

  self._init();
};

/**
 * Инициализация
 * @method
 *
 * @private
 */
Products.prototype._init = function () {
  var self = this;

  self._getDomId()
    .done(function (idList) {
      self._getList(idList);
    });
};

/**
 * Получаем готовый к употреблению товар
 * @method
 *
 * @param {number} id - id товара
 */
Products.prototype.get = function (id) {
  var self = this;

  id = _.toInteger(id);

  return self._getOne(id);
};

/**
 * Получение списка товаров
 * @method
 *
 * @param {Array} idList - массив, состоящий из id товаров
 */
Products.prototype.getList = function (idList) {
  var self = this;

  idList = _.toArray(idList);

  return self._getList(idList);
};

/**
 * Обновление настроек продуктов созданных через
 * @method
 *
 * @param {Object} settings - объект с применяемыми настройками. Применяется для всехэкземпляров на странице
 */
Products.prototype.setConfig = function (settings){
  var self = this;

  self._settings = settings;

  _.forEach(self._products, function (product) {
    product.settings.set(self._settings);
  });
};

/**
 * Получение списка из id из DOM
 * @method
 * @private
 */
Products.prototype._getDomId = function () {
  var self = this;
  var result = $.Deferred();
  var _idList = [];

  $(function () {
    $('[data-product-id]').each(function (index, form) {
      var id = _.toInteger($(form).data('product-id'));

      _idList.push(id);
    });

    result.resolve(_.uniq(_idList));
  });

  return result.promise();
};

/**
 * Получение списка товаров
 * @method
 * @private
 */
Products.prototype._getList = function (_idList) {
  var self = this;
  var result = $.Deferred();

  // проверить все ли товары инициализированны?
  var diffId = _.difference(_idList, self._actualId);

  if (diffId.length) {
    // чего-то нет
    // Забираем из харнилища
    self._storage.getProducts(diffId)
      .done(function (products) {
        // инитим товары
        _.forEach(products, function (product) {
          self._initProduct(product);
        });

        // отдаем результат
        result.resolve(_.pick(self._products, _idList));
      });
  } else {
    // всё есть - отдаем
    result.resolve(_.pick(self._products, _idList));
  }

  return result.promise();
};

/**
 * Получение информации о товаре
 * @method
 * @private
 */
Products.prototype._getOne = function (_id) {
  var self = this;
  var result = $.Deferred();

  // а по сути нужно сделать все тоже, что и в
  // _getList, но забрать первый элемент
  self._getList([_id])
    .done(function (products) {
      products = _.toArray(products);
      result.resolve(products[0]);
    });

  return result.promise();
};

/**
 * @method
 * @private
 */
Products.prototype._initProduct = function (_productJSON) {
  var self = this;

  self._products[_productJSON.id] = new _Product(_productJSON, self._settings);
};

module.exports = _Singleton(Products).getInstance();