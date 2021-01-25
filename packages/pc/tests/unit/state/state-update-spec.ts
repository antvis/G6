import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('node state label update', () => {
  const data = {
    nodes: [
      {
        id: 'node1',
        x: 100,
        y: 100,
        label: 'node1',
        type: 'rect',
        labelCfg: {
          style: {
            fill: 'rgb(49,158,236)',
            // fontSize: 12
          },
          position: 'bottom',
        },
      },
      {
        id: 'node2',
        x: 100,
        y: 300,
        label: 'node2',
        type: 'rect',
        labelCfg: {
          style: {
            fill: 'rgb(49,158,236)',
            // fontSize: 12
          },
          position: 'bottom',
        },
      },
    ],
    edges: [{ source: 'node1', target: 'node2', label: 'edge' }],
  };

  G6.registerNode(
    'rect-img',
    {
      afterDraw(cfg, item) {
        // 添加图片
        let _cfg = cfg;
        _cfg.x = -cfg.size / 2;
        _cfg.y = -cfg.size / 2;
        _cfg.width = cfg.size;
        _cfg.height = cfg.size;
        item.addShape('image', {
          attrs: _cfg,
          draggable: true,
          name: 'image-shape',
        });
      },
      update: undefined,
      afterUpdate: undefined,
      setItemState: undefined,
    },
    'rect',
  );

  it('label update', () => {
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      nodeStateStyles: {
        hover: {},
        selected: {
          lineWidth: 3,
          fill: 'rgba(0,0,0,0)', //背景填充色
        },
      },
    });
    graph.data(data);
    graph.render();

    graph.on('canvas:click', () => {
      const node = graph.getNodes()[0];
      // model.labelCfg.style.fontSize = 50;
      graph.updateItem(node, {
        labelCfg: {
          style: {
            fontSize: 50,
          },
        },
      });
      const edge = graph.getEdges()[0];
      graph.updateItem(edge, {
        labelCfg: {
          style: {
            fontSize: 30,
          },
        },
      });
    });

    graph.on('node:click', (e) => {
      graph.setItemState(e.item, 'selected', !e.item.hasState('selected'));
    });

    graph.on('edge:click', (e) => {
      graph.setItemState(e.item, 'selected', !e.item.hasState('selected'));
    });

    const node = graph.getNodes()[0];
    const edge = graph.getEdges()[0];
    const nodeTextShape = node.getContainer().find((e) => e.get('name') === 'text-shape');
    const edgeTextShape = edge.getContainer().find((e) => e.get('name') === 'text-shape');
    expect(edgeTextShape.attr('fontSize')).toBe(12);

    graph.emit('canvas:click', {});
    expect(nodeTextShape.attr('fontSize')).toBe(50);
    expect(edgeTextShape.attr('fontSize')).toBe(30);
    graph.emit('node:click', { item: node });
    expect(nodeTextShape.attr('fontSize')).toBe(50);
    graph.emit('edge:click', { item: edge });
    expect(edgeTextShape.attr('fontSize')).toBe(30);
    graph.emit('node:click', { item: node });
    expect(nodeTextShape.attr('fontSize')).toBe(50);
    graph.emit('edge:click', { item: edge });
    expect(edgeTextShape.attr('fontSize')).toBe(30);

    graph.destroy();
  });
});

describe('force layout', () => {
  const data = {
    // 点集
    nodes: [
      {
        id: 'node1', // String，该节点存在则必须，节点的唯一标识
        x: 100, // Number，可选，节点位置的 x 值
        y: 200, // Number，可选，节点位置的 y 值
      },
      {
        id: 'node2', // String，该节点存在则必须，节点的唯一标识
        x: 300, // Number，可选，节点位置的 x 值
        y: 200, // Number，可选，节点位置的 y 值
      },
    ],
    // 边集
    edges: [
      {
        source: 'node1', // String，必须，起始点 id
        target: 'node2', // String，必须，目标点 id
        label: 'edge1',
        // type: 'polyline',
        // controlPoints: [{ x: 50, y: 50 }],
        style: {
          endArrow: true,
          stroke: '#f00',
        },
      },
    ],
  };
  it('force layout and hover with wrong label position', () => {
    const graph = new G6.Graph({
      container: div,
      layout: {
        type: 'radial',
      },
      width: 500,
      height: 500,
      defaultNode: { size: 10 },
      modes: {
        default: ['drag-node'],
      },
    });

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

    graph.on('canvas:click', () => {
      // console.log('canvas click');
      graph.getEdges().forEach((edge) => {
        // console.log('selected false');
        graph.setItemState(edge, 'selected', false);
      });
    });

    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];

    graph.emit('edge:mouseenter', { item: edge });
    const keyShape = edge.getKeyShape();
    const text = edge.getContainer().find((e) => e.get('name') === 'text-shape');
    expect(keyShape.attr('stroke')).toBe('rgb(95, 149, 255)');
    expect(text.attr('x')).not.toBe(200);

    graph.emit('edge:mouseleave', { item: edge });
    expect(keyShape.attr('stroke')).toBe('#f00');
    expect(text.attr('x')).not.toBe(200);

    graph.emit('edge:mouseenter', { item: edge });
    graph.emit('edge:click', { item: edge });
    expect(keyShape.attr('stroke')).toBe('rgb(95, 149, 255)');
    expect(text.attr('x')).not.toBe(200);
    expect(keyShape.attr('lineWidth')).toBe(2);

    graph.emit('edge:mouseleave', { item: edge });
    graph.emit('canvas:click', {});
    expect(keyShape.attr('lineWidth')).toBe(1);
    expect(text.attr('x')).not.toBe(200);
    expect(keyShape.attr('stroke')).toBe('#f00');

    graph.destroy();
  });

  it('acitvate-relations wrong label position', () => {
    const data2 = {
      nodes: [
        {
          id: '0',
          x: 150,
          y: 100,
        },
        {
          id: '1',
          x: 350,
          y: 300,
        },
      ],
      edges: [
        // Built-in polyline
        {
          source: '0',
          target: '1',
          label: 'edge-label',
        },
      ],
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // translate the graph to align the canvas's center, support by v3.5.1
      fitCenter: true,
      defaultNode: {
        style: {
          fill: '#DEE9FF',
          stroke: '#5B8FF9',
        },
      },
      modes: {
        // behavior
        default: [
          'drag-node',
          {
            type: 'activate-relations',
            trigger: 'click',
          },
        ],
      },
    });

    graph.data(data2);
    graph.render();

    const edge = graph.getEdges()[0];
    const node = graph.getNodes()[0];
    const text = edge.getContainer().find((e) => e.get('name') === 'text-shape');

    graph.emit('edge:click', { item: edge });
    expect(text.attr('x')).toBe(250);
    expect(text.attr('y')).toBe(200);

    graph.emit('node:click', { item: node });
    expect(text.attr('x')).toBe(250);
    expect(text.attr('y')).toBe(200);

    graph.emit('canvas:click', {});
    expect(text.attr('x')).toBe(250);
    expect(text.attr('y')).toBe(200);

    graph.destroy();
  });
});
