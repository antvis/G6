const Util = require('../../util');
const Item = require('../../item');
const deepMix = require('@antv/util/lib/deep-mix');
const isObject = require('@antv/util/lib/type/is-object');

const NODE = 'node';
const EDGE = 'edge';
const CFG_PREFIX = 'default';
const MAPPER_SUFFIX = 'Mapper';
const STATE_SUFFIX = 'stateStyles';
const hasOwnProperty = Object.hasOwnProperty;

class ItemController {
  constructor(graph) {
    this.graph = graph;
  }
  addItem(type, model) {
    const graph = this.graph;
    const parent = graph.get(type + 'Group') || graph.get('group');
    const upperType = Util.upperFirst(type);
    let item;
    let styles = graph.get(type + Util.upperFirst(STATE_SUFFIX)) || {};
    const defaultModel = graph.get(CFG_PREFIX + upperType);
    const mapper = graph.get(type + MAPPER_SUFFIX);

    if (mapper) {
      const mappedModel = mapper(model);
      if (mappedModel[STATE_SUFFIX]) {
        styles = mappedModel[STATE_SUFFIX];
        delete mappedModel[STATE_SUFFIX];
      }

      // 如果配置了 defaultEdge 或 defaultNode，则将默认配置的数据也合并进去
      model = deepMix({}, defaultModel, model, mappedModel);
    } else if (defaultModel) {
      // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
      Util.each(defaultModel, (val, cfg) => {
        if (!hasOwnProperty.call(model, cfg)) {
          if (isObject(val)) {
            model[cfg] = Util.clone(val);
          } else {
            model[cfg] = defaultModel[cfg];
          }
        }
      });
    }
    graph.emit('beforeadditem', { type, model });
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
      item = new Item[upperType]({
        model,
        source,
        target,
        styles,
        linkCenter: graph.get('linkCenter'),
        group: parent.addGroup()
      });
    } else {
      item = new Item[upperType]({
        model,
        styles,
        group: parent.addGroup()
      });
    }
    graph.get(type + 's').push(item);
    graph.get('itemMap')[item.get('id')] = item;
    graph.autoPaint();
    graph.emit('afteradditem', { item, model });
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
    // 如果修改了与映射属性有关的数据项，映射的属性相应也需要变化
    const mapper = graph.get(item.getType() + MAPPER_SUFFIX);
    const model = item.getModel();
    if (mapper) {
      const result = deepMix({}, model, cfg);
      const mappedModel = mapper(result);
      // 将 update 时候用户传入的参数与mapperModel做deepMix，以便复用之前设置的参数值
      const newModel = deepMix({}, model, mappedModel, cfg);
      if (mappedModel[STATE_SUFFIX]) {
        item.set('styles', newModel[STATE_SUFFIX]);
        delete newModel[STATE_SUFFIX];
      }
      Util.each(newModel, (val, key) => {
        cfg[key] = val;
      });
    } else {
      // merge update传进来的对象参数，model中没有的数据不做处理，对象和字符串值也不做处理，直接替换原来的
      Util.each(cfg, (val, key) => {
        if (model[key]) {
          if (isObject(val) && !Util.isArray(val) && !(val instanceof window.Node)) {
            cfg[key] = Util.mix({}, model[key], cfg[key]);
          }
        }
      });
    }
    graph.emit('beforeupdateitem', { item, cfg });
    if (item.getType() === EDGE) {
      // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
      if (cfg.source) {
        let source = cfg.source;
        if (Util.isString(source)) {
          source = graph.findById(source);
        }
        item.setSource(source);
      }
      if (cfg.target) {
        let target = cfg.target;
        if (Util.isString(target)) {
          target = graph.findById(target);
        }
        item.setTarget(target);
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
    graph.emit('afterupdateitem', { item, cfg });
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
      const edges = item.getEdges();
      for (let i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i]);
      }
    }
    item.destroy();
    graph.autoPaint();
    graph.emit('afterremoveitem', { item });
  }
  setItemState(item, state, enabled) {
    const graph = this.graph;
    if (item.hasState(state) === enabled) {
      return;
    }
    graph.emit('beforeitemstatechange', { item, state, enabled });
    item.setState(state, enabled);
    graph.autoPaint();
    graph.emit('afteritemstatechange', { item, state, enabled });
  }
  clearItemStates(item, states) {
    const graph = this.graph;
    if (Util.isString(item)) {
      item = graph.findById(item);
    }
    graph.emit('beforeitemstatesclear', { item, states });
    item.clearStates(states);
    graph.autoPaint();
    graph.emit('afteritemstatesclear', { item, states });
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
  destroy() {
    this.graph = null;
    this.destroyed = true;
  }
}

module.exports = ItemController;
