/**
 * @fileOverview graphic util
 * @author huangtonger@aliyun.com
 */

const MathUtil = require('./math');

const GraphicUtil = {
  getBBox(element, parent) {
    const bbox = element.getBBox();
    let leftTop = {
      x: bbox.minX,
      y: bbox.minY
    };
    let rightBottom = {
      x: bbox.maxX,
      y: bbox.maxY
    };
    // 根据父元素变换矩阵
    if (parent) {
      const matrix = parent.getMatrix();
      leftTop = MathUtil.applyMatrix(leftTop, matrix);
      rightBottom = MathUtil.applyMatrix(rightBottom, matrix);
    }

    return {
      minX: leftTop.x,
      minY: leftTop.y,
      maxX: rightBottom.x,
      maxY: rightBottom.y
    };
  },
  radialLayout(graph, layout) {
    // 布局方式有 H / V / LR / RL / TB / BT
    const VERTICAL_LAYOUTS = [ 'V', 'TB', 'BT' ];
    const width = graph.get('width');
    const height = graph.get('height');
    const radius = Math.min(width, height);
    const min = {
      x: Infinity,
      y: Infinity
    };
    const max = {
      x: -Infinity,
      y: -Infinity
    };
    // 默认布局是垂直布局TB，此时x对应rad，y对应r
    let rScale = 'x';
    let radScale = 'y';
    if (layout && VERTICAL_LAYOUTS.indexOf(layout) >= 0) {
      // 若是水平布局，y对应rad，x对应r
      radScale = 'x';
      rScale = 'y';
    }
    graph.get('nodes').forEach(node => {
      const model = node.get('model');
      if (model.x > max.x) {
        max.x = model.x;
      }
      if (model.x < min.x) {
        min.x = model.x;
      }
      if (model.y > max.y) {
        max.y = model.y;
      }
      if (model.y < min.y) {
        min.y = model.y;
      }
    });
    const avgRad = Math.PI * 2 / graph.get('nodes').length;
    const radDiff = max[radScale] - min[radScale];
    graph.get('nodes').forEach(node => {
      const model = node.get('model');
      const radial = (model[radScale] - min[radScale]) / radDiff * (Math.PI * 2 - avgRad) + avgRad;
      const r = model[rScale] / max[rScale] * radius;
      model.x = r * Math.cos(radial);
      model.y = r * Math.sin(radial);
    });
    graph.refreshPositions();
    graph.fitView();
  }
};

module.exports = GraphicUtil;
