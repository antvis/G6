import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutGrid: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data,
    node: {
      style: {
        labelText: (d) => d.id,
      },
    },
    layout: {
      type: 'grid',
      sortBy: 'cluster',
    },
    behaviors: ['zoom-canvas', 'drag-canvas', 'drag-element', 'click-select'],
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
