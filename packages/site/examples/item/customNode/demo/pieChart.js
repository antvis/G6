/**
 * Custom a pie chart node
 */
import { Graph, Extensions, extend, stdLib } from '@antv/g6';

const lightBlue = '#5b8ff9';
const lightOrange = '#5ad8a6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class PieNode extends Extensions.CircleNode {
  drawOtherShapes(model, shapeMap) {
    const { data: cfg } = model;
    // node radius
    const radius = cfg.size / 2;
    // the ratio of indegree to outdegree
    const inPercentage = cfg.inDegree / cfg.degree;
    // the anble for the indegree fan
    const inAngle = inPercentage * Math.PI * 2;
    // the end position for the in-degree fan
    const inArcEnd = [radius * Math.cos(inAngle), -radius * Math.sin(inAngle)];
    let isInBigArc = 0,
      isOutBigArc = 1;
    if (inAngle > Math.PI) {
      isInBigArc = 1;
      isOutBigArc = 0;
    }

    const otherShapes = {
      ['in-fan-shape']: this.upsertShape(
        'path',
        'in-fan-shape',
        {
          path: [
            ['M', radius, 0],
            ['A', radius, radius, 0, isInBigArc, 0, inArcEnd[0], inArcEnd[1]],
            ['L', 0, 0],
            ['Z'],
          ],
          lineWidth: 0,
          fill: lightOrange,
        },
        shapeMap,
        model,
      ),
      ['out-fan-shape']: this.upsertShape(
        'path',
        'out-fan-shape',
        {
          path: [
            ['M', inArcEnd[0], inArcEnd[1]],
            ['A', radius, radius, 0, isOutBigArc, 0, radius, 0],
            ['L', 0, 0],
            ['Z'],
          ],
          lineWidth: 0,
          fill: lightBlue,
        },
        shapeMap,
        model,
      ),
    };
    return otherShapes;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'pie-node': PieNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'center',
  modes: {
    default: ['drag-node'],
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          size: 80,
          inDegree: 80,
          degree: 360,
          x: 150,
          y: 150,
        },
      },
      {
        id: 'node2',
        data: {
          size: 80,
          inDegree: 280,
          degree: 360,
          x: 350,
          y: 150,
        },
      },
    ],
    edges: [{ id: 'edge1', source: 'node1', target: 'node2' }],
  },

  node: {
    type: 'pie-node',
    otherShapes: {},
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
