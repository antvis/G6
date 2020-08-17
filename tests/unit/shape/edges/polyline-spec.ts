import Graph from '../../../../src/graph/graph';
import '../../../../src/shape/node';
import '../../../../src/shape/nodes';
import '../../../../src/shape/edge';
import '../../../../src/shape/edges';
import '../../../../src/behavior';

const div = document.createElement('div');
div.id = 'graph-spec';
document.body.appendChild(div);

describe('polyline e test', () => {
  describe('default polyline test', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
      defaultEdge: {
        type: 'polyline',
      },
      defaultNode: {
        type: 'rect',
        size: [100, 50],
        style: {
          opacity: 0.1,
        },
      },
    });
    it('default polyline config', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(1);
      expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
    });

    it('polyline radius and default offset', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            style: {
              radius: 10,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(1);
      expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
    });
    it('polyline radius and no offset', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            style: {
              radius: 10,
              offset: null,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(1);
      expect(keyShape.attr('stroke')).toEqual('#e2e2e2');
    });
    it('polyline with label', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            label: 'polyline1-2',
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const group = edge.get('group');
      expect(group.getCount()).toEqual(2);

      const label = group.find((g) => {
        return g.get('className') === 'edge-label';
      });
      expect(label).not.toBe(undefined);
      expect(label.attr('fill')).toEqual('#595959');
      const type = label.get('type');
      expect(type).toEqual('text');
    });

    it('polyline with controlPoints', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            controlPoints: [{ x: 200, y: 160 }],
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      const path = keyShape.attr('path');
      expect(path.length).toEqual(3);
      expect(path[1]).toEqual(['L', 200, 160]);
      graph.destroy();
      expect(graph.destroyed).toBe(true);
    });
  });

  describe('update', () => {
    const graph = new Graph({
      container: div,
      width: 500,
      height: 500,
    });
    it('styles', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            style: {
              stroke: 'red',
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      expect(edges.length).toEqual(1);
      const edge = edges[0];
      const keyShape = edge.getKeyShape();
      expect(keyShape.attr('lineWidth')).toEqual(1);
      expect(keyShape.attr('stroke')).toEqual('red');

      edge.update({
        style: {
          stroke: 'blue',
          lineWidth: 3,
        },
      });
      expect(keyShape.attr('lineWidth')).toEqual(3);
      expect(keyShape.attr('stroke')).toEqual('blue');

      edge.update({
        style: {
          shadowColor: 'black',
          shadowBlur: 5,
        },
      });
      expect(keyShape.attr('lineWidth')).toEqual(3);
      expect(keyShape.attr('stroke')).toEqual('blue');
      expect(keyShape.attr('shadowColor')).toEqual('black');
      expect(keyShape.attr('shadowBlur')).toEqual(5);
    });
    it('label', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
            label: 'node',
            labelCfg: {
              position: 'right',
              offset: 20,
            },
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
            label: 'polyline',
            labelCfg: {
              position: 'end',
              refX: 10,
              refY: 20,
            },
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      const edge = edges[0];
      const group = edge.get('group');
      const label = group.find((g) => {
        return g.get('className') === 'edge-label';
      });
      expect(label.attr('text')).toEqual('polyline');

      edge.update({
        label: 'new label',
        labelCfg: {
          position: 'start',
          style: {
            fill: '#0ff',
          },
        },
      });
      expect(label.attr('fill')).toEqual('#0ff');
      expect(label.attr('text')).toEqual('new label');

      edge.update({
        labelCfg: {
          style: {
            shadowColor: 'black',
            shadowBlur: 5,
          },
        },
      });
      expect(label.attr('fill')).toEqual('#0ff');
      expect(label.attr('text')).toEqual('new label');
      expect(label.attr('shadowColor')).toEqual('black');
      expect(label.attr('shadowBlur')).toEqual(5);
    });
    it('label from none', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      const edge = edges[0];
      const group = edge.get('group');

      edge.update({
        label: 'new label',
        labelCfg: {
          style: {
            fill: '#0ff',
          },
        },
      });
      const label = group.find((g) => {
        return g.get('className') === 'edge-label';
      });
      expect(label.attr('fill')).toEqual('#0ff');
      expect(label.attr('text')).toEqual('new label');

      edge.update({
        labelCfg: {
          style: {
            shadowColor: 'black',
            shadowBlur: 5,
          },
        },
      });
      expect(label.attr('fill')).toEqual('#0ff');
      expect(label.attr('text')).toEqual('new label');
      expect(label.attr('shadowColor')).toEqual('black');
      expect(label.attr('shadowBlur')).toEqual(5);
    });
    it('label position', () => {
      const data = {
        nodes: [
          {
            id: 'node1',
            x: 200,
            y: 200,
          },
          {
            id: 'node2',
            x: 150,
            y: 100,
          },
        ],
        edges: [
          {
            source: 'node1',
            target: 'node2',
            type: 'polyline',
          },
        ],
      };
      graph.data(data);
      graph.render();

      const edges = graph.getEdges();
      const edge = edges[0];
      const group = edge.get('group');

      edge.update({
        label: 'new label',
        labelCfg: {
          position: 'end',
          style: {
            fill: '#0ff',
          },
        },
      });
      const label = group.find((g) => {
        return g.get('className') === 'edge-label';
      });
      expect(label.attr('fill')).toEqual('#0ff');
      expect(label.attr('text')).toEqual('new label');
    });
  });
});
