import type { Graph } from '@/src';
import { ComboEvent } from '@/src';
import { behaviorExpandCollapseCombo } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior combo expand collapse', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorExpandCollapseCombo, { animation: true });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default status', async () => {
    await expect(graph).toMatchSnapshot(__filename);
  });

  it('expand combo-1', async () => {
    // @ts-expect-error access private property
    const combo1 = graph.context.element?.getElement('combo-1');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(ComboEvent.DBLCLICK, { target: combo1, targetType: 'combo' });
      },
      'expand-combo-1',
    );
  });

  it('collapse combo-2', async () => {
    // @ts-expect-error access private property
    const combo2 = graph.context.element?.getElement('combo-2');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(ComboEvent.DBLCLICK, { target: combo2, targetType: 'combo' });
      },
      'collapse-combo-2',
    );
  });

  it('collapse combo-1, expand combo-2', async () => {
    await graph.collapseElement('combo-1');

    // @ts-expect-error access private property
    const combo2 = graph.context.element?.getElement('combo-2');

    await expect(graph).toMatchAnimation(
      __filename,
      [0, 500, 1000],
      () => {
        graph.emit(ComboEvent.DBLCLICK, { target: combo2, targetType: 'combo' });
      },
      'collapse-combo-1-expand-combo-2',
    );
  });
});
