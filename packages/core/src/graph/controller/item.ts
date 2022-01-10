import { IGroup } from '@antv/g-base';
import { clone, deepMix, each, isArray, isObject, isString, upperFirst, throttle } from '@antv/util';
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
  UpdateType,
} from '../../types';
import { IAbstractGraph } from '../../interface/graph';
import { IEdge, INode, ICombo } from '../../interface/item';
import { traverseTreeUp, traverseTree, getComboBBox, shouldRefreshEdge } from '../../util/graphic';

const NODE = 'node';
const EDGE = 'edge';
const VEDGE = 'vedge';
const COMBO = 'combo';
const CFG_PREFIX = 'default';
const MAPPER_SUFFIX = 'Mapper';
const STATE_SUFFIX = 'stateStyles';

type Id = string | Item | undefined;

export default class ItemController {
  private graph: IAbstractGraph;

  public destroyed: boolean;

  private edgeToBeUpdateMap: {
    [key: string]: {
      edge: IEdge,
      updateType: UpdateType
    }
  } = {};

  constructor(graph: IAbstractGraph) {
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
    const parent: IGroup = graph.get(`${vType}Group`) || graph.get('group');
    const upperType = upperFirst(vType);

    let item: Item | null = null;
    // 获取 this.get('styles') 中的值
    let styles = graph.get(vType + upperFirst(STATE_SUFFIX)) || {};
    const defaultModel = graph.get(CFG_PREFIX + upperType);

    if (model[STATE_SUFFIX]) {
      // 设置 this.get('styles') 中的值
      styles = model[STATE_SUFFIX];
    }

    if (defaultModel) {
      // 很多布局会直接修改原数据模型，所以不能用 merge 的形式，逐个写入原 model 中
      each(defaultModel, (val, cfg) => {
        if (isObject(val) && !isArray(val)) {
          model[cfg] = deepMix({}, val, model[cfg]);
        } else if (isArray(val)) {
          model[cfg] = model[cfg] || clone(defaultModel[cfg]);
        } else {
          model[cfg] = model[cfg] || defaultModel[cfg];
        }
      });
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

      each(mappedModel, (val, cfg) => {
        if (isObject(val) && !isArray(val)) {
          model[cfg] = deepMix({}, model[cfg], val);
        } else {
          model[cfg] = mappedModel[cfg] || model[cfg];
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
        // graph.updateCombo(source as ICombo);
      }
      if ((target as Item).getType && (target as Item).getType() === 'combo') {
        model.isComboEdge = true;
        // graph.updateCombo(target as ICombo);
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
      let bboxX, bboxY;
      if (!isNaN(comboBBox.x)) bboxX = comboBBox.x;
      else if (isNaN(model.x)) bboxX = Math.random() * 100;
      if (!isNaN(comboBBox.y)) bboxY = comboBBox.y;
      else if (isNaN(model.y)) bboxY = Math.random() * 100;

      if (isNaN(model.x) || isNaN(model.y)) {
        model.x = bboxX;
        model.y = bboxY;
      } else {
        // if there is x y in model, place the combo according to it and move its succeed items. that means, the priority of the combo's position is higher than succeed items'
        const dx = model.x - bboxX;
        const dy = model.y - bboxY;
        // In the same time, adjust the children's positions
        this.updateComboSucceeds(model.id, dx, dy, children);
      }

      const comboGroup = parent.addGroup();
      comboGroup.setZIndex((model as ComboConfig).depth as number);
      item = new Combo({
        model,
        styles,
        bbox: model.collapsed ? getComboBBox([], graph) : comboBBox,
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
          if (!item.destroyed) {
            graph.collapseCombo(item as ICombo);
          }
        }, 0);
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
    const { x: oriX, y: oriY } = model;

    const updateType = item.getUpdateType(cfg);

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
      item.update(cfg);
    } else if (type === NODE) {
      item.update(cfg, updateType);
      const edges: IEdge[] = (item as INode).getEdges();
      const refreshEdge = updateType?.includes('bbox') || updateType === 'move';
      if (updateType === 'move') {
        each(edges, (edge: IEdge) => {
          this.edgeToBeUpdateMap[edge.getID()] = {
            edge: edge,
            updateType
          };
          this.throttleRefresh();
        });
      } else if (refreshEdge) {
        each(edges, (edge: IEdge) => {
          edge.refresh(updateType);
        });
      }
    } else if (type === COMBO) {
      item.update(cfg, updateType);
      if (!isNaN(cfg.x) || !isNaN(cfg.y)) {
        // if there is x y in model, place the combo according to it and move its succeed items. that means, the priority of the combo's position is higher than succeed items'
        const dx = (cfg.x - oriX) || 0;
        const dy = (cfg.y - oriY) || 0;
        // In the same time, adjust the children's positions
        this.updateComboSucceeds(model.id, dx, dy);
      }
      const edges: IEdge[] = (item as INode).getEdges();
      const refreshEdge = updateType?.includes('bbox') || updateType === 'move';
      if (refreshEdge && type === COMBO) {
        const shapeFactory = item.get('shapeFactory');
        const shapeType = (model.type as string) || 'circle';
        const comboAnimate =
          model.animate === undefined || cfg.animate === undefined
            ? shapeFactory[shapeType]?.options?.animate
            : model.animate || cfg.animate;
        if (comboAnimate) {
          setTimeout(() => {
            if (!item || (item as ICombo).destroyed) return;
            const keyShape = (item as ICombo).getKeyShape();
            if (!keyShape || keyShape.destroyed) return;
            each(edges, (edge: IEdge) => {
              if (edge && !edge.destroyed) edge.refresh();
            });
          }, 201);
        } else {
          each(edges, (edge: IEdge) => {
            edge.refresh();
          });
        }
      }
    }
    graph.emit('afterupdateitem', { item, cfg });
  }
  /**
   * 更新边限流，同时可以防止相同的边频繁重复更新
   * */
  private throttleRefresh = throttle(
    _ => {
      const { graph } = this;
      if (!graph || graph.get('destroyed')) return;
      const edgeToBeUpdateMap = this.edgeToBeUpdateMap;
      if (!edgeToBeUpdateMap || !Object.keys(edgeToBeUpdateMap)?.length) return;
      Object.keys(edgeToBeUpdateMap).forEach(eid => {
        const edge = edgeToBeUpdateMap[eid].edge;
        if (!edge || edge.destroyed) return;
        edge.refresh(edgeToBeUpdateMap[eid].updateType);
      });
      this.edgeToBeUpdateMap = {};
    },
    16,
    {
      trailing: true,
      leading: true,
    }
  )

  /**
   * 根据 combo 的子元素更新 combo 的位置及大小
   *
   * @param {ICombo} combo ID 或 实例
   * @returns
   * @memberof ItemController
   */
  public updateCombo(combo: ICombo | string, children: ComboTree[], followCombo?: boolean) {
    const { graph } = this;

    if (isString(combo)) {
      combo = graph.findById(combo) as ICombo;
    }

    if (!combo || combo.destroyed) {
      return;
    }
    const model = combo.getModel();

    const comboBBox = getComboBBox(children, graph, combo);
    const { x: comboX, y: comboY } = comboBBox;

    combo.set('bbox', comboBBox);
    let x = comboX, y = comboY;
    if (followCombo) {
      // position of combo model first
      x = isNaN(model.x) ? comboX : model.x;
      y = isNaN(model.y) ? comboY : model.y;
    } else {
      // position of succeed items first
      x = isNaN(comboX) ? model.x : comboX;
      y = isNaN(comboY) ? model.y : comboY;
    }
    combo.update({ x, y });

    const shapeFactory = combo.get('shapeFactory');
    const shapeType = (model.type as string) || 'circle';
    const comboAnimate =
      model.animate === undefined ? shapeFactory[shapeType]?.options?.animate : model.animate;
    if (comboAnimate) {
      setTimeout(() => {
        if (!combo || (combo as ICombo).destroyed) return;
        const keyShape = (combo as ICombo).getKeyShape();
        if (!keyShape || keyShape.destroyed) return;
        (combo as ICombo).getShapeCfg(model); // 更新 combo 缓存的 size
        this.updateComboEdges(combo as ICombo);
      }, 201);
    } else {
      this.updateComboEdges(combo as ICombo);
    }
  }

  private updateComboEdges(combo: ICombo) {
    const combEdges = combo.getEdges() || [];
    for (let i = 0; i < combEdges.length; i++) {
      const edge = combEdges[i];
      if (edge && !edge.destroyed) {
        const edgeSF = edge.get('shapeFactory');
        const edgeCfg = edge.getShapeCfg(edge.getModel());
        const edgeGroup = edge.getContainer();
        edgeGroup.clear();
        const keyShape = edgeSF.draw(edgeCfg.type, edgeCfg, edgeGroup);
        edge.set('keyShape', keyShape);
        keyShape.set('isKeyShape', true);
        keyShape.set('draggable', true);
        edge.setOriginStyle()
      }
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
   * 根据位置差量 dx dy，更新 comboId 后继元素的位置
   * */
  public updateComboSucceeds(comboId, dx, dy, children = []) {
    const { graph } = this;
    if (!dx && !dy) return;
    let kids = children;
    if (!kids?.length) {
      const comboTrees = graph.get('comboTrees');
      comboTrees?.forEach(child => {
        traverseTree(child, subTree => {
          if (subTree.id === comboId) {
            kids = subTree.children;
            return false;
          }
          return true;
        });
      });
    }
    kids?.forEach(child => {
      const childItem = graph.findById(child.id);
      if (childItem) {
        const childModel = childItem.getModel();
        this.updateItem(child.id, {
          x: (childModel.x || 0) + dx,
          y: (childModel.y || 0) + dy
        });
      }
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
      if (comboTrees && comboId) {
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
    graph.emit('afterremoveitem', { item: itemModel, type });
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
    if (
      (item.hasState(stateName) === value && value) || // 当该状态已经存在且现在需要设置为 true 时，不需要继续。当该状态不存在，且设置为 false 时，需要继续
      (isString(value) && item.hasState(stateName))
    ) {
      // 当该状态 value 是字符串，且已经存在该状态，不需要继续
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
      if (children && (!visible || (visible && !item.getModel().collapsed))) {
        children.forEach((child) => {
          const childItem = graph.findById(child.id);
          this.changeItemVisibility(childItem, visible);
        });
      }

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
    (this.graph as IAbstractGraph | null) = null;
    this.destroyed = true;
  }
}
