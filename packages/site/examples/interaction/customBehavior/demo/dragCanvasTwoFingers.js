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
    if (ev.ctrlKey) {
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      this.graph.zoomTo(ratio, {
        x: ev.canvas.x,
        y: ev.canvas.y,
      });
    } else {
      const x = ev.deltaX || ev.movementX || 0;
      let y = ev.deltaY || ev.movementY || 0;
      if (!y && navigator.userAgent.indexOf('Firefox') > -1) y = (-ev.wheelDelta * 125) / 3;
      this.graph.translate({ dx: x, dy: y });
    }
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
  transforms: ['transform-v4-data'],
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

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
