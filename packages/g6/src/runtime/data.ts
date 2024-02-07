import { Graph as GraphLib, ID } from '@antv/graphlib';
import { isEqual } from '@antv/util';
import { ChangeTypeEnum } from '../constants';
import type { ComboData, EdgeData, GraphData, NodeData } from '../spec';
import type {
  DataAdded,
  DataChange,
  DataID,
  DataRemoved,
  DataUpdated,
  GraphlibData,
  NodeLikeData,
  PartialEdgeData,
  PartialGraphData,
  PartialNodeLikeData,
} from '../types';
import type { EdgeDirection } from '../types/edge';
import type { ElementType } from '../types/element';
import type { Point } from '../types/point';
import { cloneElementData, mergeElementsData } from '../utils/data';
import { arrayDiff } from '../utils/diff';
import { toG6Data, toGraphlibData } from '../utils/graphlib';
import { idOf } from '../utils/id';
import { dfs } from '../utils/traverse';

const COMBO_KEY = 'combo';

const TREE_KEY = 'tree';

export class DataController {
  public model: GraphlibData;

  /**
   * <zh/> 最近一次删除的 combo 的 id
   *
   * <en/> The ids of the last deleted combos
   * @description
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

  constructor() {
    this.model = new GraphLib();
  }

  private pushChange(change: DataChange) {
    const { type } = change;

    if (
      type === ChangeTypeEnum.NodeUpdated ||
      type === ChangeTypeEnum.EdgeUpdated ||
      type === ChangeTypeEnum.ComboUpdated
    ) {
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
    const changes = this.changes;
    this.changes = [];
    return changes;
  }

  public batch(callback: () => void) {
    this.batchCount++;
    this.model.batch(callback);
    this.batchCount--;
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
      if (this.isCombo(idOf(node))) return acc;

      if (ids === undefined) acc.push(toG6Data(node));
      else ids.includes(idOf(node)) && acc.push(node.data);
      return acc;
    }, [] as NodeData[]);
  }

  public getEdgeData(ids?: ID[]) {
    return this.model.getAllEdges().reduce((acc, edge) => {
      if (ids === undefined) acc.push(edge.data);
      else ids.includes(idOf(edge)) && acc.push(edge.data);
      return acc;
    }, [] as EdgeData[]);
  }

  public getComboData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, node) => {
      if (!this.isCombo(idOf(node))) return acc;

      if (ids === undefined) acc.push(node.data);
      else ids.includes(idOf(node)) && acc.push(node.data);
      return acc;
    }, [] as ComboData[]);
  }

  /**
   * <zh/> 获取节点的子节点数据
   *
   * <en/> Get the child node data
   * @param id - <zh/> 节点 ID | <en/> node ID
   * @returns <zh/> 子节点数据 | <en/> child node data
   * @description
   * <zh/> 仅在树图中有效
   *
   * <en/> Only valid in tree graph
   */
  public getChildrenData(id: ID): NodeData[] {
    if (!this.model.hasNode(id)) return [];
    return this.model.getChildren(id, TREE_KEY).map((node) => node.data);
  }

