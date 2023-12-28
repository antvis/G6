import ShortcutsCall from '../demo/behaviors/shortcuts-call';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/behaviors`;

describe('Shortcuts-call behavior', () => {
  it('should be rendered correctly with default options', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = ShortcutsCall({
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    });

    graph.on('afterlayout', async () => {
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(dir, 'behaviors-shortcuts-call');

      // default behavior ctrl + 1 to fitView
      graph.emit('keydown', {
        key: 'control',
      });
      graph.emit('keydown', {
        key: '1',
      });
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(dir, 'behaviors-shortcuts-call-with-fitView');
      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with custom options', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = ShortcutsCall(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
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
      await expect([canvas, labelCanvas]).toMatchSVGSnapshot(dir, 'behaviors-shortcuts-call-with-zoom');
      graph.destroy();
      done();
    });
  });
});
