const Util = require('../../util');
const Item = require('../../item');

const NODE = 'node';
const EDGE = 'edge';
// 默认输入锚点
const DEFAULT_INPUT_ANCHOR = [
  {
    shape: 'default-anchor',
    description: 'input-0',
    x: 0.5,
    y: 0
  },
  {
    shape: 'default-anchor',
    description: 'input-1',
    x: 0,
    y: 0.5
  }
];

// 默认输出锚点
const DEFAULT_OUTPUT_ANCHOR = [
  {
    shape: 'default-anchor',
    description: 'output-0',
    x: 0.5,
    y: 1
  },
  {
    shape: 'default-anchor',
    description: 'output-1',
    x: 1,
    y: 0.5
  }
];

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
        linkCenter: graph.get('linkCenter'),
        group: parent.addGroup()
      });
    } else if (type === NODE) {
      item = new Item[Util.upperFirst(type)]({
        model,
        group: parent.addGroup()
      });

      // 初始化锚点，锚点依附于节点上面
      this.initAnchors(model, item);
    } else {
      console.warn('invalid element');
      return;
    }
    graph.get(type + 's').push(item);
    graph.get('itemMap')[item.get('id')] = item;
    graph.autoPaint();
    graph.emit('aftereadditem', { type, model });
    return item;
  }

  /**
   * 初始化锚点
   * @param {object} nodeModel model数据，包括节点和锚点数据
   * @param {Node} nodeItem 节点
   */
  initAnchors(nodeModel, nodeItem) {
    const graph = this.graph;
    const { anchors = {}, id: nodeId } = nodeModel;
    const { input = DEFAULT_INPUT_ANCHOR,
      output = DEFAULT_OUTPUT_ANCHOR } = anchors;
    graph.get('anchorByNodeMap')[nodeId] = { input: [], output: [] };
    this.addAnchors(input, 'input', nodeItem, nodeId);
    this.addAnchors(output, 'output', nodeItem, nodeId);
  }

  /**
   * 新增锚点
   * @param {array} anchors 锚点数据
   * @param {string} type 锚点类型，分为input和output
   * @param {Node} nodeItem node节点
   * @param {string} nodeId Node ID
   */
  addAnchors(anchors, type, nodeItem, nodeId) {
    const graph = this.graph;
    const parent = graph.get('anchorGroup') || graph.get('group');
    anchors.forEach((anchor, idx) => {
      const { shape, x, y, description } = anchor;
      const current = {
        id: `${nodeId}-${type}-${idx}`,
        index: idx,
        side: type,
        type: 'anchor',
        shape,
        xRatio: x,
        yRatio: y,
        description
      };
      const item = new Item.Anchor({
        node: nodeItem,
        model: current,
        group: parent.addGroup()
      });
      nodeItem.get('anchors').push(item);
      graph.get('anchors').push(item);
      graph.get('anchorMap')[item.get('id')] = item;
    });
    graph.get('anchorByNodeMap')[nodeId][type] = anchors.map(anchor => anchor.id);
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
      // 更新anchor
      Util.each(item.getAnchors(), anchor => {
        graph.refreshItem(anchor);
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
      // 若移除的是节点，需要将与之相连的边一同删除，同时也删除锚点
      const edges = item.getEdges().slice();
      Util.each(edges, edge => {
        graph.removeItem(edge);
      });
      Util.each(item.get('anchors'), anchor => {
        graph.removeItem(anchor);
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
    // if (item.hasState(state) === enabled) {
    //   return;
    // }
    graph.emit('beforeitemstatechange', { item, state, enabled });
    item.setState(state, enabled);
    graph.autoPaint();
    graph.emit('afteritemstatechange', { item, state, enabled });
    return item;
  }

  setShapeState(item, state, enabled) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    // graph.emit('beforeitemstatechange', { item, state, enabled });
    item.setState(state, enabled);
    graph.autoPaint();
    // graph.emit('afteritemstatechange', { item, state, enabled });
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
