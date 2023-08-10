import { resetEntityCounter } from '@antv/g';
import { loadImage } from 'canvas';
import imageNode from '../demo/item/node/image-node';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('Items node image', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', async () => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const src = await loadImage(__dirname + '/../assets/antv.png');

    const graph = imageNode({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      extendedParams: src as any,
    });

    await new Promise((resolve, reject) => {
      graph.on('afterlayout', async () => {
        await expect(canvas).toMatchCanvasSnapshot(dir, 'items-node-image');
        graph.destroy();

        resolve(undefined);
      });
    });
  });

  it('should be rendered correctly with SVG', async () => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = imageNode({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    await new Promise((resolve, reject) => {
      graph.on('afterlayout', async () => {
        await expect(canvas).toMatchSVGSnapshot(dir, 'items-node-image');
        graph.destroy();

        resolve(undefined);
      });
    });
  });

  it.skip('should be rendered correctly with WebGL', async () => {
    const dir = `${__dirname}/snapshots/webgl`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('webgl', 500, 500);

    const src = await loadImage(__dirname + '/../assets/antv.png');

    const graph = imageNode({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
      extendedParams: src as any,
    });

    await new Promise((resolve, reject) => {
      graph.on('afterlayout', async () => {
        await expect(canvas).toMatchWebGLSnapshot(dir, 'items-node-image');
        graph.destroy();

        resolve(undefined);
      });
    });
  });
});
