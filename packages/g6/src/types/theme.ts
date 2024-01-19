import type { StaticComboOptions } from '../spec/element/combo';
import type { StaticEdgeOptions } from '../spec/element/edge';
import type { StaticNodeOptions } from '../spec/element/node';
import type { EdgeShapeStyles } from './edge';
import type { NodeShapeStyles } from './node';

export interface ThemeRegistry {
  [type: string]: Theme;
}

/** Default and state styles for a node. */
export type NodeStyleSet = {
  /** Styles in default state. */
  default: NodeShapeStyles;
  /** Styles in different states. */
  [stateName: string]: NodeShapeStyles;
};
/** Default and state styles for an edge. */
export type EdgeStyleSet = {
  /** Styles in default state. */
  default: EdgeShapeStyles;
  /** Styles in different states. */
  [stateName: string]: EdgeShapeStyles;
};

/**
 * Theme specification with node / edge / combo palette and style mappers. And also canvas DOM CSS settings.
 */
export interface ThemeSpecification {
  type?: string;
  node?: any;
  edge?: any;
  combo?: any;
  canvas?: {
    [cssName: string]: unknown;
  };
}

export type Theme = {
  node?: StaticNodeOptions;
  edge?: StaticEdgeOptions;
  combo?: StaticComboOptions;
};
