import { Graph as GraphLib } from '@antv/graphlib';
import { isNil, isNumber, uniq } from '@antv/util';
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
   * <zh/> 变更记录最大数量（防止内存泄漏）
   *
   * <en/> Maximum number of change records (prevent memory leaks)
   */
  private readonly MAX_CHANGES = 10000;

  /**
   * <zh/> 已删除combo ID的最大保留数量
   *
   * <en/> Maximum number of removed combo IDs to retain
   */
  private readonly MAX_REMOVED_COMBO_IDS = 1000;

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

    // 防止变更记录过多导致内存泄漏
    // Prevent memory leaks caused by too many change records
    if (this.changes.length >= this.MAX_CHANGES) {
      this.changes.splice(0, this.changes.length - this.MAX_CHANGES + 1000);
    }

    const { type } = change;

    if (type === ChangeType.NodeUpdated || type === ChangeType.EdgeUpdated || type === ChangeType.ComboUpdated) {
      const { value, original } = change;
      this.changes.push({ value: cloneElementData(value), original: cloneElementData(original), type } as DataUpdated);
    } else {
      this.changes.push({ value: cloneElementData(change.value), type } as DataAdded | DataRemoved);
    }
  }

  public getChanges(): DataChange[] {
    return this.changes;
  }

  public clearChanges() {
    this.changes = [];
  }

  public batch(callback: () => void) {
    this.batchCount++;
    try {
      this.model.batch(callback);
    } finally {
      this.batchCount--;
    }
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
    try {
      callback();
    } finally {
      this.isTraceless = false;
    }
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
    // 只有节点/combo才有后代概念，一次性检查
    // Only nodes/combos have the concept of descendants, check once
    if (!this.model.hasNode(id)) {
      return [];
    }
    // 直接获取节点数据，避免getElementDataById的重复检查
    // Get node data directly to avoid duplicate checks in getElementDataById
    const root = this.getNodeLikeDatum(id);
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

    // 批量验证边，收集错误信息
    // Batch verify edges, collect error information
    const validEdges: EdgeData[] = [];
    const invalidEdges: string[] = [];
    const duplicateEdges: string[] = [];

    edges.forEach((edge) => {
      const { source, target } = edge;
      const edgeId = idOf(edge);

      // 检查重复边
      // Check for duplicate edges
      if (this.model.hasEdge(edgeId)) {
        duplicateEdges.push(edgeId);
        return;
      }

      // 验证源节点和目标节点是否存在
      // Verify that the source and target nodes exist
      if (!this.model.hasNode(source) || !this.model.hasNode(target)) {
        invalidEdges.push(`${edgeId} (${source} -> ${target})`);
        return;
      }

      validEdges.push(edge);
    });

    // 批量输出警告信息
    // Batch output warning information
    if (invalidEdges.length > 0) {
      print.warn(`Cannot add ${invalidEdges.length} edges due to missing nodes:\n${invalidEdges.join('\n')}`);
    }
    if (duplicateEdges.length > 0) {
      print.warn(`Skipping ${duplicateEdges.length} duplicate edges: ${duplicateEdges.join(', ')}`);
    }

    if (validEdges.length === 0) return;

    // 批量添加边并记录变更
    // Batch add edges and record changes
    validEdges.forEach((edge) => {
      this.pushChange({ value: edge, type: ChangeType.EdgeAdded });
    });

    this.model.addEdges(validEdges.map((edge) => toGraphlibData(edge)));
    this.computeZIndex({ edges: validEdges }, 'add');
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

    this.batch(() => {
      // 添加子节点（不触发zIndex计算）
      // Add child nodes (do not trigger zIndex calculation)
      if (childrenData.length > 0) {
        childrenData.forEach((node) => {
          this.pushChange({ value: node, type: ChangeType.NodeAdded });
        });
        this.model.addNodes(childrenData.map(toGraphlibData));
        this.updateNodeLikeHierarchy(childrenData);
      }
      // 更新父节点的children属性（不触发zIndex计算）
      // Update the children property of the parent node (do not trigger zIndex calculation)
      const updatedParent = { id: parentId, children: [...(parentData.children || []), ...childrenId] };
      const originalParent = this.getNodeData([parentId])[0];
      if (originalParent) {
        const value = mergeElementsData(originalParent, updatedParent) as NodeData;
        this.pushChange({ value, original: originalParent, type: ChangeType.NodeUpdated });
        this.model.mergeNodeData(parentId, value);
        this.updateNodeLikeHierarchy([value]);
      }
      // 添加边（不触发zIndex计算）
      // Add edges (do not trigger zIndex calculation)
      const edges: EdgeData[] = childrenId.map((childId) => ({
        id: `${parentId}-${childId}`,
        source: parentId,
        target: childId,
      }));
      if (edges.length > 0) {
        const validEdges = edges.filter((edge) => this.model.hasNode(edge.source) && this.model.hasNode(edge.target));
        if (validEdges.length > 0) {
          validEdges.forEach((edge) => {
            this.pushChange({ value: edge, type: ChangeType.EdgeAdded });
          });
          this.model.addEdges(validEdges.map((edge) => toGraphlibData(edge)));
        }
      }
    });

    // 统一计算所有相关元素的zIndex
    // Calculate the zIndex of all related elements
    const allData = {
      nodes: [...childrenData, parentData],
      edges: childrenId.map((childId) => ({
        id: `${parentId}-${childId}`,
        source: parentId,
        target: childId,
      })),
      combos: [],
    };
    this.computeZIndex(allData, 'add');
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

      // 批量处理 combo zIndex
      // Batch process combo zIndex
      const comboUpdates: Array<{ id: ID; style: { zIndex: number } }> = [];
      combos.forEach((combo) => {
        const id = idOf(combo);
        if (type === 'add' && isNumber(combo.style?.zIndex)) return;
        if (type === 'update' && !('combo' in combo)) return;

        const parent = this.getParentData(id, COMBO_KEY);
        const zIndex = parent ? (parent.style?.zIndex ?? 0) + 1 : 0;
        comboUpdates.push({ id, style: { zIndex } });
      });

      // 批量处理 node zIndex
      // Batch process node zIndex
      const nodeUpdates: Array<{ id: ID; style: { zIndex: number } }> = [];
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
        nodeUpdates.push({ id, style: { zIndex } });
      });

      // 批量处理 edge zIndex
      // Batch process edge zIndex
      const edgeUpdates: Array<{ id: ID; style: { zIndex: number } }> = [];
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
        const zIndex = Math.max(sourceZIndex, targetZIndex) - 1;
        edgeUpdates.push({ id: idOf(edge), style: { zIndex } });
      });

      // 批量执行更新（避免递归调用computeZIndex）
      // Batch execute updates (avoid recursive call to computeZIndex)
      if (comboUpdates.length > 0) {
        this.preventUpdateNodeLikeHierarchy(() => {
          this.silence(() => {
            comboUpdates.forEach(({ id, style }) => {
              const original = this.getComboData([id])[0];
              if (original) {
                const value = mergeElementsData(original, { style }) as ComboData;
                this.pushChange({ value, original, type: ChangeType.ComboUpdated });
                this.model.mergeNodeData(id, value);
              }
            });
          });
        });
      }
      if (nodeUpdates.length > 0) {
        this.preventUpdateNodeLikeHierarchy(() => {
          this.silence(() => {
            nodeUpdates.forEach(({ id, style }) => {
              const original = this.getNodeData([id])[0];
              if (original) {
                const value = mergeElementsData(original, { style }) as NodeData;
                this.pushChange({ value, original, type: ChangeType.NodeUpdated });
                this.model.mergeNodeData(id, value);
              }
            });
          });
        });
      }
      if (edgeUpdates.length > 0) {
        this.silence(() => {
          edgeUpdates.forEach(({ id, style }) => {
            const original = this.getEdgeData([id])[0];
            if (original) {
              const value = mergeElementsData(original, { style }) as EdgeData;
              this.pushChange({ value, original, type: ChangeType.EdgeUpdated });
              this.model.mergeEdgeData(id, value);
            }
          });
        });
      }
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

      if (parent !== undefined) {
        if (!model.hasTreeStructure(COMBO_KEY)) model.attachTreeStructure(COMBO_KEY);

        // 解除原父节点的子节点关系，更新原父节点及其祖先的数据
        // Remove the child relationship of the original parent node, update the data of the original parent node and its ancestors
        if (parent === null) {
          this.refreshComboData(id);
        }

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

    // 分离新增和更新的节点，避免批处理嵌套
    // Separate new and updated nodes to avoid nested batch processing
    const nodesToAdd: NodeData[] = [];
    const modifiedNodes: Array<{ originalNode: NodeData; value: NodeData }> = [];

    // 先处理所有节点分类
    // First process all nodes classification
    nodes.forEach((modifiedNode) => {
      const id = idOf(modifiedNode);
      if (!model.hasNode(id)) {
        nodesToAdd.push(modifiedNode as NodeData);
      } else {
        const originalNode = toG6Data(model.getNode(id)) as NodeData;
        if (!isElementDataEqual(originalNode, modifiedNode)) {
          const value = mergeElementsData(originalNode, modifiedNode) as NodeData;
          modifiedNodes.push({ originalNode, value });
        }
      }
    });

    this.batch(() => {
      // 批量处理更新节点
      // Batch process updated nodes
      const updatedNodes: NodeData[] = [];
      modifiedNodes.forEach(({ originalNode, value }) => {
        this.pushChange({ value, original: originalNode, type: ChangeType.NodeUpdated });
        model.mergeNodeData(idOf(value), value);
        updatedNodes.push(value);
      });

      // 批量处理新增节点（避免嵌套批处理）
      // Batch process new nodes (avoid nested batch processing)
      if (nodesToAdd.length > 0) {
        nodesToAdd.forEach((node) => {
          this.pushChange({ value: node, type: ChangeType.NodeAdded });
        });
        model.addNodes(nodesToAdd.map(toGraphlibData));
      }

      // 统一更新层级关系
      // Update the hierarchy of all nodes
      const allNodesToUpdateHierarchy = [...updatedNodes, ...nodesToAdd];
      if (allNodesToUpdateHierarchy.length > 0) {
        this.updateNodeLikeHierarchy(allNodesToUpdateHierarchy);
      }
    });

    // 统一计算zIndex
    // Calculate zIndex for all updated nodes
    const allUpdatedNodes = [...modifiedNodes.map(({ value }) => value), ...nodesToAdd];
    if (allUpdatedNodes.length > 0) {
      this.computeZIndex({ nodes: allUpdatedNodes }, 'update');
    }
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

  public syncNodeLikeDatum(datum: PartialNodeLikeData<NodeData>) {
    const { model } = this;

    const id = idOf(datum);
    if (!model.hasNode(id)) return;
    const original = toG6Data(model.getNode(id));
    const value = mergeElementsData(original, datum);
    model.mergeNodeData(id, value);
  }

  public syncEdgeDatum(datum: PartialEdgeData<EdgeData>) {
    const { model } = this;

    const id = idOf(datum);
    if (!model.hasEdge(id)) return;
    const original = toG6Data(model.getEdge(id));
    const value = mergeElementsData(original, datum);
    model.mergeEdgeData(id, value);
  }

  public updateEdgeData(edges: PartialEdgeData<EdgeData>[] = []) {
    if (!edges.length) return;
    const { model } = this;

    // 分离新增和更新的边
    // Separate new and updated edges
    const edgesToAdd: EdgeData[] = [];
    const invalidUpdates: string[] = [];
    const validUpdates: Array<{ originalEdge: EdgeData; modifiedEdge: PartialEdgeData<EdgeData> }> = [];

    // 先分类处理所有边
    // First classify all edges
    edges.forEach((modifiedEdge) => {
      const id = idOf(modifiedEdge);
      if (!model.hasEdge(id)) {
        edgesToAdd.push({ ...(modifiedEdge as EdgeData) });
        return;
      }

      const originalEdge = toG6Data(model.getEdge(id)) as EdgeData;
      if (isElementDataEqual(originalEdge, modifiedEdge)) return;

      // 验证source/target节点存在性
      // Verify that the source/target nodes exist
      if (modifiedEdge.source && !model.hasNode(modifiedEdge.source)) {
        invalidUpdates.push(`${id}: source node "${modifiedEdge.source}" does not exist`);
        return;
      }
      if (modifiedEdge.target && !model.hasNode(modifiedEdge.target)) {
        invalidUpdates.push(`${id}: target node "${modifiedEdge.target}" does not exist`);
        return;
      }

      validUpdates.push({ originalEdge, modifiedEdge });
    });

    this.batch(() => {
      // 批量处理有效更新
      // Batch process valid updates
      validUpdates.forEach(({ originalEdge, modifiedEdge }) => {
        const id = idOf(modifiedEdge);

        if (modifiedEdge.source && originalEdge.source !== modifiedEdge.source) {
          model.updateEdgeSource(id, modifiedEdge.source);
        }
        if (modifiedEdge.target && originalEdge.target !== modifiedEdge.target) {
          model.updateEdgeTarget(id, modifiedEdge.target);
        }

        const updatedData = mergeElementsData(originalEdge, modifiedEdge) as EdgeData;
        this.pushChange({ value: updatedData, original: originalEdge, type: ChangeType.EdgeUpdated });
        model.mergeEdgeData(id, updatedData);
      });

      // 批量处理新增边（避免嵌套批处理）
      // Batch process new edges (avoid nested batch processing)
      if (edgesToAdd.length > 0) {
        edgesToAdd.forEach((edge) => {
          const { source, target } = edge;
          if (model.hasNode(source) && model.hasNode(target)) {
            this.pushChange({ value: edge, type: ChangeType.EdgeAdded });
          } else {
            invalidUpdates.push(`${idOf(edge)}: invalid source/target nodes`);
          }
        });

        const validNewEdges = edgesToAdd.filter((edge) => model.hasNode(edge.source) && model.hasNode(edge.target));
        if (validNewEdges.length > 0) {
          model.addEdges(validNewEdges.map((edge) => toGraphlibData(edge)));
        }
      }
    });

    // 批量输出警告
    // Batch output warning information
    if (invalidUpdates.length > 0) {
      print.warn(`Cannot update ${invalidUpdates.length} edges:\n${invalidUpdates.join('\n')}`);
    }

    // 只对实际更新的边计算zIndex
    // Calculate zIndex for all updated edges
    const updatedEdges = [
      ...validUpdates.map(
        ({ originalEdge, modifiedEdge }) => mergeElementsData(originalEdge, modifiedEdge) as EdgeData,
      ),
      ...edgesToAdd.filter((edge) => this.model.hasNode(edge.source) && this.model.hasNode(edge.target)),
    ];
    if (updatedEdges.length > 0) {
      this.computeZIndex({ edges: updatedEdges }, 'update');
    }
  }

  public updateComboData(combos: PartialNodeLikeData<ComboData>[] = []) {
    if (!combos.length) return;
    const { model } = this;

    // 移到外面避免作用域问题
    // Move outside to avoid scope issues
    const modifiedCombos: ComboData[] = [];
    const invalidCombos: string[] = [];

    model.batch(() => {
      combos.forEach((modifiedCombo) => {
        const id = idOf(modifiedCombo);

        // 检查combo是否存在
        // Check if the combo exists
        if (!model.hasNode(id) || !this.isCombo(id)) {
          invalidCombos.push(id);
          return;
        }

        const originalCombo = toG6Data(model.getNode(id)) as ComboData;
        if (isElementDataEqual(originalCombo, modifiedCombo)) return;

        const value = mergeElementsData(originalCombo, modifiedCombo) as ComboData;
        this.pushChange({ value, original: originalCombo, type: ChangeType.ComboUpdated });
        model.mergeNodeData(id, value);
        modifiedCombos.push(value);
      });

      if (modifiedCombos.length > 0) {
        this.updateNodeLikeHierarchy(modifiedCombos);
      }
    });

    // 批量输出警告
    // Batch output warning information
    if (invalidCombos.length > 0) {
      print.warn(`Cannot update ${invalidCombos.length} non-existent combos: ${invalidCombos.join(', ')}`);
    }

    // 只对实际更新的combo计算zIndex
    // Calculate zIndex for all updated combos
    if (modifiedCombos.length > 0) {
      this.computeZIndex({ combos: modifiedCombos }, 'update');
    }
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
  public setParent(id: ID, parent: ID | undefined | null, hierarchyKey: HierarchyKey, update: boolean = true) {
    if (id === parent) return;
    const elementData = this.getNodeLikeDatum(id);
    const originalParentId = parentIdOf(elementData);

    if (originalParentId !== parent && hierarchyKey === COMBO_KEY) {
      const modifiedDatum = { id, combo: parent };
      if (this.isCombo(id)) this.syncNodeLikeDatum(modifiedDatum);
      else this.syncNodeLikeDatum(modifiedDatum);
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

      // 按需清理已删除的combo ID记录
      // Clean up the deleted combo ID records as needed
      if (combos && combos.length > 0) {
        this.updateRemovedComboIds(combos);
      }
    });
  }

  private updateRemovedComboIds(newRemovedComboIds: ID[]) {
    // 添加新删除的combo ID
    // Add new deleted combo ID
    newRemovedComboIds.forEach((id) => this.latestRemovedComboIds.add(id));

    // 如果超过阈值，保留最近的一半记录
    // If the threshold is exceeded, keep the last half of the records
    if (this.latestRemovedComboIds.size > this.MAX_REMOVED_COMBO_IDS) {
      const idsArray = Array.from(this.latestRemovedComboIds);
      const keepCount = Math.floor(this.MAX_REMOVED_COMBO_IDS / 2);

      // 保留最近的记录（简单的FIFO策略）
      // Keep the last half of the records (simple FIFO strategy)
      this.latestRemovedComboIds.clear();
      idsArray.slice(-keepCount).forEach((id) => this.latestRemovedComboIds.add(id));
    }
  }

  public removeNodeData(ids: ID[] = []) {
    if (!ids.length) return;
    this.batch(() => {
      const existingIds: ID[] = [];
      ids.forEach((id) => {
        const nodeData = this.getNodeData([id])[0];
        if (nodeData) {
          // 移除关联边、子节点
          // remove related edges and child nodes
          this.removeEdgeData(this.getRelatedEdgesData(id).map(idOf));
          // TODO 树图情况下移除子节点

          this.pushChange({ value: nodeData, type: ChangeType.NodeRemoved });
          this.removeNodeLikeHierarchy(id);
          existingIds.push(id);
        }
      });
      if (existingIds.length > 0) {
        this.model.removeNodes(existingIds);
      }
    });
  }

  public removeEdgeData(ids: ID[] = []) {
    if (!ids.length) return;

    this.batch(() => {
      const existingIds: ID[] = [];
      const nonExistentIds: ID[] = [];

      ids.forEach((id) => {
        const edgeData = this.getEdgeData([id])[0];
        if (edgeData) {
          this.pushChange({ value: edgeData, type: ChangeType.EdgeRemoved });
          existingIds.push(id);
        } else {
          nonExistentIds.push(id);
        }
      });

      // 批量输出警告
      // Batch output warning information
      if (nonExistentIds.length > 0) {
        print.warn(`Cannot remove ${nonExistentIds.length} non-existent edges: ${nonExistentIds.join(', ')}`);
      }

      if (existingIds.length > 0) {
        this.model.removeEdges(existingIds);
      }
    });
  }

  public removeComboData(ids: ID[] = []) {
    if (!ids.length) return;
    this.batch(() => {
      const existingIds: ID[] = [];
      ids.forEach((id) => {
        const comboData = this.getComboData([id])[0];
        if (comboData) {
          this.pushChange({ value: comboData, type: ChangeType.ComboRemoved });
          this.removeNodeLikeHierarchy(id);
          this.comboIds.delete(id);
          existingIds.push(id);
        }
      });
      if (existingIds.length > 0) {
        this.model.removeNodes(existingIds);
      }
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

      if (!isNil(grandParent)) this.refreshComboData(grandParent);
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
    // 清理数据
    // Clean up data
    this.clearChanges();
    this.latestRemovedComboIds.clear();
    this.comboIds.clear();

    const { model } = this;
    const nodes = model.getAllNodes();
    const edges = model.getAllEdges();

    model.removeEdges(edges.map((edge) => edge.id));
    model.removeNodes(nodes.map((node) => node.id));

    // @ts-expect-error force delete
    this.context = {};
  }
}
