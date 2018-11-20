/**
 * @fileOverview draw
 * @author huangtonger@aliyun.com
 */

const Mixin = {};
Mixin.INIT = '_initDraw';

Mixin.AUGMENT = {
  _initDraw() {
    const controllers = this.get('_controllers');
    const animateController = controllers.animate;
    const eventNames = [ 'clear', 'show', 'hide', 'change', 'updatenodeposition' ];
    eventNames.forEach(eventName => {
      if (animateController) {
        this.on('before' + eventName, ev => {
          const forcePreventAnimate = this.get('_forcePreventAnimate');
          const affectedItemIds = ev ? ev.affectedItemIds : undefined;
          if (forcePreventAnimate !== true && animateController) {
            animateController.cacheGraph('startCache', affectedItemIds);
          }
        });
      }
      this.on('after' + eventName, ev => {
        const affectedItemIds = ev ? ev.affectedItemIds : undefined;
        const forcePreventAnimate = this.get('_forcePreventAnimate');
        if (ev && ev.action === 'changeData') {
          const fitView = this.get('fitView');
          fitView && this.setFitView(fitView);
        }
        if (forcePreventAnimate !== true && animateController) {
          animateController.cacheGraph('endCache', affectedItemIds);
          animateController.run();
        } else {
          this.draw();
        }
      });
    });

  },
  draw() {
    const canvas = this.get('_canvas');
    canvas.draw();
  },
  animateDraw() {
    const controllers = this.get('_controllers');
    const animateController = controllers.animate;
    animateController.run();
  }
};
module.exports = Mixin;
