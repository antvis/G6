import ellipse from '../demo/demo/ellipse';
import './utils/useSnapshotMatchers';
import { createContext, sleep } from './utils';
import { triggerEvent } from './utils/event';

describe('node ellipse', () => {
  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/items/node/ellipse`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = ellipse({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-ellipse');
      //seleted state
      triggerEvent(graph, 'mousedown', 100, 100);
      triggerEvent(graph, 'mouseup', 100, 100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-ellipse-selected');
      //normal state
      triggerEvent(graph, 'mousedown', 100, 100);
      triggerEvent(graph, 'mouseup', 100, 100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'node-ellipse');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/items/node/ellipse`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = ellipse({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchSVGSnapshot(dir, 'node-ellipse');
      const $selected = document.querySelector(
        'input#selected',
      ) as HTMLInputElement;
      $selected.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'node-ellipse-seleted');
      graph.destroy();
      done();
    });
  });
});
