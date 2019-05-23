/**
 * @fileOverview 自定义边
 * @description 自定义边中有大量逻辑同自定义节点重复，虽然可以提取成为 mixin ，但是考虑到代码的可读性，还是单独实现。
 * @author dxq613@gmail.com
 */

const Shape = require('./shape');
const Util = require('../util/index');
const Global = require('../global');
const SingleShapeMixin = require('./single-shape-mixin');
const CLS_SHAPE = 'edge-shape';

// start,end 倒置，center 不变
function revertAlign(labelPosition) {
  let textAlign = labelPosition;
  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if (labelPosition === 'end') {
    textAlign = 'start';
  }
  return textAlign;
}


// 注册 Node 的工厂方法
Shape.registerFactory('edge', {
  defaultShapeType: 'line'
});

const singleEdgeDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'edge',
  /**
   * 文本的位置
   * @type {String}
   */
  labelPosition: 'center', // start, end, center
  /**
   * 文本是否跟着线自动旋转，默认 false
   * @type {Boolean}
   */
  labelAutoRotate: false,
  /**
   * 获取边的 path
   * @internal 供扩展的边覆盖
   * @param  {Array} points 构成边的点的集合
   * @return {Array} 构成 path 的数组
   */
  getPath(points) {
    const path = [];
    Util.each(points, (point, index) => {
      if (index === 0) {
        path.push([ 'M', point.x, point.y ]);
      } else {
        path.push([ 'L', point.x, point.y ]);
      }
    });
    return path;
  },
  getShapeStyle(cfg) {
    const color = cfg.color || Global.defaultEdge.color;
    const size = cfg.size || Global.defaultEdge.size;
    cfg = this.getPathPoints(cfg);
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const controlPoints = this.getControlPoints(cfg);
    let points = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = this.getPath(points);
    const style = Util.mix({}, Global.defaultEdge.style, {
      stroke: color,
      lineWidth: size,
      path
    }, cfg.style);
    return style;
  },
  getLabelStyleByPosition(cfg, labelCfg, group) {
    const labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入
    const style = {};
    const pathShape = group.findByClassName(CLS_SHAPE);
    // 不对 pathShape 进行判空，如果线不存在，说明有问题了
    let pointPercent;
    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    }
    const { refX, refY } = labelCfg; // 默认的偏移量
    // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移
    if (cfg.startPoint.x === cfg.endPoint.x && cfg.startPoint.y === cfg.endPoint.y) {
      style.x = cfg.startPoint.x + refX ? refX : 0;
      style.y = cfg.endPoint.y + refY ? refY : 0;
      return style;
    }
    const autoRotate = Util.isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;
    const offsetStyle = Util.getLabelPosition(pathShape, pointPercent, refX, refY, autoRotate);
    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    style.textAlign = this._getTextAlign(labelPosition, offsetStyle.angle);
    return style;
  },
  // 获取文本对齐方式
  _getTextAlign(labelPosition, angle) {
    let textAlign = 'center';
    if (!angle) {
      return labelPosition;
    }
    angle = angle % (Math.PI * 2); // 取模
    if (labelPosition !== 'center') {
      if ((angle >= 0 && angle <= Math.PI / 2) || (angle >= 3 / 2 * Math.PI && angle < 2 * Math.PI)) {
        textAlign = labelPosition;
      } else {
        textAlign = revertAlign(labelPosition);
      }
    }
    return textAlign;
  },
  /**
   * @internal 获取边的控制点
   * @param  {Object} cfg 边的配置项
   * @return {Array} 控制点的数组
   */
  getControlPoints(cfg) {
    return cfg.controlPoints;
  },
  /**
   * @internal 处理需要重计算点和边的情况
   * @param {Object} cfg 边的配置项
   * @return {Object} 边的配置项
   */
  getPathPoints(cfg) {
    return cfg;
  },
  /**
   * 绘制边
   * @override
   * @param  {Object} cfg   边的配置项
   * @param  {G.Group} group 边的容器
   * @return {G.Shape} 图形
   */
  drawShape(cfg, group) {
    const shapeStyle = this.getShapeStyle(cfg);
    const shape = group.addShape('path', {
      className: CLS_SHAPE,
      attrs: shapeStyle
    });
    return shape;
  }
});

