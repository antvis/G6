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
    const animateDraw = this.get('_animateDraw');
    const animateController = controllers.animate;
    const simpleDraw = () => {
      canvas.draw();
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
  }
};
module.exports = Mixin;
