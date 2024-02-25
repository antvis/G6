import { CubicVertical } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { StaticTestCase } from '../types';

export const edgeCubicVertical: StaticTestCase = async (context) => {
  const { canvas } = context;
  [100, 150, 200, 250, 300].forEach((v) => {
    canvas.appendChild(
      new CubicVertical({
        style: {
          sourceNode: createEdgeNode([200, 100]),
          targetNode: createEdgeNode([v, 300]),
          stroke: '#1890FF',
          lineWidth: 2,
          endArrow: true,
        },
      }),
    );
  });
};
