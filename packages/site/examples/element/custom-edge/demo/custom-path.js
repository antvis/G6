import { BaseEdge, ExtensionCategory, Graph, register } from '@antv/g6';

class PolylineEdge extends BaseEdge {
  getKeyPath(attributes) {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);

    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0] / 2 + (1 / 2) * sourcePoint[0], targetPoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}

register(ExtensionCategory.EDGE, 'custom-polyline', PolylineEdge);

const graph = new Graph({
  container: 'container',
  data: {
    nodes: [
      { id: 'node-0', style: { x: 100, y: 100, ports: [{ key: 'right', placement: [1, 0.5] }] } },
      { id: 'node-1', style: { x: 250, y: 200, ports: [{ key: 'left', placement: [0, 0.5] }] } },
    ],
    edges: [{ source: 'node-0', target: 'node-1' }],
  },
  edge: {
    type: 'custom-polyline',
    style: {
      startArrow: true,
      endArrow: true,
      stroke: '#F6BD16',
    },
  },
  behaviors: ['drag-element'],
});

graph.render();
