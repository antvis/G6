/**
 * @fileOverview extend G.Shape
 * @author huangtonger@aliyun.com
 * @ignore
 */


const Util = require('../../util/');
const G = require('@antv/g');
const Mixin = function() {};

Util.augment(Mixin, {
  beforeDraw() {
    const context = this.get('context');
    const el = this.get('el');
    this.emit('beforedraw');
    context && context.clearRect(0, 0, el.width, el.height);
  }
});

Util.mixin(G.canvas.Canvas, [ Mixin ]);
Util.mixin(G.svg.Canvas, [ Mixin ]);

module.exports = Mixin;
