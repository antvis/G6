import { clone, throttle } from '@antv/util';
import { Text } from '@antv/g';
import { Point } from '../../../types/common';
import { IGraph } from '../../../types';
import { ShapeStyle } from '../../../types/item';
import { IG6GraphEvent } from '../../../types/event';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

const DELTA = 0.05;

interface FisheyeConfig extends IPluginBaseConfig {
  trigger?: 'mousemove' | 'click' | 'drag';
  d?: number;
  r?: number;
  delegateStyle?: ShapeStyle;
  showLabel?: boolean;
  scaleRBy?: 'wheel' | 'drag' | 'unset' | undefined;
  scaleDBy?: 'wheel' | 'drag' | 'unset' | undefined;
  maxR?: number;
  minR?: number;
  maxD?: number;
  minD?: number;
  throttle?: number;
  showDPercent?: boolean;
}

const lensDelegateStyle = {
  stroke: '#000',
  strokeOpacity: 0.8,
  lineWidth: 2,
  fillOpacity: 0.1,
  fill: '#ccc',
};
export default class Fisheye extends Base {
  private pointerDown: Point | undefined = undefined;
  private cacheCenter: Point | undefined = undefined;
  private dragPrePos: Point | undefined = undefined;
  private dragging = false;

  constructor(options?: FisheyeConfig) {
    super(options);
  }
  public getDefaultCfgs(): FisheyeConfig {
    return {
      trigger: 'mousemove',
      d: 1.5,
      r: 300,
      delegateStyle: clone(lensDelegateStyle),
      showLabel: true,
      maxD: 5,
      minD: 0,
      throttle: 16,
      scaleRBy: 'drag',
      scaleDBy: 'drag',
      showDPercent: true,
    };
  }

  // class-methods-use-this
  public getEvents() {
    let events = {
      pointerdown: this.onPointerDown,
      pointerup: this.onPointerUp,
      wheel: this.onWheel,
    } as {
      [key: string]: any;
    };
    switch ((this as any).options.trigger) {
      case 'click':
        events = {
          ...events,
          click: this.magnify,
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
          pointermove: this.magnify,
        };
        break;
    }
    return events;
  }

  public init(graph: IGraph) {
    super.init(graph);
    const self = this;
    const r = self.options.r;
    self.options.cachedMagnifiedModels = [];
    self.options.cachedTransientTexts = {};
    self.options.cachedOriginPositions = {};
    self.options.r2 = r * r;
    const d = self.options.d;
    self.options.molecularParam = (d + 1) * r;
  }

  // Create the delegate when the trigger is drag

  // 判断是不是在圆内拖动
  protected isInLensDelegate(lensDelegate, pointer): boolean {
    const lensAttrs = {
      cx: lensDelegate.attr('cx'),
      cy: lensDelegate.attr('cy'),
      r: lensDelegate.attr('r'),
    };
    const lensX = lensDelegate.attr('cx');
    const lensY = lensDelegate.attr('cy');
    const lensR = lensDelegate.attr('r');
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

  protected onPointerUp(e: IG6GraphEvent) {
    this.pointerDown = undefined;
    // this.dragPrePos = undefined;
    this.cacheCenter = undefined;
    this.dragging = false;
  }

  protected onPointerMove(e: IG6GraphEvent) {
    if (!this.dragging && this.pointerDown) {
      this.dragging = true;
    }
    if (!this.pointerDown) return;
    let lensDelegate = this.options.delegate;
    this.moveDelegate(lensDelegate, e);
  }

  protected onPointerDown(e: IG6GraphEvent) {
    let lensDelegate = this.options.delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      this.cacheCenter = { x: e.canvas.x, y: e.canvas.y };
      this.magnify(e);
    } else {
      this.cacheCenter = {
        x: lensDelegate.attr('cx'),
        y: lensDelegate.attr('cy'),
      };
    }
    this.pointerDown = { x: e.canvas.x, y: e.canvas.y };
    this.dragging = false;
    this.dragPrePos = { x: e.canvas.x, y: e.canvas.y };
  }

  protected moveDelegate(lensDelegate, e) {
    const self = this;
    if (self.isInLensDelegate(lensDelegate, { x: e.canvas.x, y: e.canvas.y })) {
      self.options.delegateCenterDiff = {
        x: e.canvas.x - self.pointerDown.x,
        y: e.canvas.y - self.pointerDown.y,
      };
      self.magnify(e, this.cacheCenter);
    }
  }

