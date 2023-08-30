import { BaseThemeSolver } from '../stdlib/themeSolver/base';
import { ComboShapeStyles } from './combo';
import { EdgeShapeStyles } from './edge';
import { LodStrategy } from './item';
import { NodeShapeStyles } from './node';

export interface ThemeOption {}
/**
 * Base behavior.
 * Two implementing ways: getSpec or getEvents
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

/** Theme regisry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface ThemeRegistry {
  [type: string]: typeof BaseThemeSolver;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example ThemeOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type ThemeOptionsOf<T extends ThemeRegistry = {}> =
  | Extract<keyof T, string>
  | {
      [K in keyof T]: T[K] extends { new (options: infer O): any }
        ? O & { type: K }
        : { type: K };
    }[Extract<keyof T, string>];

export type ThemeObjectOptionsOf<T extends ThemeRegistry = {}> = {
  [K in keyof T]: T[K] extends { new (options: infer O): any }
    ? O & { type: K; key: string }
    : never;
}[Extract<keyof T, string>];

/** Default and stateStyle for an item */
export type NodeStyleSet = {
  default: NodeShapeStyles;
  [stateName: string]: NodeShapeStyles;
};
export type EdgeStyleSet = {
  default: EdgeShapeStyles;
  [stateName: string]: EdgeShapeStyles;
};
export type ComboStyleSet = {
  default: ComboShapeStyles;
  [stateName: string]: ComboShapeStyles;
};

export type NodeStyleSets =
  | NodeStyleSet[]
  | { [dataTypeValue: string]: NodeStyleSet };
export type EdgeStyleSets =
  | EdgeStyleSet[]
  | { [dataTypeValue: string]: EdgeStyleSet };
export type ComboStyleSets =
  | ComboStyleSet[]
  | { [dataTypeValue: string]: ComboStyleSet };

export interface NodeThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: NodeStyleSets;
  lodStrategy?: LodStrategy;
}
export interface EdgeThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: EdgeStyleSets;
  lodStrategy?: LodStrategy;
}
export interface ComboThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: ComboStyleSets;
  lodStrategy?: LodStrategy;
}
/**
 * Theme specification
 */
export interface ThemeSpecification {
  node?: NodeThemeSpecifications;
  edge?: EdgeThemeSpecifications;
  combo?: ComboThemeSpecifications;
  canvas?: {
    [cssName: string]: unknown;
  };
}
