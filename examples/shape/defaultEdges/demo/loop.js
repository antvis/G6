import G6 from '@antv/g6';

const data = {
  nodes: [{
    id: '0',
    x: 150,
    y: 150
  }, {
    id: '1',
    x: 350,
    y: 150
  }],
  edges: [
  // 内置 loop
    {
      source: '0',
      target: '0'
    },
    {
      source: '1',
      target: '1'
    }
  ]
};

const graph = new G6.Graph({
  container: 'container',
  width: 500,
  height: 500,
  defaultEdge: {
    shape: 'loop',
    style: {
      stroke: '#bae7ff',
      endArrow: {
        path: 'M 10,0 L -10,-10 L -10,10 Z',
        d: 10
      }
    },
    // 更多关于 loop 的配置请参考http://antv.alipay.com/zh/docs/manual/middle/elements/edges/loop/#%E8%87%AA%E7%8E%AF%E7%89%B9%E6%AE%8A%E9%85%8D%E7%BD%AE-loopcfg
    loopCfg: {
      position: 'top'
    }
  },
  modes: {
      // 支持的 behavior
    default: [ 'drag-node' ]
  }
});

graph.data(data);
graph.render();
