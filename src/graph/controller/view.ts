import Canvas from '@antv/g-base/lib/abstract/canvas';
import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group';
import isNumber from '@antv/util/lib/is-number';
import isString from '@antv/util/lib/is-string';
import { Item, Matrix, Padding, GraphAnimateConfig } from '../../types';
import { formatPadding } from '../../util/base';
import { applyMatrix, invertMatrix } from '../../util/math';
import Graph from '../graph';
import modifyCSS from '@antv/dom-util/lib/modify-css';

export default class ViewController {
  private graph: Graph;

  public destroyed: boolean = false;

  constructor(graph: Graph) {
    this.graph = graph;
    this.destroyed = false;
  }

  // get view center coordinate
  private getViewCenter(): Point {
    const padding = this.getFormatPadding();
    const { graph } = this;
    const width: number = this.graph.get('width');
    const height: number = graph.get('height');
    return {
      x: (width - padding[1] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0],
    };
  }

  public fitCenter() {
    const { graph } = this;
    const group: Group = graph.get('group');
    group.resetMatrix();
    const bbox = group.getCanvasBBox();
    if (bbox.width === 0 || bbox.height === 0) return;
    const viewCenter = this.getViewCenter();
    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
  }

  // fit view graph
  public fitView() {
    const { graph } = this;
    const padding = this.getFormatPadding();
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    const group: Group = graph.get('group');
    group.resetMatrix();
    const bbox = group.getCanvasBBox();

    if (bbox.width === 0 || bbox.height === 0) return;
    const viewCenter = this.getViewCenter();

    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);
    const w = (width - padding[1] - padding[3]) / bbox.width;
    const h = (height - padding[0] - padding[2]) / bbox.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }
    graph.zoom(ratio, viewCenter);
  }

  public getFormatPadding(): number[] {
    const padding = this.graph.get('fitViewPadding') as Padding;
    return formatPadding(padding);
  }

  public focusPoint(point: Point, animate?: boolean, animateCfg?: GraphAnimateConfig) {
    const viewCenter = this.getViewCenter();
    const modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
    let viewportMatrix: Matrix = this.graph.get('group').getMatrix();
    if (!viewportMatrix) viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (animate) {
      const dx = (modelCenter.x - point.x) * viewportMatrix[0];
      const dy = (modelCenter.y - point.y) * viewportMatrix[4];
      let lastX = 0;
      let lastY = 0;
      let newX = 0;
      let newY = 0;
      // 动画每次平移一点，直到目标位置
      this.graph.get('canvas').animate(
        (ratio) => {
          newX = dx * ratio;
          newY = dy * ratio;
          this.graph.translate(newX - lastX, newY - lastY);
          lastX = newX;
          lastY = newY;
        },
        {
          ...animateCfg,
        },
      );
    } else {
      this.graph.translate(
        (modelCenter.x - point.x) * viewportMatrix[0],
        (modelCenter.y - point.y) * viewportMatrix[4],
      );
    }
  }

  /**
   * 将 Canvas 坐标转成视口坐标
   * @param canvasX canvas x 坐标
   * @param canvasY canvas y 坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    let viewportMatrix: Matrix = this.graph.get('group').getMatrix();
    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    const point = invertMatrix({ x: canvasX, y: canvasY }, viewportMatrix);
    return point;
  }

  /**
   * 将页面坐标转成视口坐标
   * @param clientX 页面 x 坐标
   * @param clientY 页面 y 坐标
   */
  public getPointByClient(clientX: number, clientY: number): Point {
    const canvas: Canvas = this.graph.get('canvas');
    const canvasPoint: Point = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x, canvasPoint.y);
  }

  /**
   * 将视口坐标转成页面坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    const canvas: Canvas = this.graph.get('canvas');
    const canvasPoint = this.getCanvasByPoint(x, y);
    const point = canvas.getClientByPoint(canvasPoint.x, canvasPoint.y);
    // return { x: point.clientX, y: point.clientY };
    return { x: point.x, y: point.y };
  }

  /**
   * 将视口坐标转成 Canvas 坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getCanvasByPoint(x: number, y: number): Point {
    let viewportMatrix: Matrix = this.graph.get('group').getMatrix();
    if (!viewportMatrix) {
      viewportMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    return applyMatrix({ x, y }, viewportMatrix);
  }

  /**
   * 将元素移动到画布中心
   * @param item Item 实例或 id
   * @param {boolean} animate 是否带有动画地移动
   * @param {GraphAnimateConfig} animateCfg 若带有动画，动画的配置项
   */
  public focus(item: string | Item, animate?: boolean, animateCfg?: GraphAnimateConfig) {
    if (isString(item)) {
      item = this.graph.findById(item);
    }
    const group: Group = item.get('group');
    let matrix: Matrix = group.getMatrix();
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    if (item) {
      // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y
      this.focusPoint(
        {
          x: matrix[6],
          y: matrix[7],
        },
        animate,
        animateCfg,
      );
    }
  }

  /**
   * 改变 canvas 画布的宽度和高度
   * @param width canvas 宽度
   * @param height canvas 高度
   */
  public changeSize(width: number, height: number) {
    const { graph } = this;
    if (!isNumber(width) || !isNumber(height)) {
      throw Error('invalid canvas width & height, please make sure width & height type is number');
    }

    graph.set({ width, height });
    const canvas: Canvas = graph.get('canvas');
    canvas.changeSize(width, height);

    // change the size of grid plugin if it exists on graph
    const plugins = graph.get('plugins');
    plugins.forEach((plugin) => {
      if (plugin.get('gridContainer')) {
        const minZoom = graph.get('minZoom');
        modifyCSS(plugin.get('container'), {
          width: `${width}px`,
          height: `${height}px`,
        });
        modifyCSS(plugin.get('gridContainer'), {
          width: `${width / minZoom}px`,
          height: `${height / minZoom}px`,
          left: 0,
          top: 0,
        });
      }
    });
  }

  public destroy() {
    (this.graph as Graph | null) = null;
    this.destroyed = false;
  }
}
