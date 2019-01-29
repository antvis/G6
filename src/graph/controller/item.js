const Util = require('../../util');
const Item = require('../../item');

const NODE = 'node';
const EDGE = 'edge';

class ItemController {
  constructor(graph) {
    this.graph = graph;
  }
  addItem(type, model) {
    const graph = this.graph;
    const parent = graph.get(type + 'Group') || graph.get('group');
    let item;
    if (type === EDGE) {
      let source = model.source;
      let target = model.target;
      if (source && Util.isString(source)) {
        source = graph.findById(source);
      }
      if (target && Util.isString(target)) {
        target = graph.findById(target);
      }
      if (!source || !target) {
        console.warn('The source or target node of edge ' + model.id + ' does not exist!');
        return;
      }
      item = new Item[Util.upperFirst(type)]({
        model,
        source,
        target,
        group: parent.addGroup()
      });
    } else {
      item = new Item[Util.upperFirst(type)]({
        model,
        group: parent.addGroup()
      });
    }
    graph.get(type + 's').push(item);
    graph.get('itemMap')[item.get('id')] = item;
    graph.autoPaint();
    graph.emit('aftereadditem', { type, model });
    return item;
  }
  updateItem(item, cfg) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    if (!item || item.destroyed) {
      return;
    }
    graph.emit('beforeitemupdate', { item, cfg });
    if (item.getType() === EDGE) {
      // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
      if (cfg.source) {
        let source = cfg.source;
        if (Util.isString(source)) {
          source = graph.findById(source);
          item.setSource(source);
        }
      }
      if (cfg.target) {
        let target = cfg.target;
        if (Util.isString(target)) {
          target = graph.findById(target);
          item.setTarget(target);
        }
      }
    }
    item.update(cfg);
    if (item.getType() === NODE) {
      const autoPaint = graph.get('autoPaint');
      graph.setAutoPaint(false);
      Util.each(item.getEdges(), edge => {
        graph.refreshItem(edge);
      });
      graph.setAutoPaint(autoPaint);
    }
    graph.autoPaint();
    graph.emit('afteritemupdate', { item, cfg });
    return item;
  }
  removeItem(item) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    if (!item || item.destroyed) {
      return;
    }
    graph.emit('beforeremoveitem', { item });
    const type = item.getType();
    const items = graph.get(item.getType() + 's');
    const index = items.indexOf(item);
    items.splice(index, 1);
    delete graph.get('itemMap')[item.get('id')];
    if (type === NODE) {
      // 若移除的是节点，需要将与之相连的边一同删除
      Util.each(item.getEdges(), edge => {
        graph.removeItem(edge);
      });
    }
    item.destroy();
    graph.autoPaint();
    graph.emit('afterremoveitem', { item });
  }
  setItemState(item, state, enabled) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    if (item.hasState(state) === enabled) {
      return;
    }
    graph.emit('beforeitemstatechange', { item, state, enabled });
    item.setState(state, enabled);
    graph.autoPaint();
    graph.emit('afteritemstatechange', { item, state, enabled });
    return item;
  }
  refreshItem(item) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    graph.emit('beforeitemrefresh', { item });
    item.refresh();
    graph.autoPaint();
    graph.emit('afteritemrefresh', { item });
  }
  changeItemVisibility(item, visible) {
    const self = this;
    const graph = self.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    graph.emit('beforeitemvisibilitychange', { item, visible });
    item.changeVisibility(visible);
    if (item.getType() === NODE) {
      const autoPaint = graph.get('autoPaint');
      graph.setAutoPaint(false);
      Util.each(item.getEdges(), edge => {
        // 若隐藏节点，则将与之关联的边也隐藏
        // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && (!(edge.get('source').isVisible() && edge.get('target').isVisible()))) {
          return;
        }
        self.changeItemVisibility(edge, visible);
      });
      graph.setAutoPaint(autoPaint);
    }
    graph.autoPaint();
    graph.emit('afteritemvisibilitychange', { item, visible });
  }
}

module.exports = ItemController;
