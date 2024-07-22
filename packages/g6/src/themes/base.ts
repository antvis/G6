import type { CategoricalPalette } from '../palettes/types';
import type { PaletteOptions } from '../spec/element/palette';
import type { Theme } from './types';

const BADGE_PALETTE: CategoricalPalette = ['#7E92B5', '#F4664A', '#FFBE3A'];

const NODE_PALETTE_OPTIONS: PaletteOptions = {
  type: 'group',
  color: ['#1783FF', '#00C9C9', '#F08F56', '#D580FF', '#7863FF', '#DB9D0D', '#60C42D', '#FF80CA', '#2491B3', '#17C76F'],
};

const EDGE_PALETTE_OPTIONS: PaletteOptions = {
  type: 'group',
  color: [
    '#99ADD1',
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
};

type ThemeTokens = {
  bgColor: string;
  textColor: string;
  nodeColor: string;
  nodeColorDisabled: string;
  nodeStroke: string;
  nodeBadgePalette?: string[];
  nodePaletteOptions?: PaletteOptions;
  nodeHaloStrokeOpacityActive?: number;
  nodeHaloStrokeOpacitySelected?: number;
  nodeOpacityDisabled?: number;
  nodeOpacityInactive?: number;
  nodeIconOpacityInactive?: number;
  donutPaletteOptions?: PaletteOptions;
  edgeColor: string;
  edgeColorDisabled: string;
  edgeColorInactive: string;
  edgePaletteOptions?: PaletteOptions;
  comboColor: string;
  comboColorDisabled: string;
  comboStroke: string;
  comboStrokeDisabled: string;
};

/**
 * <zh/> 创建主题
 *
 * <en/> Create a theme based on the given tokens
 * @param tokens - <zh/> 主题配置项 <en/> Theme tokens
 * @returns <zh/> 主题 <en/> Theme
 */
export function create(tokens: ThemeTokens): Theme {
  const {
    bgColor,
    textColor,
    nodeColor,
    nodeColorDisabled,
    nodeStroke,
    nodeHaloStrokeOpacityActive = 0.15,
    nodeHaloStrokeOpacitySelected = 0.25,
    nodeOpacityDisabled = 0.06,
    nodeIconOpacityInactive = 0.85,
    nodeOpacityInactive = 0.25,
    nodeBadgePalette = BADGE_PALETTE,
    nodePaletteOptions = NODE_PALETTE_OPTIONS,
    edgeColor,
    edgeColorDisabled,
    edgePaletteOptions = EDGE_PALETTE_OPTIONS,
    comboColor,
    comboColorDisabled,
    comboStroke,
    comboStrokeDisabled,
    edgeColorInactive,
  } = tokens;

  return {
    background: bgColor,
    node: {
      palette: nodePaletteOptions,
      style: {
        donutOpacity: 1,
        badgeBackgroundOpacity: 1,
        badgeFill: '#fff',
        badgeFontSize: 8,
        badgePadding: [0, 4],
        badgePalette: nodeBadgePalette,
        fill: nodeColor,
        fillOpacity: 1,
        halo: false,
        iconFill: '#fff',
        iconOpacity: 1,
        labelBackground: false,
        labelBackgroundFill: bgColor,
        labelBackgroundLineWidth: 0,
        labelBackgroundOpacity: 0.75,
        labelFill: textColor,
        labelFillOpacity: 0.85,
        labelLineHeight: 16,
        labelPadding: [0, 2],
        labelFontSize: 12,
        labelFontWeight: 400,
        labelOpacity: 1,
        labelOffsetY: 2,
        lineWidth: 0,
        portFill: nodeColor,
        portLineWidth: 1,
        portStroke: nodeStroke,
        portStrokeOpacity: 0.65,
        size: 32,
        stroke: nodeStroke,
        strokeOpacity: 1,
        zIndex: 2,
      },
      state: {
        selected: {
          halo: true,
          haloLineWidth: 24,
          haloStrokeOpacity: nodeHaloStrokeOpacitySelected,
          labelFontSize: 12,
          labelFontWeight: 'bold',
          lineWidth: 4,
          stroke: nodeStroke,
        },
        active: {
          halo: true,
          haloLineWidth: 12,
          haloStrokeOpacity: nodeHaloStrokeOpacityActive,
        },
        highlight: {
          labelFontWeight: 'bold',
          lineWidth: 4,
          stroke: nodeStroke,
          strokeOpacity: 0.85,
        },
        inactive: {
          badgeBackgroundOpacity: nodeOpacityInactive,
          donutOpacity: nodeOpacityInactive,
          fillOpacity: nodeOpacityInactive,
          iconOpacity: nodeIconOpacityInactive,
          labelFill: textColor,
          labelFillOpacity: nodeOpacityInactive,
          strokeOpacity: nodeOpacityInactive,
        },
        disabled: {
          badgeBackgroundOpacity: 0.25,
          donutOpacity: nodeOpacityDisabled,
          fill: nodeColorDisabled,
          fillOpacity: nodeOpacityDisabled,
          iconFill: nodeColorDisabled,
          iconOpacity: 0.25,
          labelFill: textColor,
          labelFillOpacity: 0.25,
          strokeOpacity: nodeOpacityDisabled,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        show: 'fade',
        hide: 'fade',
        expand: 'node-expand',
        collapse: 'node-collapse',
        update: [{ fields: ['x', 'y', 'fill', 'stroke'] }],
        translate: [{ fields: ['x', 'y'] }],
      },
    },
    edge: {
      palette: edgePaletteOptions,
      style: {
        badgeBackgroundFill: edgeColor,
        badgeFill: '#fff',
        badgeFontSize: 8,
        badgeOffsetX: 10,
        fillOpacity: 1,
        halo: false,
        haloLineWidth: 12,
        haloStrokeOpacity: 1,
        increasedLineWidthForHitTesting: 2,
        labelBackground: false,
        labelBackgroundFill: bgColor,
        labelBackgroundLineWidth: 0,
        labelBackgroundOpacity: 0.75,
        labelBackgroundPadding: [4, 4, 4, 4],
        labelFill: textColor,
        labelFontSize: 12,
        labelFontWeight: 400,
        labelOpacity: 1,
        labelPlacement: 'center',
        labelTextBaseline: 'middle',
        lineWidth: 1,
        stroke: edgeColor,
        strokeOpacity: 1,
        zIndex: 1,
      },
      state: {
        selected: {
          halo: true,
          haloStrokeOpacity: 0.25,
          labelFontSize: 14,
          labelFontWeight: 'bold',
          lineWidth: 3,
        },
        active: {
          halo: true,
          haloStrokeOpacity: 0.15,
        },
        highlight: {
          labelFontWeight: 'bold',
          lineWidth: 3,
        },
        inactive: {
          stroke: edgeColorInactive,
          fillOpacity: 0.08,
          labelOpacity: 0.25,
          strokeOpacity: 0.08,
          badgeBackgroundOpacity: 0.25,
        },
        disabled: {
          stroke: edgeColorDisabled,
          fillOpacity: 0.45,
          strokeOpacity: 0.45,
          labelOpacity: 0.25,
          badgeBackgroundOpacity: 0.45,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        expand: 'path-in',
        collapse: 'path-out',
        show: 'fade',
        hide: 'fade',
        update: [{ fields: ['sourceNode', 'targetNode'] }, { fields: ['stroke'], shape: 'key' }],
        translate: [{ fields: ['sourceNode', 'targetNode'] }],
      },
    },
    combo: {
      style: {
        collapsedMarkerFill: bgColor,
        collapsedMarkerFontSize: 12,
        collapsedMarkerFillOpacity: 1,
        collapsedSize: 32,
        collapsedFillOpacity: 1,
        fill: comboColor,
        halo: false,
        haloLineWidth: 12,
        haloStroke: comboStroke,
        haloStrokeOpacity: 0.25,
        labelBackground: false,
        labelBackgroundFill: bgColor,
        labelBackgroundLineWidth: 0,
        labelBackgroundOpacity: 0.75,
        labelBackgroundPadding: [2, 4, 2, 4],
        labelFill: textColor,
        labelFontSize: 12,
        labelFontWeight: 400,
        labelOpacity: 1,
        lineDash: 0,
        lineWidth: 1,
        fillOpacity: 0.04,
        strokeOpacity: 1,
        padding: 10,
        stroke: comboStroke,
      },
      state: {
        selected: {
          halo: true,
          labelFontSize: 14,
          labelFontWeight: 700,
          lineWidth: 4,
        },
        active: {
          halo: true,
        },
        highlight: {
          labelFontWeight: 700,
          lineWidth: 4,
        },
        inactive: {
          fillOpacity: 0.65,
          labelOpacity: 0.25,
          strokeOpacity: 0.65,
        },
        disabled: {
          fill: comboColorDisabled,
          fillOpacity: 0.25,
          labelOpacity: 0.25,
          stroke: comboStrokeDisabled,
          strokeOpacity: 0.25,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        show: 'fade',
        hide: 'fade',
        expand: 'combo-expand',
        collapse: 'combo-collapse',
        update: [{ fields: ['x', 'y'] }, { fields: ['fill', 'stroke', 'lineWidth'], shape: 'key' }],
        translate: [{ fields: ['x', 'y'] }],
      },
    },
  };
}
