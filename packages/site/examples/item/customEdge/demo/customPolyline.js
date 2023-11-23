import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class CustomPolyline extends Extensions.LineEdge {
  getPath(sourcePoint, targetPoint) {
    return [
      ['M', sourcePoint.x, sourcePoint.y],
      ['L', targetPoint.x / 3 + (2 / 3) * sourcePoint.x, sourcePoint.y],
      ['L', targetPoint.x / 3 + (2 / 3) * sourcePoint.x, targetPoint.y],
      ['L', targetPoint.x, targetPoint.y],
    ];
  }

  drawKeyShape(model, sourcePoint, targetPoint, shapeMap, diffData, diffState) {
    const { keyShape: keyShapeStyle } = this.mergedStyles;
    const { startArrow, endArrow, ...others } = keyShapeStyle;
    const lineStyle = {
      ...others,
      path: this.getPath(sourcePoint, targetPoint),
      isBillboard: true,
    };
    this.upsertArrow('start', startArrow, others, model, lineStyle);
    this.upsertArrow('end', endArrow, others, model, lineStyle);
    return this.upsertShape('path', 'keyShape', lineStyle, {
      model,
      shapeMap,
      diffData,
      diffState,
    });
  }
}

const ExtGraph = extend(Graph, {
  edges: {
    'custom-polyline': CustomPolyline,
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
          x: 150,
          y: 100,
          r: 40,
          anchorPoints: [
            [1, 0.5],
            [1, 0],
          ],
        },
      },
      {
        id: 'node2',
        data: {
          x: 300,
          y: 200,
          r: 40,
          anchorPoints: [
            [0, 0.5],
            [0, 1],
          ],
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
      },
    ],
  },
  edge: (edgeInnerModel) => {
    const { id, data } = edgeInnerModel;
    return {
      id,
      data: {
        ...data,
        type: 'custom-polyline',
        keyShape: {
          lineWidth: 1,
          stroke: '#F6BD16',
          startArrow: {
            path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
            fill: '#F6BD16',
          },
          endArrow: {
            path: 'M 0,0 L 12,6 L 9,0 L 12,-6 Z',
            fill: '#F6BD16',
          },
        },
      },
    };
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
