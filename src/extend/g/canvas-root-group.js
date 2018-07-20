/**
 * @fileOverview freeze size group
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g');
const Util = require('../../util/');

const Group = function(cfg) {
  G.canvas.Group.superclass.constructor.call(this, cfg.canvas);
  this.set('children', []);
};

Util.extend(Group, G.canvas.Group);

Util.augment(Group, {
  drawInner(context) {
    this.deepEach(child => {
      const freezePoint = child.get('freezePoint');
      const freezable = this.get('freezable');
      const scale = this.getMatrix()[0];
      if (freezable !== false && child.isShape && freezePoint && child.get('visible')) {
        child.initTransform();
        child.transform([
          [ 't', -freezePoint.x, -freezePoint.y ],
          [ 's', 1 / scale, 1 / scale ],
          [ 't', freezePoint.x, freezePoint.y ]
        ]);
      }
    });
    Group.superclass.drawInner.call(this, context);
  }
});

module.exports = Group;
