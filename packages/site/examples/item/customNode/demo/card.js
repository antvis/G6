import { Graph, Extensions, extend, stdLib } from '@antv/g6';

const container = document.getElementById('container');
const width = container.scrollWidth;
const height = container.scrollHeight || 500;

const ERROR_COLOR = '#F5222D';

const getNodeConfig = (node) => {
  if (node.nodeError) {
    return {
      basicColor: ERROR_COLOR,
      fontColor: '#FFF',
      borderColor: ERROR_COLOR,
      bgColor: '#E66A6C',
    };
  }
  let config = {
    basicColor: '#5B8FF9',
    fontColor: '#5B8FF9',
    borderColor: '#5B8FF9',
    bgColor: '#C6E5FF',
  };
  switch (node.type) {
    case 'root': {
      config = {
        basicColor: '#E3E6E8',
        fontColor: 'rgba(0,0,0,0.85)',
        borderColor: '#E3E6E8',
        bgColor: '#5b8ff9',
      };
      break;
    }
    default:
      break;
  }
  return config;
};

class CardNode extends Extensions.RectNode {
  drawOtherShapes(model, shapeMap, diffData, diffState) {
    return shapeMap;
  }
}

const ExtGraph = extend(Graph, {
  nodes: {
    'card-node': CardNode,
  },
});

const graph = new ExtGraph({
  container: 'container',
  width,
  height,
  autoFit: 'view',
  modes: {
    default: ['drag-node'],
  },
  data: {
    nodes: [
      {
        id: 'node1',
        data: {
          x: 100,
          y: 50,
          otherShapes: {
            name: 'cardNodeApp',
            ip: '127.0.0.1',
            nodeError: true,
            dataType: 'root',
            keyInfo: 'this is a card node info',
          },
        },
      },
      {
        id: 'node2',
        data: {
          x: 100,
          y: 200,
          otherShapes: {
            nodeType: 'b',
            title: 'node2',
            error: false,
            nodeLevel: 0,
            panels: [
              { title: '成功率', value: '11%' },
              { title: '耗时', value: '111' },
              { title: '错误数', value: '111' },
            ],
          },
        },
      },
      {
        id: 'node3',
        data: {
          x: 100,
          y: 300,
          otherShapes: {
            title: 'node3',
            error: false,
            nodeType: 'a',
            nodeLevel: 3,
            panels: [
              { title: '成功率', value: '11%' },
              { title: '耗时', value: '111' },
              { title: '错误数', value: '111' },
            ],
            collapse: true,
          },
        },
      },
    ],
  },
  node: (nodeInnerModel) => {
    const { id, data } = nodeInnerModel;
    const color = data.otherShapes.error ? '#F4664A' : '#30BF78';
    const r = 2;
    return {
      id,
      data: {
        ...data,
        type: 'card-node',
        keyShape: {
          width: 200,
          height: 60,
          fill: '#fff',
          lineWidth: 1,
          stroke: color,
          radius: r,
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
