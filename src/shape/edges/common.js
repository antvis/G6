/**
 * @fileOverview edge shapes
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');
const Global = require('../../global');
const MIN_ARROW_SIZE = 3;
const defaultArrow = {
  path(item) {
    const keyShape = item.getKeyShape();
    let lineWidth = keyShape.attr('lineWidth');
    lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
    const width = lineWidth * 10 / 3;
    const halfHeight = lineWidth * 4 / 3;
    const radius = lineWidth * 4;
    return [
      [ 'M', -width, halfHeight ],
      [ 'L', 0, 0 ],
      [ 'L', -width, -halfHeight ],
      [ 'A', radius, radius, 0, 0, 1, -width, halfHeight ],
      [ 'Z' ]
    ];
  },
  shorten(item) {
    const keyShape = item.getKeyShape();
    const lineWidth = keyShape.attr('lineWidth');
    return (lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE) * 3.1;
  },
  style(item) {
    const keyShape = item.getKeyShape();
    const { strokeOpacity, stroke } = keyShape.attr();
    return {
      fillOpacity: strokeOpacity,
      fill: stroke
    };
  }
};

Shape.registerEdge('common', {
  draw(item) {
    const keyShape = this.drawKeyShape(item);
    this.drawLabel(item, keyShape);
    return keyShape;
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
  getStyle(item) {
    const model = item.getModel();
    return Util.mix(true, {}, {
      stroke: model.color || '#A3B1BF',
      strokeOpacity: 0.92,
      lineAppendWidth: 4,
      lineWidth: model.size || 1
    }, model.style);
  },
  getPath(item) {
    const points = item.getPoints();
    return Util.pointsToPolygon(points);
  },
  getLabel(item) {
    const model = item.getModel();
    return model.label;
  },
  getDefaultLabelRectStyle(/* item*/) {
    return {
      fill: 'white'
    };
  },
  getDefaultLabelRectPadding(/* item*/) {
    return Util.toAllPadding([ 4, 8 ]);
  },
  drawLabel(item, keyShape) {
    let label = this.getLabel(item);
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const { labelOffsetX, labelOffsetY, labelRotate } = model;
    if (label) {
      const center = keyShape.getPoint(0.5);
      if (!center) {
        return;
      }
      center.x = labelOffsetX ? center.x + labelOffsetX : center.x;
      center.y = labelOffsetY ? center.y + labelOffsetY : center.y;
      const attrs = Util.mix(true, {}, Global.labelStyle, center);

      if (!Util.isObject(label)) {
        attrs.text = label;
      } else {
        Util.mix(attrs, label);
      }
      label = group.addShape('text', {
        class: 'label',
        attrs
      });
      const padding = this.getDefaultLabelRectPadding(item);
      const defaultStyle = this.getDefaultLabelRectStyle(item);
      const textBox = label.getBBox();
      const style = model.labelRectStyle ? Util.mix({}, defaultStyle, model.labelRectStyle) : defaultStyle;
      const rect = group.addShape('rect', {
        attrs: Util.mix({}, style, {
          x: textBox.minX - padding[3],
          y: textBox.minY - padding[0],
          width: textBox.maxX - textBox.minX + padding[1] + padding[3],
          height: textBox.maxY - textBox.minY + padding[0] + padding[2]
        })
      });
      if (labelRotate) {
        const centerX = (textBox.maxX + textBox.minX) / 2;
        const centerY = (textBox.maxY + textBox.minY) / 2;

        // labelRotate
        label.transform([
          [ 't', -centerX, -centerY ],
          [ 'r', labelRotate, labelRotate ],
          [ 't', centerX, centerY ]
        ]);
        rect.transform([
          [ 't', -centerX, -centerY ],
          [ 'r', labelRotate, labelRotate ],
          [ 't', centerX, centerY ]
        ]);
      }
      Util.toFront(label);
    }
  },
  startArrow: {
    ...defaultArrow,
    tangent(item) {
      const keyShape = item.getKeyShape();
      return keyShape.getStartTangent();
    },
    ratio() {
      return 0;
    }
  },
  endArrow: {
    ...defaultArrow,
    tangent(item) {
      const keyShape = item.getKeyShape();
      return keyShape.getEndTangent();
    },
    ratio() {
      return 1;
    }
  }
});
