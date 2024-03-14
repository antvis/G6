import { Graph } from '@/src';
import data from '@@/dataset/dagre.json';
import type { STDTestCase } from '../types';

type Item = {
  id: string;
  style: {
    parentId: string;
  };
};

export const layoutDagreFlowCombo: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    layout: {
      type: 'dagre',
      ranksep: 50,
      nodesep: 5,
    },
    node: {
      style: {
        type: 'rect',
        size: [60, 30],
        radius: 8,
        labelPlacement: 'center',
        labelText: (d: Item) => d.id,
        fill: (item: Item) => {
          const styles: { [key: string]: string } = { A: '#F09056', B: '#D580FF', C: '#01C9C9' };
          return styles[item.style?.parentId] || '#1883FF';
        },
      },
    },
    edge: {
      style: {
        type: 'polyline',
        endArrow: true,
        lineWidth: 2,
        stroke: '#C2C8D5',
      },
    },
    combo: {
      style: {
        labelText: (d: Item) => d.id,
        lineDash: 0,
        collapsedLineDash: [5, 5],
      },
    },
    autoFit: 'view',
    behaviors: ['drag-combo', 'drag-node', 'drag-canvas', 'zoom-canvas'],
  });

  await graph.render();

  return graph;
};
