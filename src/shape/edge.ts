/**
 * @fileOverview 自定义边
 * @description 自定义边中有大量逻辑同自定义节点重复，虽然可以提取成为 mixin ，但是考虑到代码的可读性，还是单独实现。
 * @author dxq613@gmail.com
 */

import { Point } from '@antv/g-base/lib/types';
import GGroup from '@antv/g-canvas/lib/group';
import { IShape, IElement } from '@antv/g-canvas/lib/interfaces';
import { deepMix, mix, each, isNil } from '@antv/util';
import { ILabelConfig, ShapeOptions } from '../interface/shape';
import { EdgeConfig, EdgeData, IPoint, LabelStyle, ShapeStyle, Item, ModelConfig } from '../types';
import { getLabelPosition, getLoopCfgs } from '../util/graphic';
import { distance, getCircleCenterByPoints } from '../util/math';
import { getControlPoint, getSpline } from '../util/path';
import Global from '../global';
import Shape from './shape';
import { shapeBase, CLS_LABEL_BG_SUFFIX } from './shapeBase';
import { mat3, transform } from '@antv/matrix-util';
import { Path } from '@antv/g-canvas/lib/shape';
import isArray from '@antv/util/lib/is-array';
import isNumber from '@antv/util/lib/is-number';

const CLS_SHAPE = 'edge-shape';

// start,end 倒置，center 不变
function revertAlign(labelPosition: string): string {
  let textAlign = labelPosition;
  if (labelPosition === 'start') {
    textAlign = 'end';
  } else if (labelPosition === 'end') {
    textAlign = 'start';
  }
  return textAlign;
}

