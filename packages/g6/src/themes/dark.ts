import type { Theme } from './types';

const SUBJECT_COLOR = '#1783ff';
const BG_COLOR = '#000000';
const TEXT_COLOR = '#ffffffd9';

const NODE_COLOR = SUBJECT_COLOR;
const NODE_COLOR_DISABLED = '#d0e4ff';
const NODE_STROKE = '#d0e4ff';

const EDGE_STROKE = '#99add1';
const EDGE_STROKE_DISABLED = '#969696';
const EDGE_STROKE_INACTIVE = '#99ADD173';

const COMBO_FILL = '#fdfdfd';
const COMBO_FILL_DISABLED = '#D0E4FF';
const COMBO_STROKE = '#99add1';
const COMBO_STROKE_SELECTED = '#d0e4ff';

export const dark: Theme = {
  node: {
    style: {
      badgeFill: BG_COLOR,
      badgePalette: ['#7E92B5', '#F86254', '#EDB74B'],
      fill: NODE_COLOR,
      halo: false,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.45,
      iconFill: BG_COLOR,
      iconFontSize: 16,
      labelBackgroundFill: BG_COLOR,
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.5,
      labelBackgroundPadding: [0, 2],
      labelFill: TEXT_COLOR,
      labelFontSize: 12,
      labelMaxLines: 1,
      labelMaxWidth: '200%',
      labelOpacity: 0.85,
      labelTextOverflow: 'ellipsis',
      labelWordWrap: true,
      lineWidth: 0,
      portFill: NODE_COLOR,
      portLineWidth: 1,
      portR: 3,
      portStroke: NODE_STROKE,
      portStrokeOpacity: 0.65,
      size: 32,
      stroke: NODE_STROKE,
    },
    state: {
      selected: {
        halo: true,
        labelFontSize: 14,
        labelFontWeight: 700,
        lineWidth: 3,
      },
      active: {
        halo: true,
        haloStrokeOpacity: 0.25,
      },
      highlight: {
        labelFontWeight: 700,
        lineWidth: 3,
      },
      inactive: {
        iconOpacity: 0.45,
        labelOpacity: 0.45,
        opacity: 0.45,
      },
      disabled: {
        fill: NODE_COLOR_DISABLED,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      hide: 'fade',
      show: 'fade',
      update: [{ fields: ['x', 'y', 'fill', 'stroke'] }],
    },
  },
  edge: {
    style: {
      halo: false,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.25,
      increasedLineWidthForHitTesting: 2,
      labelBackgroundFill: BG_COLOR,
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [4, 4, 4, 4],
      labelFill: TEXT_COLOR,
      labelFontSize: 12,
      labelMaxLines: 1,
      labelMaxWidth: '60%',
      labelOpacity: 0.85,
      labelPosition: 'middle',
      labelTextBaseline: 'middle',
      labelTextOverflow: 'ellipsis',
      labelWordWrap: true,
      lineWidth: 1,
      stroke: EDGE_STROKE,
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
        lineWidth: 2,
        labelFontWeight: 700,
      },
      inactive: {
        opacity: EDGE_STROKE_INACTIVE,
      },
      disabled: {
        stroke: EDGE_STROKE_DISABLED,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      hide: 'fade',
      show: 'fade',
      update: [{ fields: ['stroke'] }, { fields: ['path'], shape: 'key' }],
    },
  },
  combo: {
    style: {
      collapsedSize: 32,
      fill: COMBO_FILL,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.25,
      iconContentType: 'childCount',
      iconFill: COMBO_STROKE,
      iconFontSize: 12,
      labelBackgroundFill: BG_COLOR,
      labelBackgroundLineWidth: 0,
      labelBackgroundOpacity: 0.75,
      labelBackgroundPadding: [2, 4, 2, 4],
      labelFill: '#000',
      labelFontSize: 12,
      labelMaxLines: 1,
      lineWidth: 1,
      padding: 10,
      size: 0,
      stroke: COMBO_STROKE,
    },
    state: {
      selected: {
        lineWidth: 2,
        stroke: COMBO_STROKE_SELECTED,
        halo: true,
        labelFontSize: 14,
        labelFontWeight: 700,
      },
      active: {
        stroke: COMBO_STROKE_SELECTED,
        halo: true,
      },
      highlight: {
        lineWidth: 4,
        stroke: COMBO_STROKE_SELECTED,
        labelFontWeight: 700,
      },
      inactive: {
        labelOpacity: 0.65,
      },
      disabled: {
        fill: COMBO_FILL_DISABLED,
        opacity: 0.25,
        iconFill: COMBO_FILL_DISABLED,
        iconOpacity: 0.25,
        labelOpacity: 0.25,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      hide: 'fade',
      show: 'fade',
      update: [
        { fields: ['cx', 'cy', 'r', 'x', 'y', 'width', 'height'], shape: 'key' },
        { fields: ['x', 'y'], shape: 'label' },
      ],
    },
  },
};
