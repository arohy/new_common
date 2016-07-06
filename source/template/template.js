/**
 * Обертка для шаблонизатора
 */
var $ = require('jquery');
var _ = require('lodash');

Template = function () {
  var self = this;
  self._templateList = {};

  self._init();
};

/**
 * Вытаскиваем нужный шаблон
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
 * Складываем шаблоны по местам, подготавливаем для работы
 */
Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Автоматический сбор шаблонов в верстке
 */
Template.prototype._init = function () {
  var self = this;

  //  устанавливаем lock пока не собирем все шаблоны
  self.lock = true;

  //  устанавливаем статус пусто
  self.empty = true;

  //  вытаскиваем дефолтный шаблон
  self._setDefault();

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

Template.prototype.has = function (template_id) {
  var self = this;

  var _has = false;

  if (!Template.empty || self._templateList[template_id]) {
    _has = true;
  }

  return _has;
};

Template.prototype._setDefault = require('./templateDefault');

module.exports = new Template();