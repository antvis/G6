import data from '@@/dataset/relations.json';
import type { NodeData } from '@antv/g6';
import { Graph } from '@antv/g6';

export const pluginFisheye: TestCase = async (context) => {
  const graph = new Graph({
    ...context,
    autoFit: 'view',
    data,
    node: {
      style: {
        size: (datum: NodeData) => datum.id.length * 2 + 10,
        label: false,
        labelText: (datum: NodeData) => datum.id,
        labelBackground: true,
        icon: false,
        iconFontFamily: 'iconfont',
        iconText: '\ue6f6',
        iconFill: '#fff',
      },
      palette: {
        type: 'group',
        field: (datum: NodeData) => datum.id,
        color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF'],
      },
    },
    edge: {
      style: {
        stroke: '#e2e2e2',
      },
    },
    plugins: [{ key: 'fisheye', type: 'fisheye', nodeStyle: { label: true, icon: true } }],
  });

  await graph.render();
  return graph;
};
