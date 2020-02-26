import Group from '@antv/g-canvas/lib/group';
import clone from '@antv/util/lib/clone';
import deepMix from '@antv/util/lib/deep-mix';
import each from '@antv/util/lib/each';
import isArray from '@antv/util/lib/is-array';
import isObject from '@antv/util/lib/is-object';
import isString from '@antv/util/lib/is-string';
import upperFirst from '@antv/util/lib/upper-first';
import Edge from '../../item/edge';
import Node from '../../item/node';
import { EdgeConfig, Item, ITEM_TYPE, ModelConfig, NodeConfig, NodeMap } from '../../types';
import Graph from '../graph';

import { IEdge, INode } from '../../interface/item';
import { mix } from '@antv/util';

const NODE = 'node';
const EDGE = 'edge';
const CFG_PREFIX = 'default';
const MAPPER_SUFFIX = 'Mapper';
const STATE_SUFFIX = 'stateStyles';
const { hasOwnProperty } = Object;

type Id = string | Item | undefined;

export default class ItemController {
  private graph: Graph;

  public destroyed: boolean;

  constructor(graph: Graph) {
    this.graph = graph;
    this.destroyed = false;
  }

  /**
   * 增加 Item 实例
   *
   * @param {ITEM_TYPE} type 实例类型，node 或 edge
   * @param {(NodeConfig & EdgeConfig)} model 数据模型
   * @returns {(Item)}
   * @memberof ItemController
   */
  public addItem<T extends Item>(type: ITEM_TYPE, model: ModelConfig) {
    const { graph } = this;
    const parent: Group = graph.get(`${type}Group`) || graph.get('group');
    const upperType = upperFirst(type);

    let item: Item | null = null;
    let styles = graph.get(type + upperFirst(STATE_SUFFIX)) || {};
    const defaultModel = graph.get(CFG_PREFIX + upperType);

    if (model[STATE_SUFFIX]) {
      styles = model[STATE_SUFFIX];
    }

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
      each(defaultModel, (val, cfg) => {
        if (!hasOwnProperty.call(model, cfg)) {
          if (isObject(val)) {
            model[cfg] = clone(val);
          } else {
            model[cfg] = defaultModel[cfg];
          }
        }
      });
    }

    if (model.shape && !model.type) {
      console.warn('shape 字段即将被废弃，请使用 type 代替');
    }

    graph.emit('beforeadditem', { type, model });

    if (type === EDGE) {
      let source: Id;
      let target: Id;
      source = (model as EdgeConfig).source; // eslint-disable-line prefer-destructuring
      target = (model as EdgeConfig).target; // eslint-disable-line prefer-destructuring

      if (source && isString(source)) {
        source = graph.findById(source);
      }
      if (target && isString(target)) {
        target = graph.findById(target);
      }

      if (!source || !target) {
        console.warn(`The source or target node of edge ${model.id} does not exist!`);
        return;
      }

      item = new Edge({
        model,
        source,
        target,
        styles,
        linkCenter: graph.get('linkCenter'),
        group: parent.addGroup(),
      });
    } else if (type === NODE) {
      item = new Node({
        model,
        styles,
        group: parent.addGroup(),
      });
    }

