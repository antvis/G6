import { Rect } from '@/src/elements';
import {
  getCubicPath,
  getCurveControlPoint,
  getLabelPositionStyle,
  getPolylineLoopControlPoints,
  getPolylinePath,
  getQuadraticPath,
  getRadians,
  getSubgraphRelatedEdges,
  parseCurveOffset,
  parseCurvePosition,
} from '@/src/utils/edge';
import { AABB, Line } from '@antv/g';
import type { ID } from '@antv/graphlib';

describe('edge', () => {
  describe('getLabelPositionStyle', () => {
    it('should return correctly label position style', () => {
      // horizontal line
      const line = new Line({
        style: {
          x1: 0,
          y1: 100,
          x2: 100,
          y2: 100,
        },
      });

      //  with rotation angle below Math.PI
      const line1 = new Line({
        style: {
          x1: 0,
          y1: 100,
          x2: 100,
          y2: 200,
        },
      });

      // with rotation angle over Math.PI
      const line2 = new Line({
        style: {
          x1: 0,
          y1: 200,
          x2: 100,
          y2: 100,
        },
      });

      const labelPlacement = getLabelPositionStyle(line, 'center', false, 0, 0);
      expect(labelPlacement.textAlign).toEqual('center');
      expect(labelPlacement.x).toEqual(50);
      expect(labelPlacement.y).toEqual(100);

      const labelPosition2 = getLabelPositionStyle(line, 'center', true, 5, 5);
      expect(labelPosition2.textAlign).toEqual('center');
      expect(labelPosition2.x).toEqual(55);
      expect(labelPosition2.y).toEqual(105);

      const labelPosition3 = getLabelPositionStyle(line, 'start', true, 5, 5);
      expect(labelPosition3.textAlign).toEqual('left');
      expect(labelPosition3.x).toEqual(5);
      expect(labelPosition3.y).toEqual(105);

      const labelPosition4 = getLabelPositionStyle(line, 'end', true, 5, 5);
      expect(labelPosition4.textAlign).toEqual('right');
      expect(labelPosition4.x).toBeCloseTo(100 * 0.99 + 5);
      expect(labelPosition4.y).toEqual(105);

      const labelPosition5 = getLabelPositionStyle(line, 0.5, true, 5, 5);
      expect(labelPosition5.textAlign).toEqual('center');
      expect(labelPosition5.x).toEqual(55);
      expect(labelPosition5.y).toEqual(105);

      //  with rotation angle below Math.PI
      const labelPosition6 = getLabelPositionStyle(line1, 'center', true, 5, 5);
      expect(labelPosition6.textAlign).toEqual('center');
      expect(labelPosition6.transform).toEqual('rotate(45deg)');
      expect(labelPosition6.x).toEqual(50 + 5 * Math.cos(Math.PI / 4) - 5 * Math.sin(Math.PI / 4));
      expect(labelPosition6.y).toEqual(150 + 5 * Math.sin(Math.PI / 4) + 5 * Math.cos(Math.PI / 4));

      const labelPosition7 = getLabelPositionStyle(line1, 'start', true, 5, 5);
      expect(labelPosition7.textAlign).toEqual('left');

      const labelPosition8 = getLabelPositionStyle(line1, 'end', true, 5, 5);
      expect(labelPosition8.textAlign).toEqual('right');

      // with rotation angle over Math.PI
      const labelPosition9 = getLabelPositionStyle(line2, 'center', true, 5, 5);
      expect(labelPosition9.textAlign).toEqual('center');
      expect(labelPosition9.transform).toEqual('rotate(-45deg)');
      expect(labelPosition9.x).toEqual(50 + 5 * Math.cos(-Math.PI / 4) - 5 * Math.sin(-Math.PI / 4));
      expect(labelPosition9.y).toEqual(150 + 5 * Math.sin(-Math.PI / 4) + 5 * Math.cos(-Math.PI / 4));
    });
  });

  it('getCurveControlPoint', () => {
    expect(getCurveControlPoint([0, 0], [100, 0], 0.5, 20)).toEqual([50, -20]);
    expect(getCurveControlPoint([0, 0], [100, 0], 0.5, -20)).toEqual([50, 20]);
  });

  it('parseCurveOffset', () => {
    expect(parseCurveOffset(20)).toEqual([20, -20]);
    expect(parseCurveOffset([20, 30])).toEqual([20, 30]);
  });

  it('parseCurvePosition', () => {
    expect(parseCurvePosition(0.2)).toEqual([0.2, 0.8]);
    expect(parseCurvePosition([0.2, 0.8])).toEqual([0.2, 0.8]);
  });

  it('getQuadraticPath', () => {
    expect(getQuadraticPath([0, 10], [10, 10], [100, 100])).toEqual([
      ['M', 0, 10],
      ['Q', 100, 100, 10, 10],
    ]);
  });

  it('getCubicPath', () => {
    expect(
      getCubicPath(
        [0, 10],
        [100, 100],
        [
          [20, 20],
          [50, 50],
        ],
      ),
    ).toEqual([
      ['M', 0, 10],
      ['C', 20, 20, 50, 50, 100, 100],
    ]);
  });

  it('getPolylinePath', () => {
    expect(
      getPolylinePath(
        [
          [0, 10],
          [20, 20],
          [50, 50],
          [100, 100],
        ],
        0,
      ),
    ).toEqual([
      ['M', 0, 10],
      ['L', 20, 20],
      ['L', 50, 50],
      ['L', 100, 100],
    ]);
    expect(
      getPolylinePath(
        [
          [0, 10],
          [20, 20],
          [50, 50],
          [100, 100],
        ],
        0,
        true,
      ),
    ).toEqual([['M', 0, 10], ['L', 20, 20], ['L', 50, 50], ['L', 100, 100], ['Z']]);
    expect(
      getPolylinePath(
        [
          [0, 10],
          [20, 20],
          [50, 50],
          [100, 100],
        ],
        10,
      )[1][1],
    ).toBeCloseTo(13.33);
  });

  it('getRadians', () => {
    const bbox = new AABB();
    bbox.setMinMax([0, 0, 0], [100, 100, 0]);
    const EIGHTH_PI = Math.PI / 8;
    expect(getRadians(bbox).bottom[0]).toBeCloseTo(EIGHTH_PI * 3);
    expect(getRadians(bbox).top[0]).toBeCloseTo(-EIGHTH_PI * 5);
  });

  it('getPolylineLoopControlPoints', () => {
    const node = new Rect({ style: { x: 100, y: 100, size: 100 } });
    expect(getPolylineLoopControlPoints(node, [150, 100], [150, 100], 10)).toEqual([
      [160, 100],
      [160, 110],
      [150, 110],
    ]);
    expect(getPolylineLoopControlPoints(node, [100, 150], [100, 150], 10)).toEqual([
      [100, 160],
      [110, 160],
      [110, 150],
    ]);
    expect(getPolylineLoopControlPoints(node, [50, 100], [50, 100], 10)).toEqual([
      [40, 100],
      [40, 110],
      [50, 110],
    ]);
    expect(getPolylineLoopControlPoints(node, [100, 50], [100, 50], 10)).toEqual([
      [100, 40],
      [110, 40],
      [110, 50],
    ]);
    expect(getPolylineLoopControlPoints(node, [150, 150], [100, 150], 10)).toEqual([
      [160, 150],
      [160, 160],
      [100, 160],
    ]);
    expect(getPolylineLoopControlPoints(node, [150, 150], [150, 100], 10)).toEqual([
      [160, 150],
      [160, 100],
    ]);
    expect(getPolylineLoopControlPoints(node, [120, 50], [140, 50], 10)).toEqual([
      [120, 40],
      [140, 40],
    ]);
    expect(getPolylineLoopControlPoints(node, [150, 120], [150, 140], 10)).toEqual([
      [160, 120],
      [160, 140],
    ]);
    expect(getPolylineLoopControlPoints(node, [50, 120], [50, 140], 10)).toEqual([
      [40, 120],
      [40, 140],
    ]);
  });

  it('getSubgraphRelatedEdges', () => {
    /**
     *    1 - 2
     *   /     \
     *  3 - - - 4
     *   \  |   /
     *      5
     */
    const data = {
      nodes: [
        { id: 'node-1', style: { parentId: 'combo-1' } },
        { id: 'node-2', style: { parentId: 'combo-1' } },
        { id: 'node-3' },
        { id: 'node-4' },
        { id: 'node-5' },
      ],
      edges: [
        { id: 'node-1-node-2', source: 'node-1', target: 'node-2' },
        { id: 'node-1-node-3', source: 'node-1', target: 'node-3' },
        { id: 'node-2-node-4', source: 'node-2', target: 'node-4' },
        { id: 'node-3-node-5', source: 'node-3', target: 'node-5' },
        { id: 'node-4-node-5', source: 'node-4', target: 'node-5' },
        { id: 'combo-1-node-5', source: 'combo-1', target: 'node-5' },
      ],
      combos: [{ id: 'combo-1' }],
    };

    const getRelatedEdges = (id: ID) => data.edges.filter((edge) => edge.id.includes(id as string));

    expect(getSubgraphRelatedEdges(['node-1', 'node-2', 'combo-1'], getRelatedEdges)).toEqual({
      edges: [
        { id: 'node-1-node-2', source: 'node-1', target: 'node-2' },
        { id: 'node-1-node-3', source: 'node-1', target: 'node-3' },
        { id: 'node-2-node-4', source: 'node-2', target: 'node-4' },
        { id: 'combo-1-node-5', source: 'combo-1', target: 'node-5' },
      ],
      external: [
        { id: 'node-1-node-3', source: 'node-1', target: 'node-3' },
        { id: 'node-2-node-4', source: 'node-2', target: 'node-4' },
        { id: 'combo-1-node-5', source: 'combo-1', target: 'node-5' },
      ],
      internal: [{ id: 'node-1-node-2', source: 'node-1', target: 'node-2' }],
    });

    expect(getSubgraphRelatedEdges(['node-3', 'node-5'], getRelatedEdges)).toEqual({
      edges: [
        { id: 'node-1-node-3', source: 'node-1', target: 'node-3' },
        { id: 'node-3-node-5', source: 'node-3', target: 'node-5' },
        { id: 'node-4-node-5', source: 'node-4', target: 'node-5' },
        { id: 'combo-1-node-5', source: 'combo-1', target: 'node-5' },
      ],
      external: [
        { id: 'node-1-node-3', source: 'node-1', target: 'node-3' },
        { id: 'node-4-node-5', source: 'node-4', target: 'node-5' },
        { id: 'combo-1-node-5', source: 'combo-1', target: 'node-5' },
      ],
      internal: [{ id: 'node-3-node-5', source: 'node-3', target: 'node-5' }],
    });
  });
});
