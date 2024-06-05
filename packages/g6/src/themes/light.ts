import { create } from './base';
import type { Theme } from './types';

const tokens = {
  bgColor: '#ffffff',
  comboColor: '#99ADD1',
  comboColorDisabled: '#f0f0f0',
  comboStroke: '#99add1',
  comboStrokeDisabled: '#d9d9d9',
  edgeColor: '#99add1',
  edgeColorDisabled: '#d9d9d9',
  edgeColorInactive: '#1B324F',
  nodeColor: '#1783ff',
  nodeColorDisabled: '#1B324F',
  nodeHaloStrokeOpacityActive: 0.15,
  nodeHaloStrokeOpacitySelected: 0.25,
  nodeIconOpacityInactive: 0.85,
  nodeOpacityDisabled: 0.06,
  nodeOpacityInactive: 0.25,
  nodeStroke: '#000000',
  textColor: '#000000',
};

export const light: Theme = create(tokens);
