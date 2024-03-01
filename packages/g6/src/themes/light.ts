import type { Theme } from './types';

const SUBJECT_COLOR = '#227eff';
const BG_COLOR = '#fff';
const TEXT_COLOR = '#000000D9';

const NODE_COLOR = SUBJECT_COLOR;
const NODE_COLOR_DISABLED = '#f0f0f0';
const NODE_STROKE = '#000000';

const EDGE_STROKE = '#99add1';
const EDGE_STROKE_DISABLED = '#d9d9d9';
const EDGE_STROKE_INACTIVE = '#d2dae9';

const COMBO_FILL = '#fdfdfd';
const COMBO_FILL_DISABLED = '#f0f0f0';
const COMBO_STROKE = '#99add1';
const COMBO_STROKE_DISABLED = '#d9d9d9';
const COMBO_STROKE_SELECTED = '#1b324f';

export const light: Theme = {
  node: {
    style: {
      badgeFill: BG_COLOR,
      badgePalette: ['#7E92B5', '#F86254', '#EDB74B'],
      fill: NODE_COLOR,
      halo: false,
      haloLineWidth: 12,
      haloStrokeOpacity: 0.25,
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
      },
      highlight: {
        labelFontWeight: 700,
        lineWidth: 3,
        strokeOpacity: 0.85,
      },
      inactive: {
        iconOpacity: 0.25,
        labelOpacity: 0.25,
        opacity: 0.25,
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
        labelFontWeight: 700,
        lineWidth: 2,
      },
      inactive: {
        stroke: EDGE_STROKE_INACTIVE,
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
      size: 0,
      stroke: COMBO_STROKE,
    },
    state: {
      selected: {
        halo: true,
        labelFontSize: 14,
        labelFontWeight: 700,
        lineWidth: 4,
        stroke: COMBO_STROKE_SELECTED,
      },
      active: {
        halo: true,
      },
      highlight: {
        labelFontWeight: 700,
        lineWidth: 4,
      },
      inactive: {
        opacity: 0.65,
      },
      disabled: {
        fill: COMBO_FILL_DISABLED,
        labelOpacity: 0.25,
        opacity: 0.25,
        stroke: COMBO_STROKE_DISABLED,
      },
    },
    animation: {
      enter: 'fade',
      exit: 'fade',
      hide: 'fade',
      show: 'fade',
      update: [{ fields: ['cx', 'cy', 'r', 'x', 'y', 'width', 'height'], shape: 'key' }],
    },
  },
};
