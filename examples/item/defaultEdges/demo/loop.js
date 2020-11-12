import G6 from '@antv/g6';

const data = {
  nodes: [
    {
      id: '0',
      x: 150,
      y: 150,
    },
    {
      id: '1',
      x: 350,
      y: 150,
    },
  ],
  edges: [
    // 内置 loop
    {
      source: '0',
      target: '0',
    },
    {
      source: '1',
      target: '1',
    },
  ],
};

const width = document.getElementById('container').scrollWidth;
const height = document.getElementById('container').scrollHeight || 500;
const graph = new G6.Graph({
  container: 'container',
  width,
  height,
  // translate the graph to align the canvas's center
  fitCenter: true,
  modes: {
    // 支持的 behavior
    default: ['drag-node'],
  },
  defaultEdge: {
    type: 'loop',
    /* you can configure the global edge style as following lines */
    style: {
      // stroke: '#F6BD16',
      endArrow: {
        path: 'M 0,0 L 20,10 L 20,-10 Z',
        fill: '#eee',
      },
    },
    // 更多关于 loop 的配置请参考http://antv.alipay.com/zh/docs/manual/middle/elements/edges/loop/#%E8%87%AA%E7%8E%AF%E7%89%B9%E6%AE%8A%E9%85%8D%E7%BD%AE-loopcfg
    loopCfg: {
      position: 'top',
    },
  },
  /* styles for different states, there are built-in styles for states: active, inactive, selected, highlight, disable */
  // edgeStateStyles: {
  //   // edge style of active state
  //   active: {
  //     opacity: 0.5,
  //     stroke: '#f00'
  //   },
  //   // edge style of selected state
  //   selected: {
  //     stroke: '#ff0'
  //     lineWidth: 3,
  //   },
  // },
});

// 需要等 G 4.0 局部渲染完善后，就不用临时关闭了
const canvas = graph.get('canvas');
canvas.set('localRefresh', false);

graph.data(data);
graph.render();


graph.on('edge:mouseenter', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', true);
});

graph.on('edge:mouseleave', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'active', false);
});

graph.on('edge:click', (evt) => {
  const { item } = evt;
  graph.setItemState(item, 'selected', true);
});
graph.on('canvas:click', (evt) => {
  graph.getEdges().forEach(edge => {
    graph.clearItemStates(edge);
  });
});
