/**
 * @fileOverview graphic util
 * @author huangtonger@aliyun.com
 */

const MathUtil = require('./math');
const BaseUtil = require('./base');

function traverse(data, fn) {
  if (fn(data) === false) {
    return;
  }
  BaseUtil.each(data.children, child => {
    traverse(child, fn);
  });
}

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
  traverseTree(data, fn) {
    if (typeof fn !== 'function') {
      return;
    }
    traverse(data, fn);
  },
  radialLayout(data, layout) {
    // 布局方式有 H / V / LR / RL / TB / BT
    const VERTICAL_LAYOUTS = [ 'V', 'TB', 'BT' ];
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
    let count = 0;
    this.traverseTree(data, node => {
      count++;
      if (node.x > max.x) {
        max.x = node.x;
      }
      if (node.x < min.x) {
        min.x = node.x;
      }
      if (node.y > max.y) {
        max.y = node.y;
      }
      if (node.y < min.y) {
        min.y = node.y;
      }
    });
    const avgRad = Math.PI * 2 / count;
    const radDiff = max[radScale] - min[radScale];
    if (radDiff === 0) {
      return data;
    }
    this.traverseTree(data, node => {
      const radial = (node[radScale] - min[radScale]) / radDiff * (Math.PI * 2 - avgRad) + avgRad;
      const r = node[rScale];
      node.x = r * Math.cos(radial);
      node.y = r * Math.sin(radial);
    });
    return data;
  }
};

module.exports = GraphicUtil;
