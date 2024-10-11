import { CanvasEvent, positionOf, type Graph } from '@/src';
import { behaviorToggleLabelVisibility } from '@@/demos';
import { createDemoGraph } from '@@/utils';

describe('behavior toggle label visibility', () => {
  let graph: Graph;

  beforeAll(async () => {
    graph = await createDemoGraph(behaviorToggleLabelVisibility, { animation: false });
  });

  afterAll(() => {
    graph.destroy();
  });

  it('default', async () => {
    await expect(graph).toMatchSnapshot(__filename);

    const origin = positionOf(graph.getNodeData('Albanian'));
    graph.zoomTo(3, false, origin);
    await expect(graph).toMatchSnapshot(__filename, 'zoom-3');
    graph.emit(CanvasEvent.CLICK, { target: {} });
  });
});
