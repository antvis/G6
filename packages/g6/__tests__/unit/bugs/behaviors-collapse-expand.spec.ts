import { ComboEvent, GraphEvent } from '@/src';
import { layoutAntVDagreFlowCombo } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior collapse expand', () => {
  it('collapse expand with no change element', async () => {
    // https://github.com/antvis/G6/issues/5951
    const graph = await createDemoGraph(layoutAntVDagreFlowCombo, { animation: true });

    // @ts-expect-error private method
    const comboA = graph.context.element.getElement('A');

    const click = jest.fn(async () => {
      await new Promise<void>((resolve) => {
        graph.on(GraphEvent.AFTER_ANIMATE, () => {
          resolve();
        });

        graph.emit(ComboEvent.DBLCLICK, { target: comboA, targetType: 'combo' });
      });
    });

    expect(click).not.toThrow();
  });
});
