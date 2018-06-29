/**
 * @fileOverview group shapes
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');
const Global = require('../../global');

Shape.registerGroup('common', {
  draw(item) {
    const model = item.getModel();
    if (model.collapsed) {
      return this.drawCollapsed(item);
    }
    return this.drawExpanded(item);
  },
  getLabel(item) {
    const model = item.getModel();
    return model.label;
  },
  drawLabel(item, x, y) {
    const label = this.getLabel(item);
    if (!label) {
      return;
    }
    const group = item.getGraphicGroup();
    const margin = [ 8, 8 ];
    const attrs = Util.mix(true, {}, Global.labelStyle, {
      x: x + margin[0],
      y: y + margin[1],
      textAlign: 'left',
      textBaseline: 'top'
    });
    if (!Util.isObject(label)) {
      attrs.text = label;
    } else {
      Util.mix(attrs, label);
    }
    group.addShape('text', {
      attrs
    });
  },
  drawKeyShape(item, x, y, width, height) {
    const model = item.getModel();
    const group = item.getGraphicGroup();
    const attrs = Util.mix({}, Global.groupStyle, model.style);
    const path = Util.getRectPath(x, y, width, height, attrs.radius);
    return group.addShape('path', {
      attrs: Util.mix({}, attrs, {
        path
      })
    });
  },
  drawExpanded(item) {
    const box = item.getChildrenBBox();
    const x = box.minX - Global.groupBackgroundPadding[3];
    const y = box.minY - Global.groupBackgroundPadding[0];
    const width = (box.maxX - box.minX) + Global.groupBackgroundPadding[3] + Global.groupBackgroundPadding[1];
    const height = (box.maxY - box.minY) + Global.groupBackgroundPadding[0] + Global.groupBackgroundPadding[2];
    const keyShape = this.drawKeyShape(item, x, y, width, height);
    this.drawLabel(item, x, y);
    return keyShape;
  },
  drawCollapsed(item) {
    const box = item.getChildrenBBox();
    const x = box.minX - Global.groupBackgroundPadding[3];
    const y = box.minY - Global.groupBackgroundPadding[0];
    const width = 184;
    const height = 40;
    const keyShape = this.drawKeyShape(item, x, y, width, height);
    this.drawLabel(item, x, y);
    return keyShape;
  },
  anchor: {
    intersectBox: 'rect'
  }
});
