import { clone } from '@antv/util';
import { IG6GraphEvent, ShapeStyle } from '../../types';
import Graph from '../../graph/graph';
import Base from '../base';

const DELTA = 0.05;

interface FisheyeConfig {
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
  public getDefaultCfgs(): FisheyeConfig {
    return {
      trigger: 'mousemove',
      d: 1.5,
      r: 300,
      delegateStyle: clone(lensDelegateStyle),
      showLabel: false,
      maxD: 5,
      minD: 0,
      scaleRBy: 'unset',
      scaleDBy: 'unset',
      showDPercent: true
    };
  }

  // class-methods-use-this
  public getEvents() {
    let events;
    switch ((this as any).get('trigger')) {
      case 'click':
        events = {
          click: 'magnify',
        };
        break;
      case 'drag':
        events = {
          click: 'createDelegate',
        };
        break;
      default:
        events = {
          mousemove: 'magnify',
        };
        break;
    }
    return events;
  }

  public init() {
    const self = this;
    const r = self.get('r');
    self.set('cachedMagnifiedModels', []);
    self.set('cachedOriginPositions', {});
    self.set('r2', r * r);
    const d = self.get('d');
    self.set('molecularParam', (d + 1) * r);
  }

  // Create the delegate when the trigger is drag
  protected createDelegate(e: IG6GraphEvent) {
    const self = this;
    let lensDelegate = self.get('delegate');
    if (!lensDelegate || lensDelegate.destroyed) {
      self.magnify(e);
      lensDelegate = self.get('delegate');

      // drag to move the lens
      lensDelegate.on('dragstart', evt => {
        self.set('delegateCenterDiff',
          { x: lensDelegate.attr('x') - evt.x, y: lensDelegate.attr('y') - evt.y }
        );
      });
      lensDelegate.on('drag', evt => {
        self.magnify(evt);
      });

      // 绑定调整范围（r）和缩放系数(d)的监听
      // 由于 drag 用于改变 lens 位置, 因此在此模式下, drag 不能用于调整 r 和 d

      // scaling d
      if (this.get('scaleDBy') === 'wheel') {
        lensDelegate.on('mousewheel', evt => {
          this.scaleDByWheel(evt);
        });
      }

      // scaling r
      if (this.get('scaleRBy') === 'wheel') {
        lensDelegate.on('mousewheel', evt => {
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
    const graph: Graph = self.get('graph');
    let ratio;
    const lensDelegate = self.get('delegate');
    const lensCenter = lensDelegate ? {
      x: lensDelegate.attr('x'),
      y: lensDelegate.attr('y')
    } : undefined;
    const mousePos = lensCenter || graph.getPointByClient(e.clientX, e.clientY);
    if ((e.originalEvent as any).wheelDelta < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
    const maxR = self.get('maxR');
    const minR = self.get('minR');
    let r = self.get('r');
    if ((r > (maxR || graph.get('height')) && ratio > 1)
      || (r < (minR || (graph.get('height') * 0.05)) && ratio < 1)) {
      ratio = 1;
    }
    r *= ratio;
    self.set('r', r);
    self.set('r2', r * r);
    const d = self.get('d');
    self.set('molecularParam', (d + 1) * r);
    self.set('delegateCenterDiff', undefined);
    self.magnify(e, mousePos);
  }


  /**
   * Scale the range by dragging
   * @param e mouse event
   */
  protected scaleRByDrag(e: IG6GraphEvent) {
    const self = this;
    if (!e) return;
    const dragPrePos = self.get('dragPrePos');
    const graph: Graph = self.get('graph');
    let ratio;
    const mousePos = graph.getPointByClient(e.clientX, e.clientY);
    if (e.x - dragPrePos.x < 0) {
      ratio = 1 - DELTA;
    } else {
      ratio = 1 / (1 - DELTA);
    }
    const maxR = self.get('maxR');
    const minR = self.get('minR');
    let r = self.get('r');
    if ((r > (maxR || graph.get('height')) && ratio > 1)
      || (r < (minR || (graph.get('height') * 0.05)) && ratio < 1)) {
      ratio = 1;
    }
    r *= ratio;
    self.set('r', r);
    self.set('r2', r * r);
    const d = self.get('d');
    self.set('molecularParam', (d + 1) * r);
    self.magnify(e, mousePos);
    self.set('dragPrePos', { x: e.x, y: e.y });
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
    const d = self.get('d');
    const newD = d + delta;
    const maxD = self.get('maxD');
    const minD = self.get('minD');
    if (newD < maxD && newD > minD) {
      self.set('d', newD);
      const r = self.get('r');
      self.set('molecularParam', (newD + 1) * r);
      const lensDelegate = self.get('delegate');
      const lensCenter = lensDelegate ? {
        x: lensDelegate.attr('x'),
        y: lensDelegate.attr('y')
      } : undefined;
      self.set('delegateCenterDiff', undefined);
      self.magnify(evt, lensCenter);
    }
  }

  /**
   * Scale the magnifying factor by dragging
   * @param e mouse event
   */
  protected scaleDByDrag(e: IG6GraphEvent) {
    const self = this;
    const dragPrePos = self.get('dragPrePos');
    const delta = e.x - dragPrePos.x > 0 ? 0.1 : -0.1;
    const d = self.get('d');
    const newD = d + delta;
    const maxD = self.get('maxD');
    const minD = self.get('minD');
    if (newD < maxD && newD > minD) {
      self.set('d', newD);
      const r = self.get('r');
      self.set('molecularParam', (newD + 1) * r);
      self.magnify(e);
    }
    self.set('dragPrePos', { x: e.x, y: e.y });
  }

  /**
   * Response function for mousemove, click, or drag to magnify
   * @param e mouse event
   */
  protected magnify(e: IG6GraphEvent, mousePos?) {
    const self = this;
    self.restoreCache();
    const graph: Graph = self.get('graph');
    const cachedMagnifiedModels = self.get('cachedMagnifiedModels');
    const cachedOriginPositions = self.get('cachedOriginPositions');
    const showLabel = self.get('showLabel');
    const r = self.get('r');
    const r2 = self.get('r2');
    const d = self.get('d');
    const molecularParam = self.get('molecularParam');
    const nodes = graph.getNodes();
    const nodeLength = nodes.length;
    let mCenter = mousePos ? { x: mousePos.x, y: mousePos.y } : { x: e.x, y: e.y };
    if (self.get('dragging') && (self.get('trigger') === 'mousemove' || self.get('trigger') === 'click')) {
      mCenter = self.get('cacheCenter');
    }
    const delegateCenterDiff = self.get('delegateCenterDiff');
    if (delegateCenterDiff) {
      mCenter.x += delegateCenterDiff.x;
      mCenter.y += delegateCenterDiff.y;
    }
    self.updateDelegate(mCenter, r);
    for (let i = 0; i < nodeLength; i++) {
      const model = nodes[i].getModel();
      const { x, y } = model;
      if (isNaN(x) || isNaN(y)) continue;
      // the square of the distance between the node and the magnified center
      const dist2 = (x - mCenter.x) * (x - mCenter.x) + (y - mCenter.y) * (y - mCenter.y);
      if (!isNaN(dist2) && dist2 < r2 && dist2 !== 0) {
        const dist = Math.sqrt(dist2);
        // (r * (d + 1) * (dist / r)) / (d * (dist / r) + 1);
        const magnifiedDist = molecularParam * dist / (d * dist + r);
        const cos = (x - mCenter.x) / dist;
        const sin = (y - mCenter.y) / dist;
        model.x = cos * magnifiedDist + mCenter.x;
        model.y = sin * magnifiedDist + mCenter.y;
        if (!cachedOriginPositions[model.id]) {
          cachedOriginPositions[model.id] = { x, y, texts: [] };
        }
        cachedMagnifiedModels.push(model);
        if (showLabel && 2 * dist < r) {
          const node = nodes[i];
          const nodeGroup = node.getContainer();
          const shapes = nodeGroup.getChildren();
          const shapeLength = shapes.length;
          for (let j = 0; j < shapeLength; j++) {
            const shape = shapes[j];
            if (shape.get('type') === 'text') {
              cachedOriginPositions[model.id].texts.push({
                visible: shape.get('visible'),
                shape,
              });
              shape.set('visible', true);
            }
          }
        }
      }
    }
    graph.refreshPositions();
  }

  /**
   * Restore the cache nodes while magnifying
   */
  protected restoreCache() {
    const self = this;
    const cachedMagnifiedModels = self.get('cachedMagnifiedModels');
    const cachedOriginPositions = self.get('cachedOriginPositions');
    const cacheLength = cachedMagnifiedModels.length;
    for (let i = 0; i < cacheLength; i++) {
      const node = cachedMagnifiedModels[i];
      const id = node.id;
      const ori = cachedOriginPositions[id];
      node.x = ori.x;
      node.y = ori.y;
      const textLength = ori.texts.length;
      for (let j = 0; j < textLength; j++) {
        const text = ori.texts[j];
        text.shape.set('visible', text.visible);
      }
    }
    self.set('cachedMagnifiedModels', []);
    self.set('cachedOriginPositions', {});
  }


  /**
   * Adjust part of the parameters, including trigger, d, r, maxR, minR, maxD, minD, scaleRBy, and scaleDBy
   * @param {FisheyeConfig} cfg
   */
  public updateParams(cfg: FisheyeConfig) {
    const self = this;
    const { r, d, trigger, minD, maxD, minR, maxR, scaleDBy, scaleRBy } = cfg;
    if (!isNaN(cfg.r)) {
      self.set('r', r);
      self.set('r2', r * r);
    }
    if (!isNaN(d)) {
      self.set('d', d);
    }
    if (!isNaN(maxD)) {
      self.set('maxD', maxD);
    }
    if (!isNaN(minD)) {
      self.set('minD', minD);
    }
    if (!isNaN(maxR)) {
      self.set('maxR', maxR);
    }
    if (!isNaN(minR)) {
      self.set('minR', minR);
    }
    const nd = self.get('d');
    const nr = self.get('r');
    self.set('molecularParam', (nd + 1) * nr);
    if (trigger === 'mousemove' || trigger === 'click' || trigger === 'drag') {
      self.set('trigger', trigger);
    }
    if (scaleDBy === 'drag' || scaleDBy === 'wheel' || scaleDBy === 'unset') {
      self.set('scaleDBy', scaleDBy);
      self.get('delegate').remove();
      self.get('delegate').destroy();
      const dPercentText = self.get('dPercentText');
      if (dPercentText) {
        dPercentText.remove();
        dPercentText.destroy();
      }
    }
    if (scaleRBy === 'drag' || scaleRBy === 'wheel' || scaleRBy === 'unset') {
      self.set('scaleRBy', scaleRBy);
      self.get('delegate').remove();
      self.get('delegate').destroy();
      const dPercentText = self.get('dPercentText');
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
  private updateDelegate(mCenter, r) {
    const self = this;
    const graph = self.get('graph');
    let lensDelegate = self.get('delegate');
    if (!lensDelegate || lensDelegate.destroyed) {
      // 拖动多个
      const parent = graph.get('group');
      const attrs = self.get('delegateStyle') || lensDelegateStyle;

      // model上的x, y是相对于图形中心的, delegateShape是g实例, x,y是绝对坐标
      lensDelegate = parent.addShape('circle', {
        attrs: {
          r: r / 1.5,
          x: mCenter.x,
          y: mCenter.y,
          ...attrs,
        },
        name: 'lens-shape',
        draggable: true
      });

      if (this.get('trigger') !== 'drag') {
        // 调整范围 r 的监听
        if (this.get('scaleRBy') === 'wheel') {
          // 使用滚轮调整 r
          lensDelegate.on('mousewheel', evt => {
            self.scaleRByWheel(evt);
          });
        } else if (this.get('scaleRBy') === 'drag') {
          // 使用拖拽调整 r
          lensDelegate.on('dragstart', e => {
            self.set('dragging', true);
            self.set('cacheCenter', { x: e.x, y: e.y });
            self.set('dragPrePos', { x: e.x, y: e.y });
          });
          lensDelegate.on('drag', evt => {
            self.scaleRByDrag(evt);
          });
          lensDelegate.on('dragend', e => {
            self.set('dragging', false)
          });
        }

        // 调整缩放系数 d 的监听
        if (this.get('scaleDBy') === 'wheel') {
          // 使用滚轮调整 d
          lensDelegate.on('mousewheel', evt => {
            this.scaleDByWheel(evt);
          });
        } else if (this.get('scaleDBy') === 'drag') {
          // 使用拖拽调整 d
          lensDelegate.on('dragstart', evt => {
            self.set('dragging', true);
            self.set('cacheCenter', { x: evt.x, y: evt.y });
            self.set('dragPrePos', { x: evt.x, y: evt.y });
          });
          lensDelegate.on('drag', evt => {
            this.scaleDByDrag(evt);
          });
          lensDelegate.on('dragend', evt => {
            self.set('dragging', false)
          });
        }
      }
    } else {
      lensDelegate.attr({
        x: mCenter.x,
        y: mCenter.y,
        r: r / 1.5
      });
    }


    // 绘制缩放系数百分比文本
    if (self.get('showDPercent')) {
      const percent = Math.round((self.get('d') - self.get('minD')) / (self.get('maxD') - self.get('minD')) * 100);
      let dPercentText = self.get('dPercentText');
      const textY = mCenter.y + r / 1.5 + 16;
      if (!dPercentText || dPercentText.destroyed) {
        const parent = graph.get('group');
        dPercentText = parent.addShape('text', {
          attrs: {
            text: `${percent}%`,
            x: mCenter.x,
            y: textY,
            fill: '#aaa',
            stroke: '#fff',
            lineWidth: 1,
            fontSize: 12
          }
        });
        self.set('dPercentText', dPercentText);
      } else {
        dPercentText.attr({
          text: `${percent}%`,
          x: mCenter.x,
          y: textY,
        });
      }
    }
    self.set('delegate', lensDelegate);
  }

  /**
   * Clear the fisheye lens
   */
  public clear() {
    const graph = this.get('graph');
    this.restoreCache();
    graph.refreshPositions();
    const lensDelegate = this.get('delegate');
    if (lensDelegate && !lensDelegate.destroyed) {
      lensDelegate.remove();
      lensDelegate.destroy();
    }
    const dPercentText = this.get('dPercentText');
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
