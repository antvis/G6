/**
 * @fileOverview dom event handler
 * @author wuyue.lwy <wyueliu@gmail.com>
 */

const Mixin = {};
Mixin.INIT = '_initEvents';
Mixin.CFG = {
  /**
   * keyboard Enable
   * @type {boolean|function}
   */
  keyboardEnable: true
};
Mixin.AUGMENT = {
  _initEvents() {}
};
module.exports = Mixin;
