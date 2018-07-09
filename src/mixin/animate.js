/**
 * @fileOverview animate mixin
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
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
    const matrix = group.getMatrix();
    const box = Util.getBBox(group, matrix); // need apply self matrix
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleIn(group, centerX, centerY);
  },

  _leaveAnimate(item) {
    const group = item.getGraphicGroup();
    const matrix = group.getMatrix();
    const box = Util.getBBox(group, matrix); // need apply self matrix
    const centerX = (box.minX + box.maxX) / 2;
    const centerY = (box.minY + box.maxY) / 2;
    Util.scaleOut(group, centerX, centerY);
  }
};
Mixin.AUGMENT = {
  _initAnimate() {
    const controllers = this.get('_controllers');
    const animate = this.get('animate');
    const canvas = this.get('_canvas');
    const frontCanvas = this.get('_frontCanvas');
    let animateController;
    if (animate) {
      animateController = new Animate({
        canvases: [ canvas, frontCanvas ],
        graph: this
      });
      controllers.animate = animateController;
    }
    const simpleDraw = () => {
      canvas.draw();
      frontCanvas.draw();
    };
    const animateDraw = Util.debounce(() => {
      animateController.run();
    }, 16);
    if (animateController) {
      let updateStashTimeout;
      this.draw = () => {
        const forcePreventAnimate = this.get('forcePreventAnimate');
        if (forcePreventAnimate) {
          if (updateStashTimeout) {
            clearTimeout(updateStashTimeout);
          }
          updateStashTimeout = setTimeout(() => {
            animateController.updateStash();
          }, 16);
          simpleDraw();
        } else {
          animateDraw();
        }
      };
    } else {
      this.draw = simpleDraw;
    }
  },
  drawFrontCanvas() {
    const frontCanvas = this.get('_frontCanvas');
    frontCanvas.draw();
  }
};

module.exports = Mixin;
