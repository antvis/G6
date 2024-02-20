import { CubicHorizontal } from '../../../src/elements/edges';
import type { StaticTestCase } from '../types';

export const edgeCubicHorizontal: StaticTestCase = async (context) => {
  const { canvas } = context;

  [100, 150, 200, 250, 300].forEach((v) => {
    canvas.appendChild(
      new CubicHorizontal({
        style: {
          sourcePoint: [50, 200],
          targetPoint: [250, v],
          stroke: '#1890FF',
          lineWidth: 2,
          endArrow: true,
        },
      }),
    );
  });
};
