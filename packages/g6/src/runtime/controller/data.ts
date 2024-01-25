import { Graph as GraphLib, ID } from '@antv/graphlib';
import { isEqual } from '@antv/util';
import type { ComboData, DataOptions, EdgeData, NodeData } from '../../spec/data';
import type { Graph } from '../../types';
import type { DataId, NodeLikeData } from '../../types/data';
import { EdgeDirection } from '../../types/edge';
import type { ItemType } from '../../types/item';
import { PositionPoint } from '../../types/position';
import { graphComboTreeDFS, transformSpecDataToGraphlibData } from '../../utils/data';
import { arrayDiff } from '../../utils/diff';
import { idOf } from '../../utils/id';

type Graphlib = GraphLib<NodeData, EdgeData>;

const COMBO_KEY = 'combo';

export class DataController {
  public extensions = [];

  protected graph: Graph;

  protected $model: Graphlib;

  /**
   * <zh/> 最近一次删除的 combo 的 id
   *
   * <en/> The id of the last deleted combo
   * @description
   * <zh/> 当删除 combo 后，会将其 id 从 comboIds 中移除，此时根据 Graphlib 的 changes 事件获取到的 NodeRemoved 无法区分是 combo 还是 node
   * 因此需要记录最近一次删除的 combo 的 id，并用于 isCombo 的判断
   *
   * <en/> When the combo is deleted, its id will be removed from comboIds. At this time, the NodeRemoved obtained according to the changes event of Graphlib cannot distinguish whether it is a combo or a node
   * Therefore, it is necessary to record the id of the last deleted combo and use it to judge isCombo
   */
  protected latestRemovedComboIds = new Set<ID>();
  protected comboIds = new Set<ID>();

  constructor(graph: Graph) {
    this.graph = graph;
    this.$model = new GraphLib();
  }

  public isCombo(id: ID) {
    return this.comboIds.has(id) || this.latestRemovedComboIds.has(id);
  }

