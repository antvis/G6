import { create } from './base';
import type { Theme } from './types';

const tokens = {
  bgColor: '#fff',
  textColor: '#000000d9',
  nodeColor: '#1783ff',
  nodeColorDisabled: '#f0f0f0',
  nodeStroke: '#000000',
  edgeColor: '#99add1',
  edgeColorDisabled: '#d9d9d9',
  comboColor: '#fdfdfd',
  comboColorDisabled: '#f0f0f0',
  comboStroke: '#99add1',
  comboStrokeDisabled: '#d9d9d9',
};

export const light: Theme = create(tokens);
