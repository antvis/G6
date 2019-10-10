const expect = require('chai').expect;
const G6 = require('../../../../src');

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('polyline e test', () => {
  describe('default polyline test', () => {
    const graph = new G6.Graph({
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
      expect(edges.length).eql(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).eql(5);
      expect(keyShape.attr('stroke')).eql('#333');
      expect(keyShape.attr('opacity')).eql(1);
    });

    it('polyline with label', () => {
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
        ], edges: [{
          source: 'node1',
          target: 'node2',
          shape: 'polyline',
          label: 'polyline1-2'
        }]
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).eql(1);
      const edge = edges[0];
      const group = edge.get('group');
      expect(group.getCount()).eql(2);

      const label = group.findByClassName('edge-label');
      expect(label).not.to.but.undefined;
      expect(label.attr('fill')).eql('#595959');
      const type = label.get('type');
      expect(type).eql('text');
    });

    it('polyline with controlPoints', () => {
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
        ], edges: [{
          source: 'node1',
          target: 'node2',
          shape: 'polyline',
          controlPoints: [{ x: 170, y: 160 }]
        }]
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).eql(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      const path = keyShape.attr('path');
      expect(path.length).eql(3);
      expect(path[1]).eql([ 'L', 170, 160 ]);
      graph.destroy();
      expect(graph.destroyed).to.be.true;
    });
  });
});
