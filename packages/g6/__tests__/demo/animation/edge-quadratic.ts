import { Quadratic } from '../../../src/elements/edges';
import type { AnimationTestCase } from '../types';

export const edgeQuadratic: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const quadratic = new Quadratic({
    style: {
      sourcePoint: [100, 50],
      targetPoint: [300, 50],
      lineWidth: 2,
      stroke: '#1890FF',
      labelText: 'quadratic-edge',
      labelFontSize: 12,
      endArrow: true,
    },
  });

  canvas.appendChild(quadratic);

  const result = quadratic.animate(
    [
      { sourcePoint: [100, 150], targetPoint: [300, 200] },
      { sourcePoint: [100, 150], targetPoint: [450, 350] },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeQuadratic.times = [0, 500, 1000];
