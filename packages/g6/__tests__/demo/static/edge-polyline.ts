import { Polyline } from '../../../src/elements/edges';
import type { StaticTestCase } from '../types';

export const edgePolyline: StaticTestCase = async (context) => {
  const { canvas } = context;

  canvas.appendChild(
    new Polyline({
      style: {
        sourcePoint: [50, 50],
        targetPoint: [150, 150],
        controlPoints: [
          [50, 50],
          [100, 50],
          [100, 100],
          [150, 100],
        ],
        radius: 10,
        stroke: '#1890FF',
        lineWidth: 2,
        endArrow: true,
      },
    }),
  );
};
