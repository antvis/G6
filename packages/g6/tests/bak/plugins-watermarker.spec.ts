import { resetEntityCounter } from '@antv/g';
import watermarker from '../demo/plugins/watermarker';
import { createContext } from './utils';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useSnapshotMatchers';

const container = document.createElement('div');
//@ts-ignore
document.querySelector('body').appendChild(container);

describe('plugin', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });
  it('watermarker with text config', (done) => {
    const dir = `${__dirname}/snapshots/canvas/plugins/watermarker`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);
    const watermarkerCanvas = createNodeGCanvas('canvas', 500, 500);

    const graph = watermarker(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        watermarkerCanvas,
        mode: 'text',
      },
    );
    graph.on('afterlayout', async (e) => {
      console.log('afterlayout');
      await expect(watermarkerCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-watermarker-text',
      );
      watermarkerCanvas.destroy();
      graph.destroy();
      done();
    });
  });
});
