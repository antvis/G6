/**
 * @fileOverview edge shapes
 * @author huangtonger@aliyun.com
 */

const Shape = require('../shape');
const Util = require('../../util/');
const Global = require('../../global');
const MIN_ARROW_SIZE = 10 / 3;
const defaultArrow = {
  fill(item) {
    const keyShape = item.getKeyShape();
    return keyShape.attr('stroke');
  },
  path(item) {
    const keyShape = item.getKeyShape();
    let lineWidth = keyShape.attr('lineWidth');
    lineWidth = lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE;
    const halfWidth = lineWidth * 10 / 3;
    const halfHeight = lineWidth * 4 / 3;
    const radius = lineWidth * 4;
    return [
      [ 'M', -halfWidth, halfHeight ],
      [ 'L', 0, 0 ],
      [ 'L', -halfWidth, -halfHeight ],
      [ 'A', radius, radius, 0, 0, 1, -halfWidth, halfHeight ],
      [ 'Z' ]
    ];
  },
  dindent(item) {
    const keyShape = item.getKeyShape();
    const lineWidth = keyShape.attr('lineWidth');
    return (lineWidth > MIN_ARROW_SIZE ? lineWidth : MIN_ARROW_SIZE) * 1.2;
  },
  stroke() {
    return;
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
