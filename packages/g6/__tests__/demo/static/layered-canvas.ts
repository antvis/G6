import { Circle, Rect } from '@antv/g';
import type { StaticTestCase } from '../types';

export const layeredCanvas: StaticTestCase = async (context) => {
  const { canvas } = context;

  const circle = new Circle({
    style: {
      cx: 50,
      cy: 50,
      r: 25,
      fill: 'pink',
    },
  });

  const rect = new Rect({
    style: {
      x: 100,
      y: 100,
      width: 50,
      height: 50,
      fill: 'purple',
    },
  });

  await canvas.init();

  canvas.appendChild(circle);
  canvas.appendChild(rect);

  return;
};
