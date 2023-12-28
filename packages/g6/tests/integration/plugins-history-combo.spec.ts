import historyCombo from '../demo/plugins/history-combo';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/plugins/history`;

describe('Plugins history combo', () => {
  it('should be rendered correctly', (done) => {
    const { backgroundCanvas, canvas, container, labelCanvas, transientCanvas, transientLabelCanvas } = createContext(
      500,
      500,
    );

    const graph = historyCombo({
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-history-combo-init');

      const $undo = document.querySelectorAll('button')[0];
      const $redo = document.querySelectorAll('button')[1];

      /**
       * Click button to add combo 2.
       * Verify that the API `addCombo` supports history.
       */
      const $addCombo = document.querySelectorAll('button')[2] as HTMLInputElement;
      $addCombo.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-history-add-combo');
      $undo.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-history-add-combo-undo');
      $redo.click();
      await expect(canvas).toMatchSVGSnapshot(dir, 'plugins-history-add-combo-redo');
      $undo.click();

      /**
       * Click button to move combo 1.
       * Verify that the API `addCombo` supports history.
       */
      // const $moveCombo = document.querySelectorAll(
      //   'button',
      // )[3] as HTMLInputElement;
      // $moveCombo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-move-combo',
      // );
      // $undo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-move-combo-undo',
      // );
      // $redo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-move-combo-redo',
      // );

      /**
       * Click button to collapse combo 1.
       * Verify that the API `collapseCombo` supports history.
       */
      // const $collapseCombo = document.querySelectorAll(
      //   'button',
      // )[4] as HTMLInputElement;
      // $collapseCombo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-collapse-combo',
      // );
      // $undo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-collapse-combo-undo',
      // );
      // $redo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-collapse-combo-redo',
      // );
      // $undo.click();

      /**
       * Click button to collapse combo 1.
       * Verify that the API `collapseCombo` supports history.
       */
      // const $expandCombo = document.querySelectorAll(
      //   'button',
      // )[5] as HTMLInputElement;
      // $expandCombo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-expand-combo',
      // );
      // $undo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-expand-combo-undo',
      // );
      // $redo.click();
      // await expect(canvas).toMatchSVGSnapshot(
      //   dir,
      //   'plugins-history-expand-combo-redo',
      // );
      // $undo.click();

      graph.destroy();
      done();
    });
  });
});
