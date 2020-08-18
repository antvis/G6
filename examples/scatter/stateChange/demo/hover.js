import G6 from '@antv/g6';

const nodes = [];
const edges = [];

// Center node
const centerNode = {
  id: 'center',
  x: 500,
  y: 300,
  type: 'center-node',
  size: 20,
};
nodes.push(centerNode);
// Add 4 nodes on the left
for (let i = 0; i < 4; i++) {
  const id = 'left' + i;
  nodes.push({
    id,
    x: 250,
    y: (i + 1) * 100 + 50,
    type: 'leaf-node',
  });
  edges.push({ source: id, target: 'center', type: 'can-running' });
}
// Add 6 nodes on the right
for (let i = 0; i < 6; i++) {
  const id = 'right' + i;
  nodes.push({
    id,
    x: 750,
    y: i * 100 + 50,
    type: 'leaf-node',
  });
  edges.push({ source: 'center', target: id, type: 'can-running' });
}

G6.registerNode(
  'leaf-node',
  {
    afterDraw(cfg, group) {
      group.addShape('circle', {
        attrs: {
          x: 0,
          y: 0,
          r: 5,
          fill: cfg.color || '#5B8FF9',
        },
        name: 'circle-shape',
      });
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
      ];
    },
  },
  'circle',
);

G6.registerNode(
  'center-node',
  {
    afterDraw(cfg, group) {
      const r = cfg.size / 2;
      group.addShape('circle', {
        zIndex: -3,
        attrs: {
          x: 0,
          y: 0,
          r: r + 10,
          fill: 'gray',
          opacity: 0.4,
        },
        name: 'circle-shape1',
      });
      group.addShape('circle', {
        zIndex: -2,
        attrs: {
          x: 0,
          y: 0,
          r: r + 20,
          fill: 'gray',
          opacity: 0.2,
        },
        name: 'circle-shape2',
      });
      group.sort();
    },
    getAnchorPoints() {
      return [
        [0, 0.5],
        [1, 0.5],
      ];
    },
  },
  'circle',
);

// lineDash array
const lineDash = [4, 2, 1, 2];

G6.registerEdge(
  'can-running',
  {
    setState(name, value, item) {
      const shape = item.get('keyShape');
      if (name === 'running') {
        if (value) {
          let index = 0;
          shape.animate(
            () => {
              index++;
              if (index > 9) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // return the params for this frame
              return res;
            },
            {
              repeat: true,
              duration: 3000,
            },
          );
        } else {
          shape.stopAnimate();
          shape.attr('lineDash', null);
        }
      }
    },
  },
  'cubic-horizontal',
);

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  defaultNode: {
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
    },
  },
});
graph.data({ nodes, edges });
graph.render();
graph.fitView();

// set hover state
graph.on('node:mouseenter', (ev) => {
  const node = ev.item;
  const edges = node.getEdges();
  edges.forEach((edge) => graph.setItemState(edge, 'running', true));
});
graph.on('node:mouseleave', (ev) => {
  const node = ev.item;
  const edges = node.getEdges();
  edges.forEach((edge) => graph.setItemState(edge, 'running', false));
});
