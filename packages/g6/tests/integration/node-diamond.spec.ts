import diamond from '../demo/demo/diamond';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';
import { triggerEvent } from './utils/event';

describe('node diamond', () => {
  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = diamond({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-diamond');
      //seleted state
      triggerEvent(graph, 'mousedown', 100, 100);
      triggerEvent(graph, 'mouseup', 100, 100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-diamond-selected');
      //normal state
      triggerEvent(graph, 'mousedown', 100, 100);
      triggerEvent(graph, 'mouseup', 100, 100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-diamond');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = diamond({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'node-diamond');
      const $selected = document.querySelector(
        'input#selected',
      ) as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'node-diamond-seleted');
      graph.destroy();
      done();
    });
  });
});
