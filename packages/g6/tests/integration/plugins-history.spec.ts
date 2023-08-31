import { resetEntityCounter } from '@antv/g';
import history from '../demo/plugins/history';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('Plugins history', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/plugins/history`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = history({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'plugins-history-init');

      const $undo = document.querySelectorAll('button')[0];
      const $redo = document.querySelectorAll('button')[1];

      /**
       * Click button to set node 1 state selected.
       * Verify that the API `setItemSate` supports history.
       */
      const $setState = document.querySelectorAll(
        'button',
      )[2] as HTMLInputElement;
      $setState.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-set-item-state',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-set-item-state-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-set-item-state-redo',
      );

      /**
       * Click button to clear node 1 selected.
       * Verify that the API `clearItemState` supports history.
       */
      const $clearState = document.querySelectorAll(
        'button',
      )[3] as HTMLInputElement;
      $clearState.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-clear-item-state',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-clear-item-state-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-clear-item-state-redo',
      );
      $undo.click();

      /**
       * Click button to add node 3 and edge 2.
       * Verify that the API `addData` supports history.
       */
      const $addData = document.querySelectorAll(
        'button',
      )[4] as HTMLInputElement;
      $addData.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-add-data',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-add-data-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-add-data-redo',
      );

      /**
       * Click button to delete node 3 and edge 2.
       * Verify that the API `deleteData` supports history.
       */
      const $deleteData = document.querySelectorAll(
        'button',
      )[5] as HTMLInputElement;
      $deleteData.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-delete-data',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-delete-data-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-delete-data-redo',
      );
      $undo.click();

      /**
       * Click button to update node 1.
       * Verify that the API `updateData` supports history.
       */
      const $updateData = document.querySelectorAll(
        'button',
      )[6] as HTMLInputElement;
      $updateData.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-update-data',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-update-data-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-update-data-redo',
      );
      $undo.click();

      /**
       * Click button to hide node 3.
       * Verify that the API `hideItem` supports history.
       */
      const $showHideItem = document.querySelectorAll(
        'button',
      )[7] as HTMLInputElement;
      $showHideItem.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-hide-item',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-hide-item-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-hide-item-redo',
      );

      /**
       * Click button to show node 3.
       * Verify that the API `showItem` supports history.
       */
      $showHideItem.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-show-item',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-show-item-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-show-item-redo',
      );

      /**
       * Click button to back node 3.
       * Verify that the API `backItem` supports history.
       */
      const $backItem = document.querySelectorAll(
        'button',
      )[9] as HTMLInputElement;
      $updateData.click();
      $backItem.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-back-item',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-back-item-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-back-item-redo',
      );

      /**
       * Click button to front node 3.
       * Verify that the API `frontItem` supports history.
       */
      const $frontItem = document.querySelectorAll(
        'button',
      )[8] as HTMLInputElement;
      $frontItem.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-front-item',
      );
      $undo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-front-item-undo',
      );
      $redo.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'plugins-history-front-item-redo',
      );

      graph.destroy();
      done();
    });
  });
});
