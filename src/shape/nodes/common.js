/**
 * @fileOverview common node shape
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');
const Global = require('../../global');

Shape.registerNode('common', {
  draw(item) {
    const group = item.getGraphicGroup();
    const label = this.drawLabel(item);
    const keyShape = this.drawKeyShape(item);
    label && Util.toFront(label, group);
    return keyShape;
  },
  getSize(item) {
    const model = item.getModel();
    const size = model.size;
    if (Util.isArray(size)) {
      return size;
    }
    if (Util.isNumber(size)) {
      return [ size, size ];
    }
    return [ Global.defaultNodeSize, Global.defaultNodeSize ];
  },
  getStyle(item) {
    const model = item.getModel();
    const color = this.getColor(item);
    const palettes = Util.Palettes.generate(color);
    return Util.mix(true, {}, Global.nodeStyle, {
      fill: palettes[4],
      fillOpacity: 0.92,
      stroke: palettes[6]
    }, model.style);
  },
  getColor(item) {
    const model = item.getModel();
    return model.color || '#1890FF';
  },
  getLabel(item) {
    const model = item.getModel();
    return model.label;
  },
  drawKeyShape(item) {
    const group = item.getGraphicGroup();
    const style = this.getStyle(item);
    const path = this.getPath(item);
    return group.addShape('path', {
      attrs: Util.mix({}, style, {
        path
      })
    });
  },
  drawLabel(item) {
    const group = item.getGraphicGroup();
    const label = this.getLabel(item);
    if (Util.isNil(label)) {
      return;
    }
    const attrs = Util.mix(true, {}, Global.labelStyle, {
      x: 0,
      y: 0
    });
    if (!Util.isObject(label)) {
      attrs.text = label;
    } else {
      Util.mix(attrs, label);
    }
    return group.addShape('text', {
      class: 'label',
      attrs
    });
  },
  getPath(item) {
    const size = this.getSize(item);
    return Util.getEllipsePath(0, 0, size[0] / 2, size[1] / 2);
  }
});
