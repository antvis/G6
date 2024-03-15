import { Graph } from '@/src';
import type { StaticTestCase } from '../types';

export const elementLabelOversized: StaticTestCase = async (context) => {
  const { container, animation, theme } = context;
  const data = {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 150,
          label: `This label is too  long to be displayed`,
          size: 100,
        },
      },
      {
        id: 'node2',
        data: {
          x: 400,
          y: 150,
          label: 'This label is too long to be displayed',
          size: 150,
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          label: 'This label is too long to be displayed',
        },
      },
    ],
  };

  const graph = new Graph({
    container: container,
    theme,
    data,
    node: {
      style: {
        type: 'rect',
        x: (d: any) => d.data.x,
        y: (d: any) => d.data.y,
        size: (d: any) => d.data.size,
        labelPlacement: 'bottom',
        labelText: (d: any) => d.data.label,
        labelMaxWidth: '90%',
        labelBackground: true,
        labelBackgroundFill: '#eee',
        labelBackgroundFillOpacity: 0.5,
        labelBackgroundRadius: 4,
        labelWordWrap: true,
        labelMaxLines: 4,
      },
    },
    edge: {
      style: {
        labelOffsetY: -4,
        labelTextBaseline: 'bottom',
        labelText: (d: any) => d.data.label,
        labelMaxWidth: '80%',
        labelBackground: true,
        labelBackgroundFill: 'red',
        labelBackgroundFillOpacity: 0.5,
        labelBackgroundRadius: 4,
        labelWordWrap: true,
        labelMaxLines: 4,
      },
    },
    behaviors: ['drag-node'],
    animation,
  });

  await graph.render();
};
