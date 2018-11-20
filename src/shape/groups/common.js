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
    let keyShape;
    if (model.collapsed) {
      keyShape = this.drawCollapsed(item);
    } else {
      keyShape = this.drawExpanded(item);
    }
    return keyShape;
  },
  defaultWidth: 184,
  defaultHeight: 40,
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
    x = x + margin[0];
    y = y + margin[1];
    const model = item.getModel();
    const { labelOffsetX, labelOffsetY, labelRotate } = model;
    x = labelOffsetX ? labelOffsetX + x : x;
    y = labelOffsetY ? labelOffsetY + y : y;
    const attrs = Util.mix(true, {}, Global.labelStyle, {
      x,
      y,
      textAlign: 'left',
      textBaseline: 'top'
    });
    if (!Util.isObject(label)) {
      attrs.text = label;
    } else {
      Util.mix(attrs, label);
    }
    const labelShape = group.addShape('text', {
      class: 'label',
      attrs
    });
    if (labelRotate) {
      const textBox = labelShape.getBBox();
      const centerX = (textBox.maxX + textBox.minX) / 2;
      const centerY = (textBox.maxY + textBox.minY) / 2;

      labelShape.transform([
        [ 't', -centerX, -centerY ],
        [ 'r', labelRotate, labelRotate ],
        [ 't', centerX, centerY ]
      ]);
    }
  },
  drawKeyShape(item, box) {
    const { x, y, width, height } = box;
    const model = item.getModel();
    const group = item.getGraphicGroup();
    const attrs = Util.mix({}, Global.groupStyle, model.style);
    const path = Util.getRectPath(x, y, width, height, attrs.radius);
    item.lastChildrenBox = box;
    return group.addShape('path', {
      attrs: Util.mix({}, attrs, {
        path
      })
    });
  },
  getChildrenBBox(item) {
    const box = {
      ...item.lastChildrenBox
    };
    const model = item.getModel();
    if (item.getChildren().length > 0) {
      const childrenBBox = item.getChildrenBBox();
      box.x = childrenBBox.minX - Global.groupBackgroundPadding[3];
      box.y = childrenBBox.minY - Global.groupBackgroundPadding[0];
      box.width = (childrenBBox.maxX - childrenBBox.minX) + Global.groupBackgroundPadding[3] + Global.groupBackgroundPadding[1];
      box.height = (childrenBBox.maxY - childrenBBox.minY) + Global.groupBackgroundPadding[0] + Global.groupBackgroundPadding[2];
    } else {
      box.width = this.defaultWidth;
      box.height = this.defaultHeight;
    }
    if (Util.isNil(box.x) && !Util.isNil(model.x)) {
      box.x = model.x;
    }
    if (Util.isNil(box.y) && !Util.isNil(model.y)) {
      box.y = model.y;
    }
    return box;
  },
  drawExpanded(item) {
    const box = this.getChildrenBBox(item);
    const keyShape = this.drawKeyShape(item, box);
    this.drawLabel(item, box.x, box.y);
    return keyShape;
  },
  drawCollapsed(item) {
    const box = this.getChildrenBBox(item);
    box.width = this.defaultWidth;
    box.height = this.defaultHeight;
    const keyShape = this.drawKeyShape(item, box);
    this.drawLabel(item, box.x, box.y);
    return keyShape;
  },
  anchor: {
    intersectBox: 'rect'
  }
});
