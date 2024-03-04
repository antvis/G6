import { Cubic } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { AnimationTestCase } from '../types';

export const edgeCubic: AnimationTestCase = async (context) => {
  const { container } = context;

  const cubic = new Cubic({
    style: {
      sourceNode: createEdgeNode([100, 50]),
      targetNode: createEdgeNode([300, 50]),
      lineWidth: 2,
      stroke: '#1890FF',
      labelText: 'cubic-edge',
      labelFontSize: 12,
      endArrow: true,
    },
  });

  container.appendChild(cubic);

  const result = cubic.animate(
    [
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([300, 200]), curveOffset: 30 },
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([450, 350]), curveOffset: 60 },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeCubic.times = [0, 500, 1000];
