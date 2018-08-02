/**
 * @fileOverview freeze size group
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g');
const Util = require('../../util/');

const Group = function(cfg) {
  Group.superclass.constructor.call(this, cfg);
};

Util.extend(Group, G.Group);

Util.augment(Group, {
  drawInner(context) {
    this.deepEach(child => {
      const freezePoint = child.get('freezePoint');
      const freezable = this.get('freezable');
      const scale = this.getMatrix()[0];
      if (freezable !== false && child.isShape && freezePoint && child.get('visible')) {
        child.resetMatrix(freezePoint, scale);
        child.transform([
          [ 't', -freezePoint.x, -freezePoint.y ],
          [ 's', 1 / scale, 1 / scale ],
          [ 't', freezePoint.x, freezePoint.y ]
        ]);
      }
    });
    this.constructor.superclass.drawInner.call(this, context);
  }
});

module.exports = Group;
