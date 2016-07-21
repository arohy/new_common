/**
 * @module ajaxAPI/product
 *
 * @description
 * Ajax-обертки для работы с товарами
 */
module.exports = {
  get: require ('./product/get'),
  getList: require ('./product/getList'),
};