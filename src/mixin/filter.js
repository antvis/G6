/**
 * @fileOverview filter graph item
 * filter will influence layout and visible
 * @author huangtonger@aliyun.com
 */
const Util = require('../util/');
const Mixin = {};
Mixin.INIT = '_initFilter';
Mixin.CFG = {
  /**
   * filter or filters
   * @type {array|function|undefined}
   */
  filters: []
};

Mixin.AUGMENT = {
  _initFilter() {
    const filters = this.get('filters');
    if (Util.isFunction(filters)) {
      this.set('filters', [ filters ]);
    }
    this.on('afterchange', () => {
      !this.destroyed && this.filter();
    });
  },
  /**
   * add an filter
   * @param {object} filter filter
   * @return {object} filter
   */
  addFilter(filter) {
    const filters = this.get('filters');
    filters.push(filter);
    return filter;
  },
  /**
   * remove filter
   * @param {object} filter item filter
   */
  removeFilter(filter) {
    const filters = this.get('filters');
    this.set('filters', Util.filter(filters, filter));
  },
  /**
   * do filter
   */
  filter() {
    const filters = this.get('filters');
    const items = this.getItems();
    let filteredItems = this.getItems();
    filters.forEach(filter => {
      filteredItems = Util.filter(filteredItems, filter);
    });
    items.forEach(item => {
      if (filteredItems.indexOf(item) === -1) {
        item.hide();
      }
    });
    this.draw();
  }
};
module.exports = Mixin;
