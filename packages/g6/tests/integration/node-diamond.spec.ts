import diamond from '../demo/demo/diamond';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';

const dir = `${__dirname}/snapshots/items/node/diamond`;

describe('node diamond', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = diamond({
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
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-diamond');
        //seleted state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-diamond-selected');
        //normal state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-diamond-restore');
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});
