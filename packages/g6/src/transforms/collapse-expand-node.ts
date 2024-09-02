import { TREE_KEY } from '../constants';
import type { NodeData } from '../spec';
import type { ElementDatum, ElementType, ID } from '../types';
import { isCollapsed } from '../utils/collapsibility';
import { idOf } from '../utils/id';
import { BaseTransform } from './base-transform';
import type { DrawData, ProcedureData } from './types';
import { reassignTo } from './utils';

// 如果在任务列表中不存在，则添加到任务列表
// If it does not exist in the task list, add it to the task list
const weakAssignTo = (input: DrawData, type: 'add' | 'update', elementType: ElementType, datum: ElementDatum) => {
  const typeName = `${elementType}s` as keyof ProcedureData;
  const id = idOf(datum);
  if (!input.add[typeName].has(id) && !input.update[typeName].has(id)) {
    input[type][typeName].set(idOf(datum), datum as any);
  }
};

/**
 * <zh/> 处理(树图)节点的收起和展开
 *
 * <en/> Process the collapse and expand of (tree)nodes
 */
export class CollapseExpandNode extends BaseTransform {
  private getElement(id: ID) {
    return this.context.element!.getElement(id);
  }

  private handleExpand(node: NodeData, input: DrawData) {
    weakAssignTo(input, 'add', 'node', node);
    if (isCollapsed(node)) return;

    const id = idOf(node);
    weakAssignTo(input, 'add', 'node', node);

    const relatedEdges = this.context.model.getRelatedEdgesData(id, 'out');
    relatedEdges.forEach((edge) => {
      reassignTo(input, 'add', 'edge', edge);
    });

    const children = this.context.model.getChildrenData(id);
    children.forEach((child) => {
      this.handleExpand(child, input);
    });
  }

  public beforeDraw(input: DrawData): DrawData {
    const { graph, model } = this.context;

    if (!model.model.hasTreeStructure(TREE_KEY)) return input;

    const {
      add: { nodes: nodesToAdd, edges: edgesToAdd },
      update: { nodes: nodesToUpdate },
    } = input;
    const nodesToCollapse = new Map<ID, NodeData>();
    const nodesToExpand = new Map<ID, NodeData>();

    nodesToAdd.forEach((node, id) => {
      if (isCollapsed(node)) nodesToCollapse.set(id, node);
    });

    // 如果创建了一条连接到收起的节点的边，则将其添加到待展开列表
    // If an edge is created that connects to a collapsed node, add it to the list to be expanded
    edgesToAdd.forEach((edge) => {
      if (graph.getElementType(edge.source) !== 'node') return;
      const source = graph.getNodeData(edge.source);
      if (isCollapsed(source)) nodesToCollapse.set(edge.source, source);
    });

    nodesToUpdate.forEach((node, id) => {
      const nodeElement = this.getElement(id);
      if (!nodeElement) return;

      const isCurrentCollapsed = nodeElement.attributes.collapsed;
      if (isCollapsed(node)) {
        if (!isCurrentCollapsed) nodesToCollapse.set(id, node);
      } else {
        if (isCurrentCollapsed) nodesToExpand.set(id, node);
      }
    });

    const handledNodes = new Set<ID>();

    nodesToCollapse.forEach((node, id) => {
      // 将子节点添加到待删除列表，并删除关联的边
      // Add child nodes to the list to be deleted，and delete the associated edges
      const descendants = model.getDescendantsData(id);
      descendants.forEach((descendant) => {
        const id = idOf(descendant);
        if (handledNodes.has(id)) return;

        reassignTo(input, 'remove', 'node', descendant);
        const relatedEdges = model.getRelatedEdgesData(id);
        relatedEdges.forEach((edge) => {
          reassignTo(input, 'remove', 'edge', edge);
        });

        handledNodes.add(id);
      });
    });

    nodesToExpand.forEach((node, id) => {
      const ancestors = model.getAncestorsData(id, TREE_KEY);

      // 如果祖先节点是收起的，添加到移除列表
      // If the ancestor node is collapsed, add it to the removal list
      if (ancestors.some(isCollapsed)) {
        reassignTo(input, 'remove', 'node', node);
        return;
      }

      this.handleExpand(node, input);
    });

    return input;
  }
}
