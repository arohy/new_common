/**
 * @module ajaxAPI/compare
 *
 * @description
 * Ajax-обертки для работы со сравнением
 */
module.exports = {
  get: require ('./compare/get'),
  add: require ('./compare/add'),
  remove: require ('./compare/remove'),
};