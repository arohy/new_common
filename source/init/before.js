/*
 * Инициализация переменных
 */

'use strict';

console.warn('Внимание подключена новая версия JS API InSales');

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