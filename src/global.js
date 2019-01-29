/**
 * @fileOverview global config
 * @author huangtonger@aliyun.com
 */

module.exports = {
  version: '3.0.0-beta.11',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  defaultNode: {
    style: {
      fill: '#fff'
    },
    size: 40,
    color: '#333'
  },
  defaultEdge: {
    style: {},
    size: 2,
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
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [ 5, 5 ]
  }
};
