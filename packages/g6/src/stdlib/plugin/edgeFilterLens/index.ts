import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { IGraph } from '../../../types';
import { IG6GraphEvent } from '../../../types/event';
import { ShapeStyle } from '../../../types/item';
import { distance } from '../../../util/point';

const DELTA = 0.01;
interface EdgeFilterLensConfig extends IPluginBaseConfig {
  trigger?: 'mousemove' | 'click' | 'drag';
  r?: number;
  delegateStyle?: ShapeStyle;
  showLabel?: 'node' | 'edge' | 'both' | undefined;
  scaleRBy?: 'wheel' | undefined;
  maxR?: number;
  minR?: number;
  showType?: 'one' | 'both' | 'only-source' | 'only-target'; // 更名，原名与plugin的type冲突
  shouldShow?: (d?: unknown) => boolean;
}

const lensDelegateStyle = {
  stroke: '#000',
  strokeOpacity: 0.8,
  lineWidth: 2,
  fillOpacity: 1,
  fill: '#fff',
};

export class EdgeFilterLens extends Base {
  private showNodeLabel: boolean;
  private showEdgeLabel: boolean;
  private delegate: DisplayObject;
  private cachedTransientNodes: Set<string | number>;
  private cachedTransientEdges: Set<string | number>;
  private dragging: boolean;
  private delegateCenterDiff: { x: number; y: number };

  constructor(config?: EdgeFilterLensConfig) {
    super(config);
    this.cachedTransientNodes = new Set();
    this.cachedTransientEdges = new Set();
  }

  public getDefaultCfgs(): EdgeFilterLensConfig {
    return {
      showType: 'both',
      trigger: 'mousemove',
      r: 60,
      delegateStyle: clone(lensDelegateStyle),
      showLabel: 'edge',
      scaleRBy: 'wheel',
    };
  }

  public getEvents() {
    let events = {
      pointerdown: this.onPointerDown,
      pointerup: this.onPointerUp,
      wheel: this.onWheel,
    } as {
      [key: string]: any;
    };
    switch (this.options.trigger) {
      case 'click':
        events = {
          ...events,
          click: this.filter,
        };
        break;
      case 'drag':
        events = {
          ...events,
          pointermove: this.onPointerMove,
        };
        break;
      default:
        events = {
          ...events,
          pointermove: this.filter,
        };
        break;
    }
    return events;
  }

  public init(graph: IGraph) {
    super.init(graph);
    const showLabel = this.options.showLabel;
    const showNodeLabel = showLabel === 'node' || showLabel === 'both';
    const showEdgeLabel = showLabel === 'edge' || showLabel === 'both';
    this.showNodeLabel = showNodeLabel;
    this.showEdgeLabel = showEdgeLabel;
    const shouldShow = this.options.shouldShow;
    if (!shouldShow) this.options.shouldShow = () => true;
  }

  protected onPointerUp(e: IG6GraphEvent) {
    this.dragging = false;
  }

  protected onPointerMove(e: IG6GraphEvent) {
    if (!this.dragging) return;
    this.moveDelegate(e);
  }

  protected onPointerDown(e: IG6GraphEvent) {
    const { delegate: lensDelegate } = this;
    let cacheCenter;
    if (!lensDelegate || lensDelegate.destroyed) {
      cacheCenter = { x: e.canvas.x, y: e.canvas.y };
      this.filter(e);
    } else {
      cacheCenter = {
        x: lensDelegate.style.cx,
        y: lensDelegate.style.cy,
      };
    }
    this.delegateCenterDiff = {
      x: e.canvas.x - cacheCenter.x,
      y: e.canvas.y - cacheCenter.y,
    };
    this.dragging = true;
  }

  // Determine whether it is dragged in the delegate
  protected isInLensDelegate(lensDelegate, pointer): boolean {
    const { cx: lensX, cy: lensY, r: lensR } = lensDelegate.style;
    if (
      pointer.x >= lensX - lensR &&
      pointer.x <= lensX + lensR &&
      pointer.y >= lensY - lensR &&
      pointer.y <= lensY + lensR
    ) {
      return true;
    }
    return false;
  }

  protected moveDelegate(e) {
    if (
      this.isInLensDelegate(this.delegate, { x: e.canvas.x, y: e.canvas.y })
    ) {
      const center = {
        x: e.canvas.x - this.delegateCenterDiff.x,
        y: e.canvas.y - this.delegateCenterDiff.y,
      };
      this.filter(e, center);
    }
  }

  protected onWheel(e: IG6GraphEvent) {
    const { delegate: lensDelegate, options } = this;
    const { scaleRBy } = options;
    if (!lensDelegate || lensDelegate.destroyed) return;
    if (scaleRBy !== 'wheel') return;
    if (this.isInLensDelegate(lensDelegate, { x: e.canvas.x, y: e.canvas.y })) {
      if (scaleRBy === 'wheel') {
        this.scaleRByWheel(e);
      }
    }
  }

  /**
   * Scale the range by wheel
   * @param e mouse wheel event
   */
  protected scaleRByWheel(e: IG6GraphEvent) {
    if (!e || !e.originalEvent) return;
    if (e.preventDefault) e.preventDefault();
    const { graph, options } = this;
    const graphCanvasEl = graph.canvas.context.config.canvas;
    const graphHeight = graphCanvasEl?.height || 500;
    const maxR = options.maxR
      ? Math.min(options.maxR, graphHeight)
      : graphHeight;
    const minR = options.minR
      ? Math.max(options.minR, graphHeight * DELTA)
      : graphHeight * DELTA;

    const scale = 1 + (e.originalEvent as any).deltaY * -1 * DELTA;
    let r = options.r * scale;
    r = Math.min(r, maxR);
    r = Math.max(r, minR);
    options.r = r;
    this.delegate.style.r = r;
    this.filter(e);
  }

