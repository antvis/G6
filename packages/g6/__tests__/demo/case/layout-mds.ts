import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutMDS: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    padding: 20,
    autoFit: 'view',
    data,
    layout: {
      type: 'mds',
      linkDistance: 100,
    },
    node: {
      style: {
        size: 20,
        stroke: '#9ec9ff',
        fill: '#eee',
        lineWidth: 1,
        labelText: (d: any) => d.id,
        labelFontSize: 12,
        labelPlacement: 'center',
        labelBackground: false,
      },
    },
    behaviors: ['drag-node', 'drag-canvas', 'zoom-canvas', 'click-select'],
  });

  await graph.render();

  layoutMDS.form = (panel) => {
    const config = {
      linkDistance: 100,
    };
    return [
      panel.add(config, 'linkDistance', 50, 120, 10).onChange((v: number) => {
        graph.setLayout({ type: 'mds', linkDistance: v });
        graph.layout();
      }),
    ];
  };

  return graph;
};
