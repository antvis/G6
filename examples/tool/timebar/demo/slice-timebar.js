import G6 from '@antv/g6';
import insertCss from 'insert-css';

// 我们用 insert-css 演示引入自定义样式
// 推荐将样式添加到自己的样式文件中
// 若拷贝官方代码，别忘了 npm install insert-css
insertCss(`
  .g6-component-timebar {
    top: 450px;
    left: 100px;
  }
`);

const data = {
  nodes: [],
  edges: [],
};

for (let i = 0; i < 100; i++) {
  const id = `node-${i}`;
  data.nodes.push({
    id,
    date: `2020${i}`,
    value: Math.round(Math.random() * 300),
  });

  data.edges.push({
    source: `node-${Math.round(Math.random() * 90)}`,
    target: `node-${Math.round(Math.random() * 90)}`,
  });
}

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const timeBarData = [];

for (let i = 0; i < 100; i++) {
  timeBarData.push({
    date: `2020${i}`,
    value: Math.round(Math.random() * 300),
  });
}

const nodeSize = 20;

let count = 0;
  const timebar = new G6.TimeBar({
    x: 0,
    y: 0,
    width: 500,
    height: 150,
    padding: 10,
    type: 'slice',
    slice: {
      data: timeBarData,
      width: 500,
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
