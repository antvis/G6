import { resetEntityCounter } from '@antv/g';
import ShortcutsCall from '../demo/behaviors/shortcuts-call';
import { createContext, sleep } from './utils';
import './utils/useSnapshotMatchers';

describe('Shortcuts-call behavior', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with default options in Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = ShortcutsCall({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-shortcuts-call');

      // default behavior ctrl + 1 to fitView
      graph.emit('keydown', {
        key: 'control',
      });
      graph.emit('keydown', {
        key: '1',
      });
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-shortcuts-call-with-fitView',
      );
      graph.destroy();
      done();
    });
  });
  it('should be rendered correctly with custom options in Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = ShortcutsCall(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
      },
      {
        trigger: 'shift',
        combinedKey: 'm',
        functionName: 'zoomTo',
        functionParams: [0.5],
      },
    );

    graph.on('afterlayout', async () => {
      // shift + m to zoom to 0.5
      graph.emit('keydown', {
        key: 'shift',
      });
      graph.emit('keydown', {
        key: 'm',
      });
      await sleep(300);
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-shortcuts-call-with-zoom',
      );
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = ShortcutsCall({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
    });

    graph.on('afterlayout', async () => {
      await sleep(300);
      await expect(canvas).toMatchSVGSnapshot(dir, 'behaviors-shortcuts-call');
      graph.destroy();
      done();
    });
  });
});
