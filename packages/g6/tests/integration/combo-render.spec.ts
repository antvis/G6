import comboBasic from '../demo/combo/combo-basic';
import './utils/useSnapshotMatchers';
import { createContext, sleep } from './utils';
import { triggerEvent } from './utils/event';

describe('combo circle', () => {
  it('circle combo should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = comboBasic(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        disableAnimate: true,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-circle');
      //seleted state
      graph.setItemState('combo1', 'selected', true);
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-circle-selected');
      graph.collapseCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-circle-collapsed');
      graph.expandCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-circle-expand');
      graph.destroy();
      done();
    });
  });
  it('rect combo should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = comboBasic(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        disableAnimate: true,
        comboType: 'rect-combo',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-rect');
      //seleted state
      graph.setItemState('combo1', 'selected', true);
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-rect-selected');
      graph.collapseCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-rect-collapsed');
      graph.expandCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'combo-rect-expand');
      graph.destroy();
      done();
    });
  });

  it('circle combo should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = comboBasic(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        disableAnimate: true,
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle');
      //seleted state
      graph.setItemState('combo1', 'selected', true);
      sleep(100);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-selected');
      graph.collapseCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-collapsed');
      graph.expandCombo('combo1');
      sleep(100);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-expand');
      graph.destroy();
      done();
    });
  });
});
