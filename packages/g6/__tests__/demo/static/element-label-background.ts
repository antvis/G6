import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const elementLabelBackground: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;

  const data = {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 150,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: { x: 250, y: 200 },
      },
      {
        id: 'node3',
        data: { x: 450, y: 200 },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node3',
      },
      {
        id: 'edge3',
        source: 'node2',
        target: 'node3',
      },
    ],
  };

  const graph = new Graph({
    container,
    data,
    node: {
      style: {
        labelText: (d: any) => d.id,
        labelPosition: 'bottom',
        labelFill: '#e66465',
        labelFontSize: 12,
        labelFontStyle: 'italic',
        labelBackgroundFill: '#eee',
        labelBackgroundStroke: '#9ec9ff',
        labelBackgroundRadius: 2,
      },
    },
    edge: {
      style: {
        labelText: (d: any) => d.id,
        labelPosition: 'center',
        labelTextBaseline: 'top',
        labelDy: 5,
        labelFontSize: 12,
        labelFontWeight: 'bold',
        labelFill: '#1890ff',
        labelBackgroundFill: '#eee',
        labelBackgroundStroke: '#9ec9ff',
        labelBackgroundRadius: 2,
      },
    },
    layout: {
      type: 'force',
    },
    behaviors: ['drag-canvas', 'drag-node'],
    animation,
    theme,
  });

  await graph.render();
};
