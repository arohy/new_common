/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');
/** @private */
var ajax = require('../ajax/ajax.product');
/** @private */
var URL = require('../tools/url');
/** @private */
var EventBus = require('../events/events');

/**
 * Класс Хранилища json Товаров
 * управляет всем процессом получения и хранения json'ов
 * @class
 * @memberof Products
 * @alias storage
 *
 * @private
 */
var ProductsStorage = function (_owner) {
  var self = this;

  self._settings = {
    maxProducts: 100,
    json: 'products',
    liveTime: 180000 // milisec
  };

  self._owner = _owner;
  self._storage = localStorage;

  // объект для хранения json
  self._json = {};

  self._init();
}


/**
 * Инициализация
 * @private
 */
ProductsStorage.prototype._init = function () {
  var self = this;

  // грузим сохраненные товары
  self._json = self._loadJSON();

  self._checkAlive();
};

/**
 * Отдаем json'ы товаров и хранилища
 * @param {Array} _idList - массив id товаров, информация по которым нам нужнв
 *
 * @return {Object} Список с информацией по указанным товарам
 */
ProductsStorage.prototype.getProducts = function (_idList) {
  var self = this;
  var result = $.Deferred();

  // проверим, про какие товары мы ничего не знаеи?
  var diffId = _.differenceBy(_idList, _.keys(self._json), _.toInteger);

  if (diffId.length) {
    // если про что-то не знаем - тащим всю портянку
    ajax.getList(diffId)
      .done(function (_JSONs) {
        // обрабатываем ответы
        self._updateJSON(_JSONs);

        // отдаем результат
        result.resolve(_.pick(self._json, _idList));
      });
  } else {
    // всё есть - отдаем информацию
    result.resolve(_.pick(self._json, _idList));
  }

  return result.promise();
};

/**
 * Получение сохраненных товаров
 * @private
 */
ProductsStorage.prototype._loadJSON = function () {
  var self = this;
  var _json = self._storage.getItem(self._settings.json);
  var _lang = self._storage.getItem('lang');
  var _currentLang = URL.getKeyValue('lang') || '';

  _json = JSON.parse(_json) || {};
  _lang = JSON.parse(_lang);

  if (_lang !== _currentLang) {
    _json = {};
    self._storage.setItem('lang', JSON.stringify(_currentLang));
  }

  return _json;
};

/**
 * Сохранение товаров
 * @private
 */
ProductsStorage.prototype._saveJSON = function () {
  var self = this;
  var _json = JSON.stringify(self._json);

  self._storage.setItem(self._settings.json, _json);

  return;
};

/**
 * Обновление базы )
 * @private
 *
 * @param {Object} _JSONs- объект с текущим списком товаров
 */
ProductsStorage.prototype._updateJSON = function (_JSONs) {
  var self = this;

  // Добавляем записи
  _.forEach(_JSONs, function (_json) {
    _json.updatedAt = _.now();
    self._json[_json.id] = _json;
  });

  // сохранаяем все добро
  self._saveJSON();

  return;
};

/**
 * Проверяем актуальность записей
 * @private
 */
ProductsStorage.prototype._checkAlive = function () {
  var self = this;
  var currentMoment = _.now();

  _.forEach(self._json, function(_json, key) {
    var _isValid = (currentMoment - _json.updatedAt) < self._settings.liveTime;
    if (!_isValid) {
      _.unset(self._json, key);
    };
  });
};

module.exports = ProductsStorage;