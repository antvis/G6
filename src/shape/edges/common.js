/**
 * @fileOverview edge shapes
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');
const Global = require('../../global');
const MIN_ARROW_SIZE = 6;
const defaultArrow = {
  path(item) {
    const keyShape = item.getKeyShape();
    let lineWidth = keyShape.attr('lineWidth');
    lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
    return [
      [ 'M', -lineWidth * 2, lineWidth ],
      [ 'L', 0, 0 ],
      [ 'L', -lineWidth * 2, -lineWidth ],
      [ 'Z' ]
    ];
  },
  dindent(item) {
    const keyShape = item.getKeyShape();
    const lineWidth = keyShape.attr('lineWidth');
    return lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
  },
  style(item) {
    const keyShape = item.getKeyShape();
    const { strokeOpacity, stroke } = keyShape.get('attrs');
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
  drawLabel(item, keyShape) {
    let label = this.getLabel(item);
    const group = item.getGraphicGroup();
    const model = item.getModel();

    if (label) {
      const center = keyShape.getPoint(0.5);
      const attrs = Util.mix(true, {}, Global.labelStyle, center);

      if (!Util.isObject(label)) {
        attrs.text = label;
      } else {
        Util.mix(attrs, label);
      }
      label = group.addShape('text', {
        attrs
      });
      const padding = Util.toAllPadding([ 4, 8 ]);
      const textBox = label.getBBox();
      const defaultStyle = {
        fill: 'white'
      };
      const style = model.labelRectStyle ? Util.mix({}, defaultStyle, model.labelRectStyle) : defaultStyle;
      group.addShape('rect', {
        attrs: Util.mix({}, style, {
          x: textBox.minX - padding[3],
          y: textBox.minY - padding[0],
          width: textBox.maxX - textBox.minX + padding[1] + padding[3],
          height: textBox.maxY - textBox.minY + padding[0] + padding[2]
        })
      });
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
