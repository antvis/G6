import type { IElementDragEvent } from '@antv/g6';
import { Graph } from '@antv/g6';

/**
 * 测试 process-parallel-edges 与 collapse-expand 配合的修复效果
 * 确保修复后向后兼容，不影响原有功能
 * @param context
 */
export const bugProcessParallelEdgesComboFixed: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 300, y: 100 } },
        { id: 'node2', combo: 'combo1', style: { x: 300, y: 150 } },
        { id: 'node3', combo: 'combo2', style: { x: 100, y: 100 } },
        { id: 'node4', combo: 'combo2', style: { x: 50, y: 150 } },
        { id: 'node5', combo: 'combo2', style: { x: 150, y: 150 } },
      ],
      edges: [
        { source: 'node1', target: 'node2' },
        { source: 'node3', target: 'node4' },
        { source: 'node3', target: 'node5' },
      ],
      combos: [
        { id: 'combo1', style: { labelText: '双击折叠', collapsed: true } },
        { id: 'combo2', style: { labelText: '单击折叠 (无 process-parallel-edges)', collapsed: false } },
      ],
    },
    node: {
      style: {
        labelText: (d) => d.id,
        size: 20,
      },
    },
    edge: {
      type: 'quadratic',
      state: {
        highlighted: {
          stroke: '#F5AD21',
          labelFontWeight: 600,
          labelFontSize: 18,
        },
      },
      style: {
        loop: false,
        lineWidth: 2,
        haloOpacity: 0.2,
        endArrow: true,
        endArrowType: 'vee',
        stroke: '#C4CDE3',
        labelText: 'fixed version',
        labelFontSize: 14,
        labelFontWeight: 500,
        labelBackground: true,
        labelBackgroundFill: '#FFFFFF',
        labelBackgroundRadius: 4,
        labelPadding: [4, 8],
      },
    },
    combo: {
      style: {
        lineWidth: 2,
        stroke: '#99ADD1',
        fill: '#F3F6FF',
        radius: 8,
        padding: [10, 20, 30, 20],
        labelFontSize: 12,
        labelFill: '#666',
      },
    },
    // 注意：这里添加了 process-parallel-edges 变换来测试修复效果
    transforms: [
      {
        type: 'process-parallel-edges',
        distance: 60,
      },
    ],
    behaviors: [
      {
        type: 'drag-element',
      },
      {
        type: 'collapse-expand',
        trigger: 'dblclick',
        enable: (event: IElementDragEvent) => event.targetType === 'combo' && event.target.id === 'combo1',
      },
      {
        type: 'collapse-expand',
        trigger: 'click',
        enable: (event: IElementDragEvent) => event.targetType === 'combo' && event.target.id === 'combo2',
      },
    ],
  });

  await graph.render();

  return graph;
};
