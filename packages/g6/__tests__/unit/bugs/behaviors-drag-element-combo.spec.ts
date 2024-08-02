import { ComboEvent, Graph } from '@/src';
import { layoutAntVDagreFlowCombo } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior drag element combo', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(layoutAntVDagreFlowCombo, { animation: false });
  });

  it('drag combo A over C', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'A' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: 100, dy: 0 });
    graph.emit(ComboEvent.DRAG_END, { target: { id: 'C' } });

    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-A-over-C');
  });

  it('drag combo C over A', async () => {
    graph.emit(ComboEvent.DRAG_START, { target: { id: 'C' }, targetType: 'combo' });
    graph.emit(ComboEvent.DRAG, { dx: -10, dy: 0 });
    graph.emit(ComboEvent.DRAG_END, { target: { id: 'A' } });

    await expect(graph).toMatchSnapshot(__filename, 'drag-combo-C-over-A');
  });
});
