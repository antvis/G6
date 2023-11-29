import imageNode from '../demo/item/node/image';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

const dir = `${__dirname}/snapshots/items/node/image`;

describe('Items node image', () => {
  it('should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = imageNode({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-image');
      graph.destroy();
      done();
    });
  });
});