  /**
   * <zh/> 根据 ID 获取元素的数据，不用关心元素的类型
   *
   * <en/> Get the data of the element by ID, no need to care about the type of the element
   * @param ids - <zh/> 元素 ID 数组 | <en/> element ID array
   * @returns <zh/> 元素数据 | <en/> data of the element
   */
  public getElementsData(ids: ID[]) {
    return ids.map((id) => {
      const type = this.getElementType(id);
      switch (type) {
        case 'node':
          return this.getNodeData([id])[0];
        case 'edge':
          return this.getEdgeData([id])[0];
        case 'combo':
          return this.getComboData([id])[0];
        default:
          return undefined;
      }
    });
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
      if (ids) ids.includes(idOf(node)) && acc.push(node.data);
      else acc.push(node.data);
      return acc;
    }, [] as NodeLikeData[]);
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

  public getComboChildrenData(id: ID): NodeLikeData[] {
    if (!this.model.hasNode(id)) return [];
    return this.model.getChildren(id, COMBO_KEY).map((node) => node.data);
  }

  public getParentComboData(id: ID): ComboData | undefined {
    if (!this.model.hasNode(id)) return undefined;
    const parent = this.model.getParent(id, COMBO_KEY);
    return parent?.data;
  }

  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both') {
    return this.model.getRelatedEdges(id, direction).map((edge) => edge.data);
  }

  public getNeighborNodesData(id: ID) {
    return this.model.getNeighbors(id).map((node) => node.data);
  }

  public setData(data: GraphData) {
    const { nodes: modifiedNodes = [], edges: modifiedEdges = [], combos: modifiedCombos = [] } = data;
    const { nodes: originalNodes = [], edges: originalEdges = [], combos: originalCombos = [] } = this.getData();

    const nodeDiff = arrayDiff(originalNodes, modifiedNodes, (node) => idOf(node));
    const edgeDiff = arrayDiff(originalEdges, modifiedEdges, (edge) => idOf(edge));
    const comboDiff = arrayDiff(originalCombos, modifiedCombos, (combo) => idOf(combo));

    this.batch(() => {
      this.addData({
        nodes: nodeDiff.enter,
        edges: edgeDiff.enter,
        combos: comboDiff.enter,
      });

      this.updateData({
        nodes: nodeDiff.update,
        edges: edgeDiff.update,
        combos: comboDiff.update,
      });

      this.removeData({
        nodes: nodeDiff.exit.map(idOf),
        edges: edgeDiff.exit.map(idOf),
        combos: comboDiff.exit.map(idOf),
      });
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
  }

  public addNodeData(nodes: NodeData[] = []) {
    if (!nodes.length) return;
    this.model.addNodes(
      nodes.map((node) => {
        this.pushChange({ value: node, type: ChangeTypeEnum.NodeAdded });
        return toGraphlibData(node);
      }),
    );
    this.updateNodeLikeHierarchy(nodes);
  }

  public addEdgeData(edges: EdgeData[] = []) {
    if (!edges.length) return;
    this.model.addEdges(
      edges.map((edge) => {
        this.pushChange({ value: edge, type: ChangeTypeEnum.EdgeAdded });
        return toGraphlibData(edge);
      }),
    );
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
        this.pushChange({ value: combo, type: ChangeTypeEnum.ComboAdded });
        return toGraphlibData(combo);
      }),
    );

    this.updateNodeLikeHierarchy(combos);
  }

  protected updateNodeLikeHierarchy(data: NodeLikeData[]) {
    const { model } = this;

    let hasAttachTreeStructure = false;

    const attachTreeStructure = () => {
      if (hasAttachTreeStructure) return;
      if (!model.hasTreeStructure(COMBO_KEY)) {
        model.attachTreeStructure(COMBO_KEY);
      }
      hasAttachTreeStructure = true;
    };

    data.forEach((datum) => {
      const parentId = datum?.style?.parentId;
      if (parentId !== undefined) {
        attachTreeStructure();
        model.setParent(idOf(datum), parentId, COMBO_KEY);
      }
    });
  }

  public updateData(data: PartialGraphData) {
    const { nodes, edges, combos } = data;
    this.batch(() => {
      this.updateNodeData(nodes);
      this.updateComboData(combos);
      this.updateEdgeData(edges);
    });
  }

  public updateNodeData(nodes: PartialNodeLikeData<NodeData>[] = []) {
    if (!nodes.length) return;

    this.batch(() => {
      nodes.forEach((modifiedNode) => {
        const originalNode = this.model.getNode(idOf(modifiedNode)).data;
        if (isEqual(originalNode, modifiedNode)) return;

        const value = mergeElementsData(originalNode, modifiedNode);
        this.pushChange({ value, original: originalNode, type: ChangeTypeEnum.NodeUpdated });
        this.model.mergeNodeData(idOf(modifiedNode), value);
      });

      this.updateNodeLikeHierarchy(nodes);
    });
  }

  public updateEdgeData(edges: PartialEdgeData<EdgeData>[] = []) {
    if (!edges.length) return;

    this.batch(() => {
      edges.forEach((modifiedEdge) => {
        const originalEdge = this.model.getEdge(idOf(modifiedEdge)).data;
        if (isEqual(originalEdge, modifiedEdge)) return;

        if (modifiedEdge.source && originalEdge.source !== modifiedEdge.source) {
          this.model.updateEdgeSource(idOf(modifiedEdge), modifiedEdge.source);
        }
        if (modifiedEdge.target && originalEdge.target !== modifiedEdge.target) {
          this.model.updateEdgeTarget(idOf(modifiedEdge), modifiedEdge.target);
        }
        const updatedData = mergeElementsData(originalEdge, modifiedEdge);
        this.model.mergeEdgeData(idOf(modifiedEdge), updatedData);
        this.pushChange({ value: updatedData, original: originalEdge, type: ChangeTypeEnum.EdgeUpdated });
      });
    });
  }

  public updateComboData(combos: PartialNodeLikeData<ComboData>[] = []) {
    if (!combos.length) return;
    const { model } = this;
    model.batch(() => {
      combos.forEach((modifiedCombo) => {
        const modifiedComboId = idOf(modifiedCombo);
        const originalCombo = model.getNode(modifiedComboId).data;
        if (isEqual(originalCombo, modifiedCombo)) return;

        // 如果 combo 的位置发生了变化，需要更新其子节点的位置
        // If the position of the combo has changed, the position of its child nodes needs to be updated
        if (Object.keys(modifiedCombo.style || {}).some((key) => ['x', 'y', 'z'].includes(key))) {
          const { x = 0, y = 0, z = 0 } = modifiedCombo.style || {};
          this.translateComboTo([modifiedComboId], [x, y, z]);
        }

        const value = mergeElementsData(originalCombo, modifiedCombo);
        this.pushChange({ value, original: originalCombo, type: ChangeTypeEnum.ComboUpdated });
        model.mergeNodeData(modifiedComboId, value);
      });

      this.updateNodeLikeHierarchy(combos);
    });
  }

  public translateComboBy(ids: ID[], delta: Point) {
    const [dx = 0, dy = 0, dz = 0] = delta;
    if ([dx, dy, dz].some(isNaN) || [dx, dy, dz].every((o) => o === 0)) return;

    const { model } = this;
    model.batch(() => {
      this.getComboData(ids).forEach((combo) => {
        dfs(
          combo,
          (succeed) => {
            const succeedID = idOf(succeed);
            const { x = 0, y = 0, z = 0 } = succeed.style || {};
            const value = mergeElementsData(succeed, {
              style: { x: x + dx, y: y + dy, z: z + dz },
            });
            this.pushChange({
              value,
              original: succeed,
              type: this.isCombo(succeedID) ? ChangeTypeEnum.ComboUpdated : ChangeTypeEnum.NodeUpdated,
            });
            model.mergeNodeData(succeedID, value);
          },
          (node) => this.getComboChildrenData(idOf(node)),
          'BT',
        );
      });
    });
  }

  public translateComboTo(ids: ID[], point: Point) {
    const [x = 0, y = 0, z = 0] = point;
    if (point.some(isNaN)) return;

    const { model } = this;
    model.batch(() => {
      this.getComboData(ids).forEach((combo) => {
        const { x: comboX = 0, y: comboY = 0, z: comboZ = 0 } = combo.style || {};
        const dx = x - comboX;
        const dy = y - comboY;
        const dz = z - comboZ;

        dfs(
          combo,
          (succeed) => {
            const succeedID = idOf(succeed);
            const { x = 0, y = 0, z = 0 } = succeed.style || {};
            const value = mergeElementsData(succeed, {
              style: { x: x + dx, y: y + dy, z: z + dz },
            });
            this.pushChange({
              value,
              original: succeed,
              type: this.isCombo(succeedID) ? ChangeTypeEnum.ComboUpdated : ChangeTypeEnum.NodeUpdated,
            });
            model.mergeNodeData(succeedID, value);
          },
          (node) => this.getComboChildrenData(idOf(node)),
          'BT',
        );
      });
    });
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

        this.pushChange({ value: this.getNodeData([id])[0], type: ChangeTypeEnum.NodeRemoved });
        this.removeNodeLikeHierarchy(id);
      });
      this.model.removeNodes(ids);
    });
  }

  public removeEdgeData(ids: ID[] = []) {
    if (!ids.length) return;
    ids.forEach((id) => this.pushChange({ value: this.getEdgeData([id])[0], type: ChangeTypeEnum.EdgeRemoved }));
    this.model.removeEdges(ids);
  }

  public removeComboData(ids: ID[] = []) {
    if (!ids.length) return;
    this.batch(() => {
      ids.forEach((id) => {
        this.pushChange({ value: this.getComboData([id])[0], type: ChangeTypeEnum.ComboRemoved });
        this.removeNodeLikeHierarchy(id);
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
      // 从父节点的 children 列表中移除
      // remove from its parent's children list
      this.model.setParent(id, undefined, COMBO_KEY);
      // 将子节点移动到父节点的 children 列表中
      // move the children to the grandparent's children list
      const [data] = this.getNodeLikeData([id]);

      this.model.getChildren(id, COMBO_KEY).forEach((child) => {
        const childData = child.data;
        const childId = idOf(childData);
        this.model.setParent(idOf(childData), data?.style?.parentId, COMBO_KEY);
        const value = mergeElementsData(childData, {
          id: idOf(childData),
          style: { parentId: data?.style?.parentId },
        });
        this.pushChange({
          value,
          original: childData,
          type: this.isCombo(childId) ? ChangeTypeEnum.ComboUpdated : ChangeTypeEnum.NodeUpdated,
        });
        this.model.mergeNodeData(idOf(childData), value);
      });
    }
  }

  /**
   * <zh/> 获取元素的类型
   *
   * <en/> Get the type of the element
   * @param id - <zh/> 元素 ID | <en/> ID of the element
   * @returns <zh/> 元素类型 | <en/> type of the element
   */
  public getElementType(id: ID): ElementType | 'unknown' {
    if (this.model.hasNode(id)) {
      if (this.isCombo(id)) return 'combo';
      return 'node';
    }

    if (this.model.hasEdge(id)) return 'edge';

    return 'unknown';
  }
}