// 直线
Shape.registerEdge('single-line', singleEdgeDefinition);

// 直线, 不支持控制点
Shape.registerEdge('line', {
  // 控制点不生效
  getControlPoints() {
    return [];
  }
}, 'single-line');

// 折线，支持多个控制点
Shape.registerEdge('polyline', {}, 'single-line');

// 直线
Shape.registerEdge('spline', {
  getPath(points) {
    const path = Util.getSpline(points);
    return path;
  }
}, 'single-line');

Shape.registerEdge('quadratic', {
  curvePosition: 0.5, // 弯曲的默认位置
  curveOffset: -20, // 弯曲度，沿着startPoint, endPoint 的垂直向量（顺时针）方向，距离线的距离，距离越大越弯曲
  getControlPoints(cfg) {
    let controlPoints = cfg.controlPoints; // 指定controlPoints
    if (!controlPoints || !controlPoints.length) {
      const { startPoint, endPoint } = cfg;
      const innerPoint = Util.getControlPoint(startPoint, endPoint, this.curvePosition, this.curveOffset);
      controlPoints = [ innerPoint ];
    }
    return controlPoints;
  },
  getPath(points) {
    const path = [];
    path.push([ 'M', points[0].x, points[0].y ]);
    path.push([ 'Q', points[1].x, points[1].y, points[2].x, points[2].y ]);
    return path;
  }
}, 'single-line');

Shape.registerEdge('cubic', {
  curvePosition: [ 1 / 2, 1 / 2 ],
  curveOffset: [ -20, 20 ],
  getControlPoints(cfg) {
    let controlPoints = cfg.controlPoints; // 指定controlPoints
    if (!controlPoints || !controlPoints.length) {
      const { startPoint, endPoint } = cfg;
      const innerPoint1 = Util.getControlPoint(startPoint, endPoint, this.curvePosition[0], this.curveOffset[0]);
      const innerPoint2 = Util.getControlPoint(startPoint, endPoint, this.curvePosition[1], this.curveOffset[1]);
      controlPoints = [ innerPoint1, innerPoint2 ];
    }
    return controlPoints;
  },
  getPath(points) {
    const path = [];
    path.push([ 'M', points[0].x, points[0].y ]);
    path.push([ 'C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y ]);
    return path;
  }
}, 'single-line');

// 垂直方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge('cubic-vertical', {
  curvePosition: [ 1 / 2, 1 / 2 ],
  getControlPoints(cfg) {
    const { startPoint, endPoint } = cfg;
    const innerPoint1 = {
      x: startPoint.x,
      y: (endPoint.y - startPoint.y) * this.curvePosition[0] + startPoint.y
    };
    const innerPoint2 = {
      x: endPoint.x,
      y: (endPoint.y - startPoint.y) * this.curvePosition[1] + startPoint.y
    };
    const controlPoints = [ innerPoint1, innerPoint2 ];
    return controlPoints;
  }
}, 'cubic');

// 水平方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge('cubic-horizontal', {
  curvePosition: [ 1 / 2, 1 / 2 ],
  getControlPoints(cfg) {
    const { startPoint, endPoint } = cfg;
    const innerPoint1 = {
      x: (endPoint.x - startPoint.x) * this.curvePosition[0] + startPoint.x,
      y: startPoint.y
    };
    const innerPoint2 = {
      x: (endPoint.x - startPoint.x) * this.curvePosition[1] + startPoint.x,
      y: endPoint.y
    };
    const controlPoints = [ innerPoint1, innerPoint2 ];
    return controlPoints;
  }
}, 'cubic');

Shape.registerEdge('loop', {
  getPathPoints(cfg) {
    return Util.getLoopCfgs(cfg);
  },
  getControlPoints(cfg) {
    return cfg.controlPoints;
  },
  afterDraw(cfg) {
    cfg.controlPoints = null;
  },
  afterUpdate(cfg) {
    cfg.controlPoints = null;
  }
}, 'cubic');
