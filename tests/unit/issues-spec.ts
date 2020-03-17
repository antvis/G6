import G6, { Graph, TreeGraph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('dragenter dragleave', () => {
  const data = {
    nodes: [{
      id: 'node1',
      x: 100,
      y: 100
    }, {
      id: 'node2',
      x: 200,
      y: 100
    }],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node']
    }
  });
  graph.data(data);
  graph.render();
  it('dragenter', () => {
    graph.on('node:dragenter', e => {
      console.log('dragenter')
    });
    graph.on('node:dragleave', e => {
      console.log('dragleave')
    });
    graph.on('node:mouseenter', e => {
      console.log('mouseenter')
    });
    graph.on('node:mouseleave', e => {
      console.log('mouseleave')
    });
    graph.on('node:dragover', e => {
      console.log('dragover')
    });
    graph.destroy();
  });
});

// closes: #1026
describe('empty data array + fitview', () => {
  const data = {
    nodes: [],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    fitView: true
  });
  graph.data(data);
  it('empty data array + fitview', () => {
    graph.render();
  });
});



// closes: #1301
describe('change data with rect node', () => {
  const data = {
    nodes: [{
      name: "source",
      id: "source",
      label: "source",
      type: 'rect',
      x: 100,
      y: 100,
      //size: [60, 60],
      style: {
        width: 60,
        height: 20,
      }
    }],
    edges: []
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500
  });
  graph.data(data);
  it('change data', () => {
    graph.render();
    graph.changeData(data);
  });
});


describe('cubic with layout', () => {
  const data = {
    nodes: [
      {
        id: '1',
        label: '冲压',
        degree: 1,
        // x: 0,
        // y: 0
        // x: 100,
        // y: 300
      },
      {
        id: '2',
        label: '电镀',
        degree: 2,
        // x: 0,
        // y: 0
        // x: 600,
        // y: 300
      }
    ],
    edges: [
      {
        source: '1',
        target: '2',
      }
    ]
  };
  const dashArray = [
    [0, 1],
    [0, 2],
    [1, 2],
    [0, 1, 1, 2],
    [0, 2, 1, 2],
    [1, 2, 1, 2],
    [2, 2, 1, 2],
    [3, 2, 1, 2],
    [4, 2, 1, 2]
  ];
  
  const lineDash = [4, 2, 1, 2];
  const interval = 9; // lineDash 的和
  G6.registerEdge('line-dash', {
    afterDraw(cfg, group) {
      // 获得该边的第一个图形，这里是边的 path
      const shape = group.get('children')[0];
      // 获得边的 path 的总长度
      const length = shape.getTotalLength();
      
      let totalArray = [];
      // 计算出整条线的 lineDash
      for (let i = 0; i < length; i += interval) {
        totalArray = totalArray.concat(lineDash);
      }
  
      let index = 0;
      // 边 path 图形的动画
      shape.animate((ratio) => {
        const cfg = {
            lineDash: dashArray[index].concat(totalArray)
          };
        // 每次移动 1
        index = (index + 1) % interval;
        // 返回需要修改的参数集，这里只修改了 lineDash
        return cfg;
      }, {
        repeat: true,
        duration: 3000
      });  // 一次动画的时长为 3000
    }
  }, 'cubic');   // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    //animate: true,
    defaultEdge: {
      size: 2,
      type: 'line-dash',//'line',//'line-dash',//
      color: '#e2e2e2'
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      nodesep: 30,
      //controlPoints: false
      // ranksep: 100
    }
  });
  it('change data', () => {
    graph.data(data);
    graph.render();
  });
});