  /**
   * Response function for mousemove, click, or drag to filter out the edges
   * @param e mouse event
   */
  protected filter(e: IG6GraphEvent, mousePos?) {
    const {
      graph,
      options,
      showNodeLabel,
      showEdgeLabel,
      cachedTransientNodes,
      cachedTransientEdges,
    } = this;
    const r = options.r;
    const showType = options.showType;
    const shouldShow = options.shouldShow;
    const fCenter = mousePos || { x: e.canvas.x, y: e.canvas.y };
    this.updateDelegate(fCenter, r);

    const nodes = graph.getAllNodesData();
    const hitNodesMap = new Map();
    nodes.forEach((node) => {
      const { data, id } = node;
      if (distance({ x: data.x, y: data.y }, fCenter) < r) {
        hitNodesMap.set(id, node);
      }
    });

    const edges = graph.getAllEdgesData();
    const hitEdges = [];
    edges.forEach((edge) => {
      const sourceId = edge.source;
      const targetId = edge.target;
      if (shouldShow(edge)) {
        if (showType === 'only-source' || showType === 'one') {
          if (hitNodesMap.get(sourceId) && !hitNodesMap.get(targetId))
            hitEdges.push(edge);
        } else if (showType === 'only-target' || showType === 'one') {
          if (hitNodesMap.get(targetId) && !hitNodesMap.get(sourceId))
            hitEdges.push(edge);
        } else if (
          showType === 'both' &&
          hitNodesMap.get(sourceId) &&
          hitNodesMap.get(targetId)
        ) {
          hitEdges.push(edge);
        }
      }
    });

    const currentTransientNodes = new Set<string | number>();
    const currentTransientEdges = new Set<string | number>();

    hitNodesMap.forEach((node) => {
      currentTransientNodes.add(node.id);

      if (cachedTransientNodes.has(node.id)) {
        cachedTransientNodes.delete(node.id);
      } else {
        graph.drawTransient('node', node.id, {
          shapeIds: showNodeLabel
            ? ['labelShape', 'labelBackgroundShape', 'keyShape']
            : ['keyShape'],
        });
      }
    });

    cachedTransientNodes.forEach((id) => {
      graph.drawTransient('node', id, { action: 'remove' });
    });

    if (showEdgeLabel) {
      hitEdges.forEach((edge) => {
        currentTransientEdges.add(edge.id);

        if (cachedTransientEdges.has(edge.id)) {
          cachedTransientEdges.delete(edge.id);
        } else {
          graph.drawTransient('edge', edge.id, {
            shapeIds: ['labelShape', 'labelBackgroundShape', 'keyShape'],
            drawSource: false,
            drawTarget: false,
          });
        }
      });

      cachedTransientEdges.forEach((id) => {
        graph.drawTransient('edge', id, { action: 'remove' });
      });
    }

    this.cachedTransientNodes = currentTransientNodes;
    this.cachedTransientEdges = currentTransientEdges;
  }

  /**
   * Adjust part of the parameters, including trigger, showType, r, maxR, minR, shouldShow, showLabel, and scaleRBy
   * @param {EdgeFilterLensConfig} cfg
   */
  public updateParams(cfg: EdgeFilterLensConfig) {
    const self = this;
    const { r, trigger, minR, maxR, scaleRBy, showLabel, shouldShow } = cfg;
    if (!isNaN(cfg.r)) {
      self.options.r = r;
    }
    if (!isNaN(maxR)) {
      self.options.maxR = maxR;
    }
    if (!isNaN(minR)) {
      self.options.minR = minR;
    }
    if (trigger === 'mousemove' || trigger === 'click' || trigger === 'drag') {
      self.options.trigger = trigger;
    }
    if (scaleRBy === 'wheel' || scaleRBy === 'unset') {
      self.options.scaleRBy = scaleRBy;
      self.delegate.remove();
      self.delegate.destroy();
    }
    if (showLabel === 'node' || showLabel === 'both') {
      self.showNodeLabel = true;
    }
    if (showLabel === 'edge' || showLabel === 'both') {
      self.showEdgeLabel = true;
    }
    if (shouldShow) {
      self.options.shouldShow = shouldShow;
    }
  }

  /**
   * Update the delegate shape of the lens
   * @param {Point} mCenter the center of the shape
   * @param {number} r the radius of the shape
   */
  private updateDelegate(mCenter, r) {
    const { graph, options, delegate } = this;
    let lensDelegate = delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      // 拖动多个
      const attrs = options.delegateStyle || lensDelegateStyle;

      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      lensDelegate = graph.drawTransient('circle', 'lens-shape', {
        style: {
          r,
          cx: mCenter.x,
          cy: mCenter.y,
          zIndex: -1,
          ...attrs,
        },
      });
      lensDelegate.toBack();
    } else {
      lensDelegate = graph.drawTransient('circle', 'lens-shape', {
        style: {
          r,
          cx: mCenter.x,
          cy: mCenter.y,
        },
      });
    }

    this.delegate = lensDelegate;
  }

  /**
   * Clear the filtering
   */
  public clear() {
    const {
      graph,
      delegate: lensDelegate,
      cachedTransientNodes,
      cachedTransientEdges,
    } = this;

    if (lensDelegate && !lensDelegate.destroyed) {
      graph.drawTransient('circle', 'lens-shape', { action: 'remove' });
    }
    cachedTransientNodes.forEach((id) => {
      graph.drawTransient('node', id, { action: 'remove' });
    });
    cachedTransientEdges.forEach((id) => {
      graph.drawTransient('edge', id, { action: 'remove' });
    });

    cachedTransientNodes.clear();
    cachedTransientEdges.clear();
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
  }
}
