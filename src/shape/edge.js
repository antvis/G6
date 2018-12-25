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
// const NEXT_POINT_PERCENT = 0.01;

<<<<<<< HEAD
Shape.registerFactory('edge', {
  defaultShapeType: 'line'
});

Shape.registerEdge('common', {
  draw(item) {
    const keyShape = this.drawKeyShape(item);
    this.drawLabel(item, keyShape);
    return keyShape;
  },
  drawKeyShape(item) {
    const group = item.getGraphicGroup();
    const style = this.getStyle(item);
=======
// 注册 Node 的工厂方法
Shape.registerFactory('edge', {
  defaultShapeType: 'line'
});
>>>>>>> feat(edge): add edge

const singleEdgeDefinition = Util.mix({}, SingleShapeMixin, {
  itemType: 'edge',
  labelPosition: 'center', // start, left, center
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
  getLabelStyleByPosition(cfg, group) {
    const labelPosition = cfg.labelPosition || this.labelPosition; // 文本的位置用户可以传入
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
      const { refX, refY } = Global.edgeLabel; // 默认的偏移量
      style.x = point.x + refX;
      style.y = point.y + refY;
      // TO DO 文本对齐方式
      // TO DO 文本的自动旋转

    }
    return style;
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
