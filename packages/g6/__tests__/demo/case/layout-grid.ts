import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutGrid: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-node', 'click-select'],
    layout: {
      type: 'grid',
      sortBy: 'cluster',
    },
    node: {
      style: {
        size: 20,
        stroke: '#ccc',
        lineWidth: 1,
        labelText: (d: any) => d.id,
      },
    },
  });

  await graph.render();

  layoutGrid.form = (panel) => {
    const config = {
      sortBy: 'degree',
    };
    return [
      panel
        .add(config, 'sortBy', {
          ID: 'id',
          Degree: 'degree',
          Cluster: (n1: any, n2: any) => Number(n2.data.cluster) - Number(n1.data.cluster),
        })
        .name('sortBy')
        .onChange((value: string) => {
          graph.setLayout({ type: 'grid', sortBy: value });
          graph.layout();
        }),
    ];
  };

  return graph;
};
