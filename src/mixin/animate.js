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
    const group = item.getGraphicGroup();
    if (!item.getKeyShape()) return;
    const box = item.getBBox();
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleIn(group, centerX, centerY);
  },

  _hideAnimate(item) {
    const group = item.getGraphicGroup();
    if (!item.getKeyShape()) {
      group.hide();
      return;
    }
    const box = item.getBBox();
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleOut(group, centerX, centerY, () => {
      group.hide();
    });
  },

  _enterAnimate(item) {
    const group = item.getGraphicGroup();
    if (!item.getKeyShape()) return;
    const box = item.getBBox();
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleIn(group, centerX, centerY);
  },

  _leaveAnimate(item) {
    const group = item.getGraphicGroup();
    if (!item.getKeyShape()) {
      group.remove();
      return;
    }
    const box = item.getBBox();
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleOut(group, centerX, centerY, () => {
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
