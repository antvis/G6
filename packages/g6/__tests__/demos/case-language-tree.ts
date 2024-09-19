import { labelPropagation } from '@antv/algorithm';
import { Graph, NodeData } from '@antv/g6';
import data from '../dataset/language-tree.json';

export const caseLanguageTree: TestCase = async (context) => {
  const size = (node: NodeData) => Math.max(...(node.style?.size as [number, number, number]));

  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data: {
      ...data,
      nodes: labelPropagation(data).clusters.flatMap((cluster) => cluster.nodes),
    },
    node: {
      style: {
        labelText: (d) => d.id,
        labelBackground: true,
        iconSrc: 'https://gw.alipayobjects.com/zos/basement_prod/012bcf4f-423b-4922-8c24-32a89f8c41ce.svg',
      },
      palette: {
        field: (d) => d.clusterId,
      },
    },
    layout: {
      type: 'd3-force',
      link: {
        distance: (edge) => size(edge.source) + size(edge.target),
      },
      collide: {
        radius: (node: NodeData) => size(node) + 1,
      },
      manyBody: {
        strength: (node: NodeData) => -4 * size(node),
      },
      animation: false,
    },
    transforms: ['map-node-size'],
    behaviors: [
      'drag-canvas',
      'zoom-canvas',
      {
        key: 'hover-activate',
        type: 'hover-activate',
        degree: 1,
        inactiveState: 'inactive',
      },
    ],
    animation: false,
  });

  await graph.render();

  return graph;
};
