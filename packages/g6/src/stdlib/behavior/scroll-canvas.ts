import { isBoolean, isObject } from '@antv/util';
import { Behavior } from '../../types/behavior';
import { ID, IG6GraphEvent } from '../../types';

interface ScrollCanvasOptions {
  direction?: string;
  enableOptimize?: boolean;
  optimizeZoom?: number;
  zoomKey?: string | string[];
  /**
   * scroll-canvas 可滚动的扩展范围，默认为 0，即最多可以滚动一屏的位置；
   * 当设置的值大于 0 时，即滚动可以超过一屏；
   * 当设置的值小于 0 时，相当于缩小了可滚动范围；
   * 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
   */
  scalableRange?: string | number;
  allowDragOnItem?: boolean | {
    node?: boolean;
    edge?: boolean;
    combo?: boolean;
  }
}

const DEFAULT_OPTIONS: ScrollCanvasOptions = {
  direction: 'both',
  enableOptimize: false,
  zoomKey: 'ctrl',
  // scroll-canvas 可滚动的扩展范围，默认为 0，即最多可以滚动一屏的位置
  // 当设置的值大于 0 时，即滚动可以超过一屏
  // 当设置的值小于 0 时，相当于缩小了可滚动范围
  // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
  scalableRange: 0,
  allowDragOnItem: true
};


export class ScrollCanvas extends Behavior<ScrollCanvasOptions> {
  private hiddenEdgeIds: ID[];
  private hiddenNodeIds: ID[];

  timeout?: number
  optimized = false;
  constructor(options: Partial<ScrollCanvasOptions>) {
    const finalOptions = Object.assign(
      {}, DEFAULT_OPTIONS, options, {
        zoomKey: initZoomKey(options.zoomKey)
      })
    super(finalOptions);
  }

  getEvents = () => {
    return {
      wheel: this.onWheel
    };
  }

