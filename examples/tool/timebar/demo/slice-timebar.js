import G6 from '@antv/g6';

const data = {
  nodes: [],
  edges: [],
};

for (let i = 1; i < 60; i++) {
  const id = `node-${i}`;
  const month = i < 30 ? '01' : '02';
  const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
  data.nodes.push({
    id,
    date: parseInt(`2020${month}${day}`),
    value: Math.round(Math.random() * 300),
    label: parseInt(`2020${i}`),
  });

  data.edges.push({
    source: `node-${Math.round(Math.random() * 60)}`,
    target: `node-${Math.round(Math.random() * 60)}`,
  });
}

const timeBarData = [];

for (let i = 1; i < 60; i++) {
  const month = i < 30 ? '01' : '02';
  const day = i % 30 < 10 ? `0${i % 30}` : `${i % 30}`;
  timeBarData.push({
    date: parseInt(`2020${month}${day}`),
    value: Math.round(Math.random() * 300),
  });
}

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const nodeSize = 20;

let count = 0;
const timebar = new G6.TimeBar({
  x: 0,
  y: 0,
  width: width,
  height: 150,
  padding: 10,
  type: 'slice',
  slice: {
    data: timeBarData,
    width: width,
    height: 42,
    padding: 2,
    tickLabelFormatter: d => {
      count++;
      const dateStr = `${d.date}`
      if ((count - 1) % 10 === 0) {
        return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
      }
      return false;
    },
    tooltipFomatter: d => {
      const dateStr = `${d}`
      return `${dateStr.substr(0, 4)}-${dateStr.substr(4, 2)}-${dateStr.substr(6, 2)}`;
    }
  },
});

// constrained the layout inside the area
const constrainBox = { x: 10, y: 10, width: 580, height: 450 };

const onTick = () => {
  let minx = 99999999;
  let maxx = -99999999;
  let miny = 99999999;
  let maxy = -99999999;
  let maxsize = -9999999;
  data.nodes.forEach((node) => {
    if (minx > node.x) {
      minx = node.x;
    }
    if (maxx < node.x) {
      maxx = node.x;
    }
    if (miny > node.y) {
      miny = node.y;
    }
    if (maxy < node.y) {
      maxy = node.y;
    }
  });
  const scalex = (constrainBox.width - nodeSize / 2) / (maxx - minx);
  const scaley = (constrainBox.height - nodeSize / 2) / (maxy - miny);
  data.nodes.forEach((node) => {
    node.x = (node.x - minx) * scalex + constrainBox.x;
    node.y = (node.y - miny) * scaley + constrainBox.y;
  });
};

const graph = new G6.Graph({
  container: 'container',
  width,
  height: height - 100,
  linkCenter: true,
  plugins: [timebar],
  layout: {
    type: 'force',
    preventOverlap: true,
    onTick,
  },
  defaultNode: {
    size: nodeSize,
    type: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  modes: {
    default: ['drag-node'],
  },
});
graph.data(data);
graph.render();
