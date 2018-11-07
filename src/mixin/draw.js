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
    const type = this.get('_type');
    const eventNames = [ 'updatenodeposition', 'clear' ];

    // because tree will always call layout that change draw is unnecessary
    if (type === 'graph') {
      eventNames.unshift('change');
    }
    eventNames.forEach(eventName => {
      if (animateController) {
        this.on('before' + eventName, ev => {
          const affectedItemIds = ev ? ev.affectedItemIds : undefined;
          if (animateController) {
            animateController.cacheGraph('startStashes', affectedItemIds);
          }
        });
      }
      this.on('after' + eventName, ev => {
        const affectedItemIds = ev ? ev.affectedItemIds : undefined;
        const forcePreventAnimate = this.get('_forcePreventAnimate');
        if (forcePreventAnimate !== true && animateController) {
          animateController.cacheGraph('endStashes', affectedItemIds);
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
