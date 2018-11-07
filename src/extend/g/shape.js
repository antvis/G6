/**
 * @fileOverview extend G.Shape
 * @author huangtonger@aliyun.com
 * @ignore
 */


const Util = require('../../util/');
const G = require('@antv/g/lib');
const Mixin = function() {};

Util.augment(Mixin, {
  /**
   * Check contains the specified class
   * @param   {string}      className class name
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
