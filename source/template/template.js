/**
 * Обертка для шаблонизатора
 */

ISnew.Template = function () {
  var self = this;

  self._init(self);
};

/**
 * Вытаскиваем нужный шаблон
 */
ISnew.Template.prototype.render = function (data, template_id) {
  var self = this;

  var templateHtml = self._templateList[template_id];
  var result;

  if (templateHtml !== undefined) {
    result = self._templateList[template_id](data);
  } else {
    result = false;
  }

  return result;
};

/**
 * Складываем шаблоны по местам, подготавливаем для работы
 */
ISnew.Template.prototype.load = function (template_body, template_id) {
  var self = this;

  self._templateList[template_id] = _.template(template_body);

  return;
};

/**
 * Автоматический сбор шаблонов в верстке
 */
ISnew.Template.prototype._init = function (_owner) {
  var self = this;
  self._owner = _owner;

  //  устанавливаем lock пока не собирем все шаблоны
  self._lock = true;

  //  устанавливаем статус пусто
  self.empty = true;

  self._templateList = {};

  //  вытаскиваем дефолтный шаблон
  self._getDefault();


  $(function () {
    if ($('script[data-template-id]').length) {

      var templateCount = $('script[data-template-id]').length - 1;

      $('[data-template-id]').each(function (index, el) {

        self.load($(el).html(), $(el).data('templateId'));

        if (templateCount === index) {
          //  снимаем lock
          self._lock = false;
          //  обновляем статус
          self.empty = false;
        }

      });

    }else{
      //  снимаем lock
      self._lock = false;
      //  обновляем статус
      self.empty = true;
    }
  });
};


/**
 * прибиваем дефолтный селект для вывода опций
 */
ISnew.Template.prototype._getDefault = function () {
  var self = this;

  var option_default = '<div class="option-<%= option.handle %>">\n<label><%= option.title %></label>\n<select data-option-bind="<%= option.id %>">\n<% _.forEach(option.values, function (value){ %>\n<option\ndata-value-position="<%= value.position %>"\nvalue="<%= value.position %>"\n<% if (option.selected == value.position & init_option) { %>selected<% } %>\n>\n<%= value.title %>\n</option>\n<% }) %>\n</select>\n</div>';

  self._templateList['option-default'] = _.template(option_default);
}

