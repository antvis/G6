/**
 * @fileOverview animate mixin
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Global = require('../global');
const Animate = require('../controller/animate');
const Mixin = {};
Mixin.INIT = '_initAnimate';
Mixin.CFG = {
  /**
   * animate switch
   * @type {boolean}
   */
  animate: false,

  _showAnimate(item) {
    if (!item.getKeyShape()) return;
    Util.scaleIn(item);
  },

  _hideAnimate(item) {
    const group = item.getGraphicGroup();
    Util.scaleOut(item, () => {
      !item.visible && group.hide();
    });
  },

  _enterAnimate(item) {
    if (!item.getKeyShape()) return;
    Util.scaleIn(item);
  },

  _leaveAnimate(item) {
    const group = item.getGraphicGroup();
    Util.scaleOut(item, () => {
      group.remove();
    });
  },

  _updateAnimate(element, props) {
    element.animate(props, Global.updateDuration, Global.updateEasing);
  }
};
Mixin.AUGMENT = {
  _initAnimate() {
    const animate = this.get('animate');
    if (animate) {
      const controllers = this.get('_controllers');
      controllers.animate = new Animate({
        graph: this
      });
    }
  }
};

module.exports = Mixin;
