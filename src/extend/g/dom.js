/**
 * @fileOverview extend G.Shape
 * @author huangtonger@aliyun.com
 * @ignore
 */


const Util = require('../../util/');
const G = require('@antv/g/lib');
const Mixin = function() {};

Util.augment(Mixin, {
  // draw dom when canvas renderer
  drawInner(context) {
    const tm = Util.clone(this.getTotalMatrix());
    const { x, y, width, height } = this._attrs;
    context.setTransform(tm[0], tm[1], tm[3], tm[4], tm[6], tm[7]);
    context.drawImage(this.domImage, x, y, width, height);
  }
});

Util.mixin(G.Dom, [ Mixin ]);

module.exports = Mixin;
