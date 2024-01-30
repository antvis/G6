import { Label } from '../../../src/elements/shapes/label';
import type { AnimationTestCase } from '../types';

export const shapeLabel: AnimationTestCase = async (context) => {
  const { canvas } = context;

  const label = new Label({
    style: {
      text: 'label text',
      fontSize: 20,
      x: 50,
      y: 50,
      stroke: 'pink',
      fontFamily: 'Arial',
      fill: 'transparent',
      backgroundLineWidth: 2,
      backgroundStroke: 'pink',
    },
  });

  await canvas.init();

  canvas.appendChild(label);

  const result = label.animate(
    [
      { x: 50, y: 50 },
      { x: 200, y: 200 },
    ],
    { duration: 1000, fill: 'both' },
  );

  return result;
};

shapeLabel.times = [0, 1000];
