export default {
  version: '3.8.3',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  comboContainerClassName: 'combo-container',
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
  comboLabel: {
    style: {
      fill: '#595959',
      // textAlign: 'center',
      textBaseline: 'middle',
    },
    refY: 10, // Combo 的默认文本不居中时的偏移量
    refX: 10, // Combo 的默认文本不居中时的偏移量
  },
  defaultCombo: {
    type: 'circle',
    style: {
      fill: '#F3F9FF',
      lineWidth: 1,
      stroke: '#A3B1BF',
      opacity: 0.8,
      r: 5,
      width: 20,
      height: 10,
    },
    size: [20, 5],
    color: '#A3B1BF',
    padding: [25, 20, 15, 20],
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
  // 文本水印默认配置
  textWaterMarkerConfig: {
    width: 150,
    height: 100,
    compatible: false,
    text: {
      x: 0,
      y: 60,
      lineHeight: 20,
      rotate: 20,
      fontSize: 14,
      fontFamily: 'Microsoft YaHei',
      fill: 'rgba(0, 0, 0, 0.1)',
      baseline: 'Middle'
    },
  },
  imageWaterMarkerConfig: {
    width: 150,
    height: 130,
    compatible: false,
    image: {
      x: 0,
      y: 0,
      width: 30,
      height: 20,
      rotate: 0
    }
  },
  waterMarkerImage: 'https://gw.alipayobjects.com/os/s/prod/antv/assets/image/logo-with-text-73b8a.svg'
};
