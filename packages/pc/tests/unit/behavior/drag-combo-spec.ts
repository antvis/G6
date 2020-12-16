import '../../../src/behavior';
// import '../../../src/shape';
import G6 from '../../../src';

const div = document.createElement('div');
div.id = 'drag-combo-spec';
document.body.appendChild(div);

G6.registerCombo(
  'custom-combo',
  {
    draw: (cfg, group) => {
      const style = cfg.style || {};
      const keyShape = group.addShape('circle', {
        attrs: style,
        className: 'circle-combo',
        name: 'circle-combo',
        draggable: true,
      });
      group.addShape('marker', {
        attrs: {
          x: 0, //keyShape.attr('r') + 5,
          y: 0,
          r: 5,
          stroke: 'blue',
          symbol: 'triangle-down',
        },
        name: 'marker-shape',
      });
      return keyShape;
    },
    update: (cfg, item) => {
      const group = item.get('group');
      if (cfg.markerStyle) {
        const marker = group.find((ele) => ele.get('name') === 'marker-shape');
        marker.attr(cfg.markerStyle);
      }
      const keyShape = group.get('children')[0];
      keyShape.attr(cfg.style);
    },
  },
  'circle-combo',
);

describe('drag-combo', () => {
  it('drag combo', (done) => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 150,
          label: 'node1',
          comboId: 'A',
        },
        {
          id: 'node2',
          x: 200,
          y: 250,
          label: 'node2',
          comboId: 'A',
        },
        {
          id: 'node3',
          x: 100,
          y: 250,
          label: 'node3',
        },
        {
          id: 'node4',
          x: 200,
          y: 350,
          label: 'node4',
          comboId: 'B',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node4',
        },
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      combos: [
        {
          id: 'A',
          parentId: 'C',
          label: 'group A',
          type: 'circle',
        },
        {
          id: 'B',
          parentId: 'C',
          label: 'group B',
        },
        {
          id: 'C',
          label: 'group C',
          // type: 'rect'
        },
        {
          id: 'F',
          label: 'group F',
          // type: 'rect'
        },
        {
          id: 'G',
          label: 'group G',
          // parentId: 'F'
          type: 'custom-combo',
        },
      ],
    };

    const graph = new G6.Graph({
      container: 'drag-combo-spec',
      width: 1000,
      height: 800,
      modes: {
        default: ['drag-canvas', 'drag-combo'],
      },
      defaultCombo: {
        // size: [100, 100],
        // type: 'custom-combo',
        style: {
          fill: '#b5f5ec',
        },
      },
      comboStateStyles: {
        active: {
          stroke: 'red',
        },
        selected: {
          'text-shape': {
            fill: '#f00',
            fontSize: 20,
          },
          fill: '#36cfc9',
        },
        state2: {
          stroke: '#0f0',
        },
      },
    });

    graph.data(data);
    graph.render();

    graph.on('combo:click', (e) => {
      graph.setItemState(e.item, 'selected', true);
    });

    graph.on('canvas:click', (evt) => {
      const combos = graph.findAllByState('combo', 'selected');
      combos.map((combo) => {
        graph.clearItemStates(combo);
      });
    });


    const combo = graph.findById('A');
    const comboC = graph.findById('C');
    let comboCBBox = comboC.getKeyShape().getCanvasBBox();

    expect(Math.abs(comboCBBox.width - 392) < 2).toBe(true);

    graph.emit('combo:dragstart', { item: combo, x: 100, y: 100 });
    graph.emit('combo:drag', { item: combo, x: 500, y: 100 });

    comboCBBox = comboC.getKeyShape().getCanvasBBox();
    expect(Math.abs(comboCBBox.width - 392) < 2).toBe(true);

    graph.emit('combo:dragend', { item: combo, x: 500, y: 100 });
    setTimeout(() => {
      comboCBBox = comboC.getKeyShape().getCanvasBBox();
      console.log(comboCBBox);
      expect(Math.abs(comboCBBox.width - 163) < 2).toBe(true);
      graph.destroy();
      done();
    }, 550)

  });
  it('drag combo onlyChangeComboSize', (done) => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 150,
          label: 'node1',
          comboId: 'A',
        },
        {
          id: 'node2',
          x: 200,
          y: 250,
          label: 'node2',
          comboId: 'A',
        },
        {
          id: 'node3',
          x: 100,
          y: 250,
          label: 'node3',
        },
        {
          id: 'node4',
          x: 200,
          y: 350,
          label: 'node4',
          comboId: 'B',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node4',
        },
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
      ],
      combos: [
        {
          id: 'A',
          parentId: 'C',
          label: 'group A',
          type: 'circle',
        },
        {
          id: 'B',
          parentId: 'C',
          label: 'group B',
        },
        {
          id: 'C',
          label: 'group C',
          // type: 'rect'
        },
        {
          id: 'F',
          label: 'group F',
          // type: 'rect'
        },
        {
          id: 'G',
          label: 'group G',
          // parentId: 'F'
          type: 'custom-combo',
        },
      ],
    };

    const graph = new G6.Graph({
      container: 'drag-combo-spec',
      width: 1000,
      height: 800,
      modes: {
        default: ['drag-canvas', {
          type: 'drag-combo',
          onlyChangeComboSize: true
        }],
      },
      defaultCombo: {
        // size: [100, 100],
        // type: 'custom-combo',
        style: {
          fill: '#b5f5ec',
        },
      },
      comboStateStyles: {
        active: {
          stroke: 'red',
        },
        selected: {
          'text-shape': {
            fill: '#f00',
            fontSize: 20,
          },
          fill: '#36cfc9',
        },
        state2: {
          stroke: '#0f0',
        },
      },
    });

    graph.data(data);
    graph.render();

    const combo = graph.findById('A');
    const comboC = graph.findById('C');
    let comboCBBox = comboC.getKeyShape().getCanvasBBox();

    expect(Math.abs(comboCBBox.width - 392) < 2).toBe(true);

    graph.emit('combo:dragstart', { item: combo, x: 100, y: 100 });
    graph.emit('combo:drag', { item: combo, x: 500, y: 100 });

    comboCBBox = comboC.getKeyShape().getCanvasBBox();
    expect(Math.abs(comboCBBox.width - 392) < 2).toBe(true);

    graph.emit('combo:dragend', { item: combo, x: 500, y: 100 });
    setTimeout(() => {
      comboCBBox = comboC.getKeyShape().getCanvasBBox();
      console.log(comboCBBox);
      expect(Math.abs(comboCBBox.width - 635) < 2).toBe(true);
      graph.destroy();
      done()
    }, 550)
  });

  it('combo example', () => {
    const data = {
      nodes: [
        {
          id: 'node1',
          x: 150,
          y: 150,
          label: 'node1',
          comboId: 'A',
        },
        {
          id: 'node2',
          x: 200,
          y: 250,
          label: 'node2',
          comboId: 'B',
        },
        {
          id: 'node3',
          x: 100,
          y: 250,
          label: 'node3',
        },
        {
          id: 'node4',
          x: 50,
          y: 50,
          label: 'node4',
          comboId: 'D',
        },
        {
          id: 'node5',
          x: 100,
          y: 100,
          label: 'node5',
          comboId: 'E',
        },
        {
          id: 'node6',
          x: 500,
          y: 200,
          label: 'node6',
        },
        {
          id: 'node7',
          x: 600,
          y: 200,
          label: 'node7',
        },
      ],
      edges: [
        {
          source: 'node1',
          target: 'node2',
        },
        {
          source: 'node2',
          target: 'node3',
        },
        {
          source: 'node3',
          target: 'node1',
        },
        {
          source: 'A',
          target: 'D',
        },
      ],
      combos: [
        {
          id: 'A',
          parentId: 'B',
          label: 'group A',
          padding: [50, 30, 10, 10],
          type: 'rect',
          // style: {
          //   stroke: 'red',
          //   fill: 'green'
          // },
          // collapsed: true
        },
        {
          id: 'B',
          label: 'group B',
          padding: [50, 10, 10, 50],
          // type: 'custom-combo'
        },
        {
          id: 'D',
          label: 'group D',
          parentId: 'E',
        },
        {
          id: 'E',
          // collapsed: true
        },
        {
          id: 'FF',
          label: '空分组',
          // type: 'custom-combo',
          // style: {
          //   stroke: 'green',
          //   lineWidth: 3
          // }
        },
      ],
    };

    const graph = new G6.Graph({
      container: 'drag-combo-spec',
      width: 1000,
      height: 800,
      groupByTypes: false,
      modes: {
        default: [
          'drag-canvas',
          {
            type: 'drag-combo',
            activeState: 'active',
          },
          {
            type: 'drag-node',
            comboActiveState: 'active',
          },
          'collapse-expand-combo',
          'click-select',
        ],
      },
      defaultCombo: {
        // size: [100, 100],
        type: 'circle',
        style: {
          fill: '#f0f0f0',
          stroke: '#bfbfbf',
        },
      },
      comboStateStyles: {
        selected: {
          // 'text-shape': {
          //   fill: '#f00',
          //   fontSize: 20
          // },
          stroke: '#8c8c8c',
        },
        active: {
          stroke: '#722ed1',
          lineWidth: 2,
        },
        state2: {
          stroke: '#0f0',
        },
      },
      nodeStateStyles: {
        selected: {
          stroke: 'green',
          lineWidth: 2,
        },
      },
      defaultEdge: {
        style: {
          stroke: '#bfbfbf',
          lineWidth: 2,
          endArrow: true,
        },
      },
    });

    graph.data(data);
    graph.render();

    graph.on('nodeselectchange', (evt) => {
      // console.log(evt);
    });

    // 删错 combo
    // graph.on('combo:click', evt => {
    //   const { item } = evt
    //   graph.removeItem(item)
    // })

    // graph.on('combo:click', evt => {
    //   const { item } = evt
    //   graph.uncombo(item)
    // })

    // setTimeout(() => {
    //   graph.updateComboTree('D')
    // }, 1000)

    // graph.on('combo:mouseenter', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', true)
    // })

    // graph.on('combo:mouseleave', evt => {
    //   const { item } = evt
    //   graph.setItemState(item, 'hover', false)
    // })
  });
});
