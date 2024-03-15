import { CommonEvent, type Graph } from '@/src';
import { comboExpandCollapse } from '@@/demo/case';
import { createDemoGraph } from '@@/utils';

describe('behavior combo expand collapse', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(comboExpandCollapse, { animation: false });
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse', async () => {
    // collapse combo-2
    graph.emit(`combo:${CommonEvent.DBLCLICK}`, { target: { id: 'combo-2' } });
    await expect(graph).toMatchSnapshot(__filename, 'collapse-combo-2');
  });

  it('expand', async () => {
    // expand combo-2
    graph.emit(`combo:${CommonEvent.DBLCLICK}`, { target: { id: 'combo-2' } });
    // expand combo-1
    graph.emit(`combo:${CommonEvent.DBLCLICK}`, { target: { id: 'combo-1' } });
    await expect(graph).toMatchSnapshot(__filename, 'expand-combo-1');
  });
});
