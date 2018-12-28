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
const vec2 = Util.vec2;
const DIFF_POINT_PERCENT = 0.01; // 计算切线使用

// start,end 倒置，center 不变
function revertAlign(labelPosition) {
  let textAlign = labelPosition;
  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if(labelPosition === 'end') {
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
    const color = cfg.color || Global.edgeColor;
    const size = cfg.size;
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
    const style = Util.mix({}, {
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
    if (pathShape) {
      let pointPercent;
      if (labelPosition === 'start') {
        pointPercent = 0;
      } else if (labelPosition === 'end') {
        pointPercent = 1;
      } else {
        pointPercent = 0.5;
      }
      const point = pathShape.getPoint(pointPercent);
      let firstPoint;
      let nextPoint;
      if (pointPercent === 1) {
        firstPoint = pathShape.getPoint(pointPercent - DIFF_POINT_PERCENT);
        nextPoint = point;
      } else {
        firstPoint = point;
        nextPoint = pathShape.getPoint(pointPercent + DIFF_POINT_PERCENT);
      }
      const autoRotate = Util.isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;
      const tangent = [];
      vec2.normalize(tangent, [nextPoint.x - firstPoint.x, nextPoint.y - firstPoint.y]); // 求切线
      const { refX, refY } = labelCfg; // 默认的偏移量
      if (refX || refY) { // 进行偏移时，求偏移向量
        const offset = this._getOffset(refX, refY, tangent);
        style.x = point.x + offset[0];
        style.y = point.y + offset[1];
      } else {
        style.x = point.x;
        style.y = point.y;
      }
      const angle = vec2.angleTo([1, 0], tangent);
      const textAlign = this._getTextAlign(labelPosition, angle, autoRotate);
      style.textAlign = textAlign;
      if (autoRotate) {
        style.rotate = this._getAutoRotate(labelPosition, textAlign, angle);
      }
    }
    return style;
  },
  // 根据相对偏移量
  _getOffset(refX, refY, tangent) {
    const perpendicular = [-tangent[1], tangent[0]]; // (x,y) 顺时针方向的垂直线 (-y, x);
    const out = []; // gl-matrix 的接口定义如果返回结果是 vector ， xxx(out, a, b); 所以必须事先定义返回量
    const xVector = [];
    const yVector = [];
    vec2.scale(xVector, tangent, refX);
    vec2.scale(yVector, perpendicular, refY);
    vec2.add(out, xVector, yVector);
    return out;
  },
  // 根据角度和对齐方式自动获取旋转角度
  _getAutoRotate(labelPosition, textAlign, angle) {
    let rotate = 0;
    if (labelPosition === 'center') {
      if (angle > 1 / 2 * Math.PI && angle < 3 * 1 / 2 * Math.PI) {
        rotate = angle - Math.PI;
      } else {
        rotate = angle;
      }
    } else {
      if (labelPosition === textAlign) {
        rotate = angle;
      } else {
        rotate = angle - Math.PI;
      }
    }
    return rotate;
  },
  // 获取文本对齐方式
  _getTextAlign(labelPosition, angle) {
    let textAlign = 'center';
    angle = angle % (Math.PI * 2); // 取模
    if (labelPosition !== 'center') {
      if((angle >= 0 && angle <= Math.PI / 2) || (angle > 3 / 2 * Math.PI && angle < 2 * Math.PI)) {
        textAlign = labelPosition;
      }else  {
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
    const path = [];
    Util.each(points, (point, index) => {
      if (index === 0) {
        path.push([ 'M', point.x, point.y ]);
      } else {
        path.push([ 'L', point.x, point.y ]);
      }
    });
    return Util.catmullRomToBezier(path);
  }
}, 'single-line');

Shape.registerEdge('quadratic', {
  getPath(points) {
    const path = [];
    path.push([ 'M', points[0].x, points[0].y ]);
    if (points.length < 3) { // 如果只有两个点，则直接使用直线，不可能小于两个点
      path.push([ 'L', points[1].x, points[1].y ]);
    } else {
      path.push([ 'Q', points[1].x, points[1].y, points[2].x, points[2].y ]);
    }
    return path;
  }
}, 'single-line');

Shape.registerEdge('cubic', {
  getPath(points) {
    const path = [];
    path.push([ 'M', points[0].x, points[0].y ]);
    if (points.length < 4) {
      for (let i = 1; i < points.length; i++) {
        path.push([ 'L', points[i].x, points[i].y ]);
      }
    } else {
      path.push([ 'C', points[1].x, points[1].y, points[2].x, points[2].y, points[3].x, points[3].y ]);
    }
    return path;
  }
}, 'single-line');
