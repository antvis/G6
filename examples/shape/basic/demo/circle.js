import G6 from '@antv/g6';

const nodes = [];
for (let i = 0; i < 5; i++) {
  nodes.push({
    id: `node-${i}`,
    label: `label-${i}`,
    x: Math.random() * 650,
    y: Math.random() * 550
  });
}
const data = {
  nodes
};

const graph = new G6.Graph({
  container: 'container',
  width: 800,
  height: 600,
  defaultNode: {
    shape: 'circle',
    size: [ 60, 30 ],
    color: 'green',
    style: {
      // fill: 'red',
      // stroke: '#eaff8f',
      lineWidth: 5
    },
    labelCfg: {
      style: {
        fill: '#9254de',
        fontSize: 18
      }
    },
    linkPoints: {
      top: true,
      bottom: true,
      left: true,
      right: true,
      size: 5,
      fill: '#fff'
    }
  },
  nodeStateStyles: {
    hover: {
      fill: '#d3adf7'
    }
  },
  modes: {
    default: [ 'drag-canvas', 'drag-node', {
      type: 'brush-select',
      trigger: 'ctrl'
    }]
  }
});

graph.data(data);
graph.render();
