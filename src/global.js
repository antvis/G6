/**
 * @fileOverview global config
 * @author huangtonger@aliyun.com
 */

module.exports = {
  nodeSize: 40,
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  edgeSize: 2,
  nodeColor: '#333',
  edgeColor: '#333',
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
    },
    refX: 0, // 沿着边的切线方向的偏移
    refY: 0,  // 垂直于边的方向的偏移
    autoRotate: false // 是否自动旋转，保证文本沿着边的切线方向
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
  labelStateStyle: {
    active: {
      fillOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  }
};
