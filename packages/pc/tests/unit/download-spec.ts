import G6 from '../../src';

const div = document.createElement('div');
div.id = 'container';
document.body.appendChild(div);

describe('combo layout with collapsed', () => {
  it('combo layout with collapsed', (done) => {

    const graph = new G6.Graph({
      container: "container",
      width: 500,
      height: 500,
      layout: {
        type: "comboCombined",
      },
      defaultNode: {
        size: 10,
      },
      defaultCombo: {
        fixSize: 40,
      },
      defaultEdge: {
        style: {
          lineWidth: 1,
        },
      },
      modes: {
        default: [
          "drag-canvas",
          "drag-node",
          "drag-combo",
          "collapse-expand-combo",
          "zoom-canvas",
          "activate-relations",
        ],
      },
    });

    const data = {
      nodes: [
        {
          id: "node1",
          comboId: "combo",
        },
        {
          id: "node2",
          comboId: "combo",
        },
        {
          id: "node3",
          comboId: "combo2",
        },
        {
          id: "node4",
          comboId: "combo2",
        },
        {
          id: "node5",
          comboId: "combo3",
        },
        {
          id: "node6",
          comboId: "combo3",
        },
        {
          id: "node7",
          comboId: "combo3",
        },
        {
          id: "node8",
          comboId: "combo3",
        },
        {
          id: "node9",
          comboId: "combo3",
        },
        {
          id: "node10",
          comboId: "combo3",
        },
      ],
      edges: [
        {
          source: "node1",
          target: "node4",
        },
        {
          target: "node1",
          source: "node2",
        },
        {
          target: "node3",
          source: "node4",
        },
        {
          target: "node5",
          source: "node3",
        },
        {
          target: "node6",
          source: "node5",
        },
        {
          target: "node7",
          source: "node6",
        },
        {
          target: "node8",
          source: "node6",
        },
        {
          target: "node9",
          source: "node6",
        },
        {
          target: "node10",
          source: "node6",
        },
      ],
      combos: [
        {
          id: "combo",
          collapsed: true,
        },
        {
          id: "combo2",
          collapsed: true,
        },
        {
          id: "combo3",
          collapsed: true,
        },
      ],
    };

    graph.data(data);
    graph.render();
    graph.on('combo:click', e => {
      console.log('e', e.item.getKeyShape())
    })
  });
});
