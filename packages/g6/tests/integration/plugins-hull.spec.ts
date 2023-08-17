import { resetEntityCounter } from '@antv/g';
import activateRelations from '../demo/behaviors/activate-relations';
import './utils/useSnapshotMatchers';
import { createContext, sleep, triggerEvent } from './utils';
import hull from '../demo/plugins/hull';

describe('Hull plugin', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('should be rendered correctly with round-convex type', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = hull(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
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
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-render',
      );

      // ========= remove hull =========
      const $removeHull = document.getElementById(
        'hull-removehull',
      ) as HTMLInputElement;
      console.log('$removeHull', $removeHull);
      $removeHull.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-add-hull',
      );

      // ========= add hull =========
      $removeHull.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-remove-hull',
      );

      // ========= remove node =========
      const $removeNode = document.getElementById(
        'hull-removenode',
      ) as HTMLInputElement;
      $removeNode.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-remove-node',
      );

      // ========= add node =========
      $removeNode.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-add-node',
      );

      // ========= remove member =========
      const $removeMember = document.getElementById(
        'hull-removemember',
      ) as HTMLInputElement;
      $removeMember.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-remove-member',
      );

      // ========= add member =========
      $removeMember.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-add-member',
      );

      // ========= add non-member =========
      const $removeNonMember = document.getElementById(
        'hull-removenonmember',
      ) as HTMLInputElement;
      $removeNonMember.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-add-nonmember',
      );

      // ========= remove non-member =========
      $removeNonMember.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-remove-nonmember',
      );

      // ========= update config =========
      const $updateConfig = document.getElementById(
        'hull-updateconfig',
      ) as HTMLInputElement;
      $updateConfig.click();
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-update-config',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with bubble type', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = hull(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
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
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-render-bubble',
      );

      graph.destroy();
      done();
    });
  });

  it('should be rendered correctly with  smooth-convex type', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = hull(
      {
        container,
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
      },
      {
        hullType: 'smooth-convex',
        labelPosition: 'bottom',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(transientCanvas).toMatchCanvasSnapshot(
        dir,
        'plugins-hull-render-smooth-convex',
      );

      graph.destroy();
      done();
    });
  });

  xit('should be rendered correctly with SVG', (done) => {
    const dir = `${__dirname}/snapshots/svg`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('svg', 500, 500);

    const graph = activateRelations({
      container,
      backgroundCanvas,
      canvas,
      transientCanvas,
      width: 500,
      height: 500,
    });

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'behaviors-activate-relations',
      );
      graph.destroy();
      done();
    });
  });
});
