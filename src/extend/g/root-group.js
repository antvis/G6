/**
 * @fileOverview freeze size group
 * @author huangtonger@aliyun.com
 */

const G = require('@antv/g');
const Util = require('../../util/');

function extend(child, parent, augment) {
  const canvasElement = function(cfg) {
    canvasElement.superclass.constructor.call(this, cfg);
  };
  const svgElement = function(cfg) {
    svgElement.superclass.constructor.call(this, cfg);
  };
  Util.extend(canvasElement, G.canvas[parent]);
  Util.extend(svgElement, G.svg[parent]);
  Util.augment(canvasElement, augment);
  Util.augment(svgElement, augment);
  G.canvas[child] = canvasElement;
  G.svg[child] = svgElement;
}

extend('RootGroup', 'Group', {
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
    this.constructor.superclass.drawInner.call(this, context);
  }
});
// const Group = function(cfg) {
//   G.canvas.Group.canvasElement.constructor.call(this, cfg);
// };

// Util.extend(Group, G.canvas.Group);

// Util.augment(Group, );
// G.canvas.RootGroup = Group;
// module.exports = Group;
