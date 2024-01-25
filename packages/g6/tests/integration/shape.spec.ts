import { SimpleNode } from '../../src/plugin/item/node/simple';
import { createCanvas } from './utils/canvas';

describe('shape', () => {
  it('simple node', () => {
    const canvas = createCanvas();

    const node = new SimpleNode({
      style: {
        x: 100,
        y: 100,
        size: 20,
        fill: 'red',
      },
    });

    canvas.appendChild(node);
  });
});
