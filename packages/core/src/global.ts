const subjectColor = 'rgb(95, 149, 255)';
const backColor = 'rgb(255, 255, 255)';
const textColor = 'rgb(0, 0, 0)';

const activeFill = 'rgb(247, 250, 255)';
const nodeMainFill = 'rgb(239, 244, 255)';
const comboFill = 'rgb(253, 253, 253)';
const disabledFill = 'rgb(250, 250, 250)';

const edgeMainStroke = 'rgb(224, 224, 224)';
const edgeInactiveStroke = 'rgb(234, 234, 234)';
const edgeDisablesStroke = 'rgb(245, 245, 245)';
const inactiveStroke = 'rgb(191, 213, 255)';

const highlightStroke = '#4572d9';
const highlightFill = 'rgb(223, 234, 255)';

const colorSet = {
  // for nodes
  mainStroke: subjectColor,
  mainFill: nodeMainFill,

  activeStroke: subjectColor,
  activeFill,

  inactiveStroke,
  inactiveFill: activeFill,

  selectedStroke: subjectColor,
  selectedFill: backColor,

  highlightStroke,
  highlightFill,

  disableStroke: edgeMainStroke,
  disableFill: disabledFill,

  // for edges
  edgeMainStroke,
  edgeActiveStroke: subjectColor,
  edgeInactiveStroke,
  edgeSelectedStroke: subjectColor,
  edgeHighlightStroke: subjectColor,
  edgeDisableStroke: edgeDisablesStroke,

  // for combos
  comboMainStroke: edgeMainStroke,
  comboMainFill: comboFill,

  comboActiveStroke: subjectColor,
  comboActiveFill: activeFill,

  comboInactiveStroke: edgeMainStroke,
  comboInactiveFill: comboFill,

  comboSelectedStroke: subjectColor,
  comboSelectedFill: comboFill,

  comboHighlightStroke: highlightStroke, // 'rgb(53, 119, 222)', // TODO: how to generate it ???
  comboHighlightFill: comboFill,

  comboDisableStroke: edgeInactiveStroke,
  comboDisableFill: disabledFill,
};

export default {
  version: '0.8.9',
  rootContainerClassName: 'root-container',
  nodeContainerClassName: 'node-container',
  edgeContainerClassName: 'edge-container',
  comboContainerClassName: 'combo-container',
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
      fill: nodeMainFill,
    },
    size: 20,
    color: colorSet.mainStroke,
    linkPoints: {
      size: 8,
      lineWidth: 1,
      fill: colorSet.activeFill,
      stroke: colorSet.activeStroke,
    },
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
        fontWeight: 500,
      },
    },
    highlight: {
      fill: colorSet.highlightFill,
      stroke: colorSet.highlightStroke,
      lineWidth: 2,
      'text-shape': {
        fontWeight: 500,
      },
    },
    inactive: {
      fill: colorSet.inactiveFill,
      stroke: colorSet.inactiveStroke,
      lineWidth: 1,
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
      fontSize: 12,
    },
  },
  defaultEdge: {
    type: 'line',
    size: 1,
    style: {
      stroke: colorSet.edgeMainStroke,
      lineAppendWidth: 2,
    },
    color: colorSet.edgeMainStroke,
  },
  // 边应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  edgeStateStyles: {
    active: {
      stroke: colorSet.edgeActiveStroke,
      lineWidth: 1,
    },
    selected: {
      stroke: colorSet.edgeSelectedStroke,
      lineWidth: 2,
      shadowColor: colorSet.edgeSelectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500,
      },
    },
    highlight: {
      stroke: colorSet.edgeHighlightStroke,
      lineWidth: 2,
      'text-shape': {
        fontWeight: 500,
      },
    },
    inactive: {
      stroke: colorSet.edgeInactiveStroke,
      lineWidth: 1,
    },
    disable: {
      stroke: colorSet.edgeDisableStroke,
      lineWidth: 1,
    },
  },
  comboLabel: {
    style: {
      fill: textColor,
      // textAlign: 'center',
      textBaseline: 'middle',
      fontSize: 12,
    },
    refY: 10, // Combo 的默认文本不居中时的偏移量
    refX: 10, // Combo 的默认文本不居中时的偏移量
  },
  defaultCombo: {
    type: 'circle',
    style: {
      fill: colorSet.comboMainFill,
      lineWidth: 1,
      stroke: colorSet.comboMainStroke,
      r: 5,
      width: 20,
      height: 10,
    },
    size: [20, 5],
    color: colorSet.comboMainStroke,
    padding: [25, 20, 15, 20],
  },
  // combo 应用状态后的样式，默认仅提供 active、selected、highlight、inactive、disable，用户可以自己扩展
  comboStateStyles: {
    active: {
      stroke: colorSet.comboActiveStroke,
      lineWidth: 1,
      fill: colorSet.comboActiveFill,
    },
    selected: {
      stroke: colorSet.comboSelectedStroke,
      lineWidth: 2,
      fill: colorSet.comboSelectedFill,
      shadowColor: colorSet.comboSelectedStroke,
      shadowBlur: 10,
      'text-shape': {
        fontWeight: 500,
      },
    },
    highlight: {
      stroke: colorSet.comboHighlightStroke,
      lineWidth: 2,
      fill: colorSet.comboHighlightFill,
      'text-shape': {
        fontWeight: 500,
      },
    },
    inactive: {
      stroke: colorSet.comboInactiveStroke,
      fill: colorSet.comboInactiveFill,
      lineWidth: 1,
    },
    disable: {
      stroke: colorSet.comboDisableStroke,
      fill: colorSet.comboDisableFill,
      lineWidth: 1,
    },
  },
  delegateStyle: {
    fill: '#F3F9FF',
    fillOpacity: 0.5,
    stroke: '#1890FF',
    strokeOpacity: 0.9,
    lineDash: [5, 5],
  },
  windowFontFamily:
    typeof window !== 'undefined' && window.getComputedStyle && document.body
      ? window.getComputedStyle(document.body, null).getPropertyValue('font-family') ||
        'Arial, sans-serif'
      : 'Arial, sans-serif',
};
