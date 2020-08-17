import G6, { Graph, TreeGraph } from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('edge click state', () => {
  it('edge ', () => {
    G6.registerBehavior('active-edge', {
      getEvents() {
        return {
          'edge:click': 'onEdgeSelect',
          'edge:mouseenter': 'onEdgeHover',
          'edge:mouseleave': 'onEdgeLeave',
          'canvas:mousedown': 'clearSelectedEdge',
        };
      },
      onEdgeSelect(evt) {
        console.log('mousedown');
        const item = evt.item;
        if (item.hasState('select')) {
          this.graph.setItemState(item, 'select', false);
          return;
        }
        this.graph.setItemState(item, 'select', true);
      },
      onEdgeHover(evt) {
        console.log('hover');
        const item = evt.item;
        if (item.hasState('select')) {
          return false;
        }
        this.graph.setItemState(item, 'hover', true);
      },
      onEdgeLeave(evt) {
        console.log('leave');
        const item = evt.item;
        this.graph.setItemState(item, 'hover', false);
      },
      clearSelectedEdge(evt) {
        console.log('clear');
        const edges = this.graph.findAllByState('edge', 'select');
        edges.forEach((edge) => {
          this.graph.setItemState(edge, 'select', false);
        });
      },
    });

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      defaultEdge: {
        type: 'line',
        style: {
          stroke: '#24A0FF',
          radius: 4,
          offset: 15,
          lineWidth: 2,
          lineAppendWidth: 4,
          cursor: 'pointer',
          endArrow: {
            path: 'M 0,0 L 7,3 L 5,0 L 7,-3 Z',
            fill: '#24A0FF',
          },
        },
      },
      edgeStateStyles: {
        hover: {
          stroke: '#0ff',
          endArrow: {
            fill: '#FF7868',
          },
        },
        select: {
          stroke: '#FF7868',
          endArrow: {
            fill: '#FF7868',
          },
        },
      },
      modes: {
        default: ['drag-node', 'active-edge'],
      },
    });

    graph.read({
      nodes: [
        { id: '1', x: 100, y: 100 },
        { id: '2', x: 100, y: 220 },
      ],
      edges: [{ source: '1', target: '2' }],
    });
  });
});

describe('dragenter dragleave', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 100,
      },
      {
        id: 'node2',
        x: 200,
        y: 100,
      },
    ],
    edges: [],
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    modes: {
      default: ['drag-node'],
    },
  });
  graph.data(data);
  graph.render();
  it('dragenter', () => {
    graph.on('node:dragenter', (e) => {
      console.log('dragenter');
    });
    graph.on('node:dragleave', (e) => {
      console.log('dragleave');
    });
    graph.on('node:mouseenter', (e) => {
      console.log('mouseenter');
    });
    graph.on('node:mouseleave', (e) => {
      console.log('mouseleave');
    });
    graph.on('node:dragover', (e) => {
      console.log('dragover');
    });
  });
  graph.destroy();
});

// closes: #1026
describe('empty data array + fitview', () => {
  const data = {
    nodes: [],
    edges: [],
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    fitView: true,
  });
  graph.data(data);
  it('empty data array + fitview', () => {
    graph.render();
    graph.destroy();
  });
});

// closes: #1301
describe('change data with rect node', () => {
  const data = {
    nodes: [
      {
        name: 'source',
        id: 'source',
        label: 'source',
        type: 'rect',
        x: 100,
        y: 100,
        //size: [60, 60],
        style: {
          width: 60,
          height: 20,
        },
      },
    ],
    edges: [],
  };
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
  });
  graph.data(data);
  it('change data', () => {
    graph.render();
    graph.changeData(data);
    graph.destroy();
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
      },
    ],
    edges: [
      {
        source: '1',
        target: '2',
      },
    ],
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
    [4, 2, 1, 2],
  ];

  const lineDash = [4, 2, 1, 2];
  const interval = 9; // lineDash 的和
  G6.registerEdge(
    'line-dash',
    {
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
        shape.animate(
          (ratio) => {
            const cfg = {
              lineDash: dashArray[index].concat(totalArray),
            };
            // 每次移动 1
            index = (index + 1) % interval;
            // 返回需要修改的参数集，这里只修改了 lineDash
            return cfg;
          },
          {
            repeat: true,
            duration: 3000,
          },
        ); // 一次动画的时长为 3000
      },
    },
    'cubic',
  ); // 该自定义边继承了内置三阶贝塞尔曲线边 cubic
  const graph = new Graph({
    container: 'container',
    width: 500,
    height: 500,
    //animate: true,
    defaultEdge: {
      size: 2,
      type: 'line-dash', //'line',//'line-dash',//
      color: '#e2e2e2',
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      nodesep: 30,
      //controlPoints: false
      // ranksep: 100
    },
  });
  it('change data', () => {
    graph.data(data);
    graph.render();
    graph.destroy();
  });
});

