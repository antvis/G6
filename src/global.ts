import { getColorsWithSubjectColor } from './util/color';

const subjectColor = 'rgb(95, 149, 255)';
const backColor = 'rgb(255, 255, 255)';
const disableColor = 'rgb(150, 150, 150)';
const textColor = 'rgb(0, 0, 0)';

const colorSet = getColorsWithSubjectColor(subjectColor, backColor);

export default {
  version: '3.8.3',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  comboContainerClassName: 'combo-container',
  customGroupContainerClassName: 'custom-group-container',
  delegateContainerClassName: 'delegate-container',
  defaultLoopPosition: 'top',
  nodeLabel: {
    style: {
      fill: '#000',
      fontSize: 12,
      textAlign: 'center',
      textBaseline: 'middle',
    },
    offset: 4, // 节点的默认文本不居中时的偏移量
  },
  defaultNode: {
    type: 'circle',
    style: {
      lineWidth: 1,
      stroke: colorSet.mainStroke,
      fill: colorSet.mainFill
    },
    size: 20,
    color: colorSet.mainStroke,
    linkPoints: {
      size: 8,
      lineWidth: 1,
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke,
    }
  },
  // 节点应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  nodeStateStyles: {
    active: {
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke,
      lineWidth: 2,
      shadowColor: colorSet.mainStroke,
      shadowBlur: 10,
    },
    selected: {
      fill: colorSet.selectedFill,
      stroke: colorSet.selectedStroke,
      lineWidth: 4,
      shadowColor: colorSet.selectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500
      },
    },
    highlight: {
      fill: colorSet.highlightFill,
      stroke: colorSet.highlightStroke,
      lineWidth: 2,
      'text-shape': {
        fontWeight: 500
      }
    },
    inactive: {
      fill: colorSet.inactiveFill,
      stroke: colorSet.inactiveStroke,
      lineWidth: 1,
      'text-shape': {
        fontWeight: 500
      }
    },
    disable: {
      fill: colorSet.disableFill,
      stroke: colorSet.disableStroke,
      lineWidth: 1,
    },
  },
  edgeLabel: {
    style: {
      fill: textColor,
      textAlign: 'center',
      textBaseline: 'middle',
    },
  },
  defaultEdge: {
    type: 'line',
    style: {
      stroke: disableColor,
    },
    size: 1,
    color: disableColor,
  },
  comboLabel: {
    style: {
      fill: textColor,
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
