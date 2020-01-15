import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group'
import { deepMix, each } from '@antv/util'
import { IShapeBase, Item, ModelConfig, IPoint } from '../../../types';
import { pointsToPolygon } from '../../util/path'
import Global from '../../global'
import Shape from '../shape'
import { getPathWithBorderRadiusByPolyline, getPolylinePoints, simplifyPolyline } from './polyline-util';
import Util from '../../util';

const CLS_SHAPE_SUFFIX = '-shape';
const CLS_LABEL_SUFFIX = '-label';


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
    
    const startPoint = cfg.startPoint;
    const endPoint = cfg.endPoint;
    const controlPoints = this.getControlPoints(cfg) || cfg.controlPoints;
    let points = [ startPoint ]; // 添加起始点
    // 添加控制点
    if (controlPoints) {
      points = points.concat(controlPoints);
    }
    // 添加结束点
    points.push(endPoint);
    const source = cfg.sourceNode;
    const target = cfg.targetNode;
    let routeCfg: {[key: string]: unknown} = { radius: style.radius };
    if (!controlPoints) {
      routeCfg = { source, target, offset: style.offset, radius: style.radius };
    }
    this.routeCfg = routeCfg;

    
    const path = this.getPath(points);
    const attrs = deepMix({}, Global.defaultEdge.style, style, {
      lineWidth: cfg.size
    }, { path });
    return attrs;
  },
  getPath(points: Point[]): Array<Array<string | number>> | string {
    const { source, target, offset, radius } = this.routeCfg;
    if (!offset || points.length > 2) {
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
  }
}, 'single-line');
