 /** @private */
var $ = require('jquery');
/** @private */
var _ = require('lodash');

/** @private */
var _default = require('./templateDefault');
/** @private */
var _Singleton = require('../tools/singleton');

/**
 * @class
 *
 * @description
 * Обертка для шаблонизатора
 */
var Template = function () {
  var self = this;
  self._templateList = {};

  self._init();
};

/**
 * Генерация фрагмента нужного шаблона с данными
 * @method
 *
 * @param {Object} data - информация для шаблонизатора
 * @param {string} template_id - названи
 *
 * @returm {string|boolean} html|false
 */
Template.prototype.render = function (data, template_id) {
  var self = this;
  var template = self._templateList[template_id];
  var result;

  if (template !== undefined) {
    result = self._templateList[template_id](data);
  } else {
    result = false;
    console.warn('Template: ', template_id, ' не подключен');
  }

  return result;
};

/**
 * Загрузка нового шаблона в список
 * @method
 *
 * @param {string} template_body - верстка шаблона
 * @param {string} template_id - название шаблона
 */
Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Инициализация. Собирает все имеющиеся в DOM шаблоны и подключает их
 *
 * @method
 * @private
 */
Template.prototype._init = function () {
  var self = this;

  //  устанавливаем lock пока не собирем все шаблоны
  self.lock = true;

  //  устанавливаем статус пусто
  self.empty = true;

  //  вытаскиваем дефолтный шаблон
  self._setDefault();

  // ориентируемся на куски <script data-template-id="same-tamplete" />
  $(function () {
    var $templates = $('[data-template-id]');

    if ($templates.length) {
      $templates.each(function (index, el) {
        self.load($(el).html(), $(el).data('templateId'));

        if ($(el).is(':last')) {
          //  снимаем lock
          self.lock = false;
          //  обновляем статус
          self.empty = false;
        }
      });
    } else {
      //  снимаем lock
      self.lock = false;
      //  обновляем статус
      self.empty = true;
    }
  });
};

/**
 * @method
 * @private
 */
Template.prototype.has = function (template_id) {
  var self = this;

  var _has = false;

  if (!Template.empty || self._templateList[template_id]) {
    _has = true;
  }

  return _has;
};

Template.prototype._setDefault = _default;

module.exports = _Singleton(Template).getInstance();