import hexagon from '../demo/demo/hexagon';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';

const dir = `${__dirname}/snapshots/items/node/hexagon`;

describe('node hexagon', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = hexagon({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      try {
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-hexagon');
        //seleted state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-hexagon-selected');
        //normal state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-hexagon');
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});
