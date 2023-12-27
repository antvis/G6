import watermarker from '../demo/plugins/watermarker';
import { createContext } from './utils';
import { createNodeGCanvas } from './utils/createNodeGCanvas';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/plugins/watermarker`;

describe('plugin', () => {
  it('watermarker with text config', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const watermarkerContainer = document.createElement('div');
    document.body.appendChild(container);
    const watermarkerCanvas = createNodeGCanvas(watermarkerContainer, 500, 500);

    const graph = watermarker(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        watermarkerCanvas,
        mode: 'text',
      },
    );
    graph.on('afterlayout', async () => {
      await expect(watermarkerCanvas).toMatchSVGSnapshot(dir, 'plugins-watermarker-text');
      watermarkerCanvas.destroy();
      graph.destroy();
      done();
    });
  });
});
