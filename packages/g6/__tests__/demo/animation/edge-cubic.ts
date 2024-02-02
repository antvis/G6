import { Cubic } from '../../../src/elements/edges';
import type { AnimationTestCase } from '../types';

export const edgeCubic: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const cubic = new Cubic({
    style: {
      sourcePoint: [100, 50],
      targetPoint: [300, 50],
      lineWidth: 2,
      stroke: '#1890FF',
      labelText: 'cubic-edge',
      labelFontSize: 12,
      endArrow: true,
    },
  });

  canvas.appendChild(cubic);

  const result = cubic.animate(
    [
      { sourcePoint: [100, 150], targetPoint: [300, 200], lineWidth: 2, curveOffset: 30 },
      { sourcePoint: [100, 150], targetPoint: [450, 350], lineWidth: 8, curveOffset: 60 },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

edgeCubic.times = [0, 500, 1000];
