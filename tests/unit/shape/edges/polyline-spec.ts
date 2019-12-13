import Graph from '../../../../src/graph/graph'

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('polyline e test', () => {
  describe('default polyline test', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      pixelRatio: 2,
      defaultNode: {
        shape: 'polyline'
      }
    });
    it('default polyline config', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200
          },
          {
            id: 'node2',
            x: 150,
            y: 100
          }
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            shape: 'polyline'
          }
        ]
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(5);
      expect(keyShape.attr('stroke')).toEqual('#333');
      expect(keyShape.attr('opacity')).toEqual(1);
    });

    // TODO: wait for findByClassName defined by G
    // it('polyline with label', () => {
    //   const data = {
    //     nodes: [
    //       {
    //         id: 'node1',
    //         x: 200,
    //         y: 200
    //       },
    //       {
    //         id: 'node2',
    //         x: 150,
    //         y: 100
    //       }
    //     ], edges: [{
    //       source: 'node1',
    //       target: 'node2',
    //       shape: 'polyline',
    //       label: 'polyline1-2'
    //     }]
    //   };
    //   graph.data(data);
    //   graph.render();

    //   const edges = graph.getEdges();
    //   expect(edges.length).toEqual(1);
    //   const edge = edges[0];
    //   const group = edge.get('group');
    //   expect(group.getCount()).toEqual(2);

    //   const label = group.findByClassName('edge-label');
    //   expect(label).not.toBe(undefined);
    //   expect(label.attr('fill')).toEqual('#595959');
    //   const type = label.get('type');
    //   expect(type).toEqual('text');
    // });

    // it('polyline with controlPoints', () => {
    //   const data = {
    //     nodes: [
    //       {
    //         id: 'node1',
    //         x: 200,
    //         y: 200
    //       },
    //       {
    //         id: 'node2',
    //         x: 150,
    //         y: 100
    //       }
    //     ], edges: [{
    //       source: 'node1',
    //       target: 'node2',
    //       shape: 'polyline',
    //       controlPoints: [{ x: 170, y: 160 }]
    //     }]
    //   };
    //   graph.data(data);
    //   graph.render();

    //   const edges = graph.getEdges();
    //   expect(edges.length).toEqual(1);
    //   const edge = edges[0];
    //   const keyShape = edge.getKeyShape();
    //   const path = keyShape.attr('path');
    //   expect(path.length).toEqual(3);
    //   expect(path[1]).toEqual([ 'L', 170, 160 ]);
    //   graph.destroy();
    //   expect(graph.destroyed).toBe(true);
    // });
  });
});
