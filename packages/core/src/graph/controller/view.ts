import { AbstractCanvas, BBox } from '@antv/g-base';
import { Point, IGroup } from '@antv/g-base';
import { isNumber, isString } from '@antv/util';
import { Item, Matrix, Padding, GraphAnimateConfig, IEdge, FitViewRules } from '../../types';
import { formatPadding, isNaN } from '../../util/base';
import { applyMatrix, invertMatrix, lerpArray } from '../../util/math';
import { IAbstractGraph } from '../../interface/graph';
import { transform } from '@antv/matrix-util/lib/ext';
import { getAnimateCfgWithCallback } from '../../util/graphic';

export default class ViewController {
  private graph: IAbstractGraph;

  public destroyed: boolean = false;

  constructor(graph: IAbstractGraph) {
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

  public fitCenter(animate?: boolean, animateCfg?: GraphAnimateConfig) {
    const { graph } = this;
    const group: IGroup = graph.get('group');
    let bbox;

    // if reaches optimizeThreshold, fitView according to the 4 corner nodes
    const nodes = graph.getNodes();
    if (nodes.length > graph.get('optimizeThreshold')) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      nodes.forEach(node => {
        const { x, y } = node.getModel();
        if (minX > x) minX = x;
        if (minY > y) minY = y;
        if (maxX < x) maxX = x;
        if (maxY < y) maxY = y;
      });
      const matrix = group.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
      const { x: transMinX, y: transMinY } = applyMatrix({ x: minX, y: minY }, matrix);
      const { x: transMaxX, y: transMaxY } = applyMatrix({ x: maxX, y: maxY }, matrix);
      bbox = {
        minX: transMinX,
        maxX: transMaxX,
        minY: transMinY,
        maxY: transMaxY,
        width: transMaxX - transMinX,
        height: transMaxY - transMinY,
        x: transMinX,
        y: transMinY
      }
    } else {
      bbox = group.getCanvasBBox();
    }
    if (bbox.width === 0 || bbox.height === 0) return;
    const viewCenter = this.getViewCenter();
    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y, animate, animateCfg);
  }

  private animatedFitView(group: IGroup, startMatrix: number[], animateCfg: GraphAnimateConfig, bbox: BBox, viewCenter: Point, groupCenter: Point,
    ratio: number, zoomToFit: boolean): void {
    const { graph } = this;
    animateCfg = animateCfg ? animateCfg : { duration: 500, easing: 'easeCubic' };

    // start from the default matrix
    const matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

    // Translate
    const vx = bbox.x + viewCenter.x - groupCenter.x - bbox.minX;
    const vy = bbox.y + viewCenter.y - groupCenter.y - bbox.minY;
    if (isNaN(vx) || isNaN(vy)) return;
    const translatedMatrix = transform(matrix, [['t', vx, vy]]);

    if (!zoomToFit) {
      // If zooming is not needed just animate the current translated matrix and return
      const animationConfig = getAnimateCfgWithCallback({
        animateCfg,
        callback: () => {
          graph.emit('viewportchange', { action: 'translate', matrix: translatedMatrix });
        }
      });
      group.animate((ratio: number) => {
        return { matrix: lerpArray(startMatrix, translatedMatrix, ratio) };
      }, animationConfig);
      return;
    }

    // Zoom
    const minZoom: number = graph.get('minZoom');
    const maxZoom: number = graph.get('maxZoom');

    let realRatio = ratio;
    if (minZoom && ratio < minZoom) {
      realRatio = minZoom;
      console.warn('fitview failed, ratio out of range, ratio: %f', ratio, 'graph minzoom has been used instead');
    } else if (maxZoom && ratio > maxZoom) {
      realRatio = maxZoom;
      console.warn('fitview failed, ratio out of range, ratio: %f', ratio, 'graph maxzoom has been used instead');
    }
    const zoomedMatrix = transform(translatedMatrix, [
      ['t', -viewCenter.x, -viewCenter.y],
      ['s', realRatio, realRatio],
      ['t', viewCenter.x, viewCenter.y],
    ]);

    // Animation
    const animationConfig = getAnimateCfgWithCallback({
      animateCfg,
      callback: () => {
        group.setMatrix(zoomedMatrix);
        graph.emit('viewportchange', { action: 'translate', matrix: translatedMatrix });
        graph.emit('viewportchange', { action: 'zoom', matrix: zoomedMatrix });
      }
    });
    group.stopAnimate();
    group.setMatrix(startMatrix);
    group.animate((ratio: number) => {
      return { matrix: lerpArray(startMatrix, zoomedMatrix, ratio) };
    }, animationConfig);
  }

  // fit view graph
  public fitView(animate?: boolean, animateCfg?: GraphAnimateConfig) {
    const { graph } = this;
    const padding = this.getFormatPadding();
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    const group: IGroup = graph.get('group');
    const startMatrix = group.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    group.resetMatrix();
    let bbox;

    // if reaches optimizeThreshold, fitView according to the 4 corner nodes
    const nodes = graph.getNodes();
    if (nodes.length > graph.get('optimizeThreshold')) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      nodes.forEach(node => {
        const { x, y } = node.getModel();
        if (minX > x) minX = x;
        if (minY > y) minY = y;
        if (maxX < x) maxX = x;
        if (maxY < y) maxY = y;
      });
      bbox = {
        minX, maxX, minY, maxY,
        width: maxX - minX,
        height: maxY - minY,
        x: minX,
        y: minY
      }
    } else {
      bbox = group.getCanvasBBox();
    }

    if (bbox.width === 0 || bbox.height === 0) return;

    const viewCenter = this.getViewCenter();
    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    // Compute ratio
    const w = (width - padding[1] - padding[3]) / bbox.width;
    const h = (height - padding[0] - padding[2]) / bbox.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }

    if (animate) {
      this.animatedFitView(group, startMatrix, animateCfg, bbox, viewCenter, groupCenter, ratio, true);
    } else {
      const dx = viewCenter.x - groupCenter.x;
      const dy = viewCenter.y - groupCenter.y;
      if (isNaN(dx) || isNaN(dy)) return;
      graph.translate(dx, dy);

      if (!graph.zoom(ratio, viewCenter)) {
        console.warn('zoom failed, ratio out of range, ratio: %f', ratio);
      }
    }
  }

  // fit view graph by rule
  public fitViewByRules(rules: FitViewRules, animate?: boolean, animateCfg?: GraphAnimateConfig) {
    const {
      onlyOutOfViewPort = false,
      direction = 'both',
      ratioRule = 'min'
    } = rules;
    const { graph } = this;
    const padding = this.getFormatPadding();
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    const group: IGroup = graph.get('group');
    const startMatrix = group.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    group.resetMatrix();
    let bbox;

    // if reaches optimizeThreshold, fitView according to the 4 corner nodes
    const nodes = graph.getNodes();
    if (nodes.length > graph.get('optimizeThreshold')) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
      nodes.forEach(node => {
        const { x, y } = node.getModel();
        if (minX > x) minX = x;
        if (minY > y) minY = y;
        if (maxX < x) maxX = x;
        if (maxY < y) maxY = y;
      });
      bbox = {
        minX, maxX, minY, maxY,
        width: maxX - minX,
        height: maxY - minY,
        x: minX,
        y: minY
      }
    } else {
      bbox = group.getCanvasBBox();
    }


    if (bbox.width === 0 || bbox.height === 0) return;

    const viewCenter = this.getViewCenter();
    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    // Compute ratio
    const wRatio = (width - padding[1] - padding[3]) / bbox.width;
    const hRatio = (height - padding[0] - padding[2]) / bbox.height;
    let ratio;
    if (direction === 'x') {
      ratio = wRatio;
    } else if (direction === 'y') {
      ratio = hRatio;
    } else {
      // ratioRule
      ratio = ratioRule === 'max' ? Math.max(wRatio, hRatio) : Math.min(wRatio, hRatio);
    }
    // 如果设置了仅对超出视口宽高的场景进行fitview，则没超出的场景zoom取1
    if (onlyOutOfViewPort) {
      ratio = ratio < 1 ? ratio : 1;
    }

    if (animate) {
      this.animatedFitView(group, startMatrix, animateCfg, bbox, viewCenter, groupCenter, ratio, true);
    } else {
      const initZoomRatio = graph.getZoom();
      let endZoom = initZoomRatio * ratio;
      const minZoom = graph.get('minZoom');
      // 如果zoom小于最小zoom, 则以最小zoom为准
      if (endZoom < minZoom) {
        endZoom = minZoom;
        console.warn('fitview failed, ratio out of range, ratio: %f', ratio, 'graph minzoom has been used instead');
      }
      graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);

      graph.zoomTo(endZoom, viewCenter);
    }
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
    const canvas: AbstractCanvas = this.graph.get('canvas');
    const canvasPoint: Point = canvas.getPointByClient(clientX, clientY);
    return this.getPointByCanvas(canvasPoint.x, canvasPoint.y);
  }

  /**
   * 将视口坐标转成页面坐标
   * @param x 视口 x 坐标
   * @param y 视口 y 坐标
   */
  public getClientByPoint(x: number, y: number): Point {
    const canvas: AbstractCanvas = this.graph.get('canvas');
    const canvasPoint = this.getCanvasByPoint(x, y);
    const point = canvas.getClientByPoint(canvasPoint.x, canvasPoint.y);

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

    if (item) {
      let x = 0,
        y = 0;
      if (item.getType && item.getType() === 'edge') {
        const sourceMatrix: IGroup = (item as IEdge).getSource().get('group').getMatrix();
        const targetMatrix: IGroup = (item as IEdge).getTarget().get('group').getMatrix();
        if (sourceMatrix && targetMatrix) {
          x = (sourceMatrix[6] + targetMatrix[6]) / 2;
          y = (sourceMatrix[7] + targetMatrix[7]) / 2;
        } else if (sourceMatrix || targetMatrix) {
          x = sourceMatrix ? sourceMatrix[6] : targetMatrix[6];
          y = sourceMatrix ? sourceMatrix[7] : targetMatrix[7];
        }
      } else {
        const group: IGroup = item.get('group');
        let matrix: Matrix = group.getMatrix();
        if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        x = matrix[6];
        y = matrix[7];
      }
      // 用实际位置而不是model中的x,y,防止由于拖拽等的交互导致model的x,y并不是当前的x,y
      this.focusPoint({ x, y }, animate, animateCfg);
    }
  }

  public focusItems(items: Item[], zoomToFit: boolean, animate?: boolean, animateCfg?: GraphAnimateConfig): void {
    if (!items.length) {
      return;
    }

    const { graph } = this;
    const padding = this.getFormatPadding();
    const width: number = graph.get('width');
    const height: number = graph.get('height');
    const group: IGroup = graph.get('group');
    const startMatrix = group.getMatrix() || [1, 0, 0, 0, 1, 0, 0, 0, 1];
    group.resetMatrix();

    const bbox: BBox = {
      x: 0, y: 0,
      minX: Number.MAX_SAFE_INTEGER, minY: Number.MAX_SAFE_INTEGER,
      maxX: Number.MIN_SAFE_INTEGER, maxY: Number.MIN_SAFE_INTEGER,
      width: 0, height: 0
    };
    for (const item of items) {
      const itemBBox = item.getBBox();
      if (itemBBox.minX < bbox.minX) {
        bbox.minX = itemBBox.minX;
      }
      if (itemBBox.minY < bbox.minY) {
        bbox.minY = itemBBox.minY;
      }
      if (itemBBox.maxX > bbox.maxX) {
        bbox.maxX = itemBBox.maxX;
      }
      if (itemBBox.maxY > bbox.maxY) {
        bbox.maxY = itemBBox.maxY;
      }
    }
    bbox.x = bbox.minX;
    bbox.y = bbox.minY;
    bbox.width = bbox.maxX - bbox.minX;
    bbox.height = bbox.maxY - bbox.minY;

    if (bbox.width === 0 || bbox.height === 0) return;
    const viewCenter = this.getViewCenter();

    const groupCenter: Point = {
      x: bbox.x + bbox.width / 2,
      y: bbox.y + bbox.height / 2,
    };

    // Compute ratio
    const w = (width - padding[1] - padding[3]) / bbox.width;
    const h = (height - padding[0] - padding[2]) / bbox.height;
    let ratio = w;
    if (w > h) {
      ratio = h;
    }

    if (animate) {
      this.animatedFitView(group, startMatrix, animateCfg, bbox, viewCenter, groupCenter, ratio, zoomToFit);
    } else {
      graph.translate(viewCenter.x - groupCenter.x, viewCenter.y - groupCenter.y);

      if (zoomToFit && !graph.zoom(ratio, viewCenter)) {
        console.warn('zoom failed, ratio out of range, ratio: %f', ratio);
      }
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
