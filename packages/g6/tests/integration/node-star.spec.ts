import star from '../demo/demo/star';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';

const dir = `${__dirname}/snapshots/items/node/star`;

describe('node star', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = star({
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
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-star');
        //seleted state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-star-selected');
        //normal state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-star');
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});
