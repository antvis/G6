import { Graph, extend, Extensions } from '@antv/g6';

class TwoFingerScrollCanvas extends Extensions.BaseBehavior {
  getEvents() {
    this.graph.canvas
      .getContextService()
      .getDomElement()
      .addEventListener('wheel', (e) => {
        e.preventDefault();
      });
    return {
      wheel: this.onWheel,
    };
  }
  onWheel = (ev) => {
    const x = ev.deltaX || ev.movementX || 0;
    let y = ev.deltaY || ev.movementY || 0;
    if (!y && navigator.userAgent.indexOf('Firefox') > -1) y = (-ev.wheelDelta * 125) / 3;
    this.graph.translate({ dx: -x, dy: -y });
  };
}

const ExtGraph = extend(Graph, {
  behaviors: {
    'double-finger-drag-canvas': TwoFingerScrollCanvas,
  },
});

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;
const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  transforms: [
    {
      type: 'transform-v4-data',
      activeLifecycle: ['read'],
    },
  ],
  modes: {
    default: ['double-finger-drag-canvas'],
  },
  layout: {
    type: 'force',
    linkDistance: 50,
  },
});

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    graph.read(data);
  });

window.graph = graph;