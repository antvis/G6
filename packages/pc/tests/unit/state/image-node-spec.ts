import G6, { AbstractEvent } from '../../../src';

const div = document.createElement('div');
div.id = 'global-spec';
document.body.appendChild(div);

describe('graph node states', () => {
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
  };

  it('custom node with img', () => {

    G6.registerNode(
      "strategyNode",
      {
        drawShape(cfg, group) {
          const size = this.getSize(cfg);
          const style = this.getShapeStyle(cfg);
          const width = size[0];
          const height = size[1];
          const keyShape = group.addShape("rect", {
            attrs: style,
            className: `a-keyShape`,
            name: `a-keyShape`,
            draggable: true
          });
    
          group.addShape("image", {
            attrs: {
              x: -width / 2 + 1,
              y: -height / 2 + 1,
              width: 30,
              height: 30,
              img:
                "https://img.alicdn.com/tfs/TB1JiEChP39YK4jSZPcXXXrUFXa-100-80.png"
            },
            zIndex: 3,
            className: "shape-img",
            name: "shape-img",
            draggable: true
          });
          return keyShape;
        }
      },
    'rect');

    const graph = new G6.Graph({
      container: div,
      width: 500,
      height: 500,
      defaultNode: {
        type: 'strategyNode'
      }
    });
    graph.data(data);
    graph.render();

    const node = graph.getNodes()[0]
    graph.on('canvas:click', e => {
      graph.setItemState(node, 's', true);
      node.update({
        label: 'new label'
      })
    })

  });
});
