/**
 * @fileOverview draw
 * @author huangtonger@aliyun.com
 */

const Mixin = {};
Mixin.INIT = '_initDraw';
Mixin.AUGMENT = {
  _initDraw() {
    const controllers = this.get('_controllers');
    const canvas = this.get('_canvas');
    const frontCanvas = this.get('_frontCanvas');
    const animateDraw = this.get('_animateDraw');
    const animateController = controllers.animate;
    const simpleDraw = () => {
      canvas.draw();
      frontCanvas.draw();
    };
    let draw;
    if (animateDraw) {
      draw = () => {
        const forcePreventAnimate = this.get('forcePreventAnimate');
        if (forcePreventAnimate) {
          animateController.updateStash();
          simpleDraw();
        } else {
          animateDraw();
        }
      };
    } else {
      draw = simpleDraw;
    }
    this.draw = draw;
  },
  drawFrontCanvas() {
    const frontCanvas = this.get('_frontCanvas');
    frontCanvas.draw();
  }
};
module.exports = Mixin;
