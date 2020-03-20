import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group';
import { mix, each, isNumber } from '@antv/util';
import { ModelConfig, ShapeStyle } from '../../types';
import { pointsToPolygon } from '../../util/path';
import Global from '../../global';
import Shape from '../shape';
import {
  getPathWithBorderRadiusByPolyline,
  getPolylinePoints,
  simplifyPolyline,
} from './polyline-util';

// 折线
Shape.registerEdge(
  'polyline',
  {
    options: {
      color: Global.defaultEdge.color,
      style: {
        radius: 0,
        offset: 5,
        x: 0,
        y: 0,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: '#595959',
        },
      },
    },
    shapeType: 'polyline',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: ModelConfig, group: Group) {
      const shapeStyle = (this as any).getShapeStyle(cfg);
      const keyShape = group.addShape('path', {
        className: 'edge-shape',
        name: 'edge-shape',
        attrs: shapeStyle,
      });
      return keyShape;
    },
    getShapeStyle(cfg: ModelConfig): ShapeStyle {
      const { style: defaultStyle } = this.options as ModelConfig;

      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };

      const style: ShapeStyle = mix({}, defaultStyle, strokeStyle, cfg.style);
      cfg = (this as any).getPathPoints(cfg);

      this.radius = style.radius;
      this.offset = style.offset;

      let { startPoint, endPoint } = cfg;
      const controlPoints = (this as any).getControlPoints(cfg);
      let points = [startPoint]; // 添加起始点
      // 添加控制点
      if (controlPoints) {
        points = points.concat(controlPoints);
      }
      // 添加结束点
      points.push(endPoint);
      const source = cfg.sourceNode;
      const target = cfg.targetNode;
      let routeCfg: { [key: string]: unknown } = { radius: style.radius };
      if (!controlPoints) {
        routeCfg = { source, target, offset: style.offset, radius: style.radius };
      }
      let path = (this as any).getPath(points, routeCfg);
      if (path === 'M ' || path === 'M0 0') {
        path = 'M0 0, L0 0';
      }
      if (isNaN(startPoint.x) || isNaN(startPoint.y) || isNaN(endPoint.x) || isNaN(endPoint.y)) {
        path = 'M0 0, L0 0';
      }

      const attrs: ShapeStyle = mix({}, Global.defaultEdge.style as ShapeStyle, style, {
        lineWidth: cfg.size,
        path,
      } as ShapeStyle);
      return attrs;
    },
    getPath(points: Point[], routeCfg?: any): Array<Array<string | number>> | string {
      const { source, target, offset, radius } = routeCfg as any;
      if (!offset || points.length > 2) {
        if (radius) {
          return getPathWithBorderRadiusByPolyline(points, radius);
        }

        const pathArray: Array<Array<string | number>> = [];
        each(points, (point, index) => {
          if (index === 0) {
            pathArray.push(['M', point.x, point.y]);
          } else {
            pathArray.push(['L', point.x, point.y]);
          }
        });
        return pathArray;
      }
      let polylinePoints: any;
      if (radius) {
        polylinePoints = simplifyPolyline(
          getPolylinePoints(points[0], points[points.length - 1], source, target, offset),
        );
        return getPathWithBorderRadiusByPolyline(polylinePoints, radius);
      }
      polylinePoints = getPolylinePoints(
        points[0],
        points[points.length - 1],
        source,
        target,
        offset,
      );
      const res = pointsToPolygon(polylinePoints);
      return res;
    },
  },
  'single-edge',
);
