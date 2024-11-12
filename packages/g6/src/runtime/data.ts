import { Graph as GraphLib } from '@antv/graphlib';
import { isNumber, isUndefined, uniq } from '@antv/util';
import { COMBO_KEY, ChangeType, TREE_KEY } from '../constants';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import type {
  DataAdded,
  DataChange,
  DataID,
  DataRemoved,
  DataUpdated,
  ElementDatum,
  HierarchyKey,
  ID,
  NodeLikeData,
  PartialEdgeData,
  PartialGraphData,
  PartialNodeLikeData,
  Point,
  State,
} from '../types';
import type { EdgeDirection } from '../types/edge';
import type { ElementType } from '../types/element';
import { isCollapsed } from '../utils/collapsibility';
import { cloneElementData, isElementDataEqual, mergeElementsData } from '../utils/data';
import { arrayDiff } from '../utils/diff';
import { toG6Data, toGraphlibData } from '../utils/graphlib';
import { idOf, parentIdOf } from '../utils/id';
import { positionOf } from '../utils/position';
import { format, print } from '../utils/print';
import { dfs } from '../utils/traverse';
import { add } from '../utils/vector';

export class DataController {
  public model: GraphLib<NodeLikeData, EdgeData>;

  /**
   * <zh/> 最近一次删除的 combo 的 id
   *
   * <en/> The ids of the last deleted combos
   * @remarks
   * <zh/> 当删除 combo 后，会将其 id 从 comboIds 中移除，此时根据 Graphlib 的 changes 事件获取到的 NodeRemoved 无法区分是 combo 还是 node。
   * 因此需要记录最近一次删除的 combo 的 id，并用于 isCombo 的判断
   *
   * <en/> When the combo is deleted, its id will be removed from comboIds. At this time, the NodeRemoved obtained according to the changes event of Graphlib cannot distinguish whether it is a combo or a node.
   * Therefore, it is necessary to record the id of the last deleted combo and use it to judge isCombo
   */
  protected latestRemovedComboIds = new Set<ID>();

  protected comboIds = new Set<ID>();

  /**
   * <zh/> 获取详细数据变更
   *
   * <en/> Get detailed data changes
   */
  private changes: DataChange[] = [];

  /**
   * <zh/> 批处理计数器
   *
   * <en/> Batch processing counter
   */
  private batchCount = 0;

  /**
   * <zh/> 是否处于无痕模式
   *
   * <en/> Whether it is in traceless mode
   */
  private isTraceless = false;

  constructor() {
    this.model = new GraphLib();
  }

  private pushChange(change: DataChange) {
    if (this.isTraceless) return;
    const { type } = change;

    if (type === ChangeType.NodeUpdated || type === ChangeType.EdgeUpdated || type === ChangeType.ComboUpdated) {
      const { value, original } = change;
      this.changes.push({ value: cloneElementData(value), original: cloneElementData(original), type } as DataUpdated);
    } else {
      this.changes.push({ value: cloneElementData(change.value), type } as DataAdded | DataRemoved);
    }
  }

  /**
   * <zh/> [警告] 此 API 仅供 Element Controller 调用
   *
   * <en/> [WARNING] This API is only for Element Controller
   * @returns <zh/> 数据变更 | <en/> data changes
   */
  public getChanges(): DataChange[] {
    return this.changes;
  }

  public clearChanges() {
    this.changes = [];
  }

  public batch(callback: () => void) {
    this.batchCount++;
    this.model.batch(callback);
    this.batchCount--;
  }

  protected isBatching() {
    return this.batchCount > 0;
  }

  /**
   * <zh/> 执行操作而不会留下记录
   *
   * <en/> Perform operations without leaving records
   * @param callback - <zh/> 回调函数 | <en/> callback function
   * @remarks
   * <zh/> 通常用于运行时调整元素并同步数据，避免触发数据变更导致重绘
   *
   * <en/> Usually used to adjust elements at runtime and synchronize data to avoid triggering data changes and causing redraws
   */
  public silence(callback: () => void) {
    this.isTraceless = true;
    callback();
    this.isTraceless = false;
  }

