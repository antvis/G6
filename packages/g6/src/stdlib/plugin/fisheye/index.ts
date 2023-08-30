import { DisplayObject } from '@antv/g';
import { clone, throttle } from '@antv/util';
import { IGraph } from '../../../types';
import { Point } from '../../../types/common';
import { IG6GraphEvent } from '../../../types/event';
import { ShapeStyle } from '../../../types/item';
import { Plugin as Base, IPluginBaseConfig } from '../../../types/plugin';

const DELTA = 0.05;

export interface FisheyeConfig extends IPluginBaseConfig {
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
export class Fisheye extends Base {
  private pointerDown: Point | undefined = undefined;
  private cacheCenter: Point | undefined = undefined;
  private dragPrePos: Point | undefined = undefined;
  private dragging = false;
  private molecularParam: number;
  private dPercentText: DisplayObject;
  private delegate: DisplayObject;
  private r2: number;

  private cachedOriginPositions: {
    [id: string]: {
      x: number;
      y: number;
      texts: DisplayObject[];
    };
  } = {};

  private cachedTransientTexts: {
    [id: string]: DisplayObject;
  } = {};

  private delegateCenterDiff: { x: number; y: number };

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
    const events = {
      pointerdown: this.onPointerDown,
      pointerup: this.onPointerUp,
      wheel: this.onWheel,
      afterlayout: this.initOriginPositions,
    } as {
      [key: string]: any;
    };
    switch ((this as any).options.trigger) {
      case 'click':
        return {
          ...events,
          click: this.magnify,
        };
      case 'drag':
        return {
          ...events,
          pointermove: this.onPointerMove,
        };
      default:
        return {
          ...events,
          pointermove: this.magnify,
        };
    }
  }

  public init(graph: IGraph) {
    super.init(graph);
    const { r, d } = this.options;
    this.cachedTransientTexts = {};
    this.initOriginPositions();
    this.r2 = r * r;
    this.molecularParam = (d + 1) * r;
  }

  private initOriginPositions = () => {
    const { graph } = this;
    const positions = {};
    graph.getAllNodesData().forEach((node) => {
      positions[node.id] = { x: node.data.x, y: node.data.y, texts: [] };
    });
    this.cachedOriginPositions = positions;
    return positions;
  };

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

  protected onPointerUp(e: IG6GraphEvent) {
    this.pointerDown = undefined;
    this.cacheCenter = undefined;
    this.dragging = false;
  }

  protected onPointerMove(e: IG6GraphEvent) {
    if (!this.dragging && this.pointerDown) {
      this.dragging = true;
    }
    if (!this.pointerDown) return;
    this.moveDelegate(this.delegate, e);
  }

  protected onPointerDown(e: IG6GraphEvent) {
    const { delegate: lensDelegate } = this;
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
    if (this.isInLensDelegate(lensDelegate, { x: e.canvas.x, y: e.canvas.y })) {
      this.delegateCenterDiff = {
        x: e.canvas.x - this.pointerDown.x,
        y: e.canvas.y - this.pointerDown.y,
      };
      this.magnify(e, this.cacheCenter);
    }
  }

