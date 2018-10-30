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
    const eventNames = [ 'change', 'updatenodeposition' ];

    eventNames.forEach(eventName => {
      if (animateController) {
        this.on('before' + eventName, ({ animate }) => {
          if (animate && animateController) {
            animateController.cacheGraph('stash0');
          }
        });
      }
      this.on('after' + eventName, ({ animate }) => {
        if (animate !== false && animateController) {
          animateController.cacheGraph('stash1');
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
