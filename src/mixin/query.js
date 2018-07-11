/**
 * @fileOverview graph query
 * @author huangtonger@aliyun.com
 */


const Util = require('../util/');
const Mixin = {};

Mixin.AUGMENT = {
  find(id) {
    const itemMap = this.get('_itemMap');
    return itemMap[id];
  },
  /**
   * get nodes
   * @return {array} rst
   */
  getNodes() {
    const itemMap = this.get('_itemMap');
    return itemMap._nodes;
  },
  /**
   * get edges
   * @return {array} rst
   */
  getEdges() {
    const itemMap = this.get('_itemMap');
    return itemMap._edges;
  },
  /**
   * get groups
   * @return {array} rst
   */
  getGroups() {
    const itemMap = this.get('_itemMap');
    return itemMap._groups;
  },
  /**
   * get guides
   * @return {array} rst
   */
  getGuides() {
    const itemMap = this.get('_itemMap');
    return itemMap._guides;
  },
  /**
   * get items
   * @return {array} rst
   */
  getItems() {
    const itemMap = this.get('_itemMap');
    const rst = [];
    Util.each(itemMap, item => {
      if (item.type) {
        rst.push(item);
      }
    });
    return rst;
  },
  /**
   * get item by shape
   * @param  {G.Shape} shape - the shape from g
   * @return {string}  item.id - id of the item
   */
  getItemByShape(shape) {
    if (!shape) return null;
    return this.getItem(shape.id);
  },
  /**
   * get item item || itemId
   * @param  {object|string} item - the shape from g
   * @return {object}  item
   */
  getItem(item) {
    const itemMap = this.get('_itemMap');
    if (Util.isObject(item)) {
      if (item.destroyed) {
        item = itemMap[item.id];
      }
    } else {
      item = itemMap[item];
    }
    return item;
  }
};
module.exports = Mixin;
