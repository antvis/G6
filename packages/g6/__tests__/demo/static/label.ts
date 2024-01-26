import { Label } from '../../../src/elements/shapes/label';
import type { StaticTestCase } from '../types';

export const labelShape: StaticTestCase = async (context) => {
  const { canvas } = context;

  const label = new Label({
    style: {
      text: 'label text',
      fontSize: 20,
      x: 50,
      y: 50,
      stroke: 'pink',
      backgroundLineWidth: 2,
      backgroundStroke: 'pink',
    },
  });

  await canvas.init();

  canvas.appendChild(label);
};
