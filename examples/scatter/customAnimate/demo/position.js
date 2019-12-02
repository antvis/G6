import G6 from '@antv/g6';

const r = 50;
const radius = Math.PI;

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  animate: true,
  animateCfg: {
    duration: 1000,
    onFrame(node, ratio, toAttrs, fromAttrs) {
      const current = radius * ratio;
      let x = fromAttrs.x;
      let y = fromAttrs.y;
      if (fromAttrs.x > toAttrs.x) {
        x = x - r + r * Math.cos(current);
        y += r * Math.sin(current);
      } else {
        x = x + r - r * Math.cos(current);
        y -= r * Math.sin(current);
      }
      return { x, y };
    }
  }
});

// 加入两个节点
const node1 = graph.addItem('node', {
  id: 'node1',
  x: 100,
  y: 100,
  shape: 'circle',
  style: { fill: '#5B8FF9', lineWidth: 0 }
});
const node2 = graph.addItem('node', {
  id: 'node2',
  x: 200,
  y: 100,
  shape: 'circle',
  style: { fill: '#5AD8A6', lineWidth: 0 }
});

// 循环动画
let count = 0;
setInterval(() => {
  if (count % 2 === 0) {
    node1.get('model').x = 200;
    node2.get('model').x = 100;
  } else {
    node1.get('model').x = 100;
    node2.get('model').x = 200;
  }
  count++;
  graph.refresh();
}, 1000);
