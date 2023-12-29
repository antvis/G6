import { DisplayObject } from '@antv/g';
import { ID } from '@antv/graphlib';
import { IGraph } from '../../types';
import { Point } from '../../types/common';
import { IG6GraphEvent } from '../../types/event';
import lassoSelector from '../selector/lasso';
import { BrushSelect } from './brush-select';

const ALLOWED_TRIGGERS = ['drag', 'shift', 'ctrl', 'alt', 'meta'] as const;
const LASSO_SHAPE_ID = 'g6-lasso-select-brush-shape';
type Trigger = (typeof ALLOWED_TRIGGERS)[number];

export class LassoSelect extends BrushSelect {
  declare brush: DisplayObject;
  selectedIds: {
    nodes: ID[];
    edges: ID[];
    combos: ID[];
  } = {
    nodes: [],
    edges: [],
    combos: [],
  };
  points: Point[] = [];
  declare beginPoint: Point;
  declare mousedown: boolean;
  declare graph: IGraph;

  public onMouseDown = (event: IG6GraphEvent) => {
    this.points = [];
    this.removeBrush();
    super.onMouseDown(event);
    if (this.beginPoint) this.points.push(this.beginPoint);
  };

  public onMouseMove = (event: IG6GraphEvent) => {
    if (this.mousedown) {
      const { canvas: point } = event;
      this.points.push({ x: point.x, y: point.y });
    }
    super.onMouseMove(event);
  };

  public onMouseUp = (event: IG6GraphEvent) => {
    const { canvas: point } = event;
    this.points.push({ x: point.x, y: point.y });
    super.onMouseUp(event);
    this.removeBrush();
    this.points = [];
  };

  public getSelector() {
    return lassoSelector;
  }

  public getPoints() {
    return this.points;
  }

  public createBrush() {
    const { graph, options } = this;
    const { brushStyle } = options;
    return graph.drawTransient('path', LASSO_SHAPE_ID, {
      style: {
        pointerEvents: 'none',
        ...brushStyle,
      },
    });
  }

  updateBrush = (event: IG6GraphEvent) => {
    const { graph } = this;
    return graph.drawTransient('path', LASSO_SHAPE_ID, {
      style: {
        path: this.getLassoPath(),
      },
    });
  };

  removeBrush = () => {
    const { graph } = this;
    graph.drawTransient('path', LASSO_SHAPE_ID, { action: 'remove' });
  };

  getLassoPath = () => {
    const points: Point[] = this.points;
    const path: any = [];
    if (points.length) {
      points.forEach((point, index) => {
        if (index === 0) {
          path.push(['M', point.x, point.y]);
        } else {
          path.push(['L', point.x, point.y]);
        }
      });
      path.push(['L', points[0].x, points[0].y]);
    }
    return path;
  };
}
