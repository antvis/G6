import treeGraph from '../demo/tree/treeGraph';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/treegraph`;

describe.skip('TreeGraph', () => {
  it('graph data with tree layout, remove/add/update node, and change layout', async () => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = treeGraph(
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
        dataType: 'graph',
        layoutType: 'compactBox',
      },
    );

    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata',
    );

    // ====== change to tree data ======
    const $changeData = document.getElementById('treegraph-changedata')!;
    $changeData.click();
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-changedata',
    );

    $changeData.click();
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-changedata2',
    );

    // ====== remove a node ======
    const $removeNode = document.getElementById('treegraph-removenode')!;
    $removeNode.click(); // remove
    graph.layout();
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-removenode',
    );

    // ====== add a node ======
    $removeNode.click(); // add
    graph.layout();
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-addnode',
    );

    // ====== update a node ======
    const $updateNode = document.getElementById('treegraph-updatenode')!;
    $updateNode.click(); // update label
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-updatenode',
    );

    // ====== change to graph layout ======
    const $changeLayout = document.getElementById('treegraph-changelayout')!;
    $changeLayout.click();
    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-changelayout',
    );

    graph.destroy();
  });

  it('should be rendered correctly with tree data', async () => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = treeGraph(
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
        dataType: 'tree',
        layoutType: 'compactBox',
      },
    );

    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-treedata',
    );

    // ======= collapse =======
    const $collapse = document.getElementById('treegraph-collapse')!;
    $collapse.click(); // collapse

    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-treedata-collapse',
    );

    // ======= expand =======
    $collapse.click(); // expand

    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-treedata-expand',
    )!;

    // ======= change layout =======
    const $changeLayout = document.getElementById('treegraph-changelayout')!;
    $changeLayout.click();

    await expect([canvas, labelCanvas]).toMatchSVGSnapshot(
      dir,
      'treegraph-treedata-changelayout',
    );

    graph.destroy();
  });

  it('graph data with initiated collapsed', async () => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = treeGraph(
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
        dataType: 'graph',
        layoutType: 'compactBox',
        defaultCollapse: true,
      },
    );

    await expect(canvas).toMatchSVGSnapshot(
      dir,
      'treegraph-graphdata-initial-collapse',
    );
    graph.destroy();
  });

  it('tree data with initiated collapsed', async () => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = treeGraph(
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
        dataType: 'tree',
        layoutType: 'compactBox',
        defaultCollapse: true,
      },
    );

    await expect(canvas).toMatchSVGSnapshot(
      dir,
      'treegraph-treedata-initial-collapse',
    );
    graph.destroy();
  });
});
