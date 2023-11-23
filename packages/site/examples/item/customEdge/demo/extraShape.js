import { Graph, Extensions, extend } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

class CustomEdge extends Extensions.CubicEdge {
  afterDraw(model, shapeMap, diffData, diffState) {
    const data = model.data;
    const { keyShape } = shapeMap;
    const midPoint = keyShape.getPoint(0.5);
    shapeMap.midShape = this.upsertShape(
      'rect',
      'midShape',
      {
        width: 10,
        height: 10,
        x: midPoint.x - 5,
        y: midPoint.y - 5,
        fill: data.midShapeColor,
        ...model.data?.otherShapes?.midShape, // merged style from mappers and states
      },
      {
        model,
        shapeMap,
        diffData,
        diffState,
      },
    );
    // get the coordinate of the quatile on the path
    // 获取路径上的四分位点坐标
    const quatile = keyShape.getPoint(0.25);
    // add a circle on the quatile of the path
    // 在四分位点上放置一个圆形
    shapeMap.quatileShape = this.upsertShape(
      'circle',
      'quatileShape',
      {
        r: 5,
        cx: quatile.x,
        cy: quatile.y,
        zIndex: 1,
        fill: data.quatileShapeColor,
        ...model.data?.otherShapes?.quatileShape, // merged style from mappers and states
      },
      {
        model,
        shapeMap,
      },
    );
    return shapeMap;
  }
}

const ExtGraph = extend(Graph, {
  edges: {
    'custom-edge': CustomEdge,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  modes: {
    default: ['click-select'],
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
      {
        id: 'node3',
        data: {
          x: 300,
          y: 200,
        },
      },
    ],
    edges: [
      {
        id: 'edge1',
        source: 'node1',
        target: 'node2',
        data: {
          midShapeColor: '#f00',
          quatileShapeColor: '#f00',
        },
      },
      {
        id: 'edge2',
        source: 'node1',
        target: 'node3',
        data: {
          midShapeColor: '#0f0',
          quatileShapeColor: '#0f0',
        },
      },
    ],
  },
  edge: {
    type: 'custom-edge',
    otherShapes: {},
  },
});

if (typeof window !== 'undefined')
  window.onresize = () => {
    if (!graph || graph.destroyed) return;
    if (!container || !container.scrollWidth || !container.scrollHeight) return;
    graph.setSize([container.scrollWidth, container.scrollHeight]);
  };
