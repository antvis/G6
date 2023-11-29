import { createContext } from './utils';
import './utils/useSnapshotMatchers';
import dataValidate from '../demo/data/data-validate';

const dir = `${__dirname}/snapshots/data`;

describe('TreeGraph', () => {
  it('data with error DUPLICATE_NODE_ID', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'DUPLICATE_NODE_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-duplicate-node-id',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error DUPLICATE_NODE_EDGE_ID', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'DUPLICATE_NODE_EDGE_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-duplicate-node-edge-id',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error NODE_NO_DATA', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'NODE_NO_DATA',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-node-no-data',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error NODE_NO_ID', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'NODE_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-validate-node-no-id');

      graph.destroy();
      done();
    });
  });

  it('data with error EDGE_NO_ID', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'EDGE_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-validate-edge-no-id');

      graph.destroy();
      done();
    });
  });
  it('data with error NODE_PARENT_NOT_EXIST', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'NODE_PARENT_NOT_EXIST',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-node-parent-not-exist',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error EDGE_SOURCE_NOT_EXIST', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'EDGE_SOURCE_NOT_EXIST',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-edge-source-not-exist',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error EDGE_NO_SOURCE', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'EDGE_NO_SOURCE',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(
        dir,
        'data-validate-edge-no-source',
      );

      graph.destroy();
      done();
    });
  });

  it('data with error COMBO_NO_ID', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = dataValidate(
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
        errorType: 'COMBO_NO_ID',
      },
    );

    graph.on('afterlayout', async () => {
      await expect(canvas).toMatchSVGSnapshot(dir, 'data-validate-combo-no-id');

      graph.destroy();
      done();
    });
  });
});
