import G6 from '@antv/g6';

/**
 * This demo shows how to custom a behavior to allow drag and zoom canvas with two fingers on touchpad and wheel
 * By Shiwu
 */
G6.registerBehavior('double-finger-drag-canvas', {
  getEvents: function getEvents() {
    return {
      wheel: 'onWheel',
    };
  },

  onWheel: function onWheel(ev) {
    if (ev.ctrlKey) {
      const canvas = graph.get('canvas');
      const point = canvas.getPointByClient(ev.clientX, ev.clientY);
      let ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y,
      });
    } else {
      const x = ev.deltaX || ev.movementX;
      const y = ev.deltaY || ev.movementY;
      graph.translate(-x, -y);
    }
    ev.preventDefault();
  },
});

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['double-finger-drag-canvas'],
  },
  layout: {
    type: 'force',
  },
});

graph.get('canvas').set('localRefresh', false);

fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json')
  .then((res) => res.json())
  .then((data) => {
    graph.data(data);
    graph.render();
  });
