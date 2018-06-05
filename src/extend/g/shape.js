/**
 * @fileOverview extend G.Shape
 * @author huangtonger@aliyun.com
 * @ignore
 */


const Util = require('../../util/');
const G = require('@antv/g');
const Mixin = function() {};

Util.augment(Mixin, {
  /**
   * get shape init attrs
   * @return {object} rst
   */
  getAttrs() {
    const attrs = this.get('attrs');
    const rst = {};
    Util.each(attrs, (v, k) => {
      rst[k] = this.attr(k);
    });
    return rst;
  },
  /**
   * Check contains the specified class
   * @param   {String}      className class name
   * @return  {Boolean}     boolean
   */
  hasClass(className) {
    const clasees = this.get('class');
    if (clasees && clasees.indexOf(className) !== -1) {
      return true;
    }
    return false;
  }
});

Util.mixin(G.Shape, [ Mixin ]);

module.exports = Mixin;
