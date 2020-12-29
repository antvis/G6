import G6 from '../../../src';

const data = {
  // 点集
  nodes: [
    {
      id: "node1", // String，该节点存在则必须，节点的唯一标识
      x: 100, // Number，可选，节点位置的 x 值
      y: 200 // Number，可选，节点位置的 y 值
    },
    {
      id: "node2", // String，该节点存在则必须，节点的唯一标识
      x: 300, // Number，可选，节点位置的 x 值
      y: 200 // Number，可选，节点位置的 y 值
    }
  ],
  // 边集
  edges: [
    {
      source: "node1", // String，必须，起始点 id
      target: "node2", // String，必须，目标点 id
      label: "edge1",
      // type: 'polyline',
      // controlPoints: [{ x: 50, y: 50 }],
      style: {
        endArrow: true,
        stroke: '#f00'
      }
    }
  ]
};

const div = document.createElement('div');
div.id = 'force-layout';
document.body.appendChild(div);

describe('force layout', () => {
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
        default: ['drag-node']
      }
    });

    graph.on("edge:mouseenter", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", true);
    });

    graph.on("edge:mouseleave", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "active", false);
    });

    graph.on("edge:click", (evt) => {
      const { item } = evt;
      graph.setItemState(item, "selected", true);
    });

    graph.on('canvas:click', () => {
      console.log('canvas click')
      graph.getEdges().forEach(edge => {
        console.log('selected false')
        graph.setItemState(edge, "selected", false);
      })
    })


    graph.data(data);
    graph.render();
    const edge = graph.getEdges()[0];

    graph.emit('edge:mouseenter', { item: edge });
    const keyShape = edge.getKeyShape();
    const text = edge.getContainer().find(e => e.get('name') === 'text-shape')
    expect(keyShape.attr('stroke')).toBe('rgb(95, 149, 255)');
    expect(text.attr('x')).not.toBe(200)

    graph.emit('edge:mouseleave', { item: edge });
    expect(keyShape.attr('stroke')).toBe('#f00');
    expect(text.attr('x')).not.toBe(200)

    graph.emit('edge:mouseenter', { item: edge });
    graph.emit('edge:click', { item: edge });
    expect(keyShape.attr('stroke')).toBe('rgb(95, 149, 255)');
    expect(text.attr('x')).not.toBe(200)
    expect(keyShape.attr('lineWidth')).toBe(2);


    graph.emit('edge:mouseleave', { item: edge });
    graph.emit('canvas:click', {});
    expect(keyShape.attr('lineWidth')).toBe(1);
    expect(text.attr('x')).not.toBe(200)
    expect(keyShape.attr('stroke')).toBe('#f00');

    graph.destroy()
  });

  it('acitvate-relations wrong label position', () => {
    const data2 = {
      nodes: [
        {
          id: "0",
          x: 150,
          y: 100
        },
        {
          id: "1",
          x: 350,
          y: 300
        }
      ],
      edges: [
        // Built-in polyline
        {
          source: "0",
          target: "1",
          label: "edge-label"
        }
      ]
    };
    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      // translate the graph to align the canvas's center, support by v3.5.1
      fitCenter: true,
      defaultNode: {
        style: {
          fill: "#DEE9FF",
          stroke: "#5B8FF9"
        }
      },
      modes: {
        // behavior
        default: [
          "drag-node",
          {
            type: "activate-relations",
            trigger: "click"
          }
        ]
      }
    });

    graph.data(data2);
    graph.render();

    const edge = graph.getEdges()[0];
    const node = graph.getNodes()[0];
    const text = edge.getContainer().find(e => e.get('name') === 'text-shape')

    graph.emit('edge:click', { item: edge });
    expect(text.attr('x')).toBe(250)
    expect(text.attr('y')).toBe(200)

    graph.emit('node:click', { item: node });
    expect(text.attr('x')).toBe(250)
    expect(text.attr('y')).toBe(200)

    graph.emit('canvas:click', {});
    expect(text.attr('x')).toBe(250)
    expect(text.attr('y')).toBe(200)

    // graph.destroy()
  });
});
