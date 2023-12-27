import mapper from '../demo/visual/mapper';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/api`;

describe('updateMapper API', () => {
  it('node and edge mapper update', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = mapper({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-init');

      const $updateNodeJson = document.getElementById('change-node-json-mapper');
      $updateNodeJson?.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-node-json');

      const $updateNodeFunc = document.getElementById('change-node-func-mapper');
      $updateNodeFunc?.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-node-func');

      const $updateEdgeJson = document.getElementById('change-edge-json-mapper');
      $updateEdgeJson?.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-edge-json');

      const $updateEdgeFunc = document.getElementById('change-edge-func-mapper');
      $updateEdgeFunc?.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-edge-func');

      graph.destroy();
      done();
    });
  });
});
