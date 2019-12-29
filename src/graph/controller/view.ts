import Canvas from '@antv/g-base/lib/abstract/canvas';
import { Point } from '@antv/g-base/lib/types';
import Group from '@antv/g-canvas/lib/group';
import isNumber from "@antv/util/lib/is-number";
import isString from '@antv/util/lib/is-string'
import { IGraph } from "@g6/interface/graph";
import { Item, Matrix, Padding } from '@g6/types';
import { formatPadding } from '@g6/util/base'
import { applyMatrix, invertMatrix } from '@g6/util/math';

export default class ViewController {
  private graph: IGraph = null
  public destroyed: boolean = false
  constructor(graph: IGraph) {
    this.graph = graph
    this.destroyed = false
  }

  // get view center coordinate
  private getViewCenter(): Point {
    const padding = this.getFormatPadding();
    const graph = this.graph;
    const width: number = this.graph.get('width');
    const height: number = graph.get('height');
    return {
      x: (width - padding[2] - padding[3]) / 2 + padding[3],
      y: (height - padding[0] - padding[2]) / 2 + padding[0]
    };
  }

  // fit view graph
  public fitView() {
    const padding = this.getFormatPadding();
    const graph = this.graph;
    const group: Group = graph.get('group');
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    group.resetMatrix();
    const bbox = group.getBBox();
    const viewCenter = this.getViewCenter();
    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2
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
    const padding = this.graph.get<Padding>('fitViewPadding')
    return formatPadding(padding)
  }

  public focusPoint(point: Point) {
    const viewCenter = this.getViewCenter();
    const modelCenter = this.getPointByCanvas(viewCenter.x, viewCenter.y);
    const viewportMatrix: Matrix = this.graph.get('group').getMatrix();
    this.graph.translate((modelCenter.x - point.x) * viewportMatrix[0], (modelCenter.y - point.y) * viewportMatrix[4]);
  }

  /**
   * 将 Canvas 坐标转成视口坐标
   * @param canvasX canvas x 坐标
   * @param canvasY canvas y 坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): Point {
    const viewportMatrix: Matrix = this.graph.get('group').getMatrix();
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
    const pixelRatio: number = canvas.get('pixelRatio');
    const canvasPoint: Point = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x / pixelRatio, canvasPoint.y / pixelRatio);
  }

  /**
   * 将视口坐标转成页面坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getClientByPoint(x, y): Point {
    const canvas: Canvas = this.graph.get('canvas');
    const canvasPoint = this.getCanvasByPoint(x, y);
    const pixelRatio = canvas.get('pixelRatio');
    const point = canvas.getClientByPoint(canvasPoint.x * pixelRatio, canvasPoint.y * pixelRatio);
    // return { x: point.clientX, y: point.clientY };
    return { x: point.x, y: point.y };
  }

  /**
   * 将视口坐标转成 Canvas 坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getCanvasByPoint(x, y): Point {
    const viewportMatrix: Matrix = this.graph.get('group').getMatrix();
    return applyMatrix({ x, y }, viewportMatrix);
  }

  /**
   * 将元素移动到画布中心
   * @param item Item 实例或 id
   */
  public focus(item: string | Item) {
    if(isString(item)) {
      item = this.graph.findById(item)
    }

    if(item) {
      const group: Group = item.get('group')
      const matrix: Matrix = group.getMatrix()
      // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y
      this.focusPoint({
        x: matrix[6],
        y: matrix[7]
      })
    }
  }

  /**
   * 改变 canvas 画布的宽度和高度
   * @param width canvas 宽度
   * @param height canvas 高度
   */
  public changeSize(width: number, height: number) {
    if(!isNumber(width) || !isNumber(height)) {
      throw Error('invalid canvas width & height, pleace make sure width & height type is number');
    }

    const graph = this.graph
    graph.set({ width, height })
    const canvas: Canvas = graph.get('canvas')
    canvas.changeSize(width, height)
  }

  public destroy() {
    this.graph = null
    this.destroyed = false
  }
}