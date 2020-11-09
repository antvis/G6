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
import Combo from '../../item/combo';
import {
  EdgeConfig,
  Item,
  ITEM_TYPE,
  ModelConfig,
  NodeConfig,
  NodeMap,
  ComboTree,
  ComboConfig,
} from '../../types';
import Graph from '../graph';

import { IEdge, INode, ICombo } from '../../interface/item';
import { traverseTreeUp, traverseTree, getComboBBox } from '../../util/graphic';

const NODE = 'node';
const EDGE = 'edge';
const VEDGE = 'vedge';
const COMBO = 'combo';
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
    const vType = type === VEDGE ? EDGE : type;
    const parent: Group = graph.get(`${vType}Group`) || graph.get('group');
    const upperType = upperFirst(vType);

    let item: Item | null = null;
    // 获取 this.get('styles') 中的值
    let styles = graph.get(vType + upperFirst(STATE_SUFFIX)) || {};
    const defaultModel = graph.get(CFG_PREFIX + upperType);

    if (model[STATE_SUFFIX]) {
      // 设置 this.get('styles') 中的值
      styles = model[STATE_SUFFIX];
    }

    const mapper = graph.get(vType + MAPPER_SUFFIX);
    if (mapper) {
      const mappedModel = mapper(model);
      if (mappedModel[STATE_SUFFIX]) {
        // 设置 this.get('styles') 中的值
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

    graph.emit('beforeadditem', { type, model });

    if (type === EDGE || type === VEDGE) {
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

      if ((source as Item).getType && (source as Item).getType() === 'combo') {
        model.isComboEdge = true;
        graph.updateCombo(source as ICombo);
      }
      if ((target as Item).getType && (target as Item).getType() === 'combo') {
        model.isComboEdge = true;
        graph.updateCombo(target as ICombo);
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
    } else if (type === COMBO) {
      const children: ComboTree[] = (model as ComboConfig).children;

      const comboBBox = getComboBBox(children, graph);
      model.x = comboBBox.x || model.x || Math.random() * 100;
      model.y = comboBBox.y || model.y || Math.random() * 100;

      const comboGroup = parent.addGroup();
      comboGroup.setZIndex((model as ComboConfig).depth as number);
      item = new Combo({
        model,
        styles,
        bbox: comboBBox,
        group: comboGroup,
      });

      const comboModel = item.getModel();

      (children || []).forEach((child) => {
        const childItem = graph.findById(child.id) as ICombo | INode;
        (item as ICombo).addChild(childItem);
        child.depth = (comboModel.depth as number) + 2;
      });

      // collapse the combo if the collapsed is true in the model
      if (model.collapsed) {
        setTimeout(() => {
          graph.collapseCombo(item as ICombo);
          this.updateCombo(item as ICombo, []);
        }, 250);
      }
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
   * @param {(EdgeConfig | Partial<NodeConfig>)} cfg 数据模型
   * @returns
   * @memberof ItemController
   */
  public updateItem(item: Item | string, cfg: EdgeConfig | Partial<NodeConfig>) {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item) as Item;
    }

    if (!item || item.destroyed) {
      return;
    }

    // 更新的 item 的类型
    let type = '';
    if (item.getType) type = item.getType();

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
            cfg[key] = { ...(model[key] as Object), ...(cfg[key] as Object) };
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

    if (type === NODE || type === COMBO) {
      const edges: IEdge[] = (item as INode).getEdges();
      each(edges, (edge: IEdge) => {
        edge.refresh();
      });
    }
    graph.emit('afterupdateitem', { item, cfg });
  }

  /**
   * 根据 combo 的子元素更新 combo 的位置及大小
   *
   * @param {ICombo} combo ID 或 实例
   * @returns
   * @memberof ItemController
   */
  public updateCombo(combo: ICombo | string, children: ComboTree[]) {
    const { graph } = this;

    if (isString(combo)) {
      combo = graph.findById(combo) as ICombo;
    }

    if (!combo || combo.destroyed) {
      return;
    }
    const comboBBox = getComboBBox(children, graph);

    combo.set('bbox', comboBBox);
    combo.update({
      x: comboBBox.x,
      y: comboBBox.y,
    });
    const combEdges = combo.getEdges() || [];
    const length = combEdges.length;
    for (let i = 0; i < length; i++) {
      const edge = combEdges[i];
      edge?.refresh();
    }
  }

  /**
   * 收起 combo，隐藏相关元素
   */
  public collapseCombo(combo: ICombo | string) {
    const graph = this.graph;
    if (isString(combo)) {
      combo = graph.findById(combo) as ICombo;
    }
    const children = (combo as ICombo).getChildren();
    children.nodes.forEach((node) => {
      graph.hideItem(node);
    });
    children.combos.forEach((c) => {
      graph.hideItem(c);
    });
  }

  /**
   * 展开 combo，相关元素出现
   * 若子 combo 原先是收起状态，则保持它的收起状态
   */
  public expandCombo(combo: ICombo | string) {
    const graph = this.graph;
    if (isString(combo)) {
      combo = graph.findById(combo) as ICombo;
    }
    const children = (combo as ICombo).getChildren();
    children.nodes.forEach((node) => {
      graph.showItem(node);
    });
    children.combos.forEach((c) => {
      if (c.getModel().collapsed) {
        c.show();
      } else {
        graph.showItem(c);
      }
    });
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

    const itemModel = clone(item.getModel());
    graph.emit('beforeremoveitem', { item: itemModel });

    let type = '';
    if (item.getType) type = item.getType();
    const items = graph.get(`${type}s`);
    const index = items.indexOf(item);
    if (index > -1) items.splice(index, 1);
    if (type === EDGE) {
      const vitems = graph.get(`v${type}s`);
      const vindex = vitems.indexOf(item);
      if (vindex > -1) vitems.splice(vindex, 1);
    }

    const itemId: string = item.get('id');
    const itemMap: NodeMap = graph.get('itemMap');
    delete itemMap[itemId];

    const comboTrees = graph.get('comboTrees');
    const id = item.get('id');
    if (type === NODE) {
      const comboId = item.getModel().comboId as string;
      if (comboTrees) {
        let brothers = comboTrees;
        let found = false; // the flag to terminate the forEach circulation
        // remove the node from the children array of its parent fromt he tree
        comboTrees.forEach((ctree) => {
          if (found) return;
          traverseTree<ComboTree>(ctree, (combo) => {
            if (combo.id === id && brothers) {
              const bidx = brothers.indexOf(combo);
              brothers.splice(bidx, 1);
              found = true;
              return false; // terminate the traverse
            }
            brothers = combo.children;
            return true;
          });
        });
      }
      // 若移除的是节点，需要将与之相连的边一同删除
      const edges = (item as INode).getEdges();
      for (let i = edges.length - 1; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }
      if (comboId) graph.updateCombo(comboId);
    } else if (type === COMBO) {
      const parentId = item.getModel().parentId as string;
      let comboInTree;
      // find the subtree rooted at the item to be removed
      let found = false; // the flag to terminate the forEach circulation
      (comboTrees || []).forEach((ctree) => {
        if (found) return;
        traverseTree<ComboTree>(ctree, (combo) => {
          if (combo.id === id) {
            comboInTree = combo;
            found = true;
            return false; // terminate the traverse
          }
          return true;
        });
      });
      comboInTree.removed = true;
      if (comboInTree && comboInTree.children) {
        comboInTree.children.forEach((child) => {
          this.removeItem(child.id);
        });
      }
      // 若移除的是 combo，需要将与之相连的边一同删除
      const edges = (item as ICombo).getEdges();
      for (let i = edges.length; i >= 0; i--) {
        graph.removeItem(edges[i], false);
      }
      if (parentId) graph.updateCombo(parentId);
    }

    item.destroy();
    graph.emit('afterremoveitem', { item: itemModel });
  }

  /**
   * 更新 item 状态
   *
   * @param {Item} item Item 实例
   * @param {string} state 状态名称
   * @param {boolean} value 是否启用状态或状态值
   * @returns {void}
   * @memberof ItemController
   */
  public setItemState(item: Item, state: string, value: string | boolean): void {
    const { graph } = this;

    let stateName = state;
    if (isString(value)) {
      stateName = `${state}:${value}`;
    }

    // 已经存在要设置的 state，或不存在 state 的样式为 undefined
    if (item.hasState(stateName) === value || (isString(value) && item.hasState(stateName))) {
      return;
    }

    graph.emit('beforeitemstatechange', { item, state: stateName, enabled: value });

    item.setState(state, value);

    graph.autoPaint();
    graph.emit('afteritemstatechange', { item, state: stateName, enabled: value });
  }

  /**
   * 将指定状态的优先级提升为最高优先级
   * @param {Item} item 元素id或元素实例
   * @param state 状态名称
   */
  public priorityState(item: Item | string, state: string): void {
    const { graph } = this;

    let currentItem = item;
    if (isString(item)) {
      currentItem = graph.findById(item);
    }
    // 先取消已有的 state
    this.setItemState(currentItem as Item, state, false);

    // 再设置state，则此时该优先级为最高
    this.setItemState(currentItem as Item, state, true);
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
   * 根据 graph 上用 combos 数据生成的 comboTree 来增加所有 combos
   *
   * @param {ComboTree[]} comboTrees graph 上用 combos 数据生成的 comboTree
   * @param {ComboConfig[]} comboModels combos 数据
   * @memberof ItemController
   */
  public addCombos(comboTrees: ComboTree[], comboModels: ComboConfig[]) {
    const { graph } = this;
    (comboTrees || []).forEach((ctree: ComboTree) => {
      traverseTreeUp<ComboTree>(ctree, (child) => {
        let comboModel;
        comboModels.forEach((model) => {
          if (model.id === child.id) {
            model.children = child.children;
            model.depth = child.depth;
            comboModel = model;
          }
        });
        if (comboModel) {
          this.addItem('combo', comboModel);
        }
        return true;
      });
    });
    const comboGroup = graph.get('comboGroup');
    if (comboGroup) comboGroup.sort();
  }

  /**
   * 改变Item的显示状态
   *
   * @param {Item} item Item ID 或 实例
   * @param {boolean} visible 是否显示
   * @memberof ItemController
   */
  public changeItemVisibility(item: Item | string, visible: boolean): Item {
    const { graph } = this;

    if (isString(item)) {
      item = graph.findById(item);
    }

    if (!item) {
      console.warn('The item to be shown or hidden does not exist!');
      return;
    }

    graph.emit('beforeitemvisibilitychange', { item, visible });

    item.changeVisibility(visible);

    if (item.getType && item.getType() === NODE) {
      const edges = (item as INode).getEdges();
      each(edges, (edge: IEdge) => {
        // 若隐藏节点，则将与之关联的边也隐藏
        // 若显示节点，则将与之关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }

        this.changeItemVisibility(edge, visible);
      });
    } else if (item.getType && item.getType() === COMBO) {
      const comboTrees = graph.get('comboTrees');
      const id = item.get('id');
      let children = [];
      let found = false; // flag the terminate the forEach
      (comboTrees || []).forEach((ctree) => {
        if (found) return;
        if (!ctree.children || ctree.children.length === 0) return;
        traverseTree<ComboTree>(ctree, (combo) => {
          if (combo.id === id) {
            children = combo.children;
            found = true;
            return false; // terminate the traverse
          }
          return true;
        });
      });
      children.forEach((child) => {
        const childItem = graph.findById(child.id);
        this.changeItemVisibility(childItem, visible);
      });

      const edges = (item as INode).getEdges();
      each(edges, (edge: IEdge) => {
        // 若隐藏 combo，则将与 combo 本身关联的边也隐藏
        // 若显示 combo，则将与 combo 本身关联的边也显示，但是需要判断边两端的节点都是可见的
        if (visible && !(edge.get('source').isVisible() && edge.get('target').isVisible())) {
          return;
        }
        this.changeItemVisibility(edge, visible);
      });
    }
    graph.emit('afteritemvisibilitychange', { item, visible });
    return item;
  }

  public destroy() {
    (this.graph as Graph | null) = null;
    this.destroyed = true;
  }
}