    if (item) {
      graph.get(`${type}s`).push(item);
      graph.get('itemMap')[item.get('id')] = item;
      graph.emit('afteradditem', { item, model });
      // eslint-disable-next-line consistent-return
      return item as T;
    }
  }

  /**
   * 更新节点或边
   *
   * @param {Item} item ID 或 实例
   * @param {(EdgeConfig | NodeConfig)} cfg 数据模型
   * @returns
   * @memberof ItemController
   */
  public updateItem(item: Item | string, cfg: EdgeConfig | NodeConfig) {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item) as Item;
    }

    if (!item || item.destroyed) {
      return;
    }

    // 更新的 item 的类型
    const type = item.getType();

    const mapper = graph.get(type + MAPPER_SUFFIX);
    const model = item.getModel();

    if (mapper) {
      const result: ModelConfig = deepMix({}, model, cfg);
      const mappedModel: ModelConfig = mapper(result);
      // 将 update 时候用户传入的参数与mapperModel做deepMix，以便复用之前设置的参数值
      const newModel: ModelConfig = deepMix({}, model, mappedModel, cfg);

      if (mappedModel[STATE_SUFFIX]) {
        item.set('styles', newModel[STATE_SUFFIX]);
        delete newModel[STATE_SUFFIX];
      }

      each(newModel, (val, key) => {
        cfg[key] = val;
      });
    } else {
      // merge update传进来的对象参数，model中没有的数据不做处理，对象和字符串值也不做处理，直接替换原来的
      each(cfg, (val, key) => {
        if (model[key]) {
          if (isObject(val) && !isArray(val)) {
            cfg[key] = Object.assign({}, model[key], cfg[key]);
          }
        }
      });
    }

    // emit beforeupdateitem 事件
    graph.emit('beforeupdateitem', { item, cfg });

    if (type === EDGE) {
      // 若是边要更新source || target, 为了不影响示例内部model，并且重新计算startPoint和endPoint，手动设置
      if (cfg.source) {
        let source: INode = cfg.source as INode;
        if (isString(source)) {
          source = graph.findById(source) as INode;
        }
        (item as IEdge).setSource(source);
      }
      if (cfg.target) {
        let target: INode = cfg.target as INode;
        if (isString(target)) {
          target = graph.findById(target) as INode;
        }
        (item as IEdge).setTarget(target);
      }
    }

    item.update(cfg);

    if (type === NODE) {
      const edges: IEdge[] = (item as INode).getEdges();
      each(edges, (edge: IEdge) => {
        graph.refreshItem(edge);
      });
    }
    graph.emit('afterupdateitem', { item, cfg });
  }

  /**
   * 删除指定的节点或边
   *
   * @param {Item} item item ID 或实例
   * @returns {void}
   * @memberof ItemController
   */
  public removeItem(item: Item | string): void {
    const { graph } = this;
    if (isString(item)) {
      item = graph.findById(item);
    }

    if (!item || item.destroyed) {
      return;
    }

    graph.emit('beforeremoveitem', { item });

    const type = item.getType();
    const items = graph.get(`${item.getType()}s`);
    const index = items.indexOf(item);
    items.splice(index, 1);

    const itemId: string = item.get('id');
    const itemMap: NodeMap = graph.get('itemMap');
    delete itemMap[itemId];

    if (type === NODE) {
      // 若移除的是节点，需要将与之相连的边一同删除
      const edges = (item as INode).getEdges();
      for (let i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i]);
      }
    }

    item.destroy();
    graph.emit('afterremoveitem', { item });
  }

  /**
   * 更新 item 状态
   *
   * @param {Item} item Item 实例
   * @param {string} state 状态名称
   * @param {boolean} enabled 是否启用状态
   * @returns {void}
   * @memberof ItemController
   */
  public setItemState(item: Item, state: string, enabled: boolean): void {
    const { graph } = this;
    if (item.hasState(state) === enabled) {
      return;
    }

    graph.emit('beforeitemstatechange', { item, state, enabled });

    item.setState(state, enabled);

    graph.emit('afteritemstatechange', { item, state, enabled });
  }

  /**
   * 清除所有指定的状态
   *
   * @param {Item} item Item 实例
   * @param {string[]} states 状态名称集合
   * @memberof ItemController
   */
  public clearItemStates(item: Item | string, states?: string | string[]): void {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemstatesclear', { item, states });

    item.clearStates(states);

    graph.emit('afteritemstatesclear', { item, states });
  }

  /**
   * 刷新指定的 Item
   *
   * @param {Item} item Item ID 或 实例
   * @memberof ItemController
   */
  public refreshItem(item: Item | string): void {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemrefresh', { item });

    // 调用 Item 的 refresh 方法，实现刷新功能
    item.refresh();

    graph.emit('afteritemrefresh', { item });
  }

  /**
   * 改变Item的显示状态
   *
   * @param {Item} item Item ID 或 实例
   * @param {boolean} visible 是否显示
   * @memberof ItemController
   */
  public changeItemVisibility(item: Item | string, visible: boolean): void {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item);
    }

    graph.emit('beforeitemvisibilitychange', { item, visible });

    item.changeVisibility(visible);

    if (item.getType() === NODE) {
      const edges = (item as INode).getEdges();
      each(edges, (edge: IEdge) => {
        // 若隐藏节点，则将与之关联的边也隐藏
        // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }

        this.changeItemVisibility(edge, visible);
      });
    }
    graph.emit('afteritemvisibilitychange', { item, visible });
  }

  public destroy() {
    (this.graph as Graph | null) = null;
    this.destroyed = true;
  }
}
