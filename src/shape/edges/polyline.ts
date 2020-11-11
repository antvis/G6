import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group';
import { mix, each, isArray, isString } from '@antv/util';
import { ShapeStyle, EdgeConfig, Item } from '../../types';
import { pointsToPolygon } from '../../util/path';
import Global from '../../global';
import Shape from '../shape';
import { getPathWithBorderRadiusByPolyline } from './polyline-util';
import { RouterCfg, pathFinder } from './router';
import { INode } from '../../interface/item';

// 折线
Shape.registerEdge(
  'polyline',
  {
    options: {
      color: Global.defaultEdge.color,
      style: {
        radius: 0,
        offset: 15,
        x: 0,
        y: 0,
      },
      // 文本样式配置
      labelCfg: {
        style: {
          fill: Global.edgeLabel.style.fill,
        },
      },
      routeCfg: {
        obstacles: [], // 希望边绕过的障碍节点
        maxAllowedDirectionChange: 90, // 允许的最大转角
        maximumLoops: 1000,
        gridSize: 10, // 指定精度
      },
    },
    shapeType: 'polyline',
    // 文本位置
    labelPosition: 'center',
    drawShape(cfg: EdgeConfig, group: Group) {
      const shapeStyle = (this as any).getShapeStyle(cfg);
      if (shapeStyle.radius === 0) delete shapeStyle.radius;
      const keyShape = group.addShape('path', {
        className: 'edge-shape',
        name: 'edge-shape',
        attrs: shapeStyle,
      });
      return keyShape;
    },
    getShapeStyle(cfg: EdgeConfig): ShapeStyle {
      const { style: defaultStyle } = this.options;

      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };

      const style: ShapeStyle = mix({}, defaultStyle, strokeStyle, cfg.style);
      cfg = (this as any).getPathPoints(cfg);

      this.radius = style.radius;
      this.offset = style.offset;

      const { startPoint, endPoint } = cfg;
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
      const radius = style.radius;
      const { routeCfg } = this.options;
      routeCfg.offset = style.offset;

      let path = (this as any).getPath(points, source, target, radius, routeCfg);
      if ((isArray(path) && path.length <= 1) || (isString(path) && path.indexOf('L') === -1)) {
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
    updateShapeStyle(cfg: EdgeConfig, item: Item) {
      const group = item.getContainer();
      const strokeStyle: ShapeStyle = {
        stroke: cfg.color,
      };
      const shape =
        group.find((element) => element.get('className') === 'edge-shape') || item.getKeyShape();

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
      const radius = previousStyle.radius;
      const { routeCfg } = this.options;
      routeCfg.offset = previousStyle.offset;
      let path = (this as any).getPath(points, source, target, radius, routeCfg);
      if ((isArray(path) && path.length <= 1) || (isString(path) && path.indexOf('L') === -1)) {
        path = 'M0 0, L0 0';
      }
      if (isNaN(startPoint.x) || isNaN(startPoint.y) || isNaN(endPoint.x) || isNaN(endPoint.y)) {
        path = 'M0 0, L0 0';
      }
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
    getPath(
      points: Point[],
      source: INode,
      target: INode,
      radius: number,
      routeCfg?: RouterCfg,
    ): Array<Array<string | number>> | string {
      const { offset } = routeCfg;
      // 指定了控制点
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

      // 未指定控制点
      let polylinePoints: any;
      if (radius) {
        polylinePoints = pathFinder(points[0], points[points.length - 1], source, target, routeCfg);
        const res = getPathWithBorderRadiusByPolyline(polylinePoints, radius);
        return res;
      }

      polylinePoints = pathFinder(points[0], points[points.length - 1], source, target, routeCfg);
      const res = pointsToPolygon(polylinePoints);
      return res;
    },
  },
  'single-edge',
);
