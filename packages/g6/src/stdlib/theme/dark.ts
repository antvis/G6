import { DEFAULT_SHAPE_STYLE, DEFAULT_TEXT_STYLE } from '../../constant';
import { ThemeSpecification } from '../../types/theme';

const subjectColor = 'rgb(34,126,255)';
const textColor = 'rgba(255,255,255,0.85)';

const nodeColor = 'rgb(34,126,255)';
const edgeColor = 'rgb(153, 173, 209)';
const comboFill = 'rgb(253, 253, 253)';
const disabledFill = '#D0E4FF';

const edgeMainStroke = '#637088';

const nodeStroke = '#D0E4FF';

export default {
  node: {
    palette: [
      '#227EFF',
      '#AD5CFF',
      '#00B8B8',
      '#FA822D',
      '#F252AF',
      '#1EB8F5',
      '#108A44',
      '#F4B106',
      '#5241A8',
      '#95CF21',
    ],
    lodStrategy: {
      levels: [
        { zoomRange: [0, 0.65] },
        { zoomRange: [0.65, 0.8] },
        { zoomRange: [0.8, 1.6], primary: true },
        { zoomRange: [1.6, 2] },
        { zoomRange: [2, Infinity] },
      ],
      animateCfg: {
        duration: 200,
      },
    },
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
            zIndex: -1,
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
            color: 'rgb(140, 140, 140)',
            textColor: '#fff',
            zIndex: 3,
            lod: -1,
          },
          haloShape: {
            visible: false,
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
            lineWidth: 20,
            zIndex: -1,
            visible: true,
          },
        },
        active: {
          keyShape: {
            lineWidth: 0,
          },
          haloShape: {
            opacity: 0.25,
            lineWidth: 20,
            zIndex: -1,
            visible: true,
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
          },
        },
        disable: {
          keyShape: {
            fill: disabledFill,
            lineWidth: 0,
          },
          haloShape: {
            visible: false,
          },
        },
      },
    ],
  },
  edge: {
    palette: [
      '#63A4FF',
      '#CD9CFF',
      '#2DEFEF',
      '#FFBDA1',
      '#F49FD0',
      '#80DBFF',
      '#41CB7C',
      '#FFD362',
      '#A192E8',
      '#CEFB75',
    ],
    lodStrategy: {
      levels: [
        { zoomRange: [0, 0.65] },
        { zoomRange: [0.65, 0.8] },
        { zoomRange: [0.8, 1.6], primary: true },
        { zoomRange: [1.6, 2] },
        { zoomRange: [2, Infinity] },
      ],
      animateCfg: {
        duration: 200,
      },
    },
    styles: [
      {
        default: {
          keyShape: {
            ...DEFAULT_SHAPE_STYLE,
            lineWidth: 1,
            stroke: edgeMainStroke,
            increasedLineWidthForHitTesting: 2,
          },
          labelShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: textColor,
            opacity: 0.85,
            position: 'middle',
            textBaseline: 'middle',
            zIndex: 2,
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
            zIndex: 1,
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
            visible: true,
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
            visible: true,
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
        },
        active: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 1,
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
        },
      },
    ],
  },
  canvas: {
    backgroundColor: '#000',
  },
} as ThemeSpecification;
