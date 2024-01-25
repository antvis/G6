import { Canvas } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { SimpleNode } from '../../../../src/plugin/element/node/simple';
import type { TestCaseContext } from '../../interface';

export default ({ container, width, height }: TestCaseContext) => {
  const canvas = new Canvas({
    container,
    width,
    height,
    renderer: new Renderer(),
  });

  const graph: any = null;

  const node = canvas.appendChild(
    new SimpleNode({
      style: {
        x: 100,
        y: 100,
        size: 20,
        fill: 'red',
        graph,
      },
    }),
  );

  node.update({ fill: 'green', x: 50 });
};