  protected onWheel(e: IG6GraphEvent) {
    const { delegate: lensDelegate, options } = this;
    const { scaleDBy, scaleRBy } = options;
    if (!lensDelegate || lensDelegate.destroyed) return;
    if (scaleDBy !== 'wheel' && scaleRBy !== 'wheel') return;
    if (this.isInLensDelegate(lensDelegate, { x: e.canvas.x, y: e.canvas.y })) {
      if (scaleRBy === 'wheel') {
        this.scaleRByWheel(e);
      }
      if (scaleDBy === 'wheel') {
        this.scaleDByWheel(e);
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
    let ratio;
    const { delegate: lensDelegate, maxR, minR, d } = options;
    let { r } = options;
    const lensCenter = lensDelegate
      ? {
          x: lensDelegate.attr('cx'),
          y: lensDelegate.attr('cy'),
        }
      : undefined;
    const mousePos = lensCenter || { x: e.canvas.x, y: e.canvas.y };
    if ((e.originalEvent as any).deltaY < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
    const graphHeight = graph.canvas.context.config.canvas.height;
    if (
      (r > (maxR || graphHeight) && ratio > 1) ||
      (r < (minR || graphHeight * 0.05) && ratio < 1)
    ) {
      ratio = 1;
    }
    r *= ratio;
    this.options.r = r;
    this.r2 = r * r;
    this.molecularParam = (d + 1) * r;
    this.delegateCenterDiff = undefined;
    this.magnify(e, mousePos);
  }

  /**
   * Scale the range by dragging
   * @param e mouse event
   */
  protected scaleRByDrag = throttle(
    this.scaleRByDragMethod.bind(this),
    this.options.throttle,
    { leading: true, trailing: true },
  );
  protected scaleRByDragMethod(e: IG6GraphEvent) {
    if (!e) return;
    const { dragPrePos, graph, options } = this;
    const { maxR, minR, d } = options;
    let { r } = options;
    let ratio;
    if (e.canvas.x - dragPrePos.x < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
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
    this.options.r = r;
    this.r2 = r * r;
    this.molecularParam = (d + 1) * r;
    this.magnify(e);
    this.dragPrePos = { x: e.canvas.x, y: e.canvas.y };
  }

  /**
   * Scale the magnifying factor by wheel
   * @param e mouse wheel event
   */
  protected scaleDByWheel(evt: IG6GraphEvent) {
    if (!evt && !evt.originalEvent) return;
    if (evt.preventDefault) evt.preventDefault();
    let delta = 0;
    if ((evt.originalEvent as any).deltaY < 0) {
      delta = -0.1;
    } else {
      delta = 0.1;
    }
    const { d, maxD, minD, r } = this.options;
    const newD = d + delta;
    if (newD < maxD && newD > minD) {
      this.options.d = newD;
      this.molecularParam = (newD + 1) * r;
      const { delegate: lensDelegate } = this;
      const lensCenter = lensDelegate
        ? {
            x: lensDelegate.attr('cx'),
            y: lensDelegate.attr('cy'),
          }
        : undefined;
      this.delegateCenterDiff = undefined;
      this.magnify(evt, lensCenter);
    }
  }

  /**
   * Scale the magnifying factor by dragging
   * @param e mouse event
   */
  protected scaleDByDrag = throttle(
    this.scaleDByDragMethod.bind(this),
    this.options.throttle,
    { leading: true, trailing: true },
  );
  protected scaleDByDragMethod(e: IG6GraphEvent) {
    const { d, maxD, minD, r } = this.options;
    const delta = e.canvas.x - this.dragPrePos.x > 0 ? 0.1 : -0.1;
    const newD = d + delta;
    if (newD < maxD && newD > minD) {
      this.options.d = newD;
      this.molecularParam = (newD + 1) * r;
      this.magnify(e);
    }
    this.dragPrePos = { x: e.canvas.x, y: e.canvas.y };
  }

  /**
   * Response function for mousemove, click, or drag to magnify
   * @param e mouse event
   */
  protected magnify(e: IG6GraphEvent, mousePos?) {
    this.restoreCache();
    const {
      r2,
      graph,
      cachedOriginPositions,
      cachedTransientTexts,
      molecularParam,
      delegateCenterDiff,
      options,
    } = this;
    const positions = Object.keys(cachedOriginPositions).map((id) => ({
      id,
      data: {
        x: cachedOriginPositions[id].x,
        y: cachedOriginPositions[id].y,
      },
    }));
    const { r, d, showLabel, trigger } = options;
    const nodes = graph.getAllNodesData();
    const nodeLength = nodes.length;
    const point = graph.getCanvasByClient(e.client);
    let mCenter = mousePos
      ? { x: mousePos.x, y: mousePos.y }
      : { x: point.x, y: point.y };
    if (this.dragging && (trigger === 'mousemove' || trigger === 'click')) {
      mCenter = this.cacheCenter;
    }
    if (delegateCenterDiff) {
      mCenter.x += delegateCenterDiff.x;
      mCenter.y += delegateCenterDiff.y;
    }
    this.updateDelegate(mCenter, r, e);
    for (let i = 0; i < nodeLength; i++) {
      const model = nodes[i];
      const { x, y } = cachedOriginPositions[model.id]; // calculate based on the origin positions
      if (isNaN(x) || isNaN(y)) continue;
      // the square of the distance between the node and the magnified center
      const dist2 =
        (x - mCenter.x) * (x - mCenter.x) + (y - mCenter.y) * (y - mCenter.y);
      if (!isNaN(dist2) && dist2 < r2 && dist2 !== 0) {
        const dist = Math.sqrt(dist2);
        // // (r * (d + 1) * (dist / r)) / (d * (dist / r) + 1);
        const magnifiedDist = (molecularParam * dist) / (d * dist + r);
        const vecX = (x - mCenter.x) / dist;
        const vecY = (y - mCenter.y) / dist;
        const magnifiedX = vecX * magnifiedDist + mCenter.x;
        const magnifiedY = vecY * magnifiedDist + mCenter.y;
        const magnifiedNode = {
          id: model.id,
          data: { x: magnifiedX, y: magnifiedY },
        };
        const textContent =
          model.data.label || (model.data.labelShape as any)?.text;
        if (showLabel && 2 * dist < r) {
          const transientTextID = `node-text-${model.id}`;
          const cachedTransientText = cachedTransientTexts[transientTextID];
          if (cachedTransientText) {
            cachedTransientText.attr({
              x: magnifiedNode.data.x,
              y: magnifiedNode.data.y,
            });
            cachedTransientText.show();
            cachedOriginPositions[model.id].texts.push(cachedTransientText);
          } else if (textContent) {
            const text = graph.drawTransient('text', transientTextID, {
              style: {
                text: textContent,
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
            cachedTransientTexts[transientTextID] = text;
            cachedOriginPositions[model.id].texts.push(text);
          }
        }
        positions[model.id] = magnifiedNode;
      } else {
        // update the origin positions outside of the lens
        if (!cachedOriginPositions[model.id]) {
          cachedOriginPositions[model.id] = { x, y, texts: [] };
        }
      }
    }
    graph.updateNodePosition(Object.values(positions));
  }

  protected restoreCache() {
    const cachePositions = { ...this.cachedOriginPositions };
    Object.values(this.cachedOriginPositions).forEach((position) => {
      position.texts?.forEach((text) => text.hide());
    });
    return cachePositions;
  }

  /**
   * Adjust part of the parameters, including trigger, d, r, maxR, minR, maxD, minD, scaleRBy, and scaleDBy
   * @param {FisheyeConfig} cfg
   */
  public updateParams(cfg: FisheyeConfig) {
    const { r, d, trigger, minD, maxD, minR, maxR, scaleDBy, scaleRBy } = cfg;
    if (!isNaN(cfg.r)) {
      this.options.r = r;
      this.r2 = r * r;
    }
    if (!isNaN(d)) {
      this.options.d = d;
    }
    if (!isNaN(maxD)) {
      this.options.maxD = maxD;
    }
    if (!isNaN(minD)) {
      this.options.minD = minD;
    }
    if (!isNaN(maxR)) {
      this.options.maxR = maxR;
    }
    if (!isNaN(minR)) {
      this.options.minR = minR;
    }
    const { graph, dPercentText, options } = this;
    const { d: nd, r: nr } = options;
    this.molecularParam = (nd + 1) * nr;
    if (trigger === 'mousemove' || trigger === 'click' || trigger === 'drag') {
      this.options.trigger = trigger;
    }
    if (scaleDBy === 'drag' || scaleDBy === 'wheel' || scaleDBy === 'unset') {
      this.options.scaleDBy = scaleDBy;
      graph.drawTransient('circle', 'lens-shape', { action: 'remove' });
      if (dPercentText) {
        graph.drawTransient('text', 'lens-text-shape', { action: 'remove' });
      }
    }
    if (scaleRBy === 'drag' || scaleRBy === 'wheel' || scaleRBy === 'unset') {
      this.options.scaleRBy = scaleRBy;
      graph.drawTransient('circle', 'lens-shape', { action: 'remove' });
      if (dPercentText) {
        graph.drawTransient('text', 'lens-text-shape', { action: 'remove' });
      }
    }
  }

  /**
   * Update the delegate shape of the lens
   * @param {Point} mCenter the center of the shape
   * @param {number} r the radius of the shape
   */
  private updateDelegate(mCenter, r, e) {
    const { graph, dPercentText } = this;
    let lensDelegate = this.delegate;
    if (!lensDelegate || lensDelegate.destroyed) {
      const attrs = this.options.delegateStyle || lensDelegateStyle;
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

    const { d, minD, maxD, showDPercent } = this.options;

    // draw the zoom factor percentage text
    if (showDPercent) {
      const percent = Math.round(((d - minD) / (maxD - minD)) * 100);
      const textY = mCenter.y + r / 1.5 + 16;
      if (!dPercentText || dPercentText.destroyed) {
        const text = graph.drawTransient('text', 'lens-text-shape', {
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
        this.dPercentText = text;
      } else {
        dPercentText.attr({
          text: `${percent}%`,
          x: mCenter.x,
          y: textY,
        });
      }
    }
    this.delegate = lensDelegate;

    // Adjust the range of r and d
    if (this.options.trigger !== 'drag') {
      if (this.options.scaleRBy === 'drag') {
        if (!this.pointerDown) return;
        this.scaleRByDrag(e);
      }

      if (this.options.scaleDBy === 'drag') {
        if (!this.pointerDown) return;
        this.scaleDByDrag(e);
      }
    }
  }

  /**
   * Clear the fisheye lens
   */
  public clear() {
    const {
      graph,
      delegate: lensDelegate,
      cachedOriginPositions,
      dPercentText,
    } = this;
    this.restoreCache();
    graph.updateNodePosition(
      Object.keys(cachedOriginPositions).map((id) => ({
        id,
        data: {
          x: cachedOriginPositions[id].x,
          y: cachedOriginPositions[id].y,
        },
      })),
    );
    if (lensDelegate && !lensDelegate.destroyed) {
      graph.drawTransient('circle', 'lens-shape', { action: 'remove' });
    }
    if (dPercentText && !dPercentText.destroyed) {
      graph.drawTransient('text', 'lens-text-shape', { action: 'remove' });
    }
  }

  /**
   * Destroy the component
   */
  public destroy() {
    this.clear();
  }
}