const singleEdge: ShapeOptions = {
  itemType: 'edge',
  /**
   * 文本的位置
   * @type {String}
   */
  labelPosition: 'center', // start, end, center
  /**
   * 文本的 x 偏移
   * @type {Number}
   */
  refX: 0,
  /**
   * 文本的 y 偏移
   * @type {Number}
   */
  refY: 0,
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
  getPath(points: Point[]): Array<Array<string | number>> {
    const path: Array<Array<string | number>> = [];
    each(points, (point: Point, index: number) => {
      if (index === 0) {
        path.push(['M', point.x, point.y]);
      } else {
        path.push(['L', point.x, point.y]);
      }
    });
    return path;
  },
  getShapeStyle(cfg: EdgeConfig): ShapeStyle {
    const { style: defaultStyle } = this.options as ModelConfig;
    const strokeStyle: ShapeStyle = {
      stroke: cfg.color,
    };
    // 如果设置了color，则覆盖默认的stroke属性
    const style: ShapeStyle = mix({}, defaultStyle, strokeStyle, cfg.style);

    const size = cfg.size || Global.defaultEdge.size;
    cfg = this.getPathPoints!(cfg);
    const { startPoint, endPoint } = cfg;

    const controlPoints = this.getControlPoints!(cfg);
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const path = (this as any).getPath(points);
    const styles = mix(
      {},
      Global.defaultEdge.style as ShapeStyle,
      {
        stroke: Global.defaultEdge.color,
        lineWidth: size,
        path,
      } as ShapeStyle,
      style,
    );
    return styles;
  },
  updateShapeStyle(cfg: EdgeConfig, item: Item) {
    const group = item.getContainer();
    const strokeStyle: ShapeStyle = {
      stroke: cfg.color,
    };
    const shape =
      group.find(element => element.get('className') === 'edge-shape') || item.getKeyShape();

    const { size } = cfg;
    cfg = this.getPathPoints!(cfg);

    const { startPoint, endPoint } = cfg;

    const controlPoints = this.getControlPoints!(cfg); // || cfg.controlPoints;
    let points = [startPoint]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);

    const previousStyle = mix({}, strokeStyle, shape.attr(), cfg.style);
    const source = cfg.sourceNode;
    const target = cfg.targetNode;
    let routeCfg: { [key: string]: unknown } = { radius: previousStyle.radius };
    if (!controlPoints) {
      routeCfg = { source, target, offset: previousStyle.offset, radius: previousStyle.radius };
    }
    const path = (this as any).getPath(points, routeCfg);
    const style = mix(
      strokeStyle,
      shape.attr(),
      {
        lineWidth: size,
        path,
      },
      cfg.style,
    );

    if (shape) {
      shape.attr(style);
    }
  },
  getLabelStyleByPosition(cfg: EdgeConfig, labelCfg: ILabelConfig, group?: GGroup): LabelStyle {
    const labelPosition = labelCfg.position || this.labelPosition; // 文本的位置用户可以传入
    const style: LabelStyle = {};

    const pathShape =
      group && (group.find(element => element.get('className') === CLS_SHAPE) as Path);

    // 不对 pathShape 进行判空，如果线不存在，说明有问题了
    let pointPercent;
    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    }
    // 偏移量
    const offsetX = labelCfg.refX || (this.refX as number);
    const offsetY = labelCfg.refY || (this.refY as number);
    // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移
    if (cfg.startPoint!.x === cfg.endPoint!.x && cfg.startPoint!.y === cfg.endPoint!.y) {
      style.x = cfg.startPoint!.x + offsetX;
      style.y = cfg.startPoint!.y + offsetY;
      style.text = cfg.label;
      return style;
    }

    const autoRotate = isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;
    const offsetStyle = getLabelPosition(
      pathShape as Path,
      pointPercent,
      offsetX,
      offsetY,
      autoRotate as boolean,
    );
    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    style.textAlign = this._getTextAlign!(labelPosition as string, offsetStyle.angle as number);
    style.text = cfg.label;
    return style;
  },
  getLabelBgStyleByPosition(
    label: IElement,
    cfg: ModelConfig,
    labelCfg?: ILabelConfig,
    group?: GGroup,
  ) {
    if (!label) {
      return {};
    }
    const bbox = label.getBBox();
    const backgroundStyle = labelCfg.style && labelCfg.style.background;
    if (!backgroundStyle) {
      return {};
    }
    const { padding } = backgroundStyle;
    const backgroundWidth = bbox.width + padding[1] + padding[3];
    const backgroundHeight = bbox.height + padding[0] + padding[2];
    const labelPosition = labelCfg.position || this.labelPosition;
    const style = {
      ...backgroundStyle,
      width: backgroundWidth,
      height: backgroundHeight,
      x: 0,
      y: 0,
      rotate: 0,
    };

    const pathShape =
      group && (group.find(element => element.get('className') === CLS_SHAPE) as Path);

    // 不对 pathShape 进行判空，如果线不存在，说明有问题了
    let pointPercent;
    if (labelPosition === 'start') {
      pointPercent = 0;
    } else if (labelPosition === 'end') {
      pointPercent = 1;
    } else {
      pointPercent = 0.5;
    }
    // 偏移量
    const offsetX = labelCfg.refX || (this.refX as number);
    const offsetY = labelCfg.refY || (this.refY as number);
    // 如果两个节点重叠，线就变成了一个点，这时候label的位置，就是这个点 + 绝对偏移
    if (cfg.startPoint!.x === cfg.endPoint!.x && cfg.startPoint!.y === cfg.endPoint!.y) {
      style.x = cfg.startPoint!.x + offsetX;
      style.y = cfg.startPoint!.y + offsetY;
      return style;
    }

    const autoRotate = isNil(labelCfg.autoRotate) ? this.labelAutoRotate : labelCfg.autoRotate;

    let offsetStyle = getLabelPosition(
      pathShape,
      pointPercent,
      offsetX - backgroundWidth / 2,
      offsetY + backgroundHeight / 2,
      autoRotate,
    );

    const rad = offsetStyle.angle;

    if (rad > (1 / 2) * Math.PI && rad < ((3 * 1) / 2) * Math.PI) {
      offsetStyle = getLabelPosition(
        pathShape,
        pointPercent,
        offsetX + backgroundWidth / 2,
        offsetY + backgroundHeight / 2,
        autoRotate,
      );
    }

    style.x = offsetStyle.x;
    style.y = offsetStyle.y;
    style.rotate = offsetStyle.rotate;
    return style;
  },
  // 获取文本对齐方式
  _getTextAlign(labelPosition: string, angle: number): string {
    let textAlign = 'center';
    if (!angle) {
      return labelPosition;
    }
    angle = angle % (Math.PI * 2); // 取模
    if (labelPosition !== 'center') {
      if (
        (angle >= 0 && angle <= Math.PI / 2) ||
        (angle >= (3 / 2) * Math.PI && angle < 2 * Math.PI)
      ) {
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
  getControlPoints(cfg: EdgeConfig): IPoint[] | undefined {
    return cfg.controlPoints;
  },
  /**
   * @internal 处理需要重计算点和边的情况
   * @param {Object} cfg 边的配置项
   * @return {Object} 边的配置项
   */
  getPathPoints(cfg: EdgeConfig): EdgeConfig {
    return cfg;
  },
  /**
   * 绘制边
   * @override
   * @param  {Object} cfg   边的配置项
   * @param  {G.Group} group 边的容器
   * @return {IShape} 图形
   */
  drawShape(cfg: EdgeConfig, group: GGroup): IShape {
    const shapeStyle = this.getShapeStyle!(cfg);
    const shape = group.addShape('path', {
      className: CLS_SHAPE,
      name: CLS_SHAPE,
      attrs: shapeStyle,
    });
    return shape;
  },
  drawLabel(cfg: EdgeConfig, group: GGroup): IShape {
    const { labelCfg: defaultLabelCfg } = this.options as ModelConfig;
    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle!(cfg, labelCfg, group);
    const rotate = labelStyle.rotate;
    delete labelStyle.rotate;
    const label = group.addShape('text', {
      attrs: labelStyle,
      name: 'text-shape',
    });
    if (rotate) {
      label.rotateAtStart(rotate);
    }

    if (labelStyle.background) {
      const rect = this.drawLabelBg(cfg, group, label);
      const labelBgClassname = this.itemType + CLS_LABEL_BG_SUFFIX;
      rect.set('classname', labelBgClassname);
      label.toFront();
    }
    return label;
  },
  drawLabelBg(cfg: ModelConfig, group: GGroup, label: IElement) {
    const { labelCfg: defaultLabelCfg } = this.options as ModelConfig;
    const labelCfg = deepMix({}, defaultLabelCfg, cfg.labelCfg);
    const labelStyle = this.getLabelStyle!(cfg, labelCfg, group);
    const rotate = labelStyle.rotate;

    const style = this.getLabelBgStyleByPosition(label, cfg, labelCfg, group);
    const rect = group.addShape('rect', { name: 'text-bg-shape', attrs: style });
    rect.rotateAtStart(rotate);
    return rect;
  },
};

const singleEdgeDef = Object.assign({}, shapeBase, singleEdge);
Shape.registerEdge('single-edge', singleEdgeDef);

// 直线, 不支持控制点
Shape.registerEdge(
  'line',
  {
    // 控制点不生效
    getControlPoints() {
      return undefined;
    },
  },
  'single-edge',
);

// 直线
Shape.registerEdge(
  'spline',
  {
    getPath(points: Point[]): Array<Array<string | number>> {
      const path = getSpline(points);
      return path;
    },
  },
  'single-edge',
);

Shape.registerEdge(
  'arc',
  {
    curveOffset: 20,
    clockwise: 1,
    getControlPoints(cfg: EdgeConfig): IPoint[] {
      const { startPoint, endPoint } = cfg;

      const midPoint = {
        x: (startPoint.x + endPoint.x) / 2,
        y: (startPoint.y + endPoint.y) / 2,
      };
      let center;
      let arcPoint;
      // 根据给定点计算圆弧
      if (cfg.controlPoints !== undefined) {
        arcPoint = cfg.controlPoints[0];
        center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
        // 根据控制点和直线关系决定 clockwise值
        if (startPoint.x <= endPoint.x && startPoint.y > endPoint.y) {
          this.clockwise = center.x > arcPoint.x ? 0 : 1;
        } else if (startPoint.x <= endPoint.x && startPoint.y < endPoint.y) {
          this.clockwise = center.x > arcPoint.x ? 1 : 0;
        } else if (startPoint.x > endPoint.x && startPoint.y <= endPoint.y) {
          this.clockwise = center.y < arcPoint.y ? 0 : 1;
        } else {
          this.clockwise = center.y < arcPoint.y ? 1 : 0;
        }
        // 若给定点和两端点共线，无法生成圆弧，绘制直线
        if (
          (arcPoint.x - startPoint.x) / (arcPoint.y - startPoint.y) ===
          (endPoint.x - startPoint.x) / (endPoint.y - startPoint.y)
        ) {
          return [];
        }
      } else {
        // 根据直线连线中点的的偏移计算圆弧
        // 若用户给定偏移量则根据其计算，否则按照默认偏移值计算
        if (cfg.curveOffset === undefined) {
          cfg.curveOffset = this.curveOffset;
        }
        if (isArray(cfg.curveOffset)) {
          cfg.curveOffset = cfg.curveOffset[0];
        }
        if (cfg.curveOffset < 0) {
          this.clockwise = 0;
        } else {
          this.clockwise = 1;
        }
        const vec = {
          x: endPoint.x - startPoint.x,
          y: endPoint.y - startPoint.y,
        };
        const edgeAngle = Math.atan2(vec.y, vec.x);
        arcPoint = {
          x: cfg.curveOffset * Math.cos(-Math.PI / 2 + edgeAngle) + midPoint.x,
          y: cfg.curveOffset * Math.sin(-Math.PI / 2 + edgeAngle) + midPoint.y,
        };
        center = getCircleCenterByPoints(startPoint, arcPoint, endPoint);
      }
      const radius = distance(startPoint, center);
      const controlPoints = [{ x: radius, y: radius }];

      return controlPoints;
    },
    getPath(points: Point[]): Array<Array<string | number>> {
      const path: Array<Array<string | number>> = [];
      path.push(['M', points[0].x, points[0].y]);
      // 控制点与端点共线
      if (points.length === 2) {
        path.push(['L', points[1].x, points[1].y]);
      } else {
        path.push([
          'A',
          points[1].x,
          points[1].y,
          0,
          0,
          this.clockwise as number,
          points[2].x,
          points[2].y,
        ]);
      }
      return path;
    },
  },
  'single-edge',
);

Shape.registerEdge(
  'quadratic',
  {
    curvePosition: 0.5, // 弯曲的默认位置
    curveOffset: -20, // 弯曲度，沿着 startPoint, endPoint 的垂直向量（顺时针）方向，距离线的距离，距离越大越弯曲
    getControlPoints(cfg: EdgeConfig): IPoint[] {
      let { controlPoints } = cfg; // 指定controlPoints
      if (!controlPoints || !controlPoints.length) {
        const { startPoint, endPoint } = cfg;
        if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
        if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
        if (isArray(this.curveOffset)) cfg.curveOffset = cfg.curveOffset[0];
        if (isArray(this.curvePosition)) cfg.curvePosition = cfg.curveOffset[0];
        const innerPoint = getControlPoint(
          startPoint as Point,
          endPoint as Point,
          cfg.curvePosition as number,
          cfg.curveOffset as number,
        );
        controlPoints = [innerPoint];
      }
      return controlPoints;
    },
    getPath(points: Point[]): Array<Array<string | number>> {
      const path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push(['Q', points[1].x, points[1].y, points[2].x, points[2].y]);
      return path;
    },
  },
  'single-edge',
);

Shape.registerEdge(
  'cubic',
  {
    curvePosition: [1 / 2, 1 / 2],
    curveOffset: [-20, 20],
    getControlPoints(cfg: EdgeConfig): IPoint[] {
      let { controlPoints } = cfg; // 指定controlPoints
      if (cfg.curveOffset === undefined) cfg.curveOffset = this.curveOffset;
      if (cfg.curvePosition === undefined) cfg.curvePosition = this.curvePosition;
      if (isNumber(cfg.curveOffset)) cfg.curveOffset = [cfg.curveOffset, -cfg.curveOffset];
      if (isNumber(cfg.curvePosition)) cfg.curvePosition = [cfg.curvePosition, 1 - cfg.curvePosition];
      if (!controlPoints || !controlPoints.length || controlPoints.length < 2) {
        const { startPoint, endPoint } = cfg;
        const innerPoint1 = getControlPoint(
          startPoint as Point,
          endPoint as Point,
          cfg.curvePosition[0],
          cfg.curveOffset[0],
        );
        const innerPoint2 = getControlPoint(
          startPoint as Point,
          endPoint as Point,
          cfg.curvePosition[1],
          cfg.curveOffset[1],
        );
        controlPoints = [innerPoint1, innerPoint2];
      }
      return controlPoints;
    },
    getPath(points: Point[]): Array<Array<string | number>> {
      const path = [];
      path.push(['M', points[0].x, points[0].y]);
      path.push([
        'C',
        points[1].x,
        points[1].y,
        points[2].x,
        points[2].y,
        points[3].x,
        points[3].y,
      ]);
      return path;
    },
  },
  'single-edge',
);

// 垂直方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge(
  'cubic-vertical',
  {
    curvePosition: [1 / 2, 1 / 2],
    getControlPoints(cfg: EdgeConfig): IPoint[] {
      const { startPoint, endPoint } = cfg;
      if (cfg.curvePosition !== undefined) this.curvePosition = cfg.curvePosition;
      if (isNumber(this.curvePosition)) this.curvePosition = [this.curvePosition, 1 - this.curvePosition];
      const innerPoint1 = {
        x: startPoint!.x,
        y: (endPoint!.y - startPoint!.y) * (this as any).curvePosition[0] + startPoint!.y,
      };
      const innerPoint2 = {
        x: endPoint!.x,
        y: (endPoint!.y - startPoint!.y) * (this as any).curvePosition[1] + startPoint!.y,
      };
      const controlPoints = [innerPoint1, innerPoint2];
      return controlPoints;
    },
  },
  'cubic',
);

// 水平方向的三阶贝塞尔曲线，不再考虑用户外部传入的控制点
Shape.registerEdge(
  'cubic-horizontal',
  {
    curvePosition: [1 / 2, 1 / 2],
    getControlPoints(cfg: EdgeConfig): IPoint[] {
      const { startPoint, endPoint } = cfg;
      if (cfg.curvePosition !== undefined) this.curvePosition = cfg.curvePosition;
      if (isNumber(this.curvePosition)) this.curvePosition = [this.curvePosition, 1 - this.curvePosition];
      const innerPoint1 = {
        x: (endPoint!.x - startPoint!.x) * (this as any).curvePosition[0] + startPoint!.x,
        y: startPoint!.y,
      };
      const innerPoint2 = {
        x: (endPoint!.x - startPoint!.x) * (this as any).curvePosition[1] + startPoint!.x,
        y: endPoint!.y,
      };
      const controlPoints = [innerPoint1, innerPoint2];
      return controlPoints;
    },
  },
  'cubic',
);

Shape.registerEdge(
  'loop',
  {
    getPathPoints(cfg: ModelConfig): EdgeData {
      return getLoopCfgs(cfg as EdgeData);
    },
    getControlPoints(cfg: EdgeConfig): IPoint[] | undefined {
      return cfg.controlPoints;
    },
    afterDraw(cfg: EdgeConfig) {
      cfg.controlPoints = undefined;
    },
    afterUpdate(cfg: EdgeConfig) {
      cfg.controlPoints = undefined;
    },
  },
  'cubic',
);
