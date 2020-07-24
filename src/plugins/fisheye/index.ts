import createDOM from '@antv/dom-util/lib/create-dom';
import modifyCSS from '@antv/dom-util/lib/modify-css';
import { IG6GraphEvent } from '../../types';
import { IGraph } from '../../interface/graph';
import Graph from '../../graph/graph';
import Base from '../base';

interface FisheyeConfig {
  trigger?: 'mousemove' | 'click',
  d?: number,
  r?: number
}
export default class Fisheye extends Base {
  constructor(cfg?: FisheyeConfig) {
    super(cfg);
  }
  public getDefaultCfgs(): FisheyeConfig {
    return {
      trigger: 'mousemove',
      d: 1.5,
      r: 100
    };
  }

  // class-methods-use-this
  public getEvents() {
    if ((this as any).get('trigger') === 'mousemove') {
      return {
        'mousemove': 'magnify',
      };
    }
    return {
      'click': 'magnify',
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
    const r = self.get('r');
    const r2 = self.get('r2');
    const d = self.get('d');
    const nodes = graph.getNodes();
    const nodeLength = nodes.length;
    const mCenter = { x: e.x, y: e.y };
    for (let i = 0; i < nodeLength; i++) {
      const model = nodes[i].getModel();
      const { x, y } = model;
      if (isNaN(x) || isNaN(y)) continue;
      const dist2 = (x - mCenter.x) * (x - mCenter.x) + (y - mCenter.y) * (y - mCenter.y);
      if (!isNaN(dist2) && dist2 < r2 && dist2 !== 0) {
        const dist = Math.sqrt(dist2);
        const param = dist / r;
        const magnifiedDist = r * (d + 1) * param / (d * param + 1);
        const cos = (x - mCenter.x) / dist;
        const sin = (y - mCenter.y) / dist;
        model.x = cos * magnifiedDist + mCenter.x;
        model.y = sin * magnifiedDist + mCenter.y;
        if (!cachedOriginPositions[model.id]) {
          cachedOriginPositions[model.id] = { x, y };
        }
        cachedMagnifiedModels.push(model);
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
      node.x = cachedOriginPositions[id].x;
      node.y = cachedOriginPositions[id].y;
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

  public clear() {
    const graph = this.get('graph');
    this.restoreCache();
    graph.refreshPositions();

  }
}
