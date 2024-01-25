import { Graph as GraphLib, ID } from '@antv/graphlib';
import { isEqual } from '@antv/util';
import type { ComboData, DataOptions, EdgeData, NodeData } from '../../spec/data';
import type { Graph } from '../../types';
import type { DataId } from '../../types/data';
import { EdgeDirection } from '../../types/edge';
import type { ITEM_TYPE } from '../../types/item';
import { PositionPoint } from '../../types/position';
import { graphComboTreeDfs, transformSpecDataToGraphlibData } from '../../utils/data';
import { arrayDiff } from '../../utils/diff';
import { idOf } from '../../utils/id';

type Graphlib = GraphLib<NodeData, EdgeData>;

const COMBO_KEY = 'combo';

export class DataController {
  public extensions = [];

  protected graph: Graph;

  protected $model: Graphlib;

  protected comboIds = new Set<ID>();

  constructor(graph: Graph) {
    this.graph = graph;
    this.$model = new GraphLib();
  }

  public isCombo(id: ID) {
    return this.comboIds.has(id);
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

  public getNodeData(ids: ID[] = []) {
    return this.model.getAllNodes().reduce((acc, node) => {
      if (this.isCombo(node.id)) return acc;

      if (ids.length) ids.includes(node.id) && acc.push(node.data);
      else acc.push(node.data);
      return acc;
    }, [] as NodeData[]);
  }

  public getEdgeData(ids: ID[] = []) {
    return this.model.getAllEdges().reduce((acc, edge) => {
      if (ids.length) ids.includes(edge.id) && acc.push(edge.data);
      else acc.push(edge.data);
      return acc;
    }, [] as EdgeData[]);
  }

  public getComboData(ids: ID[] = []) {
    return this.model.getAllNodes().reduce((acc, node) => {
      if (!this.isCombo(node.id)) return acc;

      if (ids.length) ids.includes(node.id) && acc.push(node.data);
      else acc.push(node.data);
      return acc;
    }, [] as ComboData[]);
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

  /**
   * <zh/> 获取节点/Combo 的数据
   *
   * <en/> Get the data of node/combo
   * @param id - <zh/> 节点/Combo 的 ID | <en/> ID of node/combo
   * @returns <zh/> 节点/Combo 的数据 | <en/> data of node/combo
   */
  protected getNodeLikeDataById(id: ID) {
    return this.getNodeData().find((node) => node.id === id) || this.getComboData().find((node) => node.id === id);
  }

  public setData(data: DataOptions) {
    const { nodes: modifiedNodes = [], edges: modifiedEdges = [], combos: modifiedCombos = [] } = data;
    const { nodes: originalNodes = [], edges: originalEdges = [], combos: originalCombos = [] } = this.getData();

    const nodeDiff = arrayDiff(originalNodes, modifiedNodes, (node) => node.id);
    const edgeDiff = arrayDiff(originalEdges, modifiedEdges, (edge) => edge.id);
    const comboDiff = arrayDiff(originalCombos, modifiedCombos, (combo) => combo.id);

    // 添加的顺序为：combo -> node -> edge
    // The order of addition is: combo -> node -> edge

    this.addComboData(comboDiff.enter);
    this.addNodeData(nodeDiff.enter);
    this.addEdgeData(edgeDiff.enter);

    // 更新的顺序为：node -> combo -> edge
    // The order of update is: node -> combo -> edge

    this.updateNodeData(nodeDiff.update);
    this.updateComboData(comboDiff.update);
    this.updateEdgeData(edgeDiff.update);

    // 删除的顺序为：edge -> node -> combo
    // The order of deletion is: edge -> node -> combo

    this.removeEdgeData(edgeDiff.exit.map(idOf));
    this.removeNodeData(nodeDiff.exit.map(idOf));
    this.removeComboData(comboDiff.exit.map(idOf));
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

  public updateData(data: PartialDataOptions) {
    const { nodes, edges, combos } = data;
    this.model.batch(() => {
      this.updateNodeData(nodes);
      this.updateEdgeData(edges);
      this.updateComboData(combos);
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

          graphComboTreeDfs(
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
          graphComboTreeDfs(
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
      const data = this.getNodeLikeDataById(id);

      this.model.getChildren(id, COMBO_KEY).forEach((child) => {
        this.model.setParent(child.id, data?.style?.parentId, COMBO_KEY);
        this.model.mergeNodeData(
          child.id,
          mergeItemData(child.data, { id: child.id, style: { parentId: data?.style?.parentId } }),
        );
      });
    }
  }

  public typeOf(id: ID): ITEM_TYPE {
    if (this.model.hasEdge(id)) return 'edge';

    if (this.model.hasNode(id)) {
      if (this.isCombo(id)) return 'combo';
      return 'node';
    }

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

type PartialDataOptions = {
  nodes?: PartialItem<NodeData>[];
  edges?: PartialItem<EdgeData>[];
  combos?: PartialItem<ComboData>[];
};
