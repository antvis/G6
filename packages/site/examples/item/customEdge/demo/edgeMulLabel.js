import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class MultipleLabelsEdge extends Extensions.LineEdge {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    const labels = model.data.labels;
    // the left label
    const startPoint = shapeMap.keyShape.getPoint(0);
    const leftTextStyle = {
      text: labels[0],
      fill: '#595959',
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'bottom',
      x: startPoint.x,
      y: startPoint.y,
    };
    shapeMap.leftTextShape = this.upsertShape('text', 'leftTextShape', leftTextStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });

    // the right label
    const endPoint = shapeMap.keyShape.getPoint(1);
    const rightTextStyle = {
      text: labels[1],
      fill: '#595959',
      fontSize: 12,
      textAlign: 'end',
      textBaseline: 'bottom',
      x: endPoint.x,
      y: endPoint.y,
    };
    shapeMap.rightTextShape = this.upsertShape('text', 'rightTextShape', rightTextStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
    return shapeMap;
  }
}

const ExtGraph = extend(Graph, {
  edges: {
    'multiple-labels-edge': MultipleLabelsEdge,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['click-select', 'drag-node'],
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 100,
        },
      },
      {
        id: 'node2',
        data: {
          x: 300,
          y: 100,
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          // The left and right labels
          labels: ['hello', 'world'],
        },
      },
    ],
  },
  edge: {
    type: 'multiple-labels-edge',
    keyShape: {
      stroke: '#F6BD16',
    },
    otherShapes: {},
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
