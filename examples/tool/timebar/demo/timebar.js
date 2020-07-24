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
    trend: {
      data: timeBarData,
      isArea: false,
      smooth: true,
    }
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
