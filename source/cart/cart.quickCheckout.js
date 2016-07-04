/**
 * CuickCheckout
 */
ISnew.CartQuickCheckout = function (_owner) {
  var self = this;

  self._owner = _owner;

  self.selectors = {
    inProcess: 'inProcess',
    disabled: 'disabled',

    open: 'data-quick-checkout',
  };

  self._init();

  return;
};

ISnew.CartQuickCheckout.prototype._init = function () {
  var self = this;

  self._bindOpenModal();

  $(function () {
    self.$modal = $('.m-modal--checkout');
    self.$message = $('#insales-quick-checkout-msg');
    if (!self.$message.length) {
      self.$message = $('<div id="insales-quick-checkout-msg" class="m-modal m-modal--msg">\n<div class="m-modal-wrapper">\n<button class="button m-button m-modal-close" data-modal="close"></button>\n<div class="m-modal-msg center"></div>\n</div>\n</div>');
      self.$message.appendTo($('body'));
    }

    self.$send = $('.m-modal-button--checkout');
    self.$errors = $('.m-modal-errors');
    self.$overlay = $('<div class="m-overlay" />');
    self.$form = $('#quick_checkout_form');
    self.$close = $('.m-modal-close');

    self._bindCloseModal();
    self._bindSend();
  });

  self._bindEvents();

  return;
};

/**
 * Открытие модалки
 */
ISnew.CartQuickCheckout.prototype.openModal = function ($modal) {
  var self = this;

  $modal.css({
    position: 'fixed',
    display: 'block',
  });
  $('body').append(self.$overlay);

  return;
};

/**
 * Закрытие модалки
 */
ISnew.CartQuickCheckout.prototype.closeModal = function ($modal) {
  var self = this;

  $modal.removeAttr('style');
  self.$overlay.remove();

  return;
};

/**
 * Запуск добавления товаров, отправка формы
 */
ISnew.CartQuickCheckout.prototype.send = function () {
  var self = this;
  var items;

  if (!self._targetForm._quickCheckout) {
    items = self._owner.ui._parseProductForm(self._targetForm, self._targetButton);
    self._owner.quick_checkout(items);
  } else {
    console.log('QuickCheckout: in process');

    self._targetForm._quickCheckout = true;

    self._send();
  }

  return;
};

/**
 * Обработчик открытия модалки
 */
ISnew.CartQuickCheckout.prototype._bindOpenModal = function () {
  var self = this;

  $(document).on('click', '[data-quick-checkout]', function (event) {
    event.preventDefault();
    event.stopPropagation();

    var $button = $(this);

    if (!$button.prop(self.selectors.inProcess)) {
      // если эту кнопку еще не жали
      if (!$button.prop(self.selectors.disabled)) {
        // если кнопка не заблочена - показваем модалку
        // вешаем на кнопку метку "В обработке"
        //$button.prop(self.selectors.inProcess, true);
        self._targetForm = self._getProductForm($button);
        self._targetButton = $button;

        self.openModal(self.$modal);
      } else {
        // иначе - дергаем событие
        EventBus.publish('add_disabled:insales:quick_checkout', {
          button: $button,
        });
      }
    }
  });

  return;
};

/**
 * Отправка формы из модалки
 */
ISnew.CartQuickCheckout.prototype._send = function () {
  var self = this;
  var ajaxParams = {};

  console.log(self);

  if (self.$form.find(':file').length && window.FormData) {
    ajaxParams.data = new FormData(self.$form.get(0));
    ajaxParams.processData = false;
  } else {
    ajaxParams.data = self.$form.serialize();
  }

  self.$errors.html('');

  ISnew.json.makeQuickCheckout(ajaxParams)
    .done(function (response) {
      self._success(response);
    })
    .fail(function (response) {
      self._errors(response);
    });
};

/**
 * Все ок
 */
ISnew.CartQuickCheckout.prototype._success = function (response) {
  var self = this;

  self._owner.clear();

  self.showMessage(response.message);

  EventBus.publish('success:insales:quick_checkout', response);
  return;
};

/**
 * Прилетели ошибки
 */
ISnew.CartQuickCheckout.prototype._errors = function (response) {
  var self = this;

  _.forEach(response.errors, function (error) {
    self.$errors.append($('<div class="m-modal-error">'+ error +'</div>'));
  });

  EventBus.publish('errors:insales:quick_checkout', response.errors);

  return;
};

/**
 * Обработчики закрытия модалки
 */
ISnew.CartQuickCheckout.prototype._bindCloseModal = function () {
  var self = this;

  self.$close
    .off('click')
    .on('click', function (event) {
      _close();
    });

  $(document)
    .on('click', '.m-overlay', function (event) {
      _close();
    });

  function _close () {
    event.preventDefault();

    self._targetForm = {};
    self._targetButton = {};
    self.closeModal($('.m-modal'));
    self.$errors.html('');
  }

  return;
};

/**
 * Обработка отправки
 */
ISnew.CartQuickCheckout.prototype._bindSend = function () {
  var self = this;

  console.warn('Внимание подключена новая версия JS API InSales');

  self.$send
    // сносим все обработчики
    .off('click')
    // вешаем свой
    .on('click', function (event) {
      event.preventDefault();

      self.send();
    });

  return;
};

/**
 * Разбор формы модалки
 */
ISnew.CartQuickCheckout.prototype._getProductForm = function ($button) {
  var self = this;
  var _target = $button.attr('data-quick-checkout') || false;
  var _parent = $button.parents('form:first') || false;
  var $form;

  if (_target && $(_target).is('form')) {
    $form = $(_target);
  } else if (_parent && $(_parent).is('form')) {
    $form = $(_parent);
  } else {
    console.log('CartQuickCheckout: _getProductForm: target form: WAAAAT?!');
  }

  return $form;
};

/**
 * Прибиваем слушателей шины
 */
ISnew.CartQuickCheckout.prototype._bindEvents = function () {
  var self = this;

  EventBus.subscribe('add_quick_checkout:insales:cart', function (data) {
    self._send();
  });
};

/**
 *
 */
ISnew.CartQuickCheckout.prototype.showMessage = function (message) {
  var self = this;

  self.closeModal(self.$modal);

  self.openModal(self.$message);
  $('.m-modal-msg', self.$message).html(message);
};

/**
 *
 */
ISnew.CartQuickCheckout.prototype.hideMessage = function () {
  var self = this;

  self.closeModal(self.$message);
};