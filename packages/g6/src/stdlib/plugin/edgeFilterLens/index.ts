
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
  type?: 'one' | 'both' | 'only-source' | 'only-target';
  shouldShow?: (d?: unknown) => boolean;
}

const lensDelegateStyle = {
  key: 'edegFilter',
  stroke: '#000',
  strokeOpacity: 0.8,
  lineWidth: 2,
  fillOpacity: 1,
  fill: '#fff',
};
export class EdgeFilterLens extends Base {
  private showNodeLabel: boolean;
  private showEdgeLabel: boolean;
  private delegate: any; // TODO: add type
  private vShapes: any[];

  constructor(config?: EdgeFilterLensConfig) {
    super(config);
  }

  public getDefaultCfgs(): EdgeFilterLensConfig {
    return {
      type: 'both',
      trigger: 'mousemove',
      r: 60,
      delegateStyle: clone(lensDelegateStyle),
      showLabel: 'edge',
      scaleRBy: 'wheel',
    };
  }

  public getEvents() {
    let events;
    switch (this.options.trigger) {
      case 'click':
        events = {
          click: this.filter,
        };
        break;
      case 'drag':
        events = {
          click: this.createDelegate,
        };
        break;
      default:
        events = {
          mousemove: this.filter,
        };
        break;
    }
    return events;
  }

  public init() {
    const showLabel = this.options.showLabel;
    const showNodeLabel = showLabel === 'node' || showLabel === 'both';
    const showEdgeLabel = showLabel === 'edge' || showLabel === 'both';
    this.showNodeLabel = showNodeLabel;
    this.showEdgeLabel = showEdgeLabel;
    const shouldShow = this.options.shouldShow;
    if (!shouldShow) this.options.shouldShow = () => true;
  }

  // Create the delegate when the trigger is drag
  protected createDelegate(e: IG6GraphEvent) {
    const self = this;
    let lensDelegate = self.delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      self.filter(e);
      lensDelegate = self.delegate;

      // drag to move the lens
      lensDelegate.on('dragstart', (evt) => { });
      lensDelegate.on('drag', (evt) => {
        self.filter(evt);
      });

      // 绑定调整范围（r）
      // 由于 drag 用于改变 lens 位置，因此在此模式下，drag 不能用于调整 r

      // scaling r
      if (this.options.scaleRBy === 'wheel') {
        lensDelegate.on('mousewheel', (evt) => {
          self.scaleRByWheel(evt);
        });
      }
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
    // TODO: unused code
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
    const graphHeight = graphCanvasEl?.scrollHeight
    if (
      (r > (maxR || graphHeight) && ratio > 1) ||
      (r < (minR || graphHeight * 0.05) && ratio < 1)
    ) {
      ratio = 1;
    }
    r *= ratio;
    this.options.r = r;
    self.filter(e);
  }

  /**
   * Response function for mousemove, click, or drag to filter out the edges
   * @param e mouse event
   */
  protected filter(e: IG6GraphEvent) {
    const self = this;
    const graph = self.graph;
    const nodes = graph.getNodes();
    const hitNodesMap = {};
    const r = self.options.r;
    const type = self.options.type;
    const fCenter = { x: e.x, y: e.y };
    self.updateDelegate(fCenter, r);
    const shouldShow = self.options.shouldShow;

    let vShapes = self.vShapes;
    if (vShapes) {
      vShapes.forEach((shape) => {
        shape.remove();
        shape.destroy();
      });
    }
    vShapes = [];

    nodes.forEach((node) => {
      const model = node.getModel();
      const { x, y } = model;
      if (distance({ x, y }, fCenter) < r) {
        hitNodesMap[model.id] = node;
      }
    });
    const edges = graph.getEdges();
    const hitEdges = [];
    edges.forEach((edge) => {
      const model = edge.getModel();
      const sourceId = model.source;
      const targetId = model.target;
      if (shouldShow(model)) {
        if (type === 'only-source' || type === 'one') {
          if (hitNodesMap[sourceId] && !hitNodesMap[targetId]) hitEdges.push(edge);
        } else if (type === 'only-target' || type === 'one') {
          if (hitNodesMap[targetId] && !hitNodesMap[sourceId]) hitEdges.push(edge);
        } else if (type === 'both' && hitNodesMap[sourceId] && hitNodesMap[targetId]) {
          hitEdges.push(edge);
        }
      }
    });

    const showNodeLabel = self.showNodeLabel;
    const showEdgeLabel = self.showEdgeLabel;

    // copy the shapes in hitEdges
    const group = graph.get('group');
    hitEdges.forEach((edge) => {
      const shapes = edge.get('group').get('children');
      shapes.forEach((shape) => {
        const shapeType = shape.get('type');
        const vShape = group.addShape(shapeType, {
          attrs: shape.attr(),
        });
        vShapes.push(vShape);
        if (showNodeLabel && shapeType === 'text') {
          vShape.set('visible', true);
        }
      });
    });
    // copy the shape sof hitNodes
    Object.keys(hitNodesMap).forEach((key) => {
      const node = hitNodesMap[key];
      const clonedGroup = node.get('group').clone();
      group.add(clonedGroup);
      vShapes.push(clonedGroup);
      if (showEdgeLabel) {
        const shapes = clonedGroup.get('children');
        for (let j = 0; j < shapes.length; j++) {
          const shape = shapes[j];
          if (shape.get('type') === 'text') {
            shape.set('visible', true);
          }
        }
      }
    });

    self.vShapes = vShapes;
  }

  /**
   * Adjust part of the parameters, including trigger, type, r, maxR, minR, shouldShow, showLabel, and scaleRBy
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
    if (trigger === 'mousemove' || trigger === 'click') {
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
    const self = this;
    const graph = self.graph;
    let lensDelegate = self.delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      // 拖动多个
      const parent = graph.get('group');
      const attrs = self.options.delegateStyle || lensDelegateStyle;

      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      lensDelegate = parent.addShape('circle', {
        attrs: {
          r,
          x: mCenter.x,
          y: mCenter.y,
          ...attrs,
        },
        name: 'lens-shape',
        draggable: true,
      });

      if (this.options.trigger !== 'drag') {
        // 调整范围 r 的监听
        if (this.options.scaleRBy === 'wheel') {
          // 使用滚轮调整 r
          lensDelegate.on('mousewheel', (evt) => {
            self.scaleRByWheel(evt);
          });
        }
      }
    } else {
      lensDelegate.attr({
        x: mCenter.x,
        y: mCenter.y,
        r,
      });
    }

    self.delegate = lensDelegate;
  }

  /**
   * Clear the filtering
   */
  public clear() {
    const self = this;
    let vShapes = self.vShapes;
    if (vShapes) {
      vShapes.forEach((shape) => {
        shape.remove();
        shape.destroy();
      });
    }
    vShapes = [];
    self.vShapes = vShapes;
    const lensDelegate = self.delegate;
    if (lensDelegate && !lensDelegate.destroyed) {
      lensDelegate.remove();
      lensDelegate.destroy();
    }
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
  }
}