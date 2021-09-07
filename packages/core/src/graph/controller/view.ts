import { Canvas as AbstractCanvas, Group as IGroup } from '@antv/g';
import { isNumber, isString } from '@antv/util';
import { Item, Padding, GraphAnimateConfig, IEdge, IPos } from '../../types';
import { formatPadding } from '../../util/base';
import { global2Port, port2Global } from '../../util/math';
import { IAbstractGraph } from '../../interface/graph';

export default class ViewController {
  private graph: IAbstractGraph;

  public destroyed: boolean = false;

  constructor(graph: IAbstractGraph) {
    this.graph = graph;
    this.destroyed = false;
  }

  // get view center coordinate
  private getViewCenter(): IPos {
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
    const group: IGroup = graph.get('group');
    const bbox = group.getBounds();
    if (!bbox) return;
    const bboxWidth = bbox.max[0] - bbox.min[0];
    const bboxHeight = bbox.max[1] - bbox.min[1];
    if (bboxWidth === 0 || bboxHeight === 0) return;
    const groupCenter: IPos = {
      x: (bbox.min[0] + bbox.max[0]) / 2,
      y: (bbox.min[1] + bbox.max[1]) / 2
    }
    this.focusPoint(groupCenter);
  }

  // fit view graph
  public fitView() {
    const { graph } = this;
    const padding = this.getFormatPadding();
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    const group: IGroup = graph.get('group');
    const bbox = group.getBounds();
    if (!bbox) return;
    const bboxWidth = bbox.max[0] - bbox.min[0];
    const bboxHeight = bbox.max[1] - bbox.min[1];

    this.fitCenter();

    const viewLeftTop = [padding[3], padding[0]];
    const viewRightBottom = [width - padding[2], height - padding[1]];
    const viewLeftTopToGlobal = graph.getPointByCanvas(viewLeftTop[0], viewLeftTop[1]);
    const viewRightBottomToGlobal = graph.getPointByCanvas(viewRightBottom[0], viewRightBottom[1]);

    const targetWidth = viewRightBottomToGlobal.x - viewLeftTopToGlobal.x;
    const targetHeight = viewRightBottomToGlobal.y - viewLeftTopToGlobal.y;
    const ratio = Math.min(targetWidth / bboxWidth, targetHeight / bboxHeight);
    const zoomCenter = graph.get('canvas').getCamera().getPosition();
    if(!graph.zoom(ratio, { x: zoomCenter[0], y: zoomCenter[1] })) {
      console.warn('zoom failed, ratio out of range, ratio: %f', ratio);
    }
  }

  public getFormatPadding(): number[] {
    const padding = this.graph.get('fitViewPadding') as Padding;
    return formatPadding(padding);
  }

  public focusPoint(point: IPos, animate?: boolean, animateCfg?: GraphAnimateConfig) {
    const viewCenter = this.getViewCenter();
    const portCenterGlobal = port2Global(this.graph, viewCenter);
    const dx = point.x - portCenterGlobal.x;
    const dy = point.y - portCenterGlobal.y;

    console.log('focusPoint', animate, dx, dy, portCenterGlobal)

    const canvas = this.graph.get('canvas');
    const camera = canvas.getCamera();
    if (animate) {
      const cameraPosition = camera.getPosition();
      const markName = `moveLandmark${Math.random()}`
      camera.createLandmark(markName, {
        position: [dx + cameraPosition[0], dy + cameraPosition[1], 0],
        focalPoint: [dx + cameraPosition[0], dy + cameraPosition[1], 0],
      });
      camera.gotoLandmark(markName, animateCfg?.duration || 300);
    } else {
      // TODO: pan 不对, animate 不对, setPosition 对
      camera.pan(dx, dy);
      // camera.setPosition([point.x, point.y, 500]);
    }
  }

  /**
   * 将画布视口坐标转成画布全局坐标
   * @param canvasX 画布视口 x 坐标
   * @param canvasY 画布视口 y 坐标
   */
  public getPointByCanvas(canvasX: number, canvasY: number): IPos {
    return port2Global(this.graph, { x: canvasX, y: canvasY });
    
  }

  /**
   * 将页面坐标转成视口坐标
   * TODO: canvas.getPointByClient 不存在，新版 page 坐标待确认
   * @param clientX 页面 x 坐标
   * @param clientY 页面 y 坐标
   */
  public getPointByClient(clientX: number, clientY: number): IPos {
    const canvas: AbstractCanvas = this.graph.get('canvas');
    // const canvasPoint: IPos = canvas.getPointByClient(clientX, clientY);
    // return this.getPointByCanvas(canvasPoint.x, canvasPoint.y);
    return { x: clientX, y: clientY };
  }

  /**
   * TODO: 等待 G 提供转换函数
   * 将视口坐标转成页面坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getClientByPoint(x: number, y: number): IPos {
    const canvas: AbstractCanvas = this.graph.get('canvas');
    // const canvasPoint = this.getCanvasByPoint(x, y);
    // const point = canvas.getClientByPoint(canvasPoint.x, canvasPoint.y);

    // return { x: point.x, y: point.y };
    return { x, y };
  }

  /**
   * 将画布全局坐标转成画布视口坐标
   * @param x 全局 x 坐标
   * @param y 全局 y 坐标
   */
  public getCanvasByPoint(x: number, y: number): IPos {
    return global2Port(this.graph, { x, y });
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

    if (item) {
      let x = 0,
        y = 0;
      if (item.getType?.() === 'edge') {
        const sourcePosition = (item as IEdge).getSource().get('group').getPosition();
        const targetPosition = (item as IEdge).getTarget().get('group').getPosition();
        x = (sourcePosition[0] + targetPosition[0]) / 2;
        y = (sourcePosition[1] + targetPosition[1]) / 2;
      } else {
        const position = item.get('group').getPosition();
        x = position[0];
        y = position[1];
      }
      this.focusPoint({ x, y }, animate, animateCfg);
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
    const canvas: AbstractCanvas = graph.get('canvas');
    canvas.changeSize(width, height);

    // change the size of grid plugin if it exists on graph
    const plugins = graph.get('plugins');
    plugins.forEach((plugin) => {
      if (plugin.get('gridContainer')) {
        // 网格定位信息初始化
        plugin.positionInit();
      }
    });
  }

  public destroy() {
    (this.graph as IAbstractGraph | null) = null;
    this.destroyed = false;
  }
}
