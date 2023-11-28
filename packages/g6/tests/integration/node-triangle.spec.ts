import triangle from '../demo/demo/triangle';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';

const dir = `${__dirname}/snapshots/items/node/triangle`;

describe('node triangle', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = triangle({
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
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-triangle');
        //seleted state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-triangle-selected');
        //normal state
        triggerEvent(graph, 'mousedown', 100, 100);
        triggerEvent(graph, 'mouseup', 100, 100);
        await expect(canvas).toMatchSVGSnapshot(dir, 'node-triangle');
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});
