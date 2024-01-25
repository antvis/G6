import { Canvas, Group } from '@antv/g';
import { Renderer } from '@antv/g-canvas';
import { SimpleNode } from '../../../src/plugin/element/node/simple';
import { NodeManager } from '../../../src/runtime/controller/element/manager/node';
import type { TestCaseContext } from '../interface';

export default ({ container, width, height }: TestCaseContext) => {
  const canvas = new Canvas({
    container,
    width,
    height,
    renderer: new Renderer(),
  });

  class Graph {}

  const graph = new Graph() as any;

  const group = new Group();

  const data = {
    id: 'node-1',
    style: {
      type: 'simple-node',
      x: 100,
      y: 100,
    },
    data: {
      value: 100,
      category: 'A',
    },
  };

  const shapes = {
    'simple-node': SimpleNode,
  };

  const node = new NodeManager({
    graph,
    container: group,
    data,
    shapes,
    palette: {
      keyShapeFill: 'pink',
    },
    encoder: {
      style: {
        keyShapeFill: '#a92262',
        size: (data) => data.data.value / 2,
      },
      state: {
        active: {
          lineWidth: 5,
          stroke: 'pink',
        },
      },
    },
    states: ['active'],
  });

  canvas.appendChild(group);

  // node.destroy();

  console.log(group);
};