  public isCombo(id: ID) {
    return this.comboIds.has(id) || this.latestRemovedComboIds.has(id);
  }

  public getData() {
    return {
      nodes: this.getNodeData(),
      edges: this.getEdgeData(),
      combos: this.getComboData(),
    };
  }

  public getNodeData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, node) => {
      const data = toG6Data(node);
      if (this.isCombo(idOf(data))) return acc;
      if (ids === undefined) acc.push(data);
      else ids.includes(idOf(data)) && acc.push(data);
      return acc;
    }, [] as NodeData[]);
  }

  public getEdgeDatum(id: ID) {
    return toG6Data(this.model.getEdge(id));
  }

  public getEdgeData(ids?: ID[]) {
    return this.model.getAllEdges().reduce((acc, edge) => {
      const data = toG6Data(edge);
      if (ids === undefined) acc.push(data);
      else ids.includes(idOf(data)) && acc.push(data);
      return acc;
    }, [] as EdgeData[]);
  }

  public getComboData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, combo) => {
      const data = toG6Data(combo);
      if (!this.isCombo(idOf(data))) return acc;

      if (ids === undefined) acc.push(data as ComboData);
      else ids.includes(idOf(data)) && acc.push(data as ComboData);
      return acc;
    }, [] as ComboData[]);
  }

  public getRootsData(hierarchyKey: HierarchyKey = TREE_KEY) {
    return this.model.getRoots(hierarchyKey).map(toG6Data);
  }

  public getAncestorsData(id: ID, hierarchyKey: HierarchyKey): NodeLikeData[] {
    const { model } = this;
    if (!model.hasNode(id) || !model.hasTreeStructure(hierarchyKey)) return [];
    return model.getAncestors(id, hierarchyKey).map(toG6Data);
  }

  public getDescendantsData(id: ID): NodeLikeData[] {
    const root = this.getElementDataById(id) as NodeLikeData;
    const data: NodeLikeData[] = [];
    dfs(
      root,
      (node) => {
        if (node !== root) data.push(node);
      },
      (node) => this.getChildrenData(idOf(node)),
      'TB',
    );
    return data;
  }

  public getParentData(id: ID, hierarchyKey: HierarchyKey): NodeLikeData | undefined {
    const { model } = this;
    if (!hierarchyKey) {
      print.warn('The hierarchy structure key is not specified');
      return undefined;
    }
    if (!model.hasNode(id) || !model.hasTreeStructure(hierarchyKey)) return undefined;
    const parent = model.getParent(id, hierarchyKey);
    return parent ? toG6Data(parent) : undefined;
  }

  public getChildrenData(id: ID): NodeLikeData[] {
    const structureKey = this.getElementType(id) === 'node' ? TREE_KEY : COMBO_KEY;
    const { model } = this;
    if (!model.hasNode(id) || !model.hasTreeStructure(structureKey)) return [];
    return model.getChildren(id, structureKey).map(toG6Data);
  }

  /**
   * <zh/> 获取指定类型元素的数据
   *
   * <en/> Get the data of the specified type of element
   * @param elementType - <zh/> 元素类型 | <en/> element type
   * @returns <zh/> 元素数据 | <en/> element data
   */
  public getElementsDataByType(elementType: ElementType) {
    if (elementType === 'node') return this.getNodeData();
    if (elementType === 'edge') return this.getEdgeData();
    if (elementType === 'combo') return this.getComboData();
    return [];
  }

  /**
   * <zh/> 根据 ID 获取元素的数据，不用关心元素的类型
   *
   * <en/> Get the data of the element by ID, no need to care about the type of the element
   * @param id - <zh/> 元素 ID 数组 | <en/> element ID array
   * @returns <zh/> 元素数据 | <en/> data of the element
   */
  public getElementDataById(id: ID): ElementDatum {
    const type = this.getElementType(id);
    if (type === 'edge') return this.getEdgeDatum(id);
    return this.getNodeLikeDatum(id);
  }

  /**
   * <zh/> 获取节点的数据
   *
   * <en/> Get node data
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @returns <zh/> 节点数据 | <en/> node data
   */
  public getNodeLikeDatum(id: ID) {
    const data = this.model.getNode(id);
    return toG6Data(data);
  }

  /**
   * <zh/> 获取所有节点和 combo 的数据
   *
   * <en/> Get all node and combo data
   * @param ids - <zh/> 节点和 combo ID 数组 | <en/> node and combo ID array
   * @returns <zh/> 节点和 combo 的数据 | <en/> node and combo data
   */
  public getNodeLikeData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, node) => {
      const data = toG6Data(node);
      if (ids) ids.includes(idOf(data)) && acc.push(data);
      else acc.push(data);
      return acc;
    }, [] as NodeLikeData[]);
  }

  public getElementDataByState(elementType: ElementType, state: string) {
    const elementData = this.getElementsDataByType(elementType);
    return elementData.filter((datum) => datum.states?.includes(state));
  }

  public getElementState(id: ID): State[] {
    return this.getElementDataById(id)?.states || [];
  }

  public hasNode(id: ID) {
    return this.model.hasNode(id) && !this.isCombo(id);
  }

  public hasEdge(id: ID) {
    return this.model.hasEdge(id);
  }

  public hasCombo(id: ID) {
    return this.model.hasNode(id) && this.isCombo(id);
  }

  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both') {
    return this.model.getRelatedEdges(id, direction).map(toG6Data) as EdgeData[];
  }

  public getNeighborNodesData(id: ID) {
    return this.model.getNeighbors(id).map(toG6Data);
  }

  public setData(data: GraphData) {
    const { nodes: modifiedNodes = [], edges: modifiedEdges = [], combos: modifiedCombos = [] } = data;
    const { nodes: originalNodes, edges: originalEdges, combos: originalCombos } = this.getData();

    const nodeDiff = arrayDiff(originalNodes, modifiedNodes, (node) => idOf(node), isElementDataEqual);
    const edgeDiff = arrayDiff(originalEdges, modifiedEdges, (edge) => idOf(edge), isElementDataEqual);
    const comboDiff = arrayDiff(originalCombos, modifiedCombos, (combo) => idOf(combo), isElementDataEqual);

    this.batch(() => {
      const dataToAdd = {
        nodes: nodeDiff.enter,
        edges: edgeDiff.enter,
        combos: comboDiff.enter,
      };
      this.addData(dataToAdd);
      this.computeZIndex(dataToAdd, 'add', true);

      const dataToUpdate = {
        nodes: nodeDiff.update,
        edges: edgeDiff.update,
        combos: comboDiff.update,
      };
      this.updateData(dataToUpdate);
      this.computeZIndex(dataToUpdate, 'update', true);

      const dataToRemove = {
        nodes: nodeDiff.exit.map(idOf),
        edges: edgeDiff.exit.map(idOf),
        combos: comboDiff.exit.map(idOf),
      };
      this.removeData(dataToRemove);
    });
  }

  public addData(data: GraphData) {
    const { nodes, edges, combos } = data;
    this.batch(() => {
      // add combo first
      this.addComboData(combos);
      this.addNodeData(nodes);
      this.addEdgeData(edges);
    });
    this.computeZIndex(data, 'add');
  }

  public addNodeData(nodes: NodeData[] = []) {
    if (!nodes.length) return;
    this.model.addNodes(
      nodes.map((node) => {
        this.pushChange({ value: node, type: ChangeType.NodeAdded });
        return toGraphlibData(node);
      }),
    );
    this.updateNodeLikeHierarchy(nodes);

    this.computeZIndex({ nodes }, 'add');
  }

  public addEdgeData(edges: EdgeData[] = []) {
    if (!edges.length) return;
    this.model.addEdges(
      edges.map((edge) => {
        this.pushChange({ value: edge, type: ChangeType.EdgeAdded });
        return toGraphlibData(edge);
      }),
    );

    this.computeZIndex({ edges }, 'add');
  }

  public addComboData(combos: ComboData[] = []) {
    if (!combos.length) return;
    const { model } = this;

    if (!model.hasTreeStructure(COMBO_KEY)) {
      model.attachTreeStructure(COMBO_KEY);
    }

    model.addNodes(
      combos.map((combo) => {
        this.comboIds.add(idOf(combo));
        this.pushChange({ value: combo, type: ChangeType.ComboAdded });
        return toGraphlibData(combo);
      }),
    );

    this.updateNodeLikeHierarchy(combos);

    this.computeZIndex({ combos }, 'add');
  }

  public addChildrenData(parentId: ID, childrenData: NodeData[]) {
    const parentData = this.getNodeLikeDatum(parentId) as NodeData;
    const childrenId = childrenData.map(idOf);
    this.addNodeData(childrenData);
    this.updateNodeData([{ id: parentId, children: [...(parentData.children || []), ...childrenId] }]);
    this.addEdgeData(childrenId.map((childId) => ({ source: parentId, target: childId })));
  }

  /**
   * <zh/> 计算 zIndex
   *
   * <en/> Calculate zIndex
   * @param data - <zh/> 新增的数据 | <en/> newly added data
   * @param type - <zh/> 操作类型 | <en/> operation type
   * @param force - <zh/> 忽略批处理 | <en/> ignore batch processing
   * @remarks
   * <zh/> 调用该函数的情况：
   * - 新增元素
   * - 更新节点/组合的 combo
   * - 更新节点的 children
   *
   * <en/> The situation of calling this function:
   * - Add element
   * - Update the combo of the node/combo
   * - Update the children of the node
   */
  protected computeZIndex(data: PartialGraphData, type: 'add' | 'update', force = false) {
    if (!force && this.isBatching()) return;
    this.batch(() => {
      const { nodes = [], edges = [], combos = [] } = data;

      combos.forEach((combo) => {
        const id = idOf(combo);
        if (type === 'add' && isNumber(combo.style?.zIndex)) return;
        if (type === 'update' && !('combo' in combo)) return;

        const parent = this.getParentData(id, COMBO_KEY);
        const zIndex = parent ? (parent.style?.zIndex ?? 0) + 1 : 0;

        this.preventUpdateNodeLikeHierarchy(() => {
          this.updateComboData([{ id, style: { zIndex } }]);
        });
      });

      nodes.forEach((node) => {
        const id = idOf(node);
        if (type === 'add' && isNumber(node.style?.zIndex)) return;
        if (type === 'update' && !('combo' in node) && !('children' in node)) return;

        let zIndex = 0;

        const comboParent = this.getParentData(id, COMBO_KEY);
        if (comboParent) {
          zIndex = (comboParent.style?.zIndex || 0) + 1;
        } else {
          const nodeParent = this.getParentData(id, TREE_KEY);
          if (nodeParent) zIndex = nodeParent?.style?.zIndex || 0;
        }

        this.preventUpdateNodeLikeHierarchy(() => {
          this.updateNodeData([{ id, style: { zIndex } }]);
        });
      });

      edges.forEach((edge) => {
        if (isNumber(edge.style?.zIndex)) return;

        let { id, source, target } = edge;
        if (!id) id = idOf(edge);
        else {
          const datum = this.getEdgeDatum(id);
          source = datum.source;
          target = datum.target;
        }

        if (!source || !target) return;

        const sourceZIndex = this.getNodeLikeDatum(source)?.style?.zIndex || 0;
        const targetZIndex = this.getNodeLikeDatum(target)?.style?.zIndex || 0;

        this.updateEdgeData([{ id: idOf(edge), style: { zIndex: Math.max(sourceZIndex, targetZIndex) - 1 } }]);
      });
    });
  }

  /**
   * <zh/> 计算元素置顶后的 zIndex
   *
   * <en/> Calculate the zIndex after the element is placed on top
   * @param id - <zh/> 元素 ID | <en/> ID of the element
   * @returns <zh/> zIndex | <en/> zIndex
   */
  public getFrontZIndex(id: ID) {
    const elementType = this.getElementType(id);
    const elementData = this.getElementDataById(id);
    const data = this.getData();

    // 排除当前元素 / Exclude the current element
    Object.assign(data, {
      [`${elementType}s`]: data[`${elementType}s`].filter((element) => idOf(element) !== id),
    });

    if (elementType === 'combo') {
      // 如果 combo 展开，则排除 combo 的子节点/combo 及内部边
      // If the combo is expanded, exclude the child nodes/combos of the combo and the internal edges
      if (!isCollapsed(elementData as ComboData)) {
        const ancestorIds = new Set(this.getAncestorsData(id, COMBO_KEY).map(idOf));
        data.nodes = data.nodes.filter((element) => !ancestorIds.has(idOf(element)));
        data.combos = data.combos.filter((element) => !ancestorIds.has(idOf(element)));
        data.edges = data.edges.filter(({ source, target }) => !ancestorIds.has(source) && !ancestorIds.has(target));
      }
    }

    return Math.max(
      elementData.style?.zIndex || 0,
      0,
      ...Object.values(data)
        .flat()
        .map((datum) => (datum?.style?.zIndex || 0) + 1),
    );
  }

  protected updateNodeLikeHierarchy(data: NodeLikeData[]) {
    if (!this.enableUpdateNodeLikeHierarchy) return;
    const { model } = this;

    data.forEach((datum) => {
      const id = idOf(datum);
      const parent = parentIdOf(datum);

      if (parent) {
        if (!model.hasTreeStructure(COMBO_KEY)) model.attachTreeStructure(COMBO_KEY);
        this.setParent(id, parentIdOf(datum), COMBO_KEY);
      }

      const children = (datum as NodeData).children || [];
      if (children.length) {
        if (!model.hasTreeStructure(TREE_KEY)) model.attachTreeStructure(TREE_KEY);
        const _children = children.filter((child) => model.hasNode(child));
        _children.forEach((child) => this.setParent(child, id, TREE_KEY));
        if (_children.length !== children.length) {
          // 从数据中移除不存在的子节点
          // Remove non-existent child nodes from the data
          this.updateNodeData([{ id, children: _children }]);
        }
      }
    });
  }

  private enableUpdateNodeLikeHierarchy = true;

  /**
   * <zh/> 执行变更时不要更新节点层次结构
   *
   * <en/> Do not update the node hierarchy when executing changes
   * @param callback - <zh/> 变更函数 | <en/> change function
   */
  public preventUpdateNodeLikeHierarchy(callback: () => void) {
    this.enableUpdateNodeLikeHierarchy = false;
    callback();
    this.enableUpdateNodeLikeHierarchy = true;
  }

  public updateData(data: PartialGraphData) {
    const { nodes, edges, combos } = data;
    this.batch(() => {
      this.updateNodeData(nodes);
      this.updateComboData(combos);
      this.updateEdgeData(edges);
    });
    this.computeZIndex(data, 'update');
  }

  public updateNodeData(nodes: PartialNodeLikeData<NodeData>[] = []) {
    if (!nodes.length) return;
    const { model } = this;
    this.batch(() => {
      const modifiedNodes: NodeData[] = [];
      nodes.forEach((modifiedNode) => {
        const id = idOf(modifiedNode);
        const originalNode = toG6Data(model.getNode(id));
        if (isElementDataEqual(originalNode, modifiedNode)) return;

        const value = mergeElementsData(originalNode, modifiedNode);
        this.pushChange({ value, original: originalNode, type: ChangeType.NodeUpdated });
        model.mergeNodeData(id, value);
        modifiedNodes.push(value);
      });

      this.updateNodeLikeHierarchy(modifiedNodes);
    });

    this.computeZIndex({ nodes }, 'update');
  }

  /**
   * <zh/> 将所有数据提交到变更记录中以进行重绘
   *
   * <en/> Submit all data to the change record for redrawing
   */
  public refreshData() {
    const { nodes, edges, combos } = this.getData();
    nodes.forEach((node) => {
      this.pushChange({ value: node, original: node, type: ChangeType.NodeUpdated });
    });
    edges.forEach((edge) => {
      this.pushChange({ value: edge, original: edge, type: ChangeType.EdgeUpdated });
    });
    combos.forEach((combo) => {
      this.pushChange({ value: combo, original: combo, type: ChangeType.ComboUpdated });
    });
  }

  public syncNodeDatum(datum: PartialNodeLikeData<NodeData>) {
    const { model } = this;

    const id = idOf(datum);
    const original = toG6Data(model.getNode(id));
    const value = mergeElementsData(original, datum);
    model.mergeNodeData(id, value);
  }

  public updateEdgeData(edges: PartialEdgeData<EdgeData>[] = []) {
    if (!edges.length) return;
    const { model } = this;
    this.batch(() => {
      edges.forEach((modifiedEdge) => {
        const id = idOf(modifiedEdge);
        const originalEdge = toG6Data(model.getEdge(id));
        if (isElementDataEqual(originalEdge, modifiedEdge)) return;

        if (modifiedEdge.source && originalEdge.source !== modifiedEdge.source) {
          model.updateEdgeSource(id, modifiedEdge.source);
        }
        if (modifiedEdge.target && originalEdge.target !== modifiedEdge.target) {
          model.updateEdgeTarget(id, modifiedEdge.target);
        }
        const updatedData = mergeElementsData(originalEdge, modifiedEdge);
        this.pushChange({ value: updatedData, original: originalEdge, type: ChangeType.EdgeUpdated });
        model.mergeEdgeData(id, updatedData);
      });
    });

    this.computeZIndex({ edges }, 'update');
  }

  public updateComboData(combos: PartialNodeLikeData<ComboData>[] = []) {
    if (!combos.length) return;
    const { model } = this;
    model.batch(() => {
      const modifiedCombos: ComboData[] = [];
      combos.forEach((modifiedCombo) => {
        const id = idOf(modifiedCombo);
        const originalCombo = toG6Data(model.getNode(id)) as ComboData;
        if (isElementDataEqual(originalCombo, modifiedCombo)) return;

        const value = mergeElementsData(originalCombo, modifiedCombo);
        this.pushChange({ value, original: originalCombo, type: ChangeType.ComboUpdated });
        model.mergeNodeData(id, value);
        modifiedCombos.push(value);
      });

      this.updateNodeLikeHierarchy(modifiedCombos);
    });

    this.computeZIndex({ combos }, 'update');
  }

  /**
   * <zh/> 设置节点的父节点
   *
   * <en/> Set the parent node of the node
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @param parent - <zh/> 父节点 ID | <en/> parent node ID
   * @param hierarchyKey - <zh/> 层次结构类型 | <en/> hierarchy type
   * @param update - <zh/> 添加新/旧父节点数据更新记录 | <en/> add new/old parent node data update record
   */
  public setParent(id: ID, parent: ID | undefined, hierarchyKey: HierarchyKey, update: boolean = true) {
    if (id === parent) return;
    const elementData = this.getNodeLikeDatum(id);
    const originalParentId = parentIdOf(elementData);

    if (originalParentId !== parent && hierarchyKey === COMBO_KEY) {
      const modifiedDatum = { id, combo: parent };
      if (this.isCombo(id)) this.syncComboDatum(modifiedDatum);
      else this.syncNodeDatum(modifiedDatum);
    }

    this.model.setParent(id, parent, hierarchyKey);

    if (update && hierarchyKey === COMBO_KEY) {
      uniq([originalParentId, parent]).forEach((pId) => {
        if (pId !== undefined) this.refreshComboData(pId);
      });
    }
  }

  /**
   * <zh/> 刷新 combo 数据
   *
   * <en/> Refresh combo data
   * @param id - <zh/> combo ID | <en/> combo ID
   * @remarks
   * <zh/> 不会更改数据，但会触发数据变更事件
   *
   * <en/> Will not change the data, but will trigger data change events
   */
  public refreshComboData(id: ID) {
    const combo = this.getComboData([id])[0];
    const ancestors = this.getAncestorsData(id, COMBO_KEY) as ComboData[];

    if (combo) this.pushChange({ value: combo, original: combo, type: ChangeType.ComboUpdated });

    ancestors.forEach((value) => {
      this.pushChange({ value: value, original: value, type: ChangeType.ComboUpdated });
    });
  }

  /**
   * <zh/> 将 combo 数据同步到 model 中
   *
   * <en/> Synchronize combo data to the model
   * @param datum - <zh/> combo 数据 | <en/> combo data
   */
  public syncComboDatum(datum: PartialNodeLikeData<ComboData>) {
    const { model } = this;

    const id = idOf(datum);
    if (!model.hasNode(id)) return;
    const original = toG6Data(model.getNode(id));
    const value = mergeElementsData(original, datum);
    model.mergeNodeData(id, value);
  }

  public getElementPosition(id: ID): Point {
    const datum = this.getElementDataById(id) as NodeLikeData;
    return positionOf(datum);
  }

  public translateNodeLikeBy(id: ID, offset: Point) {
    if (this.isCombo(id)) this.translateComboBy(id, offset);
    else this.translateNodeBy(id, offset);
  }

  public translateNodeLikeTo(id: ID, position: Point) {
    if (this.isCombo(id)) this.translateComboTo(id, position);
    else this.translateNodeTo(id, position);
  }

  public translateNodeBy(id: ID, offset: Point) {
    const curr = this.getElementPosition(id);
    const position = add(curr, [...offset, 0].slice(0, 3) as Point);
    this.translateNodeTo(id, position);
  }

  public translateNodeTo(id: ID, position: Point) {
    const [x = 0, y = 0, z = 0] = position;
    this.preventUpdateNodeLikeHierarchy(() => {
      this.updateNodeData([{ id, style: { x, y, z } }]);
    });
  }

  public translateComboBy(id: ID, offset: Point) {
    const [dx = 0, dy = 0, dz = 0] = offset;
    if ([dx, dy, dz].some(isNaN) || [dx, dy, dz].every((o) => o === 0)) return;
    const combo = this.getComboData([id])[0];
    if (!combo) return;
    const seenNodeLikeIds = new Set<ID>();
    dfs<NodeLikeData>(
      combo,
      (succeed) => {
        const succeedID = idOf(succeed);
        if (seenNodeLikeIds.has(succeedID)) return;
        seenNodeLikeIds.add(succeedID);
        const [x, y, z] = positionOf(succeed);
        const value = mergeElementsData(succeed, {
          style: { x: x + dx, y: y + dy, z: z + dz },
        });
        this.pushChange({
          value,
          // @ts-ignore
          original: succeed,
          type: this.isCombo(succeedID) ? ChangeType.ComboUpdated : ChangeType.NodeUpdated,
        });

        this.model.mergeNodeData(succeedID, value);
      },
      (node) => this.getChildrenData(idOf(node)),
      'BT',
    );
  }

  public translateComboTo(id: ID, position: Point) {
    if (position.some(isNaN)) return;
    const [tx = 0, ty = 0, tz = 0] = position;
    const combo = this.getComboData([id])?.[0];
    if (!combo) return;

    const [comboX, comboY, comboZ] = positionOf(combo);
    const dx = tx - comboX;
    const dy = ty - comboY;
    const dz = tz - comboZ;

    dfs<NodeLikeData>(
      combo,
      (succeed) => {
        const succeedId = idOf(succeed);
        const [x, y, z] = positionOf(succeed);
        const value = mergeElementsData(succeed, {
          style: { x: x + dx, y: y + dy, z: z + dz },
        });
        this.pushChange({
          value,
          // @ts-ignore
          original: succeed,
          type: this.isCombo(succeedId) ? ChangeType.ComboUpdated : ChangeType.NodeUpdated,
        });
        this.model.mergeNodeData(succeedId, value);
      },
      (node) => this.getChildrenData(idOf(node)),
      'BT',
    );
  }

  public removeData(data: DataID) {
    const { nodes, edges, combos } = data;
    this.batch(() => {
      // remove edges first
      this.removeEdgeData(edges);
      this.removeNodeData(nodes);
      this.removeComboData(combos);

      this.latestRemovedComboIds = new Set(combos);
    });
  }

  public removeNodeData(ids: ID[] = []) {
    if (!ids.length) return;
    this.batch(() => {
      ids.forEach((id) => {
        // 移除关联边、子节点
        // remove related edges and child nodes
        this.removeEdgeData(this.getRelatedEdgesData(id).map(idOf));
        // TODO 树图情况下移除子节点

        this.pushChange({ value: this.getNodeData([id])[0], type: ChangeType.NodeRemoved });
        this.removeNodeLikeHierarchy(id);
      });
      this.model.removeNodes(ids);
    });
  }

  public removeEdgeData(ids: ID[] = []) {
    if (!ids.length) return;
    ids.forEach((id) => this.pushChange({ value: this.getEdgeData([id])[0], type: ChangeType.EdgeRemoved }));
    this.model.removeEdges(ids);
  }

  public removeComboData(ids: ID[] = []) {
    if (!ids.length) return;
    this.batch(() => {
      ids.forEach((id) => {
        this.pushChange({ value: this.getComboData([id])[0], type: ChangeType.ComboRemoved });
        this.removeNodeLikeHierarchy(id);
        this.comboIds.delete(id);
      });
      this.model.removeNodes(ids);
    });
  }

  /**
   * <zh/> 移除节点层次结构，将其子节点移动到父节点的 children 列表中
   *
   * <en/> Remove the node hierarchy and move its child nodes to the parent node's children list
   * @param id - <zh/> 待处理的节点 | <en/> node to be processed
   */
  protected removeNodeLikeHierarchy(id: ID) {
    if (this.model.hasTreeStructure(COMBO_KEY)) {
      const grandParent = parentIdOf(this.getNodeLikeDatum(id));

      // 从父节点的 children 列表中移除
      // remove from its parent's children list
      // 调用 graphlib.setParent，不需要更新数据
      this.setParent(id, undefined, COMBO_KEY, false);
      // 将子节点移动到父节点的 children 列表中
      // move the children to the grandparent's children list

      this.model.getChildren(id, COMBO_KEY).forEach((child) => {
        const childData = toG6Data(child);
        const childId = idOf(childData);
        this.setParent(idOf(childData), grandParent, COMBO_KEY, false);
        const value = mergeElementsData(childData, {
          id: idOf(childData),
          combo: grandParent,
        });
        this.pushChange({
          value,
          original: childData,
          type: this.isCombo(childId) ? ChangeType.ComboUpdated : ChangeType.NodeUpdated,
        });
        this.model.mergeNodeData(idOf(childData), value);
      });

      if (!isUndefined(grandParent)) this.refreshComboData(grandParent);
    }
  }

  /**
   * <zh/> 获取元素的类型
   *
   * <en/> Get the type of the element
   * @param id - <zh/> 元素 ID | <en/> ID of the element
   * @returns <zh/> 元素类型 | <en/> type of the element
   */
  public getElementType(id: ID): ElementType {
    if (this.model.hasNode(id)) {
      if (this.isCombo(id)) return 'combo';
      return 'node';
    }

    if (this.model.hasEdge(id)) return 'edge';

    throw new Error(format(`Unknown element type of id: ${id}`));
  }

  public destroy() {
    const { model } = this;
    const nodes = model.getAllNodes();
    const edges = model.getAllEdges();

    model.removeEdges(edges.map((edge) => edge.id));
    model.removeNodes(nodes.map((node) => node.id));

    // @ts-expect-error force delete
    this.context = {};
  }
}
