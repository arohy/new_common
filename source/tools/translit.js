/**
 * производим транслитерацию строки
 */
ISnew.tools.Translit = function( string ){
  var self = this;
};

ISnew.tools.Translit.prototype.replace = function (string) {
  var
    space     = '_',
    $translit = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
      'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
      ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
      '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
      '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
      ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
      '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
      '?': space, '<': space, '>': space, '№':space
    },
    result  = '',
    current = '';

  string = string.toLowerCase();

  for(var i = 0; i < string.length; i++ ){
    if( $translit[ string[ i ] ] !== undefined ){
      result += $translit[ string[i] ];
    }else{
      result += string[ i ];
    }
  }

  return result;
}