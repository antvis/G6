import type { CategoricalPalette } from '../palettes/types';
import type { PaletteOptions } from '../spec/element/palette';
import type { Theme } from './types';

const BADGE_PALETTE: CategoricalPalette = ['#7E92B5', '#f5222d', '#faad14'];

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
  edgeColor: string;
  edgeColorDisabled: string;
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
    nodeBadgePalette = BADGE_PALETTE,
    nodePaletteOptions = NODE_PALETTE_OPTIONS,
    edgeColor,
    edgeColorDisabled,
    edgePaletteOptions = EDGE_PALETTE_OPTIONS,
    comboColor,
    comboColorDisabled,
    comboStroke,
    comboStrokeDisabled,
  } = tokens;

  return {
    background: bgColor,
    node: {
      palette: nodePaletteOptions,
      style: {
        badgeFill: bgColor,
        badgeFontSize: 8,
        badgePadding: [1, 4],
        badgePalette: nodeBadgePalette,
        color: nodeColor,
        halo: false,
        haloLineWidth: 12,
        haloStrokeOpacity: 0.25,
        iconFill: bgColor,
        iconFontSize: 16,
        iconOpacity: 1,
        labelBackground: false,
        labelBackgroundFill: bgColor,
        labelBackgroundLineWidth: 0,
        labelBackgroundOpacity: 0.5,
        labelBackgroundPadding: [0, 2],
        labelFill: textColor,
        labelFontSize: 12,
        labelFontWeight: 400,
        labelOpacity: 1,
        lineWidth: 0,
        opacity: 1,
        portFill: nodeColor,
        portLineWidth: 1,
        portStroke: nodeStroke,
        portStrokeOpacity: 0.65,
        stroke: nodeStroke,
        strokeOpacity: 1,
      },
      state: {
        selected: {
          halo: true,
          labelFontSize: 14,
          labelFontWeight: 700,
          lineWidth: 3,
          stroke: nodeStroke,
        },
        active: {
          halo: true,
          lineWidth: 0,
        },
        highlight: {
          labelFontWeight: 700,
          lineWidth: 3,
          stroke: nodeStroke,
          strokeOpacity: 0.85,
        },
        inactive: {
          iconOpacity: 0.25,
          labelOpacity: 0.25,
          lineWidth: 0,
          opacity: 0.25,
        },
        disabled: {
          color: nodeColorDisabled,
          labelOpacity: 0.25,
          lineWidth: 0,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        visibility: 'fade',
        update: [{ fields: ['x', 'y', 'color', 'stroke'] }],
      },
    },
    edge: {
      palette: edgePaletteOptions,
      style: {
        color: edgeColor,
        halo: false,
        haloLineWidth: 12,
        haloStrokeOpacity: 0.25,
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
        opacity: 1,
      },
      state: {
        selected: {
          halo: true,
          labelFontSize: 14,
          labelFontWeight: 700,
          lineWidth: 2,
        },
        active: {
          halo: true,
        },
        highlight: {
          labelFontWeight: 700,
          lineWidth: 2,
        },
        inactive: {
          labelOpacity: 0.25,
          opacity: 0.25,
        },
        disabled: {
          color: edgeColorDisabled,
          labelOpacity: 0.25,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        visibility: 'fade',
        update: [{ fields: ['color'] }, { fields: ['path'], shape: 'key' }],
      },
    },
    combo: {
      style: {
        collapsedMaskFill: comboColor,
        collapsedMaskFontSize: 12,
        collapsedSize: 32,
        color: comboColor,
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
        opacity: 1,
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
          labelOpacity: 0.25,
          opacity: 0.65,
        },
        disabled: {
          color: comboColorDisabled,
          labelOpacity: 0.25,
          opacity: 0.25,
          stroke: comboStrokeDisabled,
        },
      },
      animation: {
        enter: 'fade',
        exit: 'fade',
        visibility: 'fade',
        expand: 'combo-collapse-expand',
        collapse: 'combo-collapse-expand',
        update: [{ fields: ['x', 'y'] }, { fields: ['size', 'color', 'stroke'], shape: 'key' }],
      },
    },
  };
}
