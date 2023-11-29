import comboBasic from '../demo/combo/combo-basic';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

const dir = `${__dirname}/snapshots/items/combo`;

describe('combo circle', () => {
  it('circle combo should be rendered correctly', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = comboBasic(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
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

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-selected');
      graph.collapseCombo('combo1');

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-collapsed');
      graph.expandCombo('combo1');

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-circle-expand');

      graph.destroy();
      done();
    });
  });

  it('rect combo should be rendered correctly with Canvas2D', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = comboBasic(
      {
        backgroundCanvas,
        canvas,
        container,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
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

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-selected');
      graph.collapseCombo('combo1');

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-collapsed');
      graph.expandCombo('combo1');

      await expect(canvas).toMatchSVGSnapshot(dir, 'combo-rect-expand');

      graph.destroy();
      done();
    });
  });
});
