import { Layout, LayoutMapping } from '@antv/layout';
import { Graph, register } from '../../../src/index';
import { data } from '../../datasets/dataset1';
import { TestCaseContext } from '../interface';

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

register('layout', 'my-custom-layout', MyCustomLayout);

export default (context: TestCaseContext) => {
  return new Graph({
    ...context,
    type: 'graph',
    data: JSON.parse(JSON.stringify(data)),
    layout: {
      type: 'my-custom-layout',
    },
  });
};
