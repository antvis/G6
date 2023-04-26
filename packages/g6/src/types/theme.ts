import { ComboShapeStyles } from './combo';
import { EdgeShapeStyles } from './edge';
import { NodeShapeStyles } from './node';

export interface ThemeOption {}
/**
 * Base behavior.
 * Two implementing ways: getSpec or getEvents
 */
export abstract class Theme {
  protected options: ThemeOption = {};
  constructor(options: ThemeOption) {
    this.options = options;
  }
  public updateConfig = (options: ThemeOption) => {
    this.options = Object.assign(this.options, options);
  };
  abstract destroy(): void;
}

/** Theme regisry table.
 * @example { 'drag-node': DragNodeBehavior, 'my-drag-node': MyDragNodeBehavior }
 */
export interface ThemeRegistry {
  [type: string]: typeof Theme;
}

/**
 * Type gymnastics, input registry table, output configure type.
 * @example ThemeOptionsOf<{ 'drag-node': typeof DragNodeBehavior }> // 'drag-node' | { type: 'drag-node', key?: 'ctrl' | 'shift' }
 */
export type ThemeOptionsOf<T extends ThemeRegistry = {}> =
  | Extract<keyof T, string>
  | {
      [K in keyof T]: T[K] extends { new (options: infer O): any }
        ? O & { type: K; key: string }
        : never;
    }[Extract<keyof T, string>];

export type ThemeObjectOptionsOf<T extends ThemeRegistry = {}> = {
  [K in keyof T]: T[K] extends { new (options: infer O): any }
    ? O & { type: K; key: string }
    : never;
}[Extract<keyof T, string>];

/** Default and stateStyle for an item */
export type NodeStyleSet = {
  default?: NodeShapeStyles;
  seledted?: NodeShapeStyles;
  [stateName: string]: NodeShapeStyles;
};
export type EdgeStyleSet = {
  default?: EdgeShapeStyles;
  [stateName: string]: EdgeShapeStyles;
};
export type ComboStyleSet = {
  default?: ComboShapeStyles;
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
}
export interface EdgeThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: EdgeStyleSets;
}
export interface ComboThemeSpecifications {
  dataTypeField?: string;
  palette?: string[] | { [dataTypeValue: string]: string };
  styles?: ComboStyleSets;
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
