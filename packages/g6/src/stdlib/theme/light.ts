import { DEFAULT_SHAPE_STYLE, DEFAULT_TEXT_STYLE } from '../../constant';
import { ThemeSpecification } from '../../types/theme';

const subjectColor = 'rgb(34,126,255)';
const textColor = 'rgba(0,0,0,0.85)';

const nodeColor = 'rgb(34,126,255)';
const edgeColor = 'rgb(153, 173, 209)';
const comboFill = 'rgb(253, 253, 253)';
const disabledFill = 'rgb(240, 240, 240)';

const edgeMainStroke = 'rgb(153, 173, 209)';
const edgeDisableStroke = 'rgb(217, 217, 217)';
const edgeInactiveStroke = 'rgb(210, 218, 233)';

const nodeStroke = 'rgba(0,0,0,0.85)';
const haloStroke = 'rgb(0, 0, 0)';

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
    zoomStrategy: {
      levels: [
        { range: [0, 0.16] },
        { range: [0.16, 0.2] },
        { range: [0.2, Infinity], primary: true },
      ],
      animateCfg: {
        duration: 500,
      },
    },
    // zoomStrategy: {
    //   levels: [
    //     { range: [0, 0.65] },
    //     { range: [0.65, 0.8] },
    //     { range: [0.8, 1.6], primary: true },
    //     { range: [1.6, 2] },
    //     { range: [2, Infinity] },
    //   ],
    //   animateCfg: {
    //     duration: 200,
    //   },
    // },
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
            fill: '#000',
            position: 'bottom',
            zIndex: 2,
            showLevel: 0,
            maxWidth: '200%',
            textOverflow: 'ellipsis',
            wordWrap: true,
            maxLines: 1,
          },
          labelBackgroundShape: {
            padding: [2, 4, 2, 4],
            lineWidth: 0,
            fill: '#fff',
            opacity: 0.75,
            zIndex: -1,
            showLevel: 0,
          },
          iconShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: '#fff',
            fontSize: 16,
            zIndex: 1,
            showLevel: -1,
          },
          anchorShapes: {
            lineWidth: 1,
            stroke: 'rgba(0, 0, 0, 0.65)',
            zIndex: 2,
            r: 3,
            showLevel: 0,
          },
          badgeShapes: {
            color: 'rgb(140, 140, 140)',
            textColor: '#fff',
            zIndex: 3,
            showLevel: -1,
          },
        },
        selected: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 3,
          },
          labelShape: {
            fontWeight: 500,
          },
          haloShape: {
            stroke: haloStroke,
            opacity: 0.06,
            lineWidth: 20,
          },
        },
        active: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 2,
          },
          haloShape: {
            stroke: haloStroke,
            opacity: 0.06,
            lineWidth: 4,
            zIndex: -1,
          },
        },
        highlight: {
          keyShape: {
            stroke: nodeStroke,
            lineWidth: 3,
          },
          labelShape: {
            fontWeight: 500,
          },
        },
        inactive: {
          keyShape: {
            opacity: 0.25,
          },
          labelShape: {
            opacity: 0.25,
          },
          iconShape: {
            opacity: 0.25,
          },
        },
        disable: {
          keyShape: {
            fill: disabledFill,
            lineWidth: 0,
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
    zoomStrategy: {
      levels: [
        { range: [0, 0.65] },
        { range: [0.65, 0.8] },
        { range: [0.8, 1.6], primary: true },
        { range: [1.6, 2] },
        { range: [2, Infinity] },
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
            position: 'middle',
            textBaseline: 'middle',
            zIndex: 2,
            textOverflow: 'ellipsis',
            wordWrap: true,
            maxLines: 1,
            maxWidth: '60%',
            showLevel: 0,
          },
          labelBackgroundShape: {
            padding: [4, 4, 4, 4],
            lineWidth: 0,
            fill: '#fff',
            opacity: 0.75,
            zIndex: 1,
            showLevel: 0,
          },
          iconShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: 'rgb(140, 140, 140)',
            fontSize: 16,
            zIndex: 2,
            offsetX: -10,
            showLevel: -1,
          },
        },
        selected: {
          keyShape: {
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 500,
          },
          haloShape: {
            stroke: haloStroke,
            opacity: 0.06,
            lineWidth: 12,
            zIndex: -1,
          },
        },
        active: {
          keyShape: {
            lineWidth: 1,
          },
          haloShape: {
            stroke: haloStroke,
            opacity: 0.06,
            lineWidth: 12,
            zIndex: -1,
          },
        },
        highlight: {
          keyShape: {
            lineWidth: 2,
          },
          labelShape: {
            fontWeight: 500,
          },
        },
        inactive: {
          keyShape: {
            stroke: edgeInactiveStroke,
            lineWidth: 1,
          },
        },
        disable: {
          keyShape: {
            stroke: edgeDisableStroke,
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
            fontWeight: 500,
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
            fontWeight: 500,
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
            lineWidth: 1,
          },
        },
      },
    ],
  },
  canvas: {
    backgroundColor: '#000',
  },
} as ThemeSpecification;
