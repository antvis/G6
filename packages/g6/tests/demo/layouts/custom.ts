import { Layout, LayoutMapping } from '@antv/layout';
import G6 from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseParams } from '../interface';

class MyCustomLayout implements Layout<{}> {
  async assign(graph, options?: {}): Promise<void> {
    throw new Error('Method not implemented.');
  }
  async execute(graph, options?: {}): Promise<LayoutMapping> {
    const nodes = graph.getAllNodes();
    return {
      nodes: nodes.map((node, i) => ({
        id: node.id,
        data: {
          x: 0 + i * 10,
          y: 250,
          z: 0,
        },
      })),
      edges: [],
    };
  }
  options: {};
  id: 'myCustomLayout';
}

// Register custom layout
G6.stdLib.layouts['myCustomLayout'] = MyCustomLayout;

export default (params: TestCaseParams) => {
  return new G6.Graph({
    ...params,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'myCustomLayout',
    },
  });
};
