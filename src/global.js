/**
 * @fileOverview global config
 */

module.exports = {
  version: '3.0.5-beta.6',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#fff'
    },
    size: 40,
    color: '#333'
  },
  defaultEdge: {
    shape: 'line',
    style: {},
    size: 1,
    color: '#333'
  },
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 5 // 节点的默认文本不居中时的偏移量
  },
  edgeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
  nodeStateStyle: {
    active: {
      fillOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  edgeStateStyle: {
    active: {
      strokeOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  },
  loopPosition: 'top',
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [ 5, 5 ]
  }
};
