import { resetEntityCounter } from '@antv/g';
import { createContext, sleep } from './utils';
import './utils/useSnapshotMatchers';
import arrow from '../demo/item/edge/arrow';

describe('Edge start arrow', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });
  it('Edge with endArrow', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = arrow(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        startArrow: false,
        endArrow: true,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'arrow-end');

      const $typeBtn = document.getElementById(
        'arrow-change-type',
      ) as HTMLInputElement;
      $typeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'arrow-end-change-type-circle',
      );

      $typeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'arrow-end-change-type-rect',
      );

      $typeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'arrow-end-change-type-diamond',
      );

      $typeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'arrow-end-change-type-vee',
      );

      const $colorBtn = document.getElementById(
        'arrow-change-color',
      ) as HTMLInputElement;
      $colorBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(dir, 'arrow-end-change-color');

      const $removeBtn = document.getElementById(
        'arrow-remove',
      ) as HTMLInputElement;
      $removeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(dir, 'arrow-end-remove');

      $removeBtn.click();
      await expect(canvas).toMatchCanvasSnapshot(dir, 'arrow-end-add');

      graph.destroy();
      done();
    });
  });

  it('Edge with startArrow', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = arrow(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        startArrow: true,
        endArrow: false,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'arrow-start');
      graph.destroy();
      done();
    });
  });
});

// describe('Edge end arrow', () => {
//   beforeEach(() => {
//     /**
//      * SVG Snapshot testing will generate a unique id for each element.
//      * Reset to 0 to keep snapshot consistent.
//      */
//     resetEntityCounter();
//   });

// });
