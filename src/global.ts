export default {
  version: '3.3.0',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  customGroupContainerClassName: 'custom-group-container',
  delegateContainerClassName: 'delegate-container',
  defaultLoopPosition: 'top',
  nodeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    },
    offset: 5 // 节点的默认文本不居中时的偏移量
  },
  defaultNode: {
    shape: 'circle',
    style: {
      fill: '#fff'
    },
    size: 40,
    color: '#333'
  },
  edgeLabel: {
    style: {
      fill: '#595959',
      textAlign: 'center',
      textBaseline: 'middle'
    }
  },
  defaultEdge: {
    shape: 'line',
    style: {},
    size: 1,
    color: '#333'
  },
}