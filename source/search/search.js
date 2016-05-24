/**
 * Live search
 *
 * @class
 * @name ISnew.Search
 */
ISnew.Search = function( options ){
  var self = this;

  self._init(options);
}
/**
 * Настройка
 *
 * @param  {object} options конфигурация поиска
 */
ISnew.Search.prototype._init = function(options) {
  var self = this;

  var options = options || {};

  self.options = {};
  self.options.searchSelector = options.searchSelector || '[data-search-field]';
  self.options.searchWrapper = options.searchWrapper || $(self.searchSelector).parents('form:first');
  self.options.markerClass = options.markerClass || 'ajax_search-marked';
  self.options.letters = options.letters || 3;
  self.options.template = options.template || 'search-default';

  self.path = '/search_suggestions';

  self.data = {
    account_id: Site.account.id,
    locale: Site.language.locale,
    fields: [ 'price_min', 'price_min_available' ],
    hide_items_out_of_stock: Site.account.hide_items,
  };

  self.binding();
};
/**
 * Обработчик ввода символов
 */
ISnew.Search.prototype.binding = function(){
  var self = this;

  var
    keyupTimeoutID = '',
    $search = $( self.options.searchSelector );

  $(document).on( 'keyup', self.options.searchSelector, function(){
    var
      $data = {};

    var $input = $(this);

    self.data.query = $input.val();

    clearTimeout( self.keyupTimeoutID );

    if( self.data.query !== '' && self.data.query.length >= self.options.letters ){
      self.keyupTimeoutID = setTimeout( function(){
        $.getJSON( self.path, self.data,
          function( response ){
            $data = self.makeData( response, $search.val() );

            $data['action'] = {
              method: 'update',
              input: $input
            };

            EventBus.publish('update_suggestions:insales:search', $data );
          });
      }, 300 );

      $( document ).on( 'click', 'body', self.outClick );
    }else{
      // возвращаем пустой объект, чтобы спрятать результат поиска
      $data['suggestions'] = [];
      $data['action'] = {
              method: 'update',
              input: $input
            };
      EventBus.publish('update_suggestions:insales:search', $data);

      $( document ).off( 'click', 'body', self.outClick );
    }
  });
};
/**
 * Удаление данных из выдачи
 */
ISnew.Search.prototype.outClick = function(){
  var $search = $( AjaxSearch.options.searchWrapper );

  var $data = {
    suggestions: [],
    action: {
      method: 'close',
      input: false
    }
  };

  if( $( event.target ).closest( $search ).length ) return;
    EventBus.publish('update_suggestions:insales:search', $data );
  event.stopPropagation();
  $( document ).off( 'click', 'body', self.outClick );
};

/**
 * приводим в общий порядок список поиска
 */
ISnew.Search.prototype.makeData = function( $data, keyword ){
  var self = this;
  var replacment = '<span class="'+ self.options.markerClass +'">$1</span>';
  $.each( $data.suggestions, function( index, product ){
    product.id    = product.data;
    product.url   = '/product_by_id/'+ product.id;
    product.title = product.value;
    product.marked_title = product.value.replace( new RegExp( '('+ keyword +')', 'gi' ), replacment );
  });

  return $data;
};

/**
 * Обновляем настройки
 */
ISnew.Search.prototype.setConfig = function(options) {
  var self = this;

  if (!options) {
    return;
  }

  if (options.template) {
    self.options.template = options.template;
  }

  if (options.letters) {
    self.options.letters = options.letters;
  }
}