describe('changdata states', () => {
  it('changeData', () => {
    const data = {
      nodes: [
        {
          id: '0',
          label: '0',
        },
        {
          id: '1',
          label: '1',
        },
        {
          id: '2',
          label: '2',
        },
        {
          id: '3',
          label: '3',
        },
        {
          id: '4',
          label: '4',
        },
        {
          id: '5',
          label: '5',
        },
        {
          id: '6',
          label: '6',
        },
        {
          id: '7',
          label: '7',
        },
        {
          id: '8',
          label: '8',
        },
        {
          id: '9',
          label: '9',
        },
        {
          id: '10',
          label: '10',
        },
        {
          id: '11',
          label: '11',
        },
        {
          id: '12',
          label: '12',
        },
        {
          id: '13',
          label: '13',
        },
        {
          id: '14',
          label: '14',
        },
        {
          id: '15',
          label: '15',
        },
        {
          id: '16',
          label: '16',
        },
        {
          id: '17',
          label: '17',
        },
        {
          id: '18',
          label: '18',
        },
        {
          id: '19',
          label: '19',
        },
        {
          id: '20',
          label: '20',
        },
        {
          id: '21',
          label: '21',
        },
        {
          id: '22',
          label: '22',
        },
        {
          id: '23',
          label: '23',
        },
        {
          id: '24',
          label: '24',
        },
        {
          id: '25',
          label: '25',
        },
        {
          id: '26',
          label: '26',
        },
        {
          id: '27',
          label: '27',
        },
        {
          id: '28',
          label: '28',
        },
        {
          id: '29',
          label: '29',
        },
        {
          id: '30',
          label: '30',
        },
        {
          id: '31',
          label: '31',
        },
        {
          id: '32',
          label: '32',
        },
        {
          id: '33',
          label: '33',
        },
      ],
      edges: [
        {
          source: '0',
          target: '1',
        },
        {
          source: '0',
          target: '2',
        },
        {
          source: '0',
          target: '3',
        },
        {
          source: '0',
          target: '4',
        },
        {
          source: '0',
          target: '5',
        },
        {
          source: '0',
          target: '7',
        },
        {
          source: '0',
          target: '8',
        },
        {
          source: '0',
          target: '9',
        },
        {
          source: '0',
          target: '10',
        },
        {
          source: '0',
          target: '11',
        },
        {
          source: '0',
          target: '13',
        },
        {
          source: '0',
          target: '14',
        },
        {
          source: '0',
          target: '15',
        },
        {
          source: '0',
          target: '16',
        },
        {
          source: '2',
          target: '3',
        },
        {
          source: '4',
          target: '5',
        },
        {
          source: '4',
          target: '6',
        },
        {
          source: '5',
          target: '6',
        },
        {
          source: '7',
          target: '13',
        },
        {
          source: '8',
          target: '14',
        },
        {
          source: '9',
          target: '10',
        },
        {
          source: '10',
          target: '22',
        },
        {
          source: '10',
          target: '14',
        },
        {
          source: '10',
          target: '12',
        },
        {
          source: '10',
          target: '24',
        },
        {
          source: '10',
          target: '21',
        },
        {
          source: '10',
          target: '20',
        },
        {
          source: '11',
          target: '24',
        },
        {
          source: '11',
          target: '22',
        },
        {
          source: '11',
          target: '14',
        },
        {
          source: '12',
          target: '13',
        },
        {
          source: '16',
          target: '17',
        },
        {
          source: '16',
          target: '18',
        },
        {
          source: '16',
          target: '21',
        },
        {
          source: '16',
          target: '22',
        },
        {
          source: '17',
          target: '18',
        },
        {
          source: '17',
          target: '20',
        },
        {
          source: '18',
          target: '19',
        },
        {
          source: '19',
          target: '20',
        },
        {
          source: '19',
          target: '33',
        },
        {
          source: '19',
          target: '22',
        },
        {
          source: '19',
          target: '23',
        },
        {
          source: '20',
          target: '21',
        },
        {
          source: '21',
          target: '22',
        },
        {
          source: '22',
          target: '24',
        },
        {
          source: '22',
          target: '25',
        },
        {
          source: '22',
          target: '26',
        },
        {
          source: '22',
          target: '23',
        },
        {
          source: '22',
          target: '28',
        },
        {
          source: '22',
          target: '30',
        },
        {
          source: '22',
          target: '31',
        },
        {
          source: '22',
          target: '32',
        },
        {
          source: '22',
          target: '33',
        },
        {
          source: '23',
          target: '28',
        },
        {
          source: '23',
          target: '27',
        },
        {
          source: '23',
          target: '29',
        },
        {
          source: '23',
          target: '30',
        },
        {
          source: '23',
          target: '31',
        },
        {
          source: '23',
          target: '33',
        },
        {
          source: '32',
          target: '33',
        },
      ],
    };

    const width = 500;
    const height = 500;
    const graph = new G6.Graph({
      container: 'container',
      width,
      height,
      modes: {
        default: ['activate-relations', 'drag-canvas', 'drag-node'],
      },
      layout: {
        type: 'circular',
      },
      nodeStateStyles: {
        active: {
          stroke: 'red',
        },
      },
      edgeStateStyles: {
        active: {
          stroke: '#000',
          opacity: 1,
        },
        inactive: {
          color: '#969696',
          opacity: 0.5,
        },
      },
      animate: true,
      defaultNode: {
        size: 20,
        style: {
          lineWidth: 2,
          fill: '#C6E5FF',
          stroke: '#5B8FF9',
        },
      },
      defaultEdge: {
        size: 1,
        color: '#e2e2e2',
        style: {
          endArrow: {
            path: 'M 0,0 L 8,4 L 8,-4 Z',
            fill: '#e2e2e2',
          },
        },
      },
    });
    graph.data(data);
    graph.render();

    const node1 = graph.findById('1');
    graph.setItemState(node1, 'active', true);
    const edge1 = graph.getEdges()[0];
    graph.setItemState(edge1, 'active', true);

    expect(graph.findAllByState('node', 'active').length).toBe(1);
    expect(graph.findAllByState('edge', 'active').length).toBe(1);

    graph.changeData(data);
    expect(graph.findAllByState('node', 'active').length).toBe(0);
    expect(graph.findAllByState('edge', 'active').length).toBe(0);

    graph.destroy();
  });
});

