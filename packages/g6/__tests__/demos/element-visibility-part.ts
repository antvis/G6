import { Group, Rect } from '@antv/g';
import { BaseNodeStyleProps, Circle, ExtensionCategory, Graph, register, setVisibility } from '@antv/g6';

interface CustomCircleStyleProps extends BaseNodeStyleProps {
  show: boolean;
}

class CustomCircle extends Circle {
  public renderPart(attributes: Required<CustomCircleStyleProps>, container: Group) {
    const part = this.upsert('part', Rect, { width: 10, height: 10, stroke: 'red', lineWidth: 2 }, container)!;
    this.upsert('part-rect', Rect, { x: 1, y: 1, width: 8, height: 8, fill: 'pink' }, part);

    setVisibility(part, attributes.show ? 'visible' : 'hidden');
  }

  public render(attributes: Required<CustomCircleStyleProps>, container: Group): void {
    super.render();
    this.renderPart(attributes, container);
  }
}

export const elementVisibilityPart: TestCase = async (context) => {
  register(ExtensionCategory.NODE, 'custom-circle', CustomCircle, true);

  const graph = new Graph({
    ...context,
    data: {
      nodes: [{ id: 'node-1', style: { x: 100, y: 100, show: true } }],
    },
    node: {
      type: 'custom-circle',
      style: {
        size: 20,
      },
    },
  });

  await graph.draw();

  elementVisibilityPart.form = (panel) => {
    const config = {
      node: true,
      part: true,
    };
    return [
      panel.add(config, 'node').onChange((show: boolean) => {
        graph.updateNodeData([{ id: 'node-1', style: { visibility: show ? 'visible' : 'hidden' } }]);
        graph.draw();
      }),
      panel.add(config, 'part').onChange((show: boolean) => {
        graph.updateNodeData([{ id: 'node-1', style: { show } }]);
        graph.draw();
      }),
    ];
  };

  return graph;
};
