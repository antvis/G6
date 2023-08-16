import { resetEntityCounter } from '@antv/g';
import treeGraph from '../demo/tree/treeGraph';
import './utils/useSnapshotMatchers';
import { createContext } from './utils';

describe('TreeGraph', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('graph data with tree layout, remove/add/update node, and change layout', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = treeGraph(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        dataType: 'graph',
        layoutType: 'compactBox',
      },
    );

    setTimeout(async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'treegraph-graphdata');

      const $changeData = document.getElementById('treegraph-changedata');
      $changeData.click();
      setTimeout(async () => {
        await expect(canvas).toMatchCanvasSnapshot(
          dir,
          'treegraph-graphdata-changedata',
        );

        const $removeNode = document.getElementById('treegraph-removenode');
        $removeNode.click(); // remove
        graph.layout();
        setTimeout(async () => {
          await expect(canvas).toMatchCanvasSnapshot(
            dir,
            'treegraph-graphdata-removenode',
          );
          $removeNode.click(); // add
          graph.layout();
          setTimeout(async () => {
            await expect(canvas).toMatchCanvasSnapshot(
              dir,
              'treegraph-graphdata-addnode',
            );

            const $updateNode = document.getElementById('treegraph-updatenode');
            $updateNode.click(); // update label
            await expect(canvas).toMatchCanvasSnapshot(
              dir,
              'treegraph-graphdata-udpatenode',
            );

            const $changeLayout = document.getElementById(
              'treegraph-changelayout',
            );
            $changeLayout.click(); // remove
            setTimeout(async () => {
              await expect(canvas).toMatchCanvasSnapshot(
                dir,
                'treegraph-graphdata-changelayout',
              );
              graph.destroy();
              done();
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  });

  it('should be rendered correctly with tree data', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = treeGraph(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        dataType: 'tree',
        layoutType: 'compactBox',
      },
    );
    setTimeout(async () => {
      await expect(canvas).toMatchCanvasSnapshot(dir, 'treegraph-treedata');

      const $collapse = document.getElementById('treegraph-collapse');
      $collapse.click(); // collapse
      setTimeout(async () => {
        await expect(canvas).toMatchCanvasSnapshot(
          dir,
          'treegraph-treedata-collapse',
        );
        $collapse.click(); // expand
        setTimeout(async () => {
          await expect(canvas).toMatchCanvasSnapshot(
            dir,
            'treegraph-treedata-expand',
          );

          const $changeLayout = document.getElementById(
            'treegraph-changelayout',
          );
          $changeLayout.click();
          setTimeout(async () => {
            await expect(canvas).toMatchCanvasSnapshot(
              dir,
              'treegraph-treedata-changelayout',
            );
            graph.destroy();
            done();
          }, 500);
        }, 500);
      }, 500);
    }, 500);
  });

  it('graph data with initiated collapsed', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = treeGraph(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        dataType: 'graph',
        layoutType: 'compactBox',
        defaultCollapse: true,
      },
    );
    setTimeout(async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-initial-collapse',
      );
      graph.destroy();
      done();
    }, 500);
  });

  it('tree data with initiated collapsed', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = treeGraph(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        dataType: 'tree',
        layoutType: 'compactBox',
        defaultCollapse: true,
      },
    );
    setTimeout(async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-treedata-initial-collapse',
      );
      graph.destroy();
      done();
    }, 500);
  });
});
