import { Graph } from '@/src';
import data from '@@/dataset/cluster.json';
import type { STDTestCase } from '../types';

export const layoutFruchtermanCluster: STDTestCase = async (context) => {
  const graph = new Graph({
    ...context,
    data: { ...data, nodes: data.nodes.map((n) => ({ ...n, cluster: n.data.cluster })) },
    behaviors: ['drag-canvas', 'drag-node'],
    layout: {
      type: 'fruchterman',
      gravity: 10,
      speed: 5,
      clustering: true,
      nodeClusterBy: 'cluster',
    },
    node: {
      style: {
        size: 20,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
        lineWidth: 1,
        labelPlacement: 'center',
        labelText: (d: any) => d.id,
        labelBackground: false,
      },
    },
    edge: {
      style: {
        endArrow: true,
        endArrowPath: 'M 0,0 L 4,2 L 4,-2 Z',
      },
    },
  });

  await graph.render();

  layoutFruchtermanCluster.form = () => {
    return [];
  };

  return graph;
};
