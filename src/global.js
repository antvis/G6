/**
 * @fileOverview global config
 * @author huangtonger@aliyun.com
 */

module.exports = {
  nodeSize: 40,
  edgeSize: 2,
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 5 // 节点的默认文本不居中时的偏移量
  },
  // 节点应用状态后的样式，默认仅提供 active 和 selected 用户可以自己扩展
  nodeStateStyle: {
    active: {
      fillOpacity: 0.8
    },
    selected: {
      lineWidth: 2
    }
  }
};
