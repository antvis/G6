import { clone } from '@antv/util/lib';
import { IG6GraphEvent, ShapeStyle } from '../../types';
import Graph from '../../graph/graph';
import Base from '../base';

interface FisheyeConfig {
  trigger?: 'mousemove' | 'click';
  d?: number;
  r?: number;
  delegateStyle?: ShapeStyle;
  showLabel?: boolean;
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
    };
  }

  // class-methods-use-this
  public getEvents() {
    if ((this as any).get('trigger') === 'mousemove') {
      return {
        mousemove: 'magnify',
      };
    }
    return {
      click: 'magnify',
    };
  }

  public init() {
    const self = this;
    const r = self.get('r');
    self.set('cachedMagnifiedModels', []);
    self.set('cachedOriginPositions', {});
    self.set('r2', r * r);
  }

  /**
   * mousemove 或 click 事件的响应函数
   * @param param
   */
  protected magnify(e: IG6GraphEvent) {
    const self = this;
    self.restoreCache();
    const graph: Graph = self.get('graph');
    const cachedMagnifiedModels = self.get('cachedMagnifiedModels');
    const cachedOriginPositions = self.get('cachedOriginPositions');
    const showLabel = self.get('showLabel');
    const r = self.get('r');
    const r2 = self.get('r2');
    const d = self.get('d');
    const nodes = graph.getNodes();
    const nodeLength = nodes.length;
    const mCenter = { x: e.x, y: e.y };
    self.updateDelegate(mCenter, r);
    for (let i = 0; i < nodeLength; i++) {
      const model = nodes[i].getModel();
      const { x, y } = model;
      if (isNaN(x) || isNaN(y)) continue;
      const dist2 = (x - mCenter.x) * (x - mCenter.x) + (y - mCenter.y) * (y - mCenter.y);
      if (!isNaN(dist2) && dist2 < r2 && dist2 !== 0) {
        const dist = Math.sqrt(dist2);
        const param = dist / r;
        const magnifiedDist = (r * (d + 1) * param) / (d * param + 1);
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
   * 恢复缓存的被缩放的节点
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
      ori.texts.forEach((text) => {
        text.shape.set('visible', text.visible);
      });
    }
    self.set('cachedMagnifiedModels', []);
    self.set('cachedOriginPositions', {});
  }

  public updateParams(cfg: FisheyeConfig) {
    const self = this;
    const { r, d, trigger } = cfg;
    if (!isNaN(cfg.r)) {
      self.set('r', r);
      self.set('r2', r * r);
    }
    if (!isNaN(d)) {
      self.set('d', d);
    }
    if (trigger === 'mousemove' || trigger === 'click') {
      self.set('trigger', trigger);
    }
  }

  /**
   * 放大镜的图形
   * @param {Point} mCenter
   * @param {number} r
   */
  private updateDelegate(mCenter, r) {
    const self = this;
    const graph = self.get('graph');
    let lensDelegate = self.get('delegate');
    if (!lensDelegate || lensDelegate.destroyed) {
      // 拖动多个
      const parent = graph.get('group');
      const attrs = self.get('delegateStyle') || lensDelegateStyle;

      // model上的x, y是相对于图形中心的，delegateShape是g实例，x,y是绝对坐标
      lensDelegate = parent.addShape('circle', {
        attrs: {
          r: r / 1.5,
          x: mCenter.x,
          y: mCenter.y,
          ...attrs,
        },
        name: 'lens-delegate-shape',
      });
      lensDelegate.set('capture', false);
    } else {
      lensDelegate.attr({
        x: mCenter.x,
        y: mCenter.y,
      });
    }
    self.set('delegate', lensDelegate);
  }

  public clear() {
    const graph = this.get('graph');
    this.restoreCache();
    graph.refreshPositions();
    const lensDelegate = this.get('delegate');
    lensDelegate.remove();
    lensDelegate.destroy();
  }

  public destroy() {
    this.clear();
  }
}
