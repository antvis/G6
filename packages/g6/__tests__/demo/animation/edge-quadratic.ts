import { Quadratic } from '@/src/elements/edges';
import { createEdgeNode } from '@@/utils';
import type { AnimationTestCase } from '../types';

export const edgeQuadratic: AnimationTestCase = async (context) => {
  const { container } = context;

  const quadratic = new Quadratic({
    style: {
      sourceNode: createEdgeNode([100, 50]),
      targetNode: createEdgeNode([300, 50]),
      lineWidth: 2,
      stroke: '#1890FF',
      labelText: 'quadratic-edge',
      labelFontSize: 12,
      endArrow: true,
    },
  });

  container.appendChild(quadratic);

  const result = quadratic.animate(
    [
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([300, 200]) },
      { sourceNode: createEdgeNode([100, 150]), targetNode: createEdgeNode([450, 350]) },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeQuadratic.times = [0, 500, 1000];
