import { isBoolean, isNumber, isObject } from '@antv/util';
import { Behavior } from '../../types/behavior';
import { ID, IG6GraphEvent } from '../../types';

interface ScrollCanvasOptions {
  /**
   * The direction of dragging that is allowed. Options: 'x', 'y', 'both'. 'both' by default.
   */
  direction?: string;
  /**
   * Whether enable optimize strategies, which will hide all the shapes excluding node keyShape while scrolling.
   */
  enableOptimize?: boolean;
  /**
   * When the zoom ratio of the graph is smaller than ```optimizeZoom```, all shapes except for node keyShape will always be hidden.
   * This option requires ```enableOptimize=true```;
   */
  optimizeZoom?: number;
  /**
   * Switch to zooming while pressing the key and wheeling. Options: 'shift', 'ctrl', 'alt', 'control', 'meta', using an array of these options allows any of these keys to trigger zooming;
   * Use ```'ctrl'``` by default;
   */
  zoomKey?: string | string[];
  /** Switch to zooming while pressing the key and wheeling. This option allows you to control the zoom ratio for each event.
   * Use ```'0.05'``` by default;
   */
  zoomRatio?: number;
  /**
   * The range of canvas to limit dragging, 0 by default, which means the graph cannot be dragged totally out of the view port range.
   * If scalableRange is number or a string without 'px', means it is a ratio of the graph content.
   * If scalableRange is a string with 'px', it is regarded as pixels.
   * If scalableRange = 0, no constrains;
   * If scalableRange > 0, the graph can be dragged out of the view port range
   * If scalableRange < 0, the range is smaller than the view port.
   * Refer to https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
   */
  scalableRange?: string | number;
  /**
   * Whether allow trigger this behavior when drag start on nodes / edges / combos.
   */
  allowDragOnItem?:
    | boolean
    | {
        node?: boolean;
        edge?: boolean;
        combo?: boolean;
      };
}

const DEFAULT_OPTIONS: ScrollCanvasOptions = {
  direction: 'both',
  enableOptimize: false,
  zoomKey: 'ctrl',
  scalableRange: 0,
  allowDragOnItem: true,
  zoomRatio: 0.05,
};

export class ScrollCanvas extends Behavior {
  private hiddenEdgeIds: ID[];
  private hiddenNodeIds: ID[];

  declare options: ScrollCanvasOptions;
  timeout?: number;
  optimized = false;
  constructor(options: Partial<ScrollCanvasOptions>) {
    const finalOptions = Object.assign({}, DEFAULT_OPTIONS, options, {
      zoomKey: initZoomKey(options.zoomKey),
    });
    super(finalOptions);
  }

  getEvents = () => {
    return {
      wheel: this.onWheel,
    };
  };

