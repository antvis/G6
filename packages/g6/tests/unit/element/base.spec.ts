import { Circle } from '@antv/g';
import type { BaseElementOptions } from '../../../src/item/base';
import { Element } from '../../../src/item/base';
import { NodeOptions } from '../../../src/spec/element';
import { ElementRegistry } from '../../../src/types/element';
import type { ItemType } from '../../../src/types/item';

class EntityElement extends Element<BaseElementOptions> {
  protected type: ItemType = 'node';
}

class Graph {}

describe('Element', () => {
  it('init', () => {
    const data = {
      id: 'node-1',
      data: {
        value: 100,
      },
      style: {
        type: 'circle',
        fill: 'blue',
      },
    };
    const shapes: ElementRegistry = {
      circle: Circle,
    };
    const encoder: NodeOptions = {
      style: {
        r: (data) => data.data.value,
      },
      state: {
        hover: {
          lineWidth: 5,
          stroke: 'red',
        },
      },
    };
    const graph: any = new Graph();
    const element = new EntityElement({ graph, data, shapes, encoder });
  });
});
