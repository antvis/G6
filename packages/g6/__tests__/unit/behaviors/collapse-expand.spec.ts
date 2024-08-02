import type { Graph } from '@/src';
import { ComboEvent } from '@/src';
import { behaviorExpandCollapseCombo } from '@@/demos';
import { createDemoGraph, sleep } from '@@/utils';

describe('behavior combo expand collapse', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorExpandCollapseCombo, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('collapse', async () => {
    // collapse combo-2
    // @ts-expect-error private method
    const combo2 = graph.context.element.getElement('combo-2');
    graph.emit(ComboEvent.DBLCLICK, { target: combo2, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'collapse-combo-2');
  });

  it('expand', async () => {
    // expand combo-2
    // @ts-expect-error private method
    const combo2 = graph.context.element.getElement('combo-2');
    graph.emit(ComboEvent.DBLCLICK, { target: combo2, targetType: 'combo' });
    // await async invoke
    await sleep(100);
    // expand combo-1
    // @ts-expect-error private method
    const combo1 = graph.context.element.getElement('combo-1');
    graph.emit(ComboEvent.DBLCLICK, { target: combo1, targetType: 'combo' });
    await expect(graph).toMatchSnapshot(__filename, 'expand-combo-1');
  });
});
