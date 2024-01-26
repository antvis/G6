import { Label } from '../../../src/elements/shapes';
import type { StaticTestCase } from '../types';

export const shapeLabel: StaticTestCase = async (context) => {
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

  const label4 = new Label({
    style: {
      text: 'Long Text Long Text Long Text Long Text Long Text Long Text Long Text Long Text...',
      x: 50,
      y: 350,
      fill: '#e45454',
      wordWrap: true,
      maxLines: 2,
      cursor: 'pointer',
      wordWrapWidth: 250,
      textOverflow: '...',
      textBaseline: 'middle',
      backgroundFill: '#fce9e9',
      backgroundLineCap: 'butt',
      backgroundLineDash: [5, 5],
      backgroundStroke: '#e45454',
    },
  });

  await canvas.init();

  canvas.appendChild(label1);
  canvas.appendChild(label2);
  canvas.appendChild(label3);
  canvas.appendChild(label4);
};
