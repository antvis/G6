import { Circle, ExtensionCategory, Graph, Line, register } from '@antv/g6';

export const animationElementState: TestCase = async (context) => {
  class BreathingCircle extends Circle {
    onCreate() {
      this.shapeMap.halo.animate([{ lineWidth: 5 }, { lineWidth: 10 }], {
        duration: 1000,
        iterations: Infinity,
        direction: 'alternate',
      });
    }
  }

  class FlyLine extends Line {
    onCreate() {
      this.shapeMap.key.animate([{ lineDashOffset: -20 }, { lineDashOffset: 0 }], {
        duration: 500,
        iterations: Infinity,
      });
    }
  }

  register(ExtensionCategory.NODE, 'breathing-circle', BreathingCircle);
  register(ExtensionCategory.EDGE, 'fly-line', FlyLine);

  const graph = new Graph({
    ...context,
    data: {
      nodes: [
        { id: 'node-1', style: { x: 50, y: 50 } },
        { id: 'node-2', style: { x: 200, y: 50 } },
        { id: 'node-3', style: { x: 125, y: 150 } },
      ],
      edges: [
        { source: 'node-1', target: 'node-2', style: {} },
        { source: 'node-2', target: 'node-3', style: {} },
        { source: 'node-3', target: 'node-1', style: {} },
      ],
    },
    node: {
      type: 'breathing-circle',
      style: {
        halo: true,
        haloLineWidth: 5,
      },
    },
    edge: {
      type: 'fly-line',
      style: {
        lineDash: [10, 10],
      },
    },
    behaviors: ['drag-element'],
  });

  await graph.draw();

  animationElementState.form = (panel) => [
    panel.add(
      {
        Animate: () => {
          graph.translateElementBy('node-2', [0, 50]);
        },
      },
      'Animate',
    ),
  ];

  return graph;
};
