import { Group } from '@antv/g';
import type { CircleStyleProps, ElementDatum, IElementEvent } from '@antv/g6';
import { Circle, ExtensionCategory, Graph, register } from '@antv/g6';

class CustomNode extends Circle {
  drawOperatorBtns(attributes: Required<CircleStyleProps>, container: Group) {
    this.upsert(
      'custom-shape',
      'text',
      {
        x: 0,
        y: 0,
        fontSize: 30,
        text: '+',
        fill: '#000',
        cursor: 'pointer',
      },
      container,
    );
  }
  render(attributes = this.parsedAttributes, container: Group) {
    super.render(attributes, container);
    this.drawOperatorBtns(attributes, container);
  }
}

register(ExtensionCategory.NODE, 'custom-node', CustomNode);

export const pluginTooltipWithCustomNode: TestCase = async (context) => {
  const graph = new Graph({
    container: 'container',
    data: {
      nodes: [
        {
          id: 'Jack',
          data: {},
          style: {
            x: 200,
            y: 200,
          },
        },
      ],
    },
    node: {
      type: 'custom-node',
      style: {
        size: 250,
      },
    },
    plugins: [
      {
        type: 'tooltip',
        trigger: 'hover',
        enable: (e: IElementEvent, items: ElementDatum[]) => {
          return e.originalTarget.className === 'custom-shape';
        },
      },
    ],
    behaviors: ['drag-element'],
  });

  graph.render();
  return graph;
};
