import { BaseBehavior, ExtensionCategory, Graph, invokeLayoutMethod, register } from '@antv/g6';

function getData(width, size = 200) {
  const k = width / 200;
  const r = randomUniform(k * 2, k * 8);
  const n = 4;
  return {
    nodes: Array.from({ length: size }, (_, i) => ({ id: `${i}`, data: { r: r(), group: i && (i % n) + 1 } })),
    edges: [],
  };
}

function randomUniform(min, max) {
  min = min == null ? 0 : +min;
  max = max == null ? 1 : +max;
  if (arguments.length === 1) (max = min), (min = 0);
  else max -= min;
  return function () {
    return Math.random() * max + min;
  };
}

class CollisionElement extends BaseBehavior {
  constructor(context) {
    super(context, {});
    this.onPointerMove = this.onPointerMove.bind(this);
    this.bindEvents();
  }

  bindEvents() {
    this.context.graph.on('pointermove', this.onPointerMove);
  }

  onPointerMove(event) {
    const pos = this.context.graph.getCanvasByClient([event.client.x, event.client.y]);
    const layoutInstance = this.context.layout
      ?.getLayoutInstance()
      .find((layout) => ['d3-force', 'd3-force-3d'].includes(layout?.id));

    if (layoutInstance) {
      invokeLayoutMethod(layoutInstance, 'setFixedPosition', '0', [...pos]);
    }
  }
}

register(ExtensionCategory.BEHAVIOR, 'collision-element', CollisionElement);

const container = document.getElementById('container');
const width = container.scrollWidth;

const graph = new Graph({
  container,
  data: getData(width),
  layout: {
    type: 'd3-force',
    alphaTarget: 0.3,
    velocityDecay: 0.1,
    x: {
      strength: 0.01,
    },
    y: {
      strength: 0.01,
    },
    collide: {
      radius: (d) => d.data.r,
      iterations: 3,
    },
    manyBody: {
      strength: (d, i) => (i ? 0 : (-width * 2) / 3),
    },
    link: false,
  },
  node: {
    style: {
      size: (d) => (d.id === '0' ? 0 : d.data.r * 2),
    },
    palette: {
      color: 'tableau',
      type: 'group',
      field: (d) => d.data.group,
    },
  },
  behaviors: ['collision-element'],
});

graph.render();