  public get model() {
    return this.$model;
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
      if (this.isCombo(node.id)) return acc;

      if (ids === undefined) acc.push(node.data);
      else ids.includes(node.id) && acc.push(node.data);
      return acc;
    }, [] as NodeData[]);
  }

  public getEdgeData(ids?: ID[]) {
    return this.model.getAllEdges().reduce((acc, edge) => {
      if (ids === undefined) acc.push(edge.data);
      else ids.includes(edge.id) && acc.push(edge.data);
      return acc;
    }, [] as EdgeData[]);
  }

  public getComboData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, node) => {
      if (!this.isCombo(node.id)) return acc;

      if (ids === undefined) acc.push(node.data);
      else ids.includes(node.id) && acc.push(node.data);
      return acc;
    }, [] as ComboData[]);
  }

  /**
   * <zh/> 根据 ID 获取元素的数据，不用关心元素的类型
   *
   * <en/> Get the data of the element by ID, no need to care about the type of the element
   * @param id - <zh/> 元素 ID | <en/> ID of the element
   * @returns <zh/> 元素数据 | <en/> data of the element
   */
  public getElementData(id: ID) {
    const type = this.typeOf(id);
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
  }

  /**
   * <zh/> 获取所有节点和 combo 的数据
   *
   * <en/> Get all node and combo data
   * @param ids - <zh/> 过滤 ID 数组 | <en/> filter ID array
   * @returns <zh/> 节点和 combo 的数据 | <en/> node and combo data
   */
  public getNodeLikeData(ids?: ID[]) {
    return this.model.getAllNodes().reduce((acc, node) => {
      if (ids) ids.includes(node.id) && acc.push(node.data);
      else acc.push(node.data);
      return acc;
    }, [] as NodeLikeData[]);
  }

  /**
   * <zh/> 从数据中分离出节点和 combo 的数据
   *
   * <en/> Divide node and combo data from data
   * @param data - <zh/> 待分离的数据 | <en/> data to be separated
   * @returns <zh/> 节点和 combo 的数据 | <en/> node and combo data
   */
  public divideNodeLikeData(data: NodeLikeData[]) {
    return data.reduce(
      (acc, item) => {
        if (this.isCombo(item.id)) acc.combos.push(item);
        else acc.nodes.push(item);
        return acc;
      },
      { nodes: [] as NodeData[], combos: [] as ComboData[] },
    );
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

  public setData(data: DataOptions) {
    const { nodes: modifiedNodes = [], edges: modifiedEdges = [], combos: modifiedCombos = [] } = data;
    const { nodes: originalNodes = [], edges: originalEdges = [], combos: originalCombos = [] } = this.getData();

    const nodeDiff = arrayDiff(originalNodes, modifiedNodes, (node) => node.id);
    const edgeDiff = arrayDiff(originalEdges, modifiedEdges, (edge) => edge.id);
    const comboDiff = arrayDiff(originalCombos, modifiedCombos, (combo) => combo.id);

    this.model.batch(() => {
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

  public getRelatedEdgesData(id: ID, direction: EdgeDirection = 'both') {
    return this.model.getRelatedEdges(id, direction).map((edge) => edge.data);
  }

  public getNeighborNodesData(id: ID) {
    return this.model.getNeighbors(id).map((node) => node.data);
  }

  public getComboChildrenData(id: ID): (NodeData | ComboData)[] {
    if (!this.model.hasNode(id)) return [];
    return this.model.getChildren(id, COMBO_KEY).map((node) => node.data);
  }

  public addData(data: DataOptions) {
    const { nodes, edges, combos } = data;
    this.model.batch(() => {
      // add combo first
      this.addComboData(combos);
      this.addNodeData(nodes);
      this.addEdgeData(edges);
    });
  }

  public addNodeData(nodes: NodeData[] = []) {
    if (!nodes.length) return;
    this.model.addNodes(transformSpecDataToGraphlibData(nodes));

    this.updateNodeLikeHierarchy(nodes);
  }

  public addEdgeData(edges: EdgeData[] = []) {
    if (!edges.length) return;
    this.model.addEdges(transformSpecDataToGraphlibData(edges));
  }

  public addComboData(combos: ComboData[] = []) {
    if (!combos.length) return;
    const { model: controller } = this;

    if (!controller.hasTreeStructure(COMBO_KEY)) {
      controller.attachTreeStructure(COMBO_KEY);
    }

    controller.addNodes(transformSpecDataToGraphlibData(combos));

    // record combo
    combos.forEach((combo) => {
      this.comboIds.add(combo.id);
    });

    this.updateNodeLikeHierarchy(combos);
  }

  protected updateNodeLikeHierarchy(data: NodeData[] | ComboData[]) {
    const { model: controller } = this;

    let hasAttachTreeStructure = false;

    const attachTreeStructure = () => {
      if (hasAttachTreeStructure) return;
      if (!controller.hasTreeStructure(COMBO_KEY)) {
        controller.attachTreeStructure(COMBO_KEY);
      }
      hasAttachTreeStructure = true;
    };

    data.forEach((item) => {
      const parentId = item?.style?.parentId;
      if (parentId !== undefined) {
        attachTreeStructure();
        controller.setParent(item.id, parentId, COMBO_KEY);
      }

      const children: string[] = item?.style?.children || [];
      children.forEach((childId) => {
        if (controller.hasNode(childId)) {
          attachTreeStructure();
          controller.setParent(childId, item.id, COMBO_KEY);
          controller.mergeNodeData(childId, { style: { parentId: item.id } });
        }
      });
    });
  }

  public updateData(data: PartialDataOption) {
    const { nodes, edges, combos } = data;
    this.model.batch(() => {
      this.updateNodeData(nodes);
      this.updateComboData(combos);
      this.updateEdgeData(edges);
    });
  }

  public updateNodeData(nodes: PartialItem<NodeData>[] = []) {
    if (!nodes.length) return;

    this.model.batch(() => {
      nodes.forEach((modifiedNode) => {
        const originalNode = this.model.getNode(modifiedNode.id);
        if (isEqual(originalNode, modifiedNode)) return;

        this.model.mergeNodeData(modifiedNode.id, mergeItemData(originalNode.data, modifiedNode));
      });

      this.updateNodeLikeHierarchy(nodes);
    });
  }

  public updateEdgeData(edges: PartialItem<EdgeData>[] = []) {
    if (!edges.length) return;

    this.model.batch(() => {
      edges.forEach((modifiedEdge) => {
        const originalEdge = this.model.getEdge(modifiedEdge.id);
        if (isEqual(originalEdge, modifiedEdge)) return;

        if (modifiedEdge.source && originalEdge.source !== modifiedEdge.source) {
          this.model.updateEdgeSource(modifiedEdge.id, modifiedEdge.source);
        }
        if (modifiedEdge.target && originalEdge.target !== modifiedEdge.target) {
          this.model.updateEdgeTarget(modifiedEdge.id, modifiedEdge.target);
        }
        this.model.mergeEdgeData(modifiedEdge.id, mergeItemData(originalEdge.data, modifiedEdge));
      });
    });
  }

  public updateComboData(combos: PartialItem<ComboData>[] = []) {
    if (!combos.length) return;

    this.model.batch(() => {
      combos.forEach((modifiedCombo) => {
        const originalCombo = this.model.getNode(modifiedCombo.id);
        if (isEqual(originalCombo, modifiedCombo)) return;

        const { x: modifiedX = 0, y: modifiedY = 0 } = modifiedCombo.style || {};
        if (modifiedX !== undefined || modifiedY !== undefined) {
          const children = this.model.getChildren(modifiedCombo.id, COMBO_KEY);
          if (!children.length) return;
          // 如果 combo 的位置发生了变化，需要更新其子节点的位置
          // If the position of the combo has changed, the position of its child nodes needs to be updated
          const originalBounds = this.graph.getRenderBBox(modifiedCombo.id);
          if (!originalBounds) return;

          const [originalX, originalY] = originalBounds.center;
          const dx = modifiedX - originalX;
          const dy = modifiedY - originalY;

          graphComboTreeDFS(
            this.graph,
            [modifiedCombo],
            (succeed) => {
              const { x = 0, y = 0 } = succeed.style || {};
              if (!this.isCombo(succeed.id)) {
                this.model.mergeNodeData(
                  succeed.id,
                  mergeItemData(succeed, { id: succeed.id, style: { x: x + dx, y: y + dy } }),
                );
              }
            },
            'BT',
          );
        }

        this.model.mergeNodeData(modifiedCombo.id, mergeItemData(originalCombo.data, modifiedCombo));
      });

      this.updateNodeLikeHierarchy(combos);
    });
  }

  public translateComboBy(ids: ID[], offset: PositionPoint) {
    const [dx = 0, dy = 0, dz = 0] = offset;
    if (dx === 0 && dy === 0 && dz === 0) return;

    const controller = this.model;

    this.getComboData()
      .filter(({ id }) => ids.includes(id))
      .forEach((combo) => {
        const { id } = combo;
        const children = controller.getChildren(id, COMBO_KEY);
        if (children.length) {
          graphComboTreeDFS(
            this.graph,
            [combo],
            (succeed) => {
              if (!this.isCombo(succeed.id) || controller.getChildren(succeed.id, COMBO_KEY).length) {
                const { x = 0, y = 0, z = 0 } = succeed.style || {};
                controller.mergeNodeData(
                  id,
                  mergeItemData(combo, {
                    style: { x: x + dx, y: y + dy, z: z + dz },
                  }),
                );
              }
            },
            'BT',
          );
        } else {
          const { x = 0, y = 0, z = 0 } = combo.style || {};
          controller.mergeNodeData(
            id,
            mergeItemData(combo, {
              style: { x: x + dx, y: y + dy, z: z + dz },
            }),
          );
        }
      });
  }

  public removeData(data: DataId) {
    const { nodes, edges, combos } = data;
    this.model.batch(() => {
      // remove edges first
      this.removeEdgeData(edges);
      this.removeNodeData(nodes);
      this.removeComboData(combos);

      this.latestRemovedComboIds = new Set(combos);
    });
  }

  public removeNodeData(ids: ID[] = []) {
    if (!ids.length) return;
    this.model.batch(() => {
      ids.forEach((node) => this.removeNodeLikeHierarchy(node));
      this.model.removeNodes(ids);
    });
  }

  public removeEdgeData(ids: ID[] = []) {
    if (!ids.length) return;
    this.model.removeEdges(ids);
  }

  public removeComboData(ids: ID[] = []) {
    if (!ids.length) return;
    this.model.batch(() => {
      ids.forEach((node) => this.removeNodeLikeHierarchy(node));
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
        this.model.setParent(child.id, data?.style?.parentId, COMBO_KEY);
        this.model.mergeNodeData(
          child.id,
          mergeItemData(child.data, { id: child.id, style: { parentId: data?.style?.parentId } }),
        );
      });
    }
  }

  public typeOf(id: ID): ItemType {
    if (this.model.hasNode(id)) {
      if (this.isCombo(id)) return 'combo';
      return 'node';
    }

    if (this.model.hasEdge(id)) return 'edge';

    throw new Error(`The item with id "${id}" does not exist.`);
  }
}

/**
 * <zh/> 合并两个 节点/边/Combo 的数据，只会合并第一层的数据
 *
 * <en/> Merge the data of two nodes/edges/combos, only merge the first level data
 * @param original - <zh/> 原始数据 | <en/> original data
 * @param modified - <zh/> 待合并的数据 | <en/> data to be merged
 * @returns <zh/> 合并后的数据 | <en/> merged data
 */
function mergeItemData<T extends NodeData | EdgeData | ComboData>(original: T, modified: Partial<T>): T {
  const { data: originalData, style: originalStyle, ...originalAttrs } = original;
  const { data: modifiedData, style: modifiedStyle, ...modifiedAttrs } = modified;

  const result = {
    ...originalAttrs,
    ...modifiedAttrs,
  };

  if (originalData || modifiedData) {
    Object.assign(result, { data: { ...originalData, ...modifiedData } });
  }

  if (originalStyle || modifiedStyle) {
    Object.assign(result, { style: { ...originalStyle, ...modifiedStyle } });
  }

  return result as T;
}

type PartialItem<T extends NodeData | EdgeData | ComboData> = Partial<T> & { id: T['id'] };

type PartialDataOption = {
  nodes?: PartialItem<NodeData>[];
  edges?: PartialItem<EdgeData>[];
  combos?: PartialItem<ComboData>[];
};