describe('defaultStyle states', () => {
  it('label', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          label: 'node1',
          x: 100,
          y: 100,
        },
      ],
    };

    const graph = new G6.Graph({
      container: 'container',
      width: 500,
      height: 500,
      defaultEdge: {
        color: '#e2e2e2',
        lineAppendWidth: 3,
      },
      defaultNode: {
        style: {
          fill: '#DEE9FF',
          stroke: '#5B8FF9',
        },
      },
      nodeStateStyles: {
        hover: {
          lineWidth: 5,
          fillOpacity: 1,
          'text-shape': {
            fontSize: 20,
            fill: '#003a8c',
          },
        },
      },
      edgeStateStyles: {
        hover: {
          lineWidth: 3,
        },
      },
    });
    graph.data(data);
    graph.render();

    graph.on('node:mouseenter', function (evt) {
      const node = evt.item;
      const model = node.getModel();
      model.oriLabel = model.label;
      graph.setItemState(node, 'hover', true);
      graph.updateItem(node, {
        label: 'hover 后 ' + model.id,
        labelCfg: {
          style: {
            fill: 'blue',
          },
        },
      });
    });

    graph.on('node:mouseleave', function (evt) {
      const node = evt.item;
      const model = node.getModel();

      graph.setItemState(node, 'hover', false);

      graph.updateItem(node, {
        label: model.oriLabel,
        style: {
          'text-shape': {
            fill: 'red',
          },
        },
        labelCfg: {
          style: {
            fill: 'red',
          },
        },
      });
    });

    graph.on('edge:mouseenter', function (evt) {
      const edge = evt.item;
      const model = edge.getModel();
      model.oriLabel = model.label;
      graph.setItemState(edge, 'hover', true);
      graph.updateItem(edge, {
        label: 'hover 后',
        labelCfg: {
          style: {
            fill: '#003a8c',
          },
        },
      });
    });

    graph.on('edge:mouseleave', function (evt) {
      const edge = evt.item;
      graph.setItemState(edge, 'hover', false);
      graph.updateItem(edge, {
        label: 'hover 前的边文本',
        labelCfg: {
          style: {
            fill: '#555',
          },
        },
      });
    });

    // graph.destroy()
  });
});
