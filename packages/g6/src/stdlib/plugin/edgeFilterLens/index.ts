
import { DisplayObject } from '@antv/g';
import { clone } from '@antv/util';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';
import { IGraph } from '../../../types';
import { IG6GraphEvent } from '../../../types/event';
import { ShapeStyle } from '../../../types/item';
import { distance } from '../../../util/point';

const DELTA = 0.05;

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
  fillOpacity: 0.1,
  fill: '#ccc',
};

export class EdgeFilterLens extends Base {
  private showNodeLabel: boolean;
  private showEdgeLabel: boolean;
  private delegate: DisplayObject;
  private cachedTransientNodes: Set<string | number>;
  private cachedTransientEdges: Set<string | number>;
  private dragging: boolean;
  private delegateCenterDiff: { x: number; y: number; };

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
        x: lensDelegate.attr('cx'),
        y: lensDelegate.attr('cy'),
      };
    }
    this.delegateCenterDiff = {
      x: e.canvas.x - cacheCenter.x,
      y: e.canvas.y - cacheCenter.y,
    };
    this.dragging = true;
  }

  protected moveDelegate(e) {
    if (this.dragging) {
      const center = {
        x: e.canvas.x - this.delegateCenterDiff.x,
        y: e.canvas.y - this.delegateCenterDiff.y,
      };
      this.filter(e, center);
    }
  }

  /**
 * Scale the range by wheel
 * @param e mouse wheel event
 */
  protected scaleRByWheel(e: IG6GraphEvent) {
    const self = this;
    if (!e || !e.originalEvent) return;
    if (e.preventDefault) e.preventDefault();
    const graph: IGraph = self.graph;
    let ratio;
    const lensDelegate = self.delegate;
    const lensCenter = lensDelegate
      ? {
        x: lensDelegate.attr('x'),
        y: lensDelegate.attr('y'),
      }
      : undefined;
    const mousePos = lensCenter || graph.getPointByClient(e.clientX, e.clientY);
    if ((e.originalEvent as any).wheelDelta < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
    const maxR = self.options.maxR;
    const minR = self.options.minR;
    let r = self.options.r;
    const graphCanvasEl = graph.canvas.context.config.canvas;
    const graphHeight = graphCanvasEl?.scrollHeight;
    if (
      (r > (maxR || graphHeight) && ratio > 1) ||
      (r < (minR || graphHeight * 0.05) && ratio < 1)
    ) {
      ratio = 1;
    }
    r *= ratio;
    this.options.r = r;
    self.filter(e, mousePos);
  }

  /**
   * Response function for mousemove, click, or drag to filter out the edges
   * @param e mouse event
   */
  protected filter(e: IG6GraphEvent, mousePos?) {
    this.restoreCache();
    const { graph, options, showNodeLabel, showEdgeLabel, cachedTransientNodes, cachedTransientEdges } = this;
    const nodes = graph.getAllNodesData();
    const hitNodesMap = {};
    const r = options.r;
    const showType = options.showType;
    const fCenter = mousePos || { x: e.canvas.x, y: e.canvas.y };
    this.updateDelegate(fCenter, r);
    const shouldShow = options.shouldShow;

    nodes.forEach((node) => {
      const { data, id } = node;
      if (distance({ x: data.x, y: data.y }, fCenter) < r) {
        hitNodesMap[id] = node;
      }
    });
    const edges = graph.getAllEdgesData();
    const hitEdges = [];
    edges.forEach((edge) => {
      const sourceId = edge.source;
      const targetId = edge.target;
      if (shouldShow(edge)) {
        if (showType === 'only-source' || showType === 'one') {
          if (hitNodesMap[sourceId] && !hitNodesMap[targetId]) hitEdges.push(edge);
        } else if (showType === 'only-target' || showType === 'one') {
          if (hitNodesMap[targetId] && !hitNodesMap[sourceId]) hitEdges.push(edge);
        } else if (showType === 'both' && hitNodesMap[sourceId] && hitNodesMap[targetId]) {
          hitEdges.push(edge);
        }
      }
    });

    if (showNodeLabel) {
      Object.keys(hitNodesMap).forEach((key) => {
        const node = hitNodesMap[key];
        graph.drawTransient('node', node.id, { shapeIds: ['labelShape'] });
        cachedTransientNodes.add(node.id);
      });
    }

    if (showEdgeLabel) {
      hitEdges.forEach((edge) => {
        graph.drawTransient('edge', edge.id, {
          shapeIds: ['labelShape'],
          drawSource: false,
          drawTarget: false,
        });
        cachedTransientEdges.add(edge.id);
      });
    }
  }

  protected restoreCache() {
    const { graph, cachedTransientNodes, cachedTransientEdges } = this;
    cachedTransientNodes.forEach((id) => {
      graph.drawTransient('node', id, { shapeIds: ['labelShape'], visible: false });
    });
    cachedTransientEdges.forEach((id) => {
      graph.drawTransient('edge', id, {
        shapeIds: ['labelShape'],
        drawSource: false,
        drawTarget: false,
        visible: false
      });
    });
    cachedTransientNodes.clear();
    cachedTransientEdges.clear();
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
          ...attrs,
        },
      });

      if (options.trigger !== 'drag') {
        // 调整范围 r 的监听
        if (options.scaleRBy === 'wheel') {
          // 使用滚轮调整 r
          lensDelegate.on('mousewheel', (evt) => {
            this.scaleRByWheel(evt);
          });
        }
      }
    } else {
      lensDelegate.attr({
        cx: mCenter.x,
        cy: mCenter.y,
        r,
      });
    }

    this.delegate = lensDelegate;
  }

  /**
   * Clear the filtering
   */
  public clear() {
    const { graph, delegate: lensDelegate, cachedTransientNodes, cachedTransientEdges } = this;
    cachedTransientNodes.clear();
    cachedTransientEdges.clear();

    if (lensDelegate && !lensDelegate.destroyed) {
      graph.drawTransient('circle', 'lens-shape', { action: 'remove' });
    }
    cachedTransientNodes.forEach((id) => {
      graph.drawTransient('node', id, { action: 'remove' });
    });
    cachedTransientEdges.forEach((id) => {
      graph.drawTransient('edge', id, { action: 'remove' });
    });
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
  }
}