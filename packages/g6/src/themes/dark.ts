import type { PaletteOptions } from '../spec/element/palette';
import { create } from './base';
import type { Theme } from './types';

const EDGE_PALETTE_OPTIONS: PaletteOptions = {
  type: 'group',
  color: [
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
};

const tokens = {
  bgColor: '#000000',
  comboColor: '#fdfdfd',
  comboColorDisabled: '#d0e4ff',
  comboStroke: '#99add1',
  comboStrokeDisabled: '#969696',
  edgeColor: '#637088',
  edgeColorDisabled: '#637088',
  edgeColorInactive: '#D0E4FF',
  edgePaletteOptions: EDGE_PALETTE_OPTIONS,
  nodeColor: '#1783ff',
  nodeColorDisabled: '#D0E4FF',
  nodeHaloStrokeOpacityActive: 0.25,
  nodeHaloStrokeOpacitySelected: 0.45,
  nodeIconOpacityInactive: 0.45,
  nodeOpacityDisabled: 0.25,
  nodeOpacityInactive: 0.45,
  nodeStroke: '#d0e4ff',
  textColor: '#ffffff',
};

export const dark: Theme = create(tokens);
