import hull from '../demo/plugins/hull';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/plugins/hull`;

describe('Hull plugin', () => {
  it('should be rendered correctly with round-convex type', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = hull(
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
        style: {
          opacity: 0.9,
        },
      },
    );

    graph.on('afterlayout', async () => {
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-render',
      );

      // ========= remove hull =========
      const $removeHull = document.getElementById(
        'hull-removehull',
      ) as HTMLInputElement;
      console.log('$removeHull', $removeHull);
      $removeHull.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-add-hull',
      );

      // ========= add hull =========
      $removeHull.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-remove-hull',
      );

      // ========= remove node =========
      const $removeNode = document.getElementById(
        'hull-removenode',
      ) as HTMLInputElement;
      $removeNode.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-remove-node',
      );

      // ========= add node =========
      $removeNode.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-add-node',
      );

      // ========= remove member =========
      const $removeMember = document.getElementById(
        'hull-removemember',
      ) as HTMLInputElement;
      $removeMember.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-remove-member',
      );

      // ========= add member =========
      $removeMember.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-add-member',
      );

      // ========= add non-member =========
      const $removeNonMember = document.getElementById(
        'hull-removenonmember',
      ) as HTMLInputElement;
      $removeNonMember.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-add-nonmember',
      );

      // ========= remove non-member =========
      $removeNonMember.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-remove-nonmember',
      );

      // ========= update config =========
      const $updateConfig = document.getElementById(
        'hull-updateconfig',
      ) as HTMLInputElement;
      $updateConfig.click();
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-update-config',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with bubble type', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = hull(
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
        hullType: 'bubble',
        labelPosition: 'right',
        nonMembers: ['node3'],
      },
    );

    graph.on('afterlayout', async () => {
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-render-bubble',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with  smooth-convex type', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = hull(
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
        hullType: 'smooth-convex',
        labelPosition: 'bottom',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(transientCanvas).toMatchSVGSnapshot(
        dir,
        'plugins-hull-render-smooth-convex',
      );

      graph.destroy();
      done();
    });
  });
});
