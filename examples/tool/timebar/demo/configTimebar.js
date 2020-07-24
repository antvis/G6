import G6 from '@antv/g6';
import insertCss from 'insert-css';

insertCss(`
  #g6-component-timebar {
    top: 540px;
    left: 10px;
  }
`);

const data = {
  nodes: [],
  edges: [],
};

for(let i = 0; i < 100; i++) {
  const id = `node-${i}`
  data.nodes.push({
    id,
    label: `node${i}`,
    date: `2020${i}`,
    value: Math.round(Math.random() * 300)
  })

  data.edges.push({
    source: `node-${Math.round(Math.random() * 90)}`,
    target: `node-${Math.round(Math.random() * 90)}`
  })
}

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;

const timeBarData = []

for(let i = 0; i < 100; i++) {
  timeBarData.push({
    date: `2020${i}`,
    value: Math.round(Math.random() * 300)
  })
}

const timebar = new G6.TimeBar({
  width: 600,
  timebar: {
    width: 600,
    backgroundStyle: {
      fill: '#08979c',
      opacity: 0.3
    },
    foregroundStyle: {
      fill: '#40a9ff',
      opacity: 0.4
    },
    trend: {
      data: timeBarData,
      isArea: false,
      smooth: true,
      lineStyle: {
        stroke: '#9254de'
      }
    }
  },
  rangeChange: (graph, min, max) => {
    // 拿到 Graph 实例和 timebar 上范围，自己可以控制图上的渲染逻辑
    console.log(graph, min, max)
  }
});

const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  linkCenter: true,
  plugins: [timebar],
  defaultNode: {
    size: 40,
    type: 'circle',
    style: {
      fill: '#DEE9FF',
      stroke: '#5B8FF9',
    },
  },
  defaultEdge: {
    style: {
      stroke: '#b5b5b5',
      lineAppendWidth: 3,
    },
  },
  modes: {
    default: [
      'drag-node'
    ],
  },
});
graph.data(data);
graph.render();
