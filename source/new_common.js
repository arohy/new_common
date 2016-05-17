/*
 * Инициализация переменных
 */

'use strict';

if (!ISnew) {
  var ISnew = {};
}

// Место для всяких утилиток
if (!ISnew.tools) {
  ISnew.tools = {};
}

// Глобальная информация о сайте.
if (!Site) {
  var Site = {};
}


// Место для всех оберток json
if (!ISnew.json) {
  ISnew.json = {};
}


if (!EventBus) {
  var EventBus;
}

//= ./events/
//= ./tools/
//= ./json/
//= ./template/
//= ./cart/
//= ./product/
//= ./compare/

/*
 * Инициализация объектов
 */
Site.URL = new ISnew.tools.URL();
