/**
 * @fileOverview edge item
 * @author huangtonger@aliyun.com
 */

const Util = require('../util/');
const Item = require('./item');
const END_MAP = { source: 'start', target: 'end' };
const ITEM_NAME_SUFFIX = 'Node'; // 端点的后缀，如 sourceNode, targetNode
const POINT_NAME_SUFFIX = 'Point'; // 起点或者结束点的后缀，如 startPoint, endPoint
class Edge extends Item {
  getDefaultCfg() {
    return {
      type: 'edge',
      sourceNode: null,
      targetNode: null,
      startPoint: null,
      endPoint: null
    };
  }

  init() {
    super.init();
    // 初始化两个端点
    this.setSource(this.get('source'));
    this.setTarget(this.get('target'));
  }

  setSource(source) {
    this._setEnd('source', source);
    this.set('source', source);
  }

  setTarget(target) {
    this._setEnd('target', target);
    this.set('target', target);
  }

  // 设置端点：起点或者结束点
  _setEnd(name, value) {
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const itemName = name + ITEM_NAME_SUFFIX;
    const preItem = this.get(itemName);
    preItem && preItem.removeEdge(this); // 如果之前存在节点，则移除掉边
    if (Util.isPlainObject(value)) { // 如果设置成具体的点，则清理节点
      this.set(pointName, value);
      this.set(itemName, null);
    } else {
      value.addEdge(this);
      this.set(itemName, value);
      this.set(pointName, null);
    }
  }

  // 获取与端点相交的节点
  _getLinkPoint(name) {
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const itemName = name + ITEM_NAME_SUFFIX;
    let point = this.get(pointName);
    if (!point) {
      const item = this.get(itemName);
      const prePoint = this._getPrePoint(name);
      point = item.getLinkPoint(prePoint);
    }
    return point;
  }

  // 获取同端点进行连接的点，计算交汇点
  _getPrePoint(name) {
    const controlPoints = this.get('model').controlPoints;
    if (controlPoints && controlPoints.length) {
      const index = name === 'source' ? 0 : controlPoints.length - 1;
      return controlPoints[index];
    }
    const oppositeName = name === 'source' ? 'target' : 'source'; // 取另一个节点的位置
    return this._getEndPoint(oppositeName);
  }

  // 获取端点的位置
  _getEndPoint(name) {
    const itemName = name + ITEM_NAME_SUFFIX;
    const pointName = END_MAP[name] + POINT_NAME_SUFFIX;
    const item = this.get(itemName);
      // 如果有端点，直接使用 model
    if (item) {
      return item.get('model');
    }  // 否则直接使用点
    return this.get(pointName);
  }

  getDrawCfg(model) {
    const cfg = {
      startPoint: this._getLinkPoint('source'),
      endPoint: this._getLinkPoint('target')
    };
    Util.mix(cfg, model);
    return cfg;
  }

  getModel() {
    const model = this.get('model');
    const out = Util.mix({}, model);
    const sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
    const targetItem = this.get('target' + ITEM_NAME_SUFFIX);
    if (sourceItem) {
      out.source = sourceItem.get('id');
    } else {
      out.source = this.get('start' + POINT_NAME_SUFFIX);
    }
    if (targetItem) {
      out.target = targetItem.get('id');
    } else {
      out.target = this.get('end' + POINT_NAME_SUFFIX);
    }
    return out;
  }

  destroy() {
    const sourceItem = this.get('source' + ITEM_NAME_SUFFIX);
    const targetItem = this.get('target' + ITEM_NAME_SUFFIX);
    sourceItem && sourceItem.removeEdge(this);
    targetItem && targetItem.removeEdge(this);
    super.destroy();
  }
}

module.exports = Edge;
