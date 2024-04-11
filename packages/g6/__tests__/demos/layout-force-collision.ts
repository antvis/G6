// ref: https://observablehq.com/@d3/collision-detection
import type { IPointerEvent, RuntimeContext } from '@/src';
import { BaseBehavior, ExtensionCategory, Graph, register } from '@/src';
import type { D3Force3DLayout, D3ForceLayout } from '@antv/layout';

export const layoutForceCollision: TestCase = async (context) => {
  const width = 500;

  class CollisionElement extends BaseBehavior<{}> {
    constructor(context: RuntimeContext) {
      super(context, {});
      this.onPointerMove = this.onPointerMove.bind(this);
      this.bindEvents();
    }

    bindEvents() {
      this.context.graph.on('pointermove', this.onPointerMove);
    }

    onPointerMove(event: IPointerEvent) {
      const pos = this.context.graph.getCanvasByClient([event.client.x, event.client.y]);
      (
        this.context.layout?.getLayoutInstance().find((layout) => ['d3-force', 'd3-force-3d'].includes(layout?.id)) as
          | D3Force3DLayout
          | D3ForceLayout
      ).setFixedPosition(0, [...pos]);
    }
  }

  register(ExtensionCategory.BEHAVIOR, 'collision-element', CollisionElement);

  const graph = new Graph({
    ...context,
    data: getData(500),
    layout: {
      type: 'd3force',
      alphaTarget: 0.3,
      velocityDecay: 0.1,
      x: {
        strength: 0.01,
      },
      y: {
        strength: 0.01,
      },
      collide: {
        radius: (d) => {
          return d.data.size / 2;
        },
        iterations: 3,
      },
      manyBody: {
        strength: (d, i) => (i ? 0 : (-width * 2) / 3),
      },
      link: false,
    },
    node: {
      style: {
        size: (d, i) => (i === 0 ? 0 : (d.data!.r as number) * 4),
      },
      palette: {
        color: 'tableau',
        type: 'group',
        field: (d) => d.data!.group as string,
      },
    },
    behaviors: ['collision-element'],
  });

  await graph.render();
  return graph;
};

function getData(width: number, size = 200) {
  const k = width / 200;
  const r = randomUniform(k, k * 4);
  const n = 4;
  return {
    nodes: Array.from({ length: size }, (_, i) => ({ id: i, data: { r: r(), group: i && (i % n) + 1 } })),
    edges: [],
  };
}

// d3-random
function randomUniform(min: number, max: number) {
  min = min == null ? 0 : +min;
  max = max == null ? 1 : +max;
  if (arguments.length === 1) (max = min), (min = 0);
  else max -= min;
  return function () {
    return Math.random() * max + min;
  };
}
