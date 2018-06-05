/**
 * @fileOverview dom event handler
 * @author wuyue.lwy <wyueliu@gmail.com>
 */

const Mixin = {};
const Controller = require('../controller/event');
Mixin.INIT = '_initEvents';
Mixin.CFG = {
  /**
   * keyboard Enable
   * @type {boolean|function}
   */
  keyboardEnable: true
};
Mixin.AUGMENT = {
  _initEvents() {
    const controllers = this.get('_controllers');
    controllers.events = new Controller({
      graph: this
    });
  }
};
module.exports = Mixin;
