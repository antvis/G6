import { BaseThemeSolver } from '../plugin/theme-solver/base';
import { ComboShapeStyles } from './combo';
import { EdgeShapeStyles } from './edge';
import { LodLevel } from './item';
import { NodeShapeStyles } from './node';

export interface ThemeOption {}
/**
 * Base Theme class.
 */
export abstract class Theme {
  options: any = {};
  constructor(options: any) {
    this.options = options;
  }
  updateConfig = (options: any) => {
    this.options = Object.assign(this.options, options);
  };
  destroy() {}
}

/**
 * Theme registry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface ThemeRegistry {
  [type: string]: typeof BaseThemeSolver;
}

/**
 * Type templates, input registry table, output configure type.
 * @example ThemeOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type ThemeOptionsOf<T extends ThemeRegistry = {}> =
  | Extract<keyof T, string>
  | {
      [K in keyof T]: T[K] extends { new (options: infer O): any } ? O & { type: K } : { type: K };
    }[Extract<keyof T, string>];

export type ThemeObjectOptionsOf<T extends ThemeRegistry = {}> = {
  [K in keyof T]: T[K] extends { new (options: infer O): any } ? O & { type: K; key: string } : never;
}[Extract<keyof T, string>];

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
/** Default and state styles for a combo. */
export type ComboStyleSet = {
  /** Styles in default state. */
  default: ComboShapeStyles;
  /** Styles in different states. */
  [stateName: string]: ComboShapeStyles;
};

/**
 * Array of node style sets to map the palette in order.
 * e.g.
 * [
 *   { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *   { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} }
 * ]
 * If you want to map specified style set to a special data type value, use the map type where key is the to the data type value (e.g. cluster1, cluster2) and the value is the specification style set.
 * e.g.
 * {
 *  'cluster1': { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *  'cluster2': { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} },
 * }
 */
export type NodeStyleSets = NodeStyleSet[] | { [dataTypeValue: string]: NodeStyleSet };

/**
 * Array of edge style sets to map the palette in order.
 * e.g.
 * [
 *   { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *   { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} }
 * ]
 * If you want to map specified style set to a special data type value, use the map type where key is the to the data type value (e.g. cluster1, cluster2) and the value is the specification style set.
 * e.g.
 * {
 *  'cluster1': { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *  'cluster2': { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} },
 * }
 */
export type EdgeStyleSets = EdgeStyleSet[] | { [dataTypeValue: string]: EdgeStyleSet };

/**
 * Array of combo style sets to map the palette in order.
 * e.g.
 * [
 *   { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *   { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} }
 * ]
 * If you want to map specified style set to a special data type value, use the map type where key is the to the data type value (e.g. cluster1, cluster2) and the value is the specification style set.
 * e.g.
 * {
 *  'cluster1': { default: { keyShape: { fill: 'red', stroke: 'black' } }, selected: { keyShape: { fill: 'yellow' }} },
 *  'cluster2': { default: { keyShape: { fill: 'blue', stroke: 'black' } }, selected: { keyShape: { fill: 'green' }} },
 * }
 */
export type ComboStyleSets = ComboStyleSet[] | { [dataTypeValue: string]: ComboStyleSet };

/**
 * Theme specification for node.
 * dataTypeField - the field name in model.data that indicates the data type to map style set.
 * palette - color palette.
 * styles - style sets to map.
 * lodLevels - level of detail strategy for global setting.
 */
export interface NodeThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: NodeStyleSets;
  lodLevels?: LodLevel[];
}

/**
 * Theme specification for edge.
 * dataTypeField - the field name in model.data that indicates the data type to map style set.
 * palette - color palette.
 * styles - style sets to map.
 * lodLevels - level of detail strategy for global setting.
 */
export interface EdgeThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: EdgeStyleSets;
  lodLevels?: LodLevel[];
}

/**
 * Theme specification for combo.
 * dataTypeField - the field name in model.data that indicates the data type to map style set.
 * palette - color palette.
 * styles - style sets to map.
 * lodLevels - level of detail strategy for global setting.
 */
export interface ComboThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: ComboStyleSets;
  lodLevels?: LodLevel[];
}
/**
 * Theme specification with node / edge / combo palette and style mappers. And also canvas DOM CSS settings.
 */
export interface ThemeSpecification {
  node?: NodeThemeSpecifications;
  edge?: EdgeThemeSpecifications;
  combo?: ComboThemeSpecifications;
  canvas?: {
    [cssName: string]: unknown;
  };
}
