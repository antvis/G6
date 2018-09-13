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

  /**
   * animate force prevent
   * @type {boolean}
   */
  forcePreventAnimate: false,

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
    Util.scaleOut(group, centerX, centerY, function() {
      group.remove();
    });
  },

  _updateAnimate(element, props, visibleAction) {
    if (visibleAction === 'show') {
      const item = element.item;
      const box = item.getBBox();
      const centerX = (box.minX + box.maxX) / 2;
      const centerY = (box.minY + box.maxY) / 2;
      Util.scaleIn(element, centerX, centerY);
    } else if (visibleAction === 'hide') {
      element.show();
      const item = element.item;
      const box = item.getBBox();
      const centerX = (box.minX + box.maxX) / 2;
      const centerY = (box.minY + box.maxY) / 2;
      Util.scaleOut(element, centerX, centerY, function() {
        element.hide();
      });
    } else {
      element.animate(props, Global.updateDuration, Global.updateEasing);
    }
  }
};
Mixin.AUGMENT = {
  _initAnimate() {
    const controllers = this.get('_controllers');
    const animate = this.get('animate');
    const canvas = this.get('_canvas');
    let animateController;
    if (animate) {
      animateController = new Animate({
        canvases: [ canvas ],
        graph: this
      });
      controllers.animate = animateController;
      const animateDraw = Util.debounce(() => {
        animateController.run();
      }, 450);
      this.set('_animateDraw', animateDraw);
    }
  }
};

module.exports = Mixin;
