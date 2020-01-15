import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group'
import { deepMix, each } from '@antv/util'
import { IShapeBase, Item, ModelConfig, IPoint } from '../../../types';
import { pointsToPolygon } from '../../util/path'
import Global from '../../global'
import Shape from '../shape'
import { getPathWithBorderRadiusByPolyline, getPolylinePoints, simplifyPolyline } from './polyline-util';

const CLS_SHAPE_SUFFIX = '-shape';

// 折线
Shape.registerEdge('polyline', {
  options: {
    color: Global.defaultEdge.color,
    style: {
      radius: 0,
      offset: 5,
      x: 0,
      y: 0
    },
    // 文本样式配置
    labelCfg: {
      style: {
        fill: '#595959'
      }
    }
  },
  shapeType: 'polyline',
  // 文本位置
  labelPosition: 'center',
  drawShape(cfg: ModelConfig, group: Group) {
    const shapeStyle = this.getShapeStyle(cfg);
    const keyShape = group.addShape('path', {
      className: 'edge-shape',
      name: 'edge-shape',
      attrs: shapeStyle
    });
    return keyShape;
  },
  getShapeStyle(cfg: ModelConfig) {
    const { style: defaultStyle } = this.options;

    const strokeStyle = {
      stroke: cfg.color
    };

    const style = deepMix({}, defaultStyle, strokeStyle, cfg.style);
    cfg = this.getPathPoints(cfg);

    this.radius = style.radius;
    this.offset = style.offset;

    this.routeCfg = { radius: this.radius };

    const points = this.getControlPoints(cfg);

    
    const path = this.getPath(points, this.routeCfg);
    const attrs = deepMix({}, Global.defaultEdge.style, style, {
      lineWidth: cfg.size
    }, { path });
    return attrs;
  },
  getControlPoints(cfg: ModelConfig): IPoint[] {
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const controlPoints = cfg.controlPoints;
    let points: IPoint[] = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);

    const source = cfg.sourceNode;
    const target = cfg.targetNode;
    if (!cfg.controlPoints) {
      this.routeCfg = { source, target, offset: this.offset, radius: this.radius };
    }

    return points;
  },
  getPath(points: Point[], routeCfg: { source: IShapeBase, target: IShapeBase, offset: number, radius: number }): Array<Array<string | number>> | string {
    const { source, target, offset, radius } = routeCfg;
    if (!offset) {
      if (radius) {
        return getPathWithBorderRadiusByPolyline(points, radius);
      } else {
        const pathArray = [];
        each(points, (point, index) => {
          if (index === 0) {
            pathArray.push([ 'M', point.x, point.y ]);
          } else {
            pathArray.push([ 'L', point.x, point.y ]);
          }
        });
        return pathArray;
      }
    }
    let polylinePoints
    if (radius) {
      polylinePoints = simplifyPolyline(
        getPolylinePoints(points[0], points[points.length - 1], source, target, offset)
      );
      return getPathWithBorderRadiusByPolyline(polylinePoints, radius);
    }
    polylinePoints = getPolylinePoints(points[0],
      points[points.length - 1], source, target, offset);
    return pointsToPolygon(polylinePoints);
  },

  update(cfg: ModelConfig, item: Item) {
    const group = item.getContainer();
    const shapeClassName = this.itemType + CLS_SHAPE_SUFFIX;
    const shape = group.find(element => { return element.get('className') === shapeClassName})
    if (!cfg.style) {
      cfg.style = {};
    }
    // const oriShapeAttrs = shape.attr();
    // cfg.style.radius = cfg.style.radius || oriShapeAttrs.radius;
    // cfg.style.offset = cfg.style.offset || oriShapeAttrs.offset;

    cfg = this.getPathPoints(cfg);
    const points = this.getControlPoints(cfg);
    
    const path = this.getPath(points, this.routeCfg);
     // 下面这些属性需要覆盖默认样式与目前样式，但若在 cfg 中有指定则应该被 cfg 的相应配置覆盖。
     const strokeStyle = {
      stroke: cfg.color,
      path
    };
    const shapeStyle = deepMix({}, shape.attr(), strokeStyle, cfg.style);

    shape.attr(shapeStyle);
    this.updateLabel(cfg, item);
  }
}, 'single-line');