  onWheel(ev: IG6GraphEvent & { deltaX?: number; deltaY?: number }) {
    if (!this.allowDrag(ev)) return;
    const graph = this.graph;
    const { zoomKey, zoomRatio, scalableRange, direction, enableOptimize } =
      this.options;
    const zoomKeys = Array.isArray(zoomKey) ? [].concat(zoomKey) : [zoomKey];
    if (zoomKeys.includes('control')) zoomKeys.push('ctrl');
    const keyDown = zoomKeys.some((ele) => ev[`${ele}Key`]);

    const nativeEvent = ev.nativeEvent as
      | (WheelEvent & { wheelDelta: number })
      | undefined;

    if (keyDown) {
      const canvas = graph.canvas;
      const point = canvas.client2Viewport({ x: ev.client.x, y: ev.client.y });
      let ratio = graph.getZoom();
      if (nativeEvent && nativeEvent.wheelDelta > 0) {
        ratio = ratio + ratio * zoomRatio;
      } else {
        ratio = ratio - ratio * zoomRatio;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
    } else {
      const diffX = ev.deltaX || ev.movement.x;
      const diffY = ev.deltaY || ev.movement.y;

      const { dx, dy } = this.formatDisplacement(diffX, diffY);
      graph.translate({ dx: -dx, dy: -dy });
    }

    if (enableOptimize) {
      const optimized = this.optimized;

      // hiding
      if (!optimized) {
        this.hideShapes();
        this.optimized = true;
      }

      // showing after 100ms
      clearTimeout(this.timeout);
      this.timeout = undefined;
      const timeout = window.setTimeout(() => {
        this.showShapes();
        this.optimized = false;
      }, 100);
      this.timeout = timeout;
    }
  }
  private formatDisplacement(dx: number, dy: number) {
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
    const minX = leftTopClient.x;
    const minY = leftTopClient.y;
    const maxX = rightBottomClient.x;
    const maxY = rightBottomClient.y;
    if (dx > 0) {
      if (maxX < -expandWidth) {
        dx = 0;
      } else if (maxX - dx < -expandWidth) {
        dx = maxX + expandWidth;
      }
    } else if (dx < 0) {
      if (minX > width + expandWidth) {
        dx = 0;
      } else if (minX - dx > width + expandWidth) {
        dx = minX - (width + expandWidth);
      }
    }

    if (dy > 0) {
      if (maxY < -expandHeight) {
        dy = 0;
      } else if (maxY - dy < -expandHeight) {
        dy = maxY + expandHeight;
      }
    } else if (dy < 0) {
      if (minY > height + expandHeight) {
        dy = 0;
      } else if (minY - dy > height + expandHeight) {
        dy = minY - (height + expandHeight);
      }
    }

    if (direction === 'x') {
      dy = 0;
    } else if (direction === 'y') {
      dx = 0;
    }

    return { dx, dy };
  }

  private allowDrag(evt: IG6GraphEvent) {
    const { itemType } = evt;
    const { allowDragOnItem } = this.options;
    const targetIsCanvas = itemType === 'canvas';
    if (isBoolean(allowDragOnItem) && !allowDragOnItem && !targetIsCanvas)
      return false;
    if (isObject(allowDragOnItem)) {
      const { node, edge, combo } = allowDragOnItem;
      if (!node && itemType === 'node') return false;
      if (!edge && itemType === 'edge') return false;
      if (!combo && itemType === 'combo') return false;
    }
    return true;
  }

  private hideShapes() {
    const { graph, options } = this;
    const { tileBehavior: graphBehaviorOptimize, tileBehaviorSize = 1000 } =
      graph.getSpecification().optimize || {};
    const { optimizeZoom } = options;
    const optimize = this.options.enableOptimize || graphBehaviorOptimize;
    const shouldOptimzie = isNumber(optimize)
      ? graph.getAllNodesData().length > optimize
      : optimize;
    if (shouldOptimzie) {
      const currentZoom = graph.getZoom();
      const newHiddenEdgeIds = graph
        .getAllEdgesData()
        .map((edge) => edge.id)
        .filter((id) => graph.getItemVisible(id));
      graph.hideItem(newHiddenEdgeIds, true);

      if (currentZoom < optimizeZoom) {
        this.hiddenEdgeIds.push(...newHiddenEdgeIds);
      } else {
        this.hiddenEdgeIds = newHiddenEdgeIds;
      }

      const newHiddenNodeIds = graph
        .getAllNodesData()
        .map((node) => node.id)
        .filter((id) => graph.getItemVisible(id));

      let requestId;
      const sectionNum = Math.ceil(newHiddenNodeIds.length / tileBehaviorSize);
      const sections = Array.from({ length: sectionNum }, (v, i) =>
        newHiddenNodeIds.slice(
          i * tileBehaviorSize,
          i * tileBehaviorSize + tileBehaviorSize,
        ),
      );
      const update = () => {
        if (!sections.length) {
          cancelAnimationFrame(requestId);
          return;
        }
        const section = sections.shift();
        graph.startHistoryBatch();
        graph.hideItem(section, false, true);
        graph.stopHistoryBatch();
        requestId = requestAnimationFrame(update);
      };
      requestId = requestAnimationFrame(update);

      if (currentZoom < optimizeZoom) {
        this.hiddenNodeIds.push(...newHiddenNodeIds);
      } else {
        this.hiddenNodeIds = newHiddenNodeIds;
      }
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

    const { tileBehavior: graphBehaviorOptimize, tileBehaviorSize = 1000 } =
      graph.getSpecification().optimize || {};
    const optimize = this.options.enableOptimize || graphBehaviorOptimize;
    const shouldOptimzie = isNumber(optimize)
      ? graph.getAllNodesData().length > optimize
      : optimize;
    if (!shouldOptimzie) {
      this.hiddenEdgeIds = this.hiddenNodeIds = [];
      return;
    }

    let requestId;
    const hiddenIds = [...hiddenNodeIds, ...hiddenEdgeIds];
    const sectionNum = Math.ceil(hiddenIds.length / tileBehaviorSize);
    const sections = Array.from({ length: sectionNum }, (v, i) =>
      hiddenIds.slice(
        i * tileBehaviorSize,
        i * tileBehaviorSize + tileBehaviorSize,
      ),
    );
    const update = () => {
      if (!sections.length) {
        cancelAnimationFrame(requestId);
        return;
      }
      graph.executeWithNoStack(() => {
        graph.showItem(sections.shift(), false);
      });
      requestId = requestAnimationFrame(update);
    };
    requestId = requestAnimationFrame(update);

    this.hiddenEdgeIds = this.hiddenNodeIds = [];
  }
}

const ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control', 'meta'];

function initZoomKey(zoomKey?: string | string[]) {
  const zoomKeys = zoomKey
    ? Array.isArray(zoomKey)
      ? zoomKey
      : [zoomKey]
    : [];

  const validZoomKeys = zoomKeys.filter((zoomKey) => {
    const keyIsValid = ALLOW_EVENTS.includes(zoomKey);
    if (!keyIsValid)
      console.warn(
        `Invalid zoomKey: ${zoomKey}, please use a valid zoomKey: ${JSON.stringify(
          ALLOW_EVENTS,
        )}`,
      );

    return keyIsValid;
  });

  if (validZoomKeys.length === 0) {
    validZoomKeys.push('ctrl');
  }

  return validZoomKeys;
}
