import { create } from './base';
import type { Theme } from './types';

const tokens = {
  bgColor: '#000000',
  textColor: '#ffffffd9',
  nodeColor: '#1783ff',
  nodeColorDisabled: '#d0e4ff',
  nodeStroke: '#d0e4ff',
  edgeColor: '#99add1',
  edgeColorDisabled: '#969696',
  comboColor: '#fdfdfd',
  comboColorDisabled: '#d0e4ff',
  comboStroke: '#99add1',
  comboStrokeDisabled: '#969696',
};

export const dark: Theme = create(tokens);
