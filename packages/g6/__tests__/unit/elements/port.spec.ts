import type { Graph } from '@/src';
import { elementPort } from '@@/demos';
import { createDemoGraph } from '@@/utils';

const updatePort = (graph: Graph, attr: string, value: string | boolean | number) => {
  graph.updateNodeData((prev) => {
    const node2Data = prev.find((node: any) => node.id === 'node-2')!;
    return [
      ...prev.filter((node: any) => node.id !== 'node-2'),
      {
        ...node2Data,
        style: {
          ...node2Data!.style,
          [attr]: value,
        },
      },
    ];
  });
};

describe('element port', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementPort, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'port_hidden');
  });

  it('hide port', async () => {
    updatePort(graph, 'portR', 3);
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'port_show');
  });

  it('endArrow link to port center', async () => {
    updatePort(graph, 'portR', 3);
    updatePort(graph, 'portLinkToCenter', true);
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'port_linkToCenter');
  });
});
