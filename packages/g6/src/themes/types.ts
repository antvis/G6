import type { StaticComboOptions } from '../spec/element/combo';
import type { StaticEdgeOptions } from '../spec/element/edge';
import type { StaticNodeOptions } from '../spec/element/node';

export type Theme = {
  node?: StaticNodeOptions;
  edge?: StaticEdgeOptions;
  combo?: StaticComboOptions;
  background?: string;
};
