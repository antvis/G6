import type { Graph } from '@/src';
import { elementPort } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('element port', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(elementPort, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename, 'port_hidden');
  });

  const updatePort = (attr: string, value: string | boolean | number) => {
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

  it('hide port', async () => {
    updatePort('portR', 3);
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'port_show');
  });

  it('endArrow link to port center', async () => {
    updatePort('portR', 3);
    updatePort('portLinkToCenter', true);
    await graph.draw();

    await expect(graph).toMatchSnapshot(__filename, 'port_linkToCenter');
  });
});
