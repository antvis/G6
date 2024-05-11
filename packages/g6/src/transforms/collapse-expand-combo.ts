import type { ComboData } from '../spec';
import type { ElementDatum, ElementType } from '../types';
import { getSubgraphRelatedEdges } from '../utils/edge';
import { idOf } from '../utils/id';
import { BaseTransform } from './base-transform';
import type { DrawData, ProcedureData } from './types';

/**
 * <zh/> 重新分配绘制任务
 *
 * <en/> Reassign drawing tasks
 * @param input - <zh>绘制数据 | <en>DrawData
 * @param type - <zh>类型 | <en>type
 * @param elementType - <zh>元素类型 | <en>element type
 * @param datum - <zh>数据 | <en>data
 */
const reassignTo = (
  input: DrawData,
  type: 'add' | 'update' | 'remove',
  elementType: ElementType,
  datum: ElementDatum,
) => {
  const id = idOf(datum);
  const typeName = `${elementType}s` as keyof ProcedureData;
  const exitsDatum: any =
    input.add[typeName].get(id) || input.update[typeName].get(id) || input.remove[typeName].get(id) || datum;
  Object.entries(input).forEach(([_type, value]) => {
    if (type === _type) value[typeName].set(id, exitsDatum);
    else value[typeName].delete(id);
  });
};

/**
 * <zh/> 处理元素的收起和展开
 *
 * <en/> Process the collapse and expand of elements
 */
export class CollapseExpandCombo extends BaseTransform {
  public beforeDraw(input: DrawData): DrawData {
    const { model } = this.context;
    const { add, update } = input;

    // combo 添加和更新的顺序为先子后父，因此采用倒序遍历
    // The order of adding and updating combos is first child and then parent, so reverse traversal is used
    const combos = [...input.update.combos.entries(), ...input.add.combos.entries()];
    while (combos.length) {
      const [id, combo] = combos.pop()!;

      const isCollapsed = !!combo.style?.collapsed;
      if (isCollapsed) {
        const descendants = model.getDescendantsData(id);
        const descendantIds = descendants.map(idOf);
        const { internal, external } = getSubgraphRelatedEdges(descendantIds, (id) => model.getRelatedEdgesData(id));

        // 移除所有后代元素 / Remove all descendant elements
        descendants.forEach((descendant) => {
          const descendantId = idOf(descendant);
          // 不再处理当前 combo 的后代 combo
          // No longer process the descendant combo of the current combo
          const comboIndex = combos.findIndex(([id]) => id === descendantId);
          if (comboIndex !== -1) combos.splice(comboIndex, 1);

          const elementType = model.getElementType(descendantId);
          reassignTo(input, 'remove', elementType, descendant);
        });

        // 如果是内部边/节点 销毁
        // If it is an internal edge/node, destroy it
        internal.forEach((edge) => reassignTo(input, 'remove', 'edge', edge));

        // 如果是外部边，连接到收起对象上
        // If it is an external edge, connect to the collapsed object
        external.forEach((edge) => {
          const id = idOf(edge);
          if (add.edges.has(id)) add.edges.set(id, edge);
          if (update.edges.has(id)) update.edges.set(id, edge);
        });
      } else {
        const children = model.getChildrenData(id);
        const childrenIds = children.map(idOf);
        const { edges } = getSubgraphRelatedEdges(childrenIds, (id) => model.getRelatedEdgesData(id));

        [...children, ...edges].forEach((descendant) => {
          const id = idOf(descendant);
          const elementType = model.getElementType(id);

          const element = this.context.element?.getElement(id);
          // 如果节点不存在，则添加到新增列表，如果存在，添加到更新列表
          // If the node does not exist, add it to the new list, if it exists, add it to the update list
          if (element) reassignTo(input, 'update', elementType, descendant);
          else reassignTo(input, 'add', elementType, descendant);

          // 继续展开子节点 / Continue to expand child nodes
          if (elementType === 'combo') combos.push([id, descendant as ComboData]);
        });
      }
    }

    return input;
  }
}
