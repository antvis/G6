export default {
  version: '3.4.10',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  customGroupContainerClassName: 'custom-group-container',
  delegateContainerClassName: 'delegate-container',
  defaultShapeFillColor: '#C6E5FF',
  defaultShapeStrokeColor: '#5B8FF9',
  defaultLoopPosition: 'top',
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle',
    },
    offset: 5, // 节点的默认文本不居中时的偏移量
  },
  defaultNode: {
    type: 'circle',
    style: {
      fill: '#C6E5FF',
      lineWidth: 1,
      stroke: '#5B8FF9',
    },
    size: 20,
    color: '#5B8FF9',
  },
  edgeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle',
    },
  },
  defaultEdge: {
    type: 'line',
    style: {
      stroke: '#e2e2e2',
    },
    size: 1,
    color: '#e2e2e2',
  },
  // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
  nodeStateStyle: {},
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5],
  },
};
