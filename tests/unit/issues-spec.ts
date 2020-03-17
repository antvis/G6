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



// describe.only('residual when dragging', () => {
// G6.registerNode(
//     'devnode',
//     {
//         intersectBox: 'rect',
//         afterDraw(cfg, group) {
//         const { size } = cfg;
//         const width = size[0];
//         const height = size[1];

//         // 添加边框
//         if (cfg.nodeType === '0') {
//             group.addShape('path', {
//             attrs: {
//                 path: [
//                 ['M', 0 - width / 2, 0 - height / 2], // 上部顶点
//                 ['L', width / 2, 0 - height / 2], // 右侧顶点
//                 ['L', width / 2, height / 2], // 下部顶点
//                 ['L', -width / 2, height / 2], // 左侧顶点
//                 ['Z'], // 封闭
//                 ],
//                 lineDash: [8, 8], // 虚线
//                 stroke: '#eee', // 线的颜色
//                 lineWidth: 0.2, // 线的宽度
//                 // shadowColor: '#fff', // 阴影颜色
//                 // shadowBlur: 1, // 阴影模糊
//             },
//             });
//         }
//         // 添加节点类型图标
//         group.addShape('text', {
//             attrs: {
//             x: -width / 2 + 20,
//             y: -height / 2 + 14,
//             fontFamily: 'iconfont',
//             textAlign: 'center',
//             textBaseline: 'middle',
//             text: '\ue62d',
//             fontSize: 16,
//             fill: '#fff',
//             },
//         });
//         group.addShape('text', {
//             name: 'point-close',
//             attrs: {
//             x: width / 2,
//             y: 0,
//             fontFamily: 'iconfont',
//             textAlign: 'center',
//             textBaseline: 'middle',
//             text: '\ue633',
//             fontSize: 16,
//             fill: '#353E57',
//             cursor: 'pointer',
//             },
//         });
//         // 添加文字
//         group.addShape('text', {
//             attrs: {
//             x: -width / 2 + 34, // 居中
//             y: 0,
//             fontSize: 14,
//             textAlign: 'start',
//             textBaseline: 'middle',
//             text: cfg.value,
//             fill: '#fff',
//             },
//             name: 'title',
//             draggable: true,
//         });
//         const pointTop = group.addShape('circle', {
//             name: 'point-top',
//             attrs: {
//             x: 0,
//             y: 0 - cfg.size[1] / 2,
//             r: 8,
//             fill: '#fff',
//             stroke: '#178BF6',
//             lineWidth: 2,
//             },
//         });
//         pointTop.hide();
//         const pointBottom = group.addShape('circle', {
//             name: 'point-bottom',
//             attrs: {
//             x: 0,
//             y: cfg.size[1] / 2,
//             r: 8,
//             fill: '#fff',
//             stroke: '#178BF6',
//             lineWidth: 2,
//             cursor: 'pointer',
//             },
//         });
//         pointBottom.hide();
//         },
//     },
//     'rect',
//     );
//     const data = {
//       nodes: [{
//         id: "source",
//         label: "source",
//         x: 100,
//         y: 100,
//       }, {
//         id: "source2",
//         label: "source2",
//         x: 120,
//         y: 150,
//       }],
//       edges: [{
//           source: 'source',
//           target: 'source2'
//       }]
//     };
//     const graph = new Graph({
//       container: 'container',
//       width: 500,
//       height: 500,
//       defaultNode: {
//         type: 'devnode',
//         size: [180, 32],
//         style: {
//         //   width: 60,
//         //   height: 20,
//           stroke: '#3e475f',
//           lineWidth: 0.8,
//         //   shadowBlur: 10,
//         //   shadowColor: '#333',
//           fill: '#1f2944'
//         }
//       },
//       defaultEdge: {
//         style: {
//           endArrow: true,
//         }
//       },
//       modes: {
//         default: [ 'drag-node', 'zoom-canvas', 'drag-canvas' ]
//       }
//     });
//     it('dragging', () => {
//       graph.data(data);
//       graph.render();
//     });
//   });