  onWheel(ev: IG6GraphEvent) {
    if (!this.allowDrag(ev)) return;
    const graph = this.graph;
    const { zoomKey, scalableRange, direction, enableOptimize } = this.options
    const zoomKeys = Array.isArray(zoomKey) ? [].concat(zoomKey) : [zoomKey];
    if (zoomKeys.includes('control')) zoomKeys.push('ctrl');
    const keyDown = zoomKeys.some(ele => ev[`${ele}Key`]);

    const nativeEvent = ev.nativeEvent as WheelEvent & { wheelDelta: number }

    if (keyDown) {
      const canvas = graph.canvas;
      const point = canvas.getPointByClient(nativeEvent.clientX, nativeEvent.clientY);
      let ratio = graph.getZoom();
      if (nativeEvent.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
    } else {
      const diffX = nativeEvent.deltaX || nativeEvent.movementX;
      let diffY = nativeEvent.deltaY || nativeEvent.movementY;
      
      if (!diffY && navigator.userAgent.indexOf('Firefox') > -1) diffY = (-nativeEvent.wheelDelta * 125) / 3

      const { dx, dy } = this.formatDisplacement(diffX, diffY)
      graph.translate({ dx: -dx, dy: -dy });
    }

    if (enableOptimize) {
      const optimized = this.optimized

      // hiding
      if (!optimized) {
        this.hideShapes()
        this.optimized = true
      }

      // showing after 100ms
      clearTimeout(this.timeout); this.timeout = undefined
      const timeout = window.setTimeout(() => {
        this.showShapes()
        this.optimized = false
      }, 100);
      this.timeout = timeout
    }
  }
  private formatDisplacement(diffX: number, diffY: number) {
    const { graph } = this;
    const { scalableRange, direction } = this.options;
    const [width, height] = graph.getSize();
    const graphBBox = graph.canvas.getRoot().getRenderBounds();
    let rangeNum = Number(scalableRange);
    let isPixel;
    if (typeof scalableRange === 'string') {
      if (scalableRange.includes('px')) {
        isPixel = scalableRange.includes('px');
        rangeNum = Number(scalableRange.replace('px', ''));
      }
      if (scalableRange.includes('%')) {
        rangeNum = Number(scalableRange.replace('%', '')) / 100;
      }
    }
    if (rangeNum === 0) return { dx: diffX, dy: diffY };

    let expandWidth = rangeNum;
    let expandHeight = rangeNum;
    // If it is not a string with 'px', regard as ratio
    if (!isPixel) {
      expandWidth = width * rangeNum;
      expandHeight = height * rangeNum;
    }
    const leftTopClient = graph.getViewportByCanvas({
      x: graphBBox.min[0],
      y: graphBBox.min[1],
    });
    const rightBottomClient = graph.getViewportByCanvas({
      x: graphBBox.max[0],
      y: graphBBox.max[1],
    });

    let dx = diffX;
    let dy = diffY;
    if (
      direction === 'y' ||
      (diffX > 0 && rightBottomClient.x + diffX > width + expandWidth) ||
      (diffX < 0 && leftTopClient.x + expandWidth + diffX < 0)
    ) {
      dx = 0;
    }
    if (
      direction === 'x' ||
      (diffY > 0 && rightBottomClient.y + diffY > height + expandHeight) ||
      (diffY < 0 && leftTopClient.y + expandHeight + diffY < 0)
    ) {
      dy = 0;
    }
    return { dx, dy };
  }
  allowDrag(evt: IG6GraphEvent) {
    const { itemType } = evt;
    const { allowDragOnItem } = this.options
    const targetIsCanvas = itemType === 'canvas';
    if (isBoolean(allowDragOnItem) && !allowDragOnItem && !targetIsCanvas) return false;
    if (isObject(allowDragOnItem)) {
      const { node, edge, combo } = allowDragOnItem;
      if (!node && itemType === 'node') return false;
      if (!edge && itemType === 'edge') return false;
      if (!combo && itemType === 'combo') return false;
    }
    return true;
  }
  private hideShapes() {
    const { graph } = this;
    if (this.options.enableOptimize) {
      this.hiddenEdgeIds = graph
        .getAllEdgesData()
        .map((edge) => edge.id)
        .filter((id) => graph.getItemVisible(id) === true);
      graph.hideItem(this.hiddenEdgeIds, true);
      this.hiddenNodeIds = graph
        .getAllNodesData()
        .map((node) => node.id)
        .filter((id) => graph.getItemVisible(id) === true);
      // draw node's keyShapes on transient, and then hidden the real nodes;
      this.hiddenNodeIds.forEach((id) => {
        graph.drawTransient('node', id, {
          onlyDrawKeyShape: true,
        });
      });
      graph.hideItem(this.hiddenNodeIds, true);
    }
  }
  private showShapes() {
    const { graph, hiddenEdgeIds, hiddenNodeIds } = this;
    const currentZoom = graph.getZoom();
    const { optimizeZoom } = this.options;

    // hide the shapes when the zoom ratio is smaller than optimizeZoom
    // hide the shapes when zoomming
    if (currentZoom < optimizeZoom) {
      return;
    }
    
    this.hiddenEdgeIds = this.hiddenNodeIds = []
    if (!this.options.enableOptimize) {
      return;
    }

    if (hiddenEdgeIds) {
      graph.showItem(hiddenEdgeIds, true);
    }
    if (hiddenNodeIds) {
      hiddenNodeIds.forEach((id) => {
        this.graph.drawTransient('node', id, { action: 'remove' });
      });
      graph.showItem(hiddenNodeIds, true);
    }
  }
}

const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control', 'meta'];

function initZoomKey(zoomKey?: string | string[]) {
  const zoomKeys = zoomKey ? (
    Array.isArray(zoomKey) ? zoomKey : [zoomKey]
  ) : []

  const validZoomKeys = zoomKeys.filter(zoomKey => {
    const keyIsValid = ALLOW_EVENTS.includes(zoomKey)
    if (!keyIsValid) 
      console.warn(`Invalid zoomKey: ${zoomKey}, please use a valid zoomKey: ${JSON.stringify(ALLOW_EVENTS)}`)
      
    return keyIsValid
  })

  if (validZoomKeys.length === 0) {
    validZoomKeys.push('ctrl')
  }

  return validZoomKeys
}