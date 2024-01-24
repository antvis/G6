import { Badge } from '../../../src/shape';
import { createGCanvas } from '../../integration/utils/createGCanvas';
import { TestCaseContext } from '../interface';

export default ({ container, renderer, width, height }: Required<TestCaseContext>) => {
  const canvas = createGCanvas({ container, renderer, width, height });

  canvas.appendChild(
    new Badge({
      style: {
        text: 'Important',
        x: 10,
        y: 10,
        padding: [5, 10],
        fill: 'white',
        textBaseline: 'top',
        backgroundFill: '#e66c5b',
      },
    }),
  );

  canvas.appendChild(
    new Badge({
      style: {
        text: 'A',
        x: 70,
        y: 10,
        padding: [5, 10],
        fill: 'white',
        textBaseline: 'top',
        backgroundFill: '#8291b2',
      },
    }),
  );

  canvas.appendChild(
    new Badge({
      style: {
        x: 10,
        y: 30,
        text: 'Notice',
        fontSize: 10,
        padding: [3, 8],
        fill: 'white',
        textBaseline: 'top',
        backgroundFill: '#ff8c00',
      },
    }),
  );

  const updateBadge = canvas.appendChild(
    new Badge({
      style: {
        text: 'Important',
        x: 10,
        y: 60,
        padding: [5, 10],
        fill: 'white',
        textBaseline: 'top',
        backgroundFill: '#e66c5b',
      },
    }),
  );

  setTimeout(() => {
    updateBadge.update({
      text: 'Update Badge Text',
      backgroundFill: '#e45454',
    });
  }, 200);

  const animateBadge = canvas.appendChild(
    new Badge({
      style: {
        text: 'Important',
        x: 100,
        y: 60,
        padding: [5, 10],
        fill: 'white',
        textBaseline: 'top',
        backgroundFill: '#e66c5b',
      },
    }),
  );

  animateBadge.animate(
    [
      { x: 100, backgroundFill: '#e66c5b' },
      { x: 200, backgroundFill: '#ff8c00' },
    ],
    {
      duration: 1000,
      easing: 'easeLinear',
      fill: 'both',
    },
  );
};
