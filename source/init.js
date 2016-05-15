/*
 * Инициализация переменных
 */

'use strict';

if (!ISnew) {
  var ISnew = {};
}

// Глобальная информация о сайте.
if (!Site) {
  var Site = {};
}

// Место для всяких утилиток
if (!ISnew.tools) {
  ISnew.tools = {};
  ISnew.tools.URL = {};
  ISnew.tools.Error = {};
}

// Место для всех оберток json
if (!ISnew.json) {
  ISnew.json = {};
}


if (!EventBus) {
  var EventBus;
}