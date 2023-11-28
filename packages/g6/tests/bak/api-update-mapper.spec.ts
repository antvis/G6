import { resetEntityCounter } from '@antv/g';
import mapper from '../demo/visual/mapper';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

describe('updateMapper API', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('node and edge mapper update', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = mapper({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'api-update-mapper-init');

      const $updateNodeJson = document.getElementById(
        'change-node-json-mapper',
      );
      $updateNodeJson?.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'api-update-mapper-node-json',
      );

      const $updateNodeFunc = document.getElementById(
        'change-node-func-mapper',
      );
      $updateNodeFunc?.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'api-update-mapper-node-func',
      );

      const $updateEdgeJson = document.getElementById(
        'change-edge-json-mapper',
      );
      $updateEdgeJson?.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'api-update-mapper-edge-json',
      );

      const $updateEdgeFunc = document.getElementById(
        'change-edge-func-mapper',
      );
      $updateEdgeFunc?.click();
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'api-update-mapper-edge-func',
      );

      graph.destroy();
      done();
    });
  });
});
