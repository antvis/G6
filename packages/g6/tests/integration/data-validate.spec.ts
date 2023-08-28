import { resetEntityCounter } from '@antv/g';
import treeGraph from '../demo/tree/treeGraph';
import { createContext, sleep } from './utils';
import './utils/useSnapshotMatchers';
import dataValidate from '../demo/data/data-validate';

describe('TreeGraph', () => {
  beforeEach(() => {
    /**
     * SVG Snapshot testing will generate a unique id for each element.
     * Reset to 0 to keep snapshot consistent.
     */
    resetEntityCounter();
  });

  it('data with error DUPLICATE_NODE_ID', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'DUPLICATE_NODE_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-duplicate-node-id',
      );
      done();
    });
  });
  it('data with error DUPLICATE_NODE_EDGE_ID', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'DUPLICATE_NODE_EDGE_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-duplicate-node-edge-id',
      );
      done();
    });
  });
  it('data with error NODE_NO_DATA', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'NODE_NO_DATA',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-node-no-data',
      );
      done();
    });
  });
  it('data with error NODE_NO_ID', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'NODE_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-node-no-id',
      );
      done();
    });
  });
  it('data with error EDGE_NO_ID', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'EDGE_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-edge-no-id',
      );
      done();
    });
  });
  it('data with error NODE_PARENT_NOT_EXIST', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'NODE_PARENT_NOT_EXIST',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-node-parent-not-exist',
      );
      done();
    });
  });
  it('data with error EDGE_SOURCE_NOT_EXIST', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'EDGE_SOURCE_NOT_EXIST',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-edge-source-not-exist',
      );
      done();
    });
  });
  it('data with error EDGE_NO_SOURCE', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'EDGE_NO_SOURCE',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-edge-no-source',
      );
      done();
    });
  });
  it('data with error COMBO_NO_ID', (done) => {
    const dir = `${__dirname}/snapshots/canvas`;
    const { backgroundCanvas, canvas, transientCanvas, container } =
      createContext('canvas', 500, 500);

    const graph = dataValidate(
      {
        backgroundCanvas,
        canvas,
        transientCanvas,
        width: 500,
        height: 500,
        container,
      },
      {
        errorType: 'COMBO_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchCanvasSnapshot(
        dir,
        'data-validate-combo-no-id',
      );
      done();
    });
  });
});
