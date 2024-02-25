import { Badge } from '@/src/elements/shapes';
import type { StaticTestCase } from '../types';

export const shapeBadge: StaticTestCase = async (context) => {
  const { canvas } = context;

  const badge1 = new Badge({
    style: {
      text: 'Important',
      x: 100,
      y: 50,
      fill: 'white',
      textBaseline: 'top',
      backgroundFill: '#e66c5b',
    },
  });

  const badge2 = new Badge({
    style: {
      text: 'A',
      x: 100,
      y: 100,
      padding: [5, 10],
      fill: 'white',
      textBaseline: 'top',
      backgroundFill: '#8291b2',
    },
  });

  const badge3 = new Badge({
    style: {
      x: 100,
      y: 150,
      text: 'Notice',
      fontSize: 10,
      padding: [3, 8],
      fill: 'white',
      textBaseline: 'top',
      backgroundFill: '#ff8c00',
    },
  });

  const badge4 = new Badge({
    style: {
      text: 'Important',
      x: 100,
      y: 200,
      fill: 'white',
      textBaseline: 'top',
      backgroundFill: '#e66c5b',
    },
  });

  canvas.appendChild(badge1);
  canvas.appendChild(badge2);
  canvas.appendChild(badge3);
  canvas.appendChild(badge4);

  badge4.update({
    text: 'Update Badge Text',
    backgroundFill: 'pink',
    opacity: 0.4,
    stroke: 'black',
  });
};
