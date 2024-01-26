import { Label } from '../../../src/elements/shapes';
import type { StaticTestCase } from '../types';

export const labelShape: StaticTestCase = async (context) => {
  const { canvas } = context;

  const label1 = new Label({
    style: {
      text: 'label1 text',
      fontSize: 14,
      fill: 'black',
      x: 50,
      y: 50,
    },
  });

  const label2 = new Label({
    style: {
      text: 'label2 text',
      fontSize: 20,
      x: 50,
      y: 150,
      stroke: 'pink',
      backgroundLineWidth: 2,
      backgroundStroke: 'pink',
    },
  });

  const label3 = new Label({
    style: {
      text: 'label3 text',
      fontSize: 32,
      x: 50,
      y: 250,
      stroke: 'pink',
      fill: 'red',
      backgroundLineWidth: 2,
      backgroundOpacity: 0.5,
      backgroundStroke: 'gold',
    },
  });

  await canvas.init();

  canvas.appendChild(label1);
  canvas.appendChild(label2);
  canvas.appendChild(label3);
};