  protected onWheel(e: IG6GraphEvent) {
    let lensDelegate = this.options.delegate;
    if (!lensDelegate || lensDelegate.destroyed) return;
    if (this.options.scaleDBy !== 'wheel' && this.options.scaleRBy !== 'wheel')
      return;
    if (this.isInLensDelegate(lensDelegate, { x: e.canvas.x, y: e.canvas.y })) {
      if (this.options.scaleRBy === 'wheel') {
        this.scaleRByWheel(e);
      }
      if (this.options.scaleDBy === 'wheel') {
        this.scaleDByWheel(e);
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
    const lensDelegate = self.options.delegate;
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
    // graph.canvas.context.config.canvas
    const graphHeight = graph.canvas.context.config.canvas.height;
    if (
      (r > (maxR || graphHeight) && ratio > 1) ||
      (r < (minR || graphHeight * 0.05) && ratio < 1)
    ) {
      ratio = 1;
    }
    r *= ratio;
    self.options.r = r;
    self.options.r2 = r * r;
    const d = self.options.d;
    self.options.molecularParam = (d + 1) * r;
    self.options.delegateCenterDiff = undefined;
    self.magnify(e, mousePos);
  }

  /**
   * Scale the range by dragging
   * @param e mouse event
   */
  protected scaleRByDrag = throttle(
    this.scaleRByDragMethod,
    this.options.throttle,
    { leading: true, trailing: true },
  );
  protected scaleRByDragMethod(e: IG6GraphEvent) {
    const self = this;
    if (!e) return;
    const dragPrePos = self.dragPrePos;
    const graph: IGraph = self.graph;
    let ratio;
    if (e.canvas.x - dragPrePos.x < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
    const maxR = self.options.maxR;
    const minR = self.options.minR;
    let r = self.options.r;
    const graphCanvasEl = graph.canvas.context.config.canvas;
    const [
      graphWidth = graphCanvasEl?.width || 500,
      graphHeight = graphCanvasEl?.height || 500,
    ] = graph.getSize();
    if (
      (r > (maxR || graphHeight) && ratio > 1) ||
      (r < (minR || graphHeight * 0.05) && ratio < 1)
    ) {
      ratio = 1;
    }
    r *= ratio;
    self.options.r = r;
    self.options.r2 = r * r;
    const d = self.options.d;
    self.options.molecularParam = (d + 1) * r;
    // self.magnify(e, mousePos);
    self.magnify(e);
    self.dragPrePos = { x: e.canvas.x, y: e.canvas.y };
  }

  /**
   * Scale the magnifying factor by wheel
   * @param e mouse wheel event
   */
  protected scaleDByWheel(evt: IG6GraphEvent) {
    const self = this;
    if (!evt && !evt.originalEvent) return;
    if (evt.preventDefault) evt.preventDefault();
    let delta = 0;
    if ((evt.originalEvent as any).wheelDelta < 0) {
      delta = -0.1;
    } else {
      delta = 0.1;
    }
    const d = self.options.d;
    const newD = d + delta;
    const maxD = self.options.maxD;
    const minD = self.options.minD;
    if (newD < maxD && newD > minD) {
      self.options.d = newD;
      const r = self.options.r;
      self.options.molecularParam = (newD + 1) * r;
      const lensDelegate = self.options.delegate;
      const lensCenter = lensDelegate
        ? {
            x: lensDelegate.attr('x'),
            y: lensDelegate.attr('y'),
          }
        : undefined;
      self.options.delegateCenterDiff = undefined;
      self.magnify(evt, lensCenter);
    }
  }

  /**
   * Scale the magnifying factor by dragging
   * @param e mouse event
   */
  protected scaleDByDrag = throttle(
    this.scaleDByDragMethod,
    this.options.throttle,
    { leading: true, trailing: true },
  );
  protected scaleDByDragMethod(e: IG6GraphEvent) {
    const self = this;
    const dragPrePos = self.dragPrePos;
    const delta = e.canvas.x - dragPrePos.x > 0 ? 0.1 : -0.1;
    const d = self.options.d;
    const newD = d + delta;
    const maxD = self.options.maxD;
    const minD = self.options.minD;
    if (newD < maxD && newD > minD) {
      self.options.d = newD;
      const r = self.options.r;
      self.options.molecularParam = (newD + 1) * r;
      self.magnify(e);
    }
    self.dragPrePos = { x: e.canvas.x, y: e.canvas.y };
  }

  /**
   * Response function for mousemove, click, or drag to magnify
   * @param e mouse event
   */
  protected magnify(e: IG6GraphEvent, mousePos?) {
    const self = this;
    self.restoreCache();
    const graph: IGraph = self.graph;
    const cachedMagnifiedModels = self.options.cachedMagnifiedModels;
    const cachedOriginPositions = self.options.cachedOriginPositions;
    const cachedTransientTexts = self.options.cachedTransientTexts;
    const showLabel = self.options.showLabel;
    const r = self.options.r;
    const r2 = self.options.r2;
    const d = self.options.d;
    const molecularParam = self.options.molecularParam;
    const nodes = graph.getAllNodesData();
    const nodeLength = nodes.length;
    let mCenter = mousePos
      ? { x: mousePos.x, y: mousePos.y }
      : { x: e.client.x, y: e.client.y };
    if (
      self.dragging &&
      (self.options.trigger === 'mousemove' || self.options.trigger === 'click')
    ) {
      mCenter = self.cacheCenter;
    }
    const delegateCenterDiff = self.options.delegateCenterDiff;
    if (delegateCenterDiff) {
      mCenter.x += delegateCenterDiff.x;
      mCenter.y += delegateCenterDiff.y;
    }
    self.updateDelegate(mCenter, r, e);
    for (let i = 0; i < nodeLength; i++) {
      const model = nodes[i];
      const { x, y } = model.data;
      if (isNaN(x) || isNaN(y)) continue;
      // the square of the distance between the node and the magnified center
      const dist2 =
        (x - mCenter.x) * (x - mCenter.x) + (y - mCenter.y) * (y - mCenter.y);
      if (!isNaN(dist2) && dist2 < r2 && dist2 !== 0) {
        const dist = Math.sqrt(dist2);
        // // (r * (d + 1) * (dist / r)) / (d * (dist / r) + 1);
        const magnifiedDist = (molecularParam * dist) / (d * dist + r);
        const cos = (x - mCenter.x) / dist;
        const sin = (y - mCenter.y) / dist;
        const magnifiedX = cos * magnifiedDist + mCenter.x;
        const magnifiedY = sin * magnifiedDist + mCenter.y;
        const magnifiedNode = {
          data: { x: magnifiedX, y: magnifiedY },
          id: nodes[i].id,
        };
        if (!cachedOriginPositions[model.id]) {
          cachedOriginPositions[model.id] = { x, y, texts: [] };
        }
        cachedMagnifiedModels.push(model);
        if (showLabel && 2 * dist < r) {
          const node = nodes[i];
          const transientTextID = `node-text-${node.id}`;
          const cachedTransientText = cachedTransientTexts[transientTextID];
          if (cachedTransientText) {
            cachedTransientText.attr({
              x: magnifiedNode.data.x,
              y: magnifiedNode.data.y,
            });
            cachedTransientText.show();
            cachedOriginPositions[model.id].texts.push(cachedTransientText);
          } else {
            const text = graph.drawTransient('text', transientTextID, {
              style: {
                text: node.label,
                x: magnifiedNode.data.x,
                y: magnifiedNode.data.y,
                textAlign: 'center',
                textBaseline: 'middle',
                fill: '#000',
                lineWidth: 1,
                fontSize: 12,
                isBillboard: true,
                lod: -1,
              },
            });
            magnifiedNode.labelShape = text;
            cachedTransientTexts[transientTextID] = text;
            cachedOriginPositions[model.id].texts.push(text);
          }
        }
        nodes[i] = magnifiedNode;
      }
    }
    graph.updateNodePosition(nodes);
  }

  /**
   * Restore the cache nodes while magnifying
   */
  protected restoreCache() {
    const self = this;
    const cachedMagnifiedModels = self.options.cachedMagnifiedModels;
    const cachedOriginPositions = self.options.cachedOriginPositions;
    const cacheLength = cachedMagnifiedModels.length;
    for (let i = 0; i < cacheLength; i++) {
      const node = cachedMagnifiedModels[i];
      const id = node.id;
      const ori = cachedOriginPositions[id];
      node.data.x = ori.x;
      node.data.y = ori.y;
      const textLength = ori.texts.length;
      for (let j = 0; j < textLength; j++) {
        const text = ori.texts[j];
        text.hide();
      }
    }
    self.options.cachedMagnifiedModels = [];
    self.options.cachedOriginPositions = {};
  }

  /**
   * Adjust part of the parameters, including trigger, d, r, maxR, minR, maxD, minD, scaleRBy, and scaleDBy
   * @param {FisheyeConfig} cfg
   */
  public updateParams(cfg: FisheyeConfig) {
    const self = this;
    const { r, d, trigger, minD, maxD, minR, maxR, scaleDBy, scaleRBy } = cfg;
    if (!isNaN(cfg.r)) {
      self.options.r = r;
      self.options.r2 = r * r;
    }
    if (!isNaN(d)) {
      self.options.d = d;
    }
    if (!isNaN(maxD)) {
      self.options.maxD = maxD;
    }
    if (!isNaN(minD)) {
      self.options.minD = minD;
    }
    if (!isNaN(maxR)) {
      self.options.maxR = maxR;
    }
    if (!isNaN(minR)) {
      self.options.minR = minR;
    }
    const nd = self.options.d;
    const nr = self.options.r;
    self.options.molecularParam = (nd + 1) * nr;
    if (trigger === 'mousemove' || trigger === 'click' || trigger === 'drag') {
      self.options.trigger = trigger;
    }
    if (scaleDBy === 'drag' || scaleDBy === 'wheel' || scaleDBy === 'unset') {
      self.options.scaleDBy = scaleDBy;
      self.options.delegate.remove();
      self.options.delegate.destroy();
      const dPercentText = self.options.dPercentText;
      if (dPercentText) {
        dPercentText.remove();
        dPercentText.destroy();
      }
    }
    if (scaleRBy === 'drag' || scaleRBy === 'wheel' || scaleRBy === 'unset') {
      self.options.scaleRBy = scaleRBy;
      self.options.delegate.remove();
      self.options.delegate.destroy();
      const dPercentText = self.options.dPercentText;
      if (dPercentText) {
        dPercentText.remove();
        dPercentText.destroy();
      }
    }
  }

  /**
   * Update the delegate shape of the lens
   * @param {Point} mCenter the center of the shape
   * @param {number} r the radius of the shape
   */
  private updateDelegate(mCenter, r, e) {
    const self = this;
    const graph = self.graph;
    let lensDelegate = self.options.delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      // 拖动多个
      const parent = graph.canvas.getRoot();
      const attrs = self.options.delegateStyle || lensDelegateStyle;

      // model上的x, y是相对于图形中心的, delegateShape是g实例, x,y是绝对坐标
      lensDelegate = graph.drawTransient('circle', 'lens-shape', {
        style: {
          r: r / 1.5,
          cx: mCenter.x,
          cy: mCenter.y,
          ...attrs,
        },
      });
    } else {
      lensDelegate.attr({
        cx: mCenter.x,
        cy: mCenter.y,
        r: r / 1.5,
      });
    }

    // 绘制缩放系数百分比文本
    if (self.options.showDPercent) {
      const percent = Math.round(
        ((self.options.d - self.options.minD) /
          (self.options.maxD - self.options.minD)) *
          100,
      );
      let dPercentText = self.options.dPercentText;
      const textY = mCenter.y + r / 1.5 + 16;
      if (!dPercentText || dPercentText.destroyed) {
        const parent = graph.canvas.getRoot();
        const text = new Text({
          style: {
            text: `${percent}%`,
            x: mCenter.x,
            y: textY,
            fill: '#aaa',
            stroke: '#fff',
            lineWidth: 1,
            fontSize: 12,
          },
        });
        dPercentText = parent.appendChild(text);
        self.options.dPercentText = dPercentText;
      } else {
        dPercentText.attr({
          text: `${percent}%`,
          x: mCenter.x,
          y: textY,
        });
      }
    }
    self.options.delegate = lensDelegate;

    // 调整 r 和 d 范围
    if (this.options.trigger !== 'drag') {
      // 调整范围 r 的监听
      if (this.options.scaleRBy === 'wheel') {
        // 使用滚轮调整 r
        //   lensDelegate.on('mousewheel', (evt) => {
        //     self.scaleRByWheel(evt);
        //   });
        // this.scaleRByWheel(e);
      } else if (this.options.scaleRBy === 'drag') {
        // 使用拖拽调整 r
        if (!this.pointerDown) return;
        this.scaleRByDrag(e);
      }

      // 调整缩放系数 d 的监听
      if (this.options.scaleDBy === 'wheel') {
        // 使用滚轮调整 d
        // lensDelegate.on('mousewheel', (evt) => {
        //   this.scaleDByWheel(evt);
        // });
        // this.scaleDByWheel(e);
      } else if (this.options.scaleDBy === 'drag') {
        // 使用拖拽调整 d
        if (!this.pointerDown) return;
        this.scaleDByDrag(e);
      }
    }
  }

  /**
   * Clear the fisheye lens
   */
  public clear() {
    const graph = this.graph;
    this.restoreCache();
    // graph.refreshPositions();
    // graph.updateData();
    const lensDelegate = this.options.delegate;
    if (lensDelegate && !lensDelegate.destroyed) {
      lensDelegate.remove();
      lensDelegate.destroy();
    }
    const dPercentText = this.options.dPercentText;
    if (dPercentText && !dPercentText.destroyed) {
      dPercentText.remove();
      dPercentText.destroy();
    }
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
  }
}
