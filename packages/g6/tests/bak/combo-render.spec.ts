import comboBasic from '../demo/combo/combo-basic';
import './utils/useSnapshotMatchers';
import { createContext, sleep } from './utils';

describe('combo circle', () => {
  // TODO(FIXME): 本地能通过，线上不通过
  xit('circle combo should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/items/combo`;
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle');
      //seleted state
      graph.setItemState('combo1', 'selected', true);
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-selected');
      graph.collapseCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-collapsed');
      graph.expandCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-expand');
      graph.destroy();
      done();
    });
  });
  xit('rect combo should be rendered correctly with Canvas2D', (done) => {
    const dir = `${__dirname}/snapshots/canvas/items/edge/line`;
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
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect');
      //seleted state
      graph.setItemState('combo1', 'selected', true);
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-selected');
      graph.collapseCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-collapsed');
      graph.expandCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-expand');
      graph.destroy();
      done();
    });
  });

  xit('circle combo should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg/items/combo`;
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
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-selected');
      graph.collapseCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-collapsed');
      graph.expandCombo('combo1');
      await sleep(200);
      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-expand');
      graph.destroy();
      done();
    });
  });
});
