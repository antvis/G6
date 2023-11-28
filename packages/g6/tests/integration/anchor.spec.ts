import anchor from '../demo/item/anchor';
import { createContext } from './utils';
import './utils/useSnapshotMatchers';

const dir = `${__dirname}/snapshots/anchor`;

describe('Anchor points and shapes', () => {
  it('edges link to node center with empty anchorPoints', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = anchor(
      {
        container,
        backgroundCanvas,
        canvas,
        labelCanvas,
        transientCanvas,
        transientLabelCanvas,
        width: 500,
        height: 500,
      },
      {
        anchorPoints: [],
        showAnchorShapes: false,
      },
    );

    graph.on('afterlayout', async () => {
      try {
        await expect(canvas).toMatchSVGSnapshot(dir, 'anchor-empty');
      } finally {
        graph.destroy();
        done();
      }
    });
  });

  it('node with 4 anchorPoints and edge find the nearest one', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = anchor(
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
        anchorPoints: [
          [0.5, 1],
          [1, 0.5],
          [0, 0.5],
          [0.5, 0],
        ],
        showAnchorShapes: false,
      },
    );

    graph.on('afterlayout', async () => {
      try {
        await expect(canvas).toMatchSVGSnapshot(dir, 'anchor-4-points');

        // move node, edge find the nearset again
        graph.updateData('node', {
          id: 'node1',
          data: {
            x: 50,
            y: 100,
          },
        });

        await expect(canvas).toMatchSVGSnapshot(
          dir,
          'anchor-4-points-update-position',
        );
      } finally {
        graph.destroy();
        done();
      }
    });
  });

  it('node with 4 anchorPoints and anchorShapes and edge find the nearest one', (done) => {
    const {
      backgroundCanvas,
      canvas,
      container,
      labelCanvas,
      transientCanvas,
      transientLabelCanvas,
    } = createContext(500, 500);

    const graph = anchor(
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
        anchorPoints: [
          [0.5, 1],
          [1, 0.5],
          [0, 0.5],
          [0.5, 0],
        ],
        showAnchorShapes: true,
      },
    );

    graph.on('afterlayout', async () => {
      try {
        await expect(canvas).toMatchSVGSnapshot(dir, 'anchor-4-shapes');

        graph.updateData('edge', {
          id: 'edge1',
          data: {
            sourceAnchor: 1,
            targetAnchor: 0,
          },
        });
      } finally {
        graph.destroy();
        done();
      }
    });
  });
});
