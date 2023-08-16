import { resetEntityCounter } from '@antv/g';
import treeGraph from '../demo/tree/treeGraph';
import './utils/useSnapshotMatchers';
import { createContext, sleep } from './utils';

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

    (async () => {
      await sleep(50);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'treegraph-graphdata');

      // ====== change to tree data ======
      const $changeData = document.getElementById('treegraph-changedata');
      $changeData.click();
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-changedata',
      );

      // ====== remove a node ======
      const $removeNode = document.getElementById('treegraph-removenode');
      $removeNode.click(); // remove
      graph.layout();
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-removenode',
      );

      // ====== add a node ======
      $removeNode.click(); // add
      graph.layout();
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-addnode',
      );

      // ====== update a node ======
      const $updateNode = document.getElementById('treegraph-updatenode');
      $updateNode.click(); // update label
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-udpatenode',
      );

      // ====== change to graph layout ======
      const $changeLayout = document.getElementById('treegraph-changelayout');
      $changeLayout.click();
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-changelayout',
      );
      graph.destroy();
    })();
    done();
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
    (async () => {
      await sleep(100);
      await expect(canvas).toMatchCanvasSnapshot(dir, 'treegraph-treedata');

      // ======= collapse =======
      const $collapse = document.getElementById('treegraph-collapse');
      $collapse.click(); // collapse
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-treedata-collapse',
      );

      // ======= expand =======
      $collapse.click(); // expand
      await sleep(500);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-treedata-expand',
      );

      // ======= change layout =======
      const $changeLayout = document.getElementById('treegraph-changelayout');
      $changeLayout.click();
      await sleep(700);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-treedata-changelayout',
      );

      graph.destroy();
    })();
    done();
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
    (async () => {
      await sleep(50);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-graphdata-initial-collapse',
      );
      graph.destroy();
    })();
    done();
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
    (async () => {
      await sleep(50);
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'treegraph-treedata-initial-collapse',
      );
      graph.destroy();
    })();
    done();
  });
});
