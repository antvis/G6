import type { FixShapeConfig } from '@antv/g6';
import { Graph } from '@antv/g6';

const mockText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

const fixLabelConfig: FixShapeConfig = {
  shape: (shapes) => shapes.find((shape) => shape.parentElement?.className === 'label' && shape.className === 'text')!,
  fields: ['fontSize', 'lineHeight'],
};

export const demoAutosizeElementLabel: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node1', combo: 'combo1', style: { x: 100, y: 100 } },
        { id: 'node2', style: { x: 300, y: 300 } },
      ],
      edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
      combos: [{ id: 'combo1', label: mockText }],
    },
    node: {
      style: {
        labelMaxLines: 3,
        labelMaxWidth: '200%',
        labelText: mockText,
        labelWordWrap: true,
      },
    },
    edge: {
      style: {
        labelMaxLines: 2,
        labelMaxWidth: '60%',
        labelText: mockText,
        labelWordWrap: true,
      },
    },
    combo: {
      style: {
        labelMaxLines: 1,
        labelMaxWidth: '200%',
        labelText: mockText,
        labelWordWrap: true,
      },
    },
    behaviors: [
      {
        type: 'fix-element-size',
        key: 'fix-element-size',
        enable: true,
        state: undefined,
        node: [fixLabelConfig],
        edge: [fixLabelConfig],
        combo: [fixLabelConfig],
      },
      'zoom-canvas',
      'drag-canvas',
      'drag-element',
    ],
    autoFit: 'center',
  });

  await graph.render();

  return graph;
};
