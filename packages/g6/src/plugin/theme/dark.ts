import { DEFAULT_SHAPE_STYLE, DEFAULT_TEXT_STYLE } from '../../constant';
import { ThemeSpecification } from '../../types/theme';

const subjectColor = 'rgb(23,131,255)';
const textColor = 'rgba(255,255,255,0.85)';

const nodeColor = 'rgb(23,131,255)';
const edgeColor = 'rgb(153, 173, 209)';
const comboFill = 'rgb(253, 253, 253)';
const comboStroke = 'rgba(153,173,209,1)';
const disabledFill = '#D0E4FF';

const edgeMainStroke = '#637088';

const nodeStroke = '#D0E4FF';

export const DarkTheme = {
  node: {
    palette: [
      '#1783FF',
      '#00C9C9',
      '#F08F56',
      '#D580FF',
      '#7863FF',
      '#DB9D0D',
      '#60C42D',
      '#FF80CA',
      '#2491B3',
      '#17C76F',
    ],
    lodLevels: [
      { zoomRange: [0, 0.65] },
      { zoomRange: [0.65, 0.8] },
      { zoomRange: [0.8, 1.6], primary: true },
      { zoomRange: [1.6, 2] },
      { zoomRange: [2, Infinity] },
    ],
    styles: [
      {
        default: {
          keyShape: {
            ...DEFAULT_SHAPE_STYLE,
            r: 16,
            fill: nodeColor,
            lineWidth: 0,
            zIndex: 0,
          },
          labelShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: textColor,
            opacity: 0.85,
            position: 'bottom',
            zIndex: 2,
            lod: 0,
            maxWidth: '200%',
            textOverflow: 'ellipsis',
            wordWrap: true,
            maxLines: 1,
          },
          labelBackgroundShape: {
            padding: [2, 4, 2, 4],
            lineWidth: 0,
            fill: '#000',
            opacity: 0.75,
            zIndex: 1,
            lod: 0,
          },
          iconShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: '#fff',
            fontSize: 16,
            zIndex: 1,
            lod: -1,
          },
          anchorShapes: {
            lineWidth: 1,
            stroke: nodeStroke,
            fill: '#000',
            zIndex: 2,
            r: 3,
            lod: 0,
          },
          badgeShapes: {
            palette: ['#7E92B5', '#F86254', '#EDB74B'],
            textColor: '#fff',
            zIndex: 3,
            lod: -1,
          },
          haloShape: {
            visible: false,
            droppable: false,
          },
        },
        selected: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 3,
          },
          labelShape: {
            fontWeight: 700,
          },
          haloShape: {
            opacity: 0.45,
            lineWidth: 12,
            zIndex: -1,
            pointerEvents: 'none',
            visible: true,
            droppable: false,
          },
        },
        active: {
          keyShape: {
            lineWidth: 0,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            zIndex: -1,
            pointerEvents: 'none',
            visible: true,
            droppable: false,
          },
        },
        highlight: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 3,
          },
          labelShape: {
            fontWeight: 700,
          },
          haloShape: {
            visible: false,
            droppable: false,
          },
        },
        inactive: {
          keyShape: {
            opacity: 0.45,
          },
          labelShape: {
            opacity: 0.45,
          },
          iconShape: {
            opacity: 0.45,
          },
          haloShape: {
            visible: false,
            droppable: false,
          },
        },
        disable: {
          keyShape: {
            fill: disabledFill,
            lineWidth: 0,
          },
          haloShape: {
            visible: false,
            droppable: false,
          },
        },
      },
    ],
  },
  edge: {
    palette: [
      '#637088',
      '#0F55A6',
      '#008383',
      '#9C5D38',
      '#8B53A6',
      '#4E40A6',
      '#8F6608',
      '#3E801D',
      '#A65383',
      '#175E75',
      '#0F8248',
    ],
    lodLevels: [
      { zoomRange: [0, 0.65] },
      { zoomRange: [0.65, 0.8] },
      { zoomRange: [0.8, 1.6], primary: true },
      { zoomRange: [1.6, 2] },
      { zoomRange: [2, Infinity] },
    ],
    styles: [
      {
        default: {
          keyShape: {
            ...DEFAULT_SHAPE_STYLE,
            lineWidth: 1,
            stroke: edgeMainStroke,
            increasedLineWidthForHitTesting: 2,
            zIndex: 1,
          },
          labelShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: textColor,
            opacity: 0.85,
            position: 'middle',
            textBaseline: 'middle',
            zIndex: 3,
            textOverflow: 'ellipsis',
            wordWrap: true,
            maxLines: 1,
            maxWidth: '60%',
            lod: 0,
          },
          labelBackgroundShape: {
            padding: [4, 4, 4, 4],
            lineWidth: 0,
            fill: '#000',
            opacity: 0.75,
            zIndex: 2,
            lod: 0,
          },
          iconShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: 'rgb(140, 140, 140)',
            fontSize: 16,
            zIndex: 2,
            offsetX: -10,
            lod: -1,
          },
        },
        selected: {
          keyShape: {
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 700,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            zIndex: -1,
            pointerEvents: 'none',
            visible: true,
            droppable: false,
          },
        },
        active: {
          keyShape: {
            lineWidth: 1,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            zIndex: -1,
            pointerEvents: 'none',
            visible: true,
            droppable: false,
          },
        },
        highlight: {
          keyShape: {
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 700,
          },
        },
        inactive: {
          keyShape: {
            stroke: edgeMainStroke,
            lineWidth: 1,
            opacity: 0.45,
          },
        },
        disable: {
          keyShape: {
            stroke: edgeMainStroke,
            opacity: 0.08,
            lineWidth: 1,
          },
        },
      },
    ],
  },
  // TODO
  combo: {
    lodLevels: [
      { zoomRange: [0, 0.65] },
      { zoomRange: [0.65, 0.8] },
      { zoomRange: [0.8, 1.6], primary: true },
      { zoomRange: [1.6, 2] },
      { zoomRange: [2, Infinity] },
    ],
    styles: [
      {
        default: {
          keyShape: {
            ...DEFAULT_SHAPE_STYLE,
            fill: comboFill,
            lineWidth: 1,
            stroke: edgeMainStroke,
            r: 5,
            width: 20,
            height: 10,
            padding: [25, 20, 15, 20],
          },
          labelShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: textColor,
            opacity: 0.85,
            position: 'bottom',
            zIndex: 2,
            lod: 0,
            maxLines: 1,
          },
          labelBackgroundShape: {
            padding: [2, 4, 2, 4],
            lineWidth: 0,
            fill: '#000',
            opacity: 0.75,
            zIndex: 1,
            lod: 0,
          },
        },
        selected: {
          keyShape: {
            stroke: nodeStroke,
            fill: comboFill,
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 700,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            pointerEvents: 'none',
            zIndex: -1,
            visible: true,
            stroke: comboStroke,
            droppable: false,
          },
        },
        active: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 1,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 12,
            pointerEvents: 'none',
            zIndex: -1,
            visible: true,
            stroke: comboStroke,
            droppable: false,
          },
        },
        highlight: {
          keyShape: {
            stroke: nodeStroke,
            fill: comboFill,
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 700,
          },
        },
        inactive: {
          keyShape: {
            stroke: edgeMainStroke,
            fill: comboFill,
            lineWidth: 1,
          },
          labelShape: {
            opacity: 0.65,
          },
        },
        disable: {
          keyShape: {
            fill: disabledFill,
            opacity: 0.25,
          },
          iconShape: {
            fill: disabledFill,
            opacity: 0.25,
          },
          labelShape: {
            opacity: 0.25,
          },
        },
        collapsed: {
          keyShape: {
            ...DEFAULT_SHAPE_STYLE,
            fill: comboFill,
            lineWidth: 1,
            stroke: comboStroke,
            // the collapsed size
            r: 16,
            width: 48,
            height: 24,
            padding: [25, 20, 15, 20],
          },
          iconShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: comboStroke,
            fontSize: 12,
            zIndex: 1,
            lod: -1,
            contentType: 'childCount',
            visible: true,
          },
        },
      },
    ],
  },
  canvas: {
    backgroundColor: '#000',
  },
} as ThemeSpecification;
