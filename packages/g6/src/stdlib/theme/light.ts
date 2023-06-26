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

export default {
  node: {
    palette: [
      '#4089FF',
      '#CD75FF',
      '#06B8A8',
      '#FF8834',
      '#5888C3',
      '#FA73CD',
      '#07BCE0',
      '#CB962A',
      '#23AD61',
      '#FF8075',
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
            fill: '#000',
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
            fill: '#fff',
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
            stroke: 'rgba(0, 0, 0, 0.65)',
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
          },
        },
        selected: {
          keyShape: {
            stroke: '#000',
            lineWidth: 3,
          },
          labelShape: {
            fontWeight: 700,
          },
          haloShape: {
            opacity: 0.25,
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
            opacity: 0.25,
          },
          labelShape: {
            opacity: 0.25,
          },
          iconShape: {
            opacity: 0.25,
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
      '#99ADD1',
      '#4089FF',
      '#CD75FF',
      '#06B8A8',
      '#FF8834',
      '#5888C3',
      '#FA73CD',
      '#07BCE0',
      '#CB962A',
      '#23AD61',
      '#FF8075',
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
            zIndex: 1,
          },
          labelShape: {
            ...DEFAULT_TEXT_STYLE,
            fill: textColor,
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
            fill: '#fff',
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
            lineWidth: 1,
          },
        },
      },
    ],
  },
  canvas: {
    backgroundColor: '#fff',
  },
} as ThemeSpecification